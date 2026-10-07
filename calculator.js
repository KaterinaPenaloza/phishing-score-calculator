// Clase CSS para las categorías intermedias (señales y alineación).
const CATEGORY_CLASS = {
    'Pocos (más difícil)': 'result-very-hard',
    'Alguno': 'result-moderate',
    'Muchos (menos difícil)': 'result-easy',
    'Fuerte': 'result-very-hard',
    'Medio': 'result-moderate',
    'Débil': 'result-easy',
};

// Clase CSS para la categoría final
const FINAL_CATEGORY_CLASS = {
    'Menos dificil': 'result-easy',
    'Moderadamente a menos dificil': 'result-moderate-easy',
    'Moderadamente dificil': 'result-moderate',
    'Muy dificil': 'result-very-hard',
};

// Bloque de resultados:
//  - categoryId / descriptionId: celdas donde se muestran la categoría y su descripción
//  - levels: de menor a mayor.
//  - descriptions: texto de cada categoría
const CATEGORY_BLOCKS = {
    // A.1 Parte 1: presencia de señales
    presence: {
        categoryId: 'categoryA1_1',
        descriptionId: 'A1_1CategoryDescription',
        levels: [
            { upTo: 3, label: 'Rango de señales bajas' },
            { upTo: 6, label: 'Rango de señales medias' },
            { upTo: Infinity, label: 'Rango de señales altas' },
        ],
        descriptions: {
            'Rango de señales bajas': 'Aquí no se proporcionan suficientes señales para que el correo electronico sea categorizado como malicioso o phishing.',
            'Rango de señales medias': 'Este rango entrega señales claras pero no determinantes para considerarlo phishing.',
            'Rango de señales altas': 'Este rango presenta señales o indicios suficientes de que el correo es sospechoso o phishing.',
        },
    },
    // A.1 Parte 2: conteo de señales
    count: {
        categoryId: 'categoryA1_2',
        descriptionId: 'A1_2CategoryDescription',
        levels: [
            { upTo: 8, label: 'Rango de señales bajas' },
            { upTo: 14, label: 'Rango de señales medias' },
            { upTo: Infinity, label: 'Rango de señales altas' },
        ],
        descriptions: {
            'Rango de señales bajas': 'Aquí no se proporcionan suficientes señales para que el correo electronico sea categorizado como malicioso o phishing.',
            'Rango de señales medias': 'Este rango entrega señales claras pero no determinantes para considerarlo phishing.',
            'Rango de señales altas': 'Este rango presenta señales o indicios suficientes de que el correo es sospechoso o phishing.',
        },
    },
    // A.1 total (Parte 1 + Parte 2)
    cues: {
        categoryId: 'categoryA1',
        descriptionId: 'A1CategoryDescription',
        levels: [
            { upTo: 8, label: 'Pocos (más difícil)' },
            { upTo: 14, label: 'Alguno' },
            { upTo: Infinity, label: 'Muchos (menos difícil)' },
        ],
        descriptions: {
            'Pocos (más difícil)': 'Un correo electrónico de phishing calificado como "pocos" o "más difícil" presenta menos indicios o señales que podrían ayudar a identificar su naturaleza maliciosa. En otras palabras, es más desafiante para los destinatarios detectar que se trata de un intento de phishing debido a la escasez de pistas evidentes en el mensaje. La falta de claras señales o indicios dificulta la identificación de la amenaza, lo que puede aumentar la efectividad del ataque, ya que los usuarios podrían ser menos propensos a notar cualquier actividad sospechosa en el correo electrónico.',
            'Alguno': 'Se evidencia que estos correos electrónicos pueden mostrar algunos elementos sospechosos, pero no son extremadamente evidentes ni totalmente sutiles. La evaluación de pistas en los correos electrónicos de phishing es crucial para que los usuarios puedan identificar posibles amenazas y tomar medidas de seguridad adecuadas.',
            'Muchos (menos difícil)': 'Hay múltiples indicadores o características en el correo electrónico que podrían levantar sospechas y alertar al destinatario sobre su naturaleza maliciosa. Este aumento en las señales no solo amplía las oportunidades para detectar el phishing, sino que también sugiere que el correo electrónico puede contener múltiples elementos sospechosos o incoherencias que podrían revelar su intención fraudulenta. ',
        },

    },
    // A.2 Alineación de premisas
    premise: {
        categoryId: 'categoryA2',
        descriptionId: 'A2CategoryDescription',
        levels: [
            { upTo: 10, label: 'Débil' },
            { upTo: 17, label: 'Medio' },
            { upTo: Infinity, label: 'Fuerte' },
        ],
        descriptions: {
            'Fuerte': 'El contenido del correo electrónico se adapta de manera significativa y efectiva a las características, intereses o expectativas de la audiencia. Esta alta alineación dificulta la detección del correo electrónico como un intento de phishing, ya que se ajusta de manera convincente a las percepciones y contextos familiares para los destinatarios.',
            'Medio': 'La alineación moderada indica que el correo electrónico comparte ciertos elementos relevantes para la audiencia, pero puede haber áreas donde la adaptación no sea tan precisa o convincente. La dificultad para detectar el correo electrónico como un phish es moderada en este escenario.',
            'Débil': 'Esto implica que el contenido del correo electrónico tiene una adaptación limitada o deficiente a las características, intereses o expectativas de la audiencia. La baja alineación hace que el correo electrónico sea menos difícil de detectar como un intento de phishing, ya que es probable que los destinatarios noten discrepancias o anomalías en el contenido que no coinciden con su contexto habitual.',
        },
    },
};



// ****** Funciones auxiliares para las respuestas ******//
// Convierte la respuesta de un select en número (sin responder = 0)
function numericValue(select) {
    return parseInt(select.value, 10) || 0;
}

// Suma lo que aporta cada pregunta de una tabla.
function sumAnswers(tableId, valueOf) {
    let total = 0;
    for (const select of document.querySelectorAll(`#${tableId} select`)) {
        total += valueOf(select);
    }
    return total;
}

// ****** Calcular puntajes por seccion ******//
function calculateScore() {
    // ************************* TABLA A1_1 ****************************
    // Puntaje para la tabla sección A1_1, cada "sí" suma 1 punto
    const score1 = sumAnswers('questionsTableA1_1', select => (select.value === 'si' ? 1 : 0));
    // ********************** CATEGORIA A1_1 *************************
    // Mostrar el puntaje en la tabla de resultados de la parte 1
    document.getElementById('tblA1_1Score').textContent = score1;
    // Determinar y mostrar la categoría de la sección A1_1
    const categoryA1_1 = determineCategory(CATEGORY_BLOCKS.presence, score1);
    document.getElementById('categoryA1_1').textContent = categoryA1_1;


    // ********************** TABLA A1_2 *************************
    // Puntaje para la tabla sección A1_2, cada respuesta suma su valor numérico
    const score2 = sumAnswers('questionsTableA1_2', numericValue);
    // ********************** CATEGORIA A1_2 *************************
    // Mostrar el puntaje en la tabla de resultados de la parte 2
    document.getElementById('tblA1_2Score').textContent = score2;
    // Determinar y mostrar la categoría de la sección A1_2
    const categoryA1_2 = determineCategory(CATEGORY_BLOCKS.count, score2);
    document.getElementById('categoryA1_2').textContent = categoryA1_2;
    

    // ********************** RESULTADO A1 *************************
    // Calcular y mostrar el puntaje total (suma de las dos tablas)
    const totalScore = score1 + score2;
    document.getElementById('totalScore').textContent = totalScore;
    // Determinar y mostrar la categoría de la sección A1
    const categoryA1 = determineCategory(CATEGORY_BLOCKS.cues, totalScore);
    document.getElementById('category1').textContent = categoryA1;


    // ********************** TABLA A2 *************************
    // Los elementos 1 a 4 suman; el 5 (capacitación) resta
    const score3 = sumAnswers('questionsTableA2', select =>
        select.name === 'A2Q5' ? -numericValue(select) : numericValue(select)
    );
    // ********************** CATEGORIA A2 *************************
    // Actualizar el resultado total en la tabla 1 sección A2
    document.getElementById('tblA2Score').textContent = score3;
    // Determinar y mostrar la categoría
    const categoryA2 = determineCategory(CATEGORY_BLOCKS.premise, score3);
    document.getElementById('category2').textContent = categoryA2;


    // ********************** CATEGORIA FINAL *************************
    const finalCategory = determineFinalCategory(categoryA1, categoryA2);
    // Colores según categoría
    document.getElementById('category1').className = CATEGORY_CLASS[categoryA1] || '';
    document.getElementById('category2').className = CATEGORY_CLASS[categoryA2] || '';
    document.getElementById('finalCategory').className = FINAL_CATEGORY_CLASS[finalCategory] || '';
}



//****** Determinar Categorias ******//
function determineCategory(block, score) {
    const level = block.levels.find(level => score <= level.upTo);
    document.getElementById(block.categoryId).textContent = level.label;
    document.getElementById(block.descriptionId).textContent = block.descriptions[level.label];
    return level.label;
}

function determineFinalCategory(categoryA1, categoryA2) {
    // Crear la nueva categorización
    const category1Cell = document.getElementById("category1");
    const category1DescriptionCell = document.getElementById("category1Description");
    const category2Cell = document.getElementById("category2");
    const category2DescriptionCell = document.getElementById("category2Description");
    // Crear la nueva categorización
    const finalCategoryCell = document.getElementById("finalCategory");
    const finalDescriptionCell = document.getElementById("finalCategoryDescription");
    const descriptions = {
        'Muy dificil': 'Pocas señales observables y una premisa muy alineada con el contexto del destinatario. El correo parece legítimo y casi no da pistas para sospechar, por lo que es esperable que muchos destinatarios no lo identifiquen como phishing.',
        'Moderadamente dificil': 'Combinación intermedia entre señales y alineación. Existen pistas, pero el contexto es lo bastante creíble como para que una parte de los destinatarios no las note. Detectarlo exige atención y conocimiento del contexto laboral.',
        'Moderadamente a menos dificil': 'Hay una cantidad razonable de señales y el contenido encaja poco con lo que el destinatario espera, de modo que las inconsistencias son relativamente visibles. Una persona atenta debería detectarlo, aunque no está garantizado.',
        'Menos dificil': 'Abundan las señales y el mensaje casi no calza con el contexto del destinatario. Es el escenario más fácil de detectar como phishing.',
    };

    let finalCategory = '';
    // Combinar categorías y subcategorías
    // Moderadamente dificil
    if ((categoryA1 === 'Pocos (más difícil)' && categoryA2 === 'Débil')
        || (categoryA1 === 'Alguno' && categoryA2 === 'Medio')
        || (categoryA1 === 'Muchos (menos difícil)' && categoryA2 === 'Medio')
        || (categoryA1 === 'Muchos (menos difícil)' && categoryA2 === 'Fuerte')) {
        finalCategory = 'Moderadamente dificil';
        // Muy dificil
    } else if (categoryA1 === 'Pocos (más difícil)' && categoryA2 === 'Fuerte'
        || (categoryA1 === 'Pocos (más difícil)' && categoryA2 === 'Medio')
        || (categoryA1 === 'Alguno' && categoryA2 === 'Fuerte')) {
        finalCategory = 'Muy dificil';
        // Moderadamente a menos dificil
    } else if (categoryA1 === 'Alguno' && categoryA2 === 'Débil') {
        finalCategory = 'Moderadamente a menos dificil';
        // Menos dificil
    } else if (categoryA1 === 'Muchos (menos difícil)' && categoryA2 === 'Débil') {
        finalCategory = 'Menos dificil';
    }

    // Mostrar la información en las dos columnas
    category1Cell.textContent = categoryA1;
    category1DescriptionCell.textContent = CATEGORY_BLOCKS.cues.descriptions[categoryA1];
 
    category2Cell.textContent = categoryA2;
    category2DescriptionCell.textContent = CATEGORY_BLOCKS.premise.descriptions[categoryA2];
 
    finalCategoryCell.textContent = finalCategory;
    finalDescriptionCell.textContent = descriptions[finalCategory];
    return finalCategory;
}
