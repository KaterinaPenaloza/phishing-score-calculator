// Clase CSS para las categorías intermedias.
const CATEGORY_CLASS = {
    'Pocos (más difícil)': 'result-very-hard',
    'Alguno': 'result-moderate',
    'Muchos (menos difícil)': 'result-easy',

    'Débil': 'result-easy',
    'Medio': 'result-moderate',
    'Fuerte': 'result-very-hard',
};

// Clase CSS para la categoría final
const FINAL_CATEGORY_CLASS = {
    'Menos difícil': 'result-easy',
    'Moderadamente a menos difícil': 'result-moderate-easy',
    'Moderadamente difícil': 'result-moderate',
    'Muy difícil': 'result-very-hard',
};

// Bloque de resultados
const CATEGORY_BLOCKS = {
    // A.1 Parte 1: presencia de señales
    presence: {
        categoryId: 'categoryA1_1',
        descriptionId: 'A1_1CategoryDescription',
        levels: [
            { upTo: 3, range: '0-3', label: 'Rango de señales bajas'},
            { upTo: 6, range: '4-6', label: 'Rango de señales medias'},
            { upTo: Infinity, range: '7-9', label: 'Rango de señales altas'},
        ],
        descriptions: {
            'Rango de señales bajas': 'Aquí no se proporcionan suficientes señales para que el correo electrónico sea categorizado como malicioso o phishing.',
            'Rango de señales medias': 'Este rango entrega señales claras pero no determinantes para considerarlo phishing.',
            'Rango de señales altas': 'Este rango presenta señales o indicios suficientes de que el correo es sospechoso o phishing.',
        },
    },
    // A.1 Parte 2: conteo de señales
    count: {
        categoryId: 'categoryA1_2',
        descriptionId: 'A1_2CategoryDescription',
        levels: [
            { upTo: 8, range: '0-8', label: 'Rango de señales bajas'},
            { upTo: 14, range: '9-14', label: 'Rango de señales medias'},
            { upTo: Infinity, range: '15 o más', label: 'Rango de señales altas'},
        ],
        descriptions: {
            'Rango de señales bajas': 'Aquí no se proporcionan suficientes señales para que el correo electrónico sea categorizado como malicioso o phishing.',
            'Rango de señales medias': 'Este rango entrega señales claras pero no determinantes para considerarlo phishing.',
            'Rango de señales altas': 'Este rango presenta señales o indicios suficientes de que el correo es sospechoso o phishing.',
        },
    },
    // A.1 total (Parte 1 + Parte 2)
    cues: {
        categoryId: 'categoryA1',
        descriptionId: 'A1CategoryDescription',
        levels: [
            { upTo: 8, label: 'Pocos (más difícil)'},
            { upTo: 14, label: 'Alguno'},
            { upTo: Infinity, label: 'Muchos (menos difícil)'},
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
            { upTo: 10, range: '10 o menos', label: 'Débil'},
            { upTo: 17, range: '11-17', label: 'Medio'},
            { upTo: Infinity, range: '18 o más', label: 'Fuerte'},
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

function setText(id, text) {
    document.getElementById(id).textContent = text;
}

function renderScaleTable(tbodyId, block) {
    const tbody = document.getElementById(tbodyId);
    for (const level of block.levels) {
        const row = tbody.insertRow();
        row.insertCell().textContent = level.range;
        row.insertCell().textContent = level.label;
    }
}

// ****** Calcular puntajes por seccion ******//
function calculateScore() {
    // ************************* TABLA A1_1 ****************************
    // Puntaje para la tabla sección A1_1, cada "sí" suma 1 punto
    const score1 = sumAnswers('questionsTableA1_1', select => (select.value === 'si' ? 1 : 0));
    // ********************** CATEGORIA A1_1 *************************
    // Mostrar el puntaje en la tabla de resultados de la parte 1
    setText('tblA1_1Score', score1);
    // Determinar y mostrar la categoría de la sección A1_1
    const categoryA1_1 = determineCategory(CATEGORY_BLOCKS.presence, score1);
    setText('categoryA1_1', categoryA1_1);


    // ********************** TABLA A1_2 *************************
    // Puntaje para la tabla sección A1_2, cada respuesta suma su valor numérico
    const score2 = sumAnswers('questionsTableA1_2', numericValue);
    // ********************** CATEGORIA A1_2 *************************
    // Mostrar el puntaje en la tabla de resultados de la parte 2
    setText('tblA1_2Score', score2);
    // Determinar y mostrar la categoría de la sección A1_2
    const categoryA1_2 = determineCategory(CATEGORY_BLOCKS.count, score2);
    setText('categoryA1_2', categoryA1_2);
    

    // ********************** RESULTADO A1 *************************
    // Calcular y mostrar el puntaje total (suma de las dos tablas)
    const totalScore = score1 + score2;
    setText('totalScore', totalScore);
    // Determinar y mostrar la categoría de la sección A1
    const categoryA1 = determineCategory(CATEGORY_BLOCKS.cues, totalScore);
    setText('category1', categoryA1);


    // ********************** TABLA A2 *************************
    // Los elementos 1 a 4 suman; el 5 (capacitación) resta
    const score3 = sumAnswers('questionsTableA2', select =>
        select.name === 'A2Q5' ? -numericValue(select) : numericValue(select)
    );
    // ********************** CATEGORIA A2 *************************
    // Actualizar el resultado total en la tabla 1 sección A2
    setText('tblA2Score', score3);
    // Determinar y mostrar la categoría
    const categoryA2 = determineCategory(CATEGORY_BLOCKS.premise, score3);
    setText('category2', categoryA2);


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
    setText(block.categoryId, level.label);
    setText(block.descriptionId, block.descriptions[level.label]);
    return level.label;
}

function determineFinalCategory(categoryA1, categoryA2) {
    const descriptions = {
        'Muy difícil': 'Pocas señales observables y una premisa muy alineada con el contexto del destinatario. El correo parece legítimo y casi no da pistas para sospechar, por lo que es esperable que muchos destinatarios no lo identifiquen como phishing.',
        'Moderadamente difícil': 'Combinación intermedia entre señales y alineación. Existen pistas, pero el contexto es lo bastante creíble como para que una parte de los destinatarios no las note. Detectarlo exige atención y conocimiento del contexto laboral.',
        'Moderadamente a menos difícil': 'Hay una cantidad razonable de señales y el contenido encaja poco con lo que el destinatario espera, de modo que las inconsistencias son relativamente visibles. Una persona atenta debería detectarlo, aunque no está garantizado.',
        'Menos difícil': 'Abundan las señales y el mensaje casi no calza con el contexto del destinatario. Es el escenario más fácil de detectar como phishing.',
    };

    let finalCategory = '';
    // Combinar categorías y subcategorías
        // Moderadamente difícil
    if ((categoryA1 === 'Pocos (más difícil)' && categoryA2 === 'Débil')
        || (categoryA1 === 'Alguno' && categoryA2 === 'Medio')
        || (categoryA1 === 'Muchos (menos difícil)' && categoryA2 === 'Medio')
        || (categoryA1 === 'Muchos (menos difícil)' && categoryA2 === 'Fuerte')) {
        finalCategory = 'Moderadamente difícil';
        // Muy difícil
    } else if (categoryA1 === 'Pocos (más difícil)' && categoryA2 === 'Fuerte'
        || (categoryA1 === 'Pocos (más difícil)' && categoryA2 === 'Medio')
        || (categoryA1 === 'Alguno' && categoryA2 === 'Fuerte')) {
        finalCategory = 'Muy difícil';
        // Moderadamente a menos difícil
    } else if (categoryA1 === 'Alguno' && categoryA2 === 'Débil') {
        finalCategory = 'Moderadamente a menos difícil';
        // Menos difícil
    } else if (categoryA1 === 'Muchos (menos difícil)' && categoryA2 === 'Débil') {
        finalCategory = 'Menos difícil';
    }

    // Mostrar la información en las dos columnas
    setText('category1', categoryA1);
    setText('category1Description', CATEGORY_BLOCKS.cues.descriptions[categoryA1]);

    setText('category2', categoryA2);
    setText('category2Description', CATEGORY_BLOCKS.premise.descriptions[categoryA2]);

    setText('finalCategory', finalCategory);
    setText('finalCategoryDescription', descriptions[finalCategory]);
    return finalCategory;
}


// ------------------------- NAVEGACIÓN ENTRE PASOS -------------------------
// Muestra paso actual
function showStep(stepId) {
    for (const step of document.querySelectorAll('section')) {
        step.hidden = step.id !== stepId;
    }
    window.scrollTo(0, 0);
}

// Vuelve al estado inicial
function restart() {
    for (const select of document.querySelectorAll('select')) {
        select.value = '';
    }
    for (const row of document.querySelectorAll('.unanswered')) {
        row.classList.remove('unanswered');
    }
    for (const message of document.querySelectorAll('.validation-message')) {
        message.hidden = true;
    }
    calculateScore();
    showStep('step-cues');
}

// Cantidad de preguntas sin responder en una sección
function countUnanswered(section) {
    return [...section.querySelectorAll('select')].filter(select => select.value === '').length;
}

function markUnanswered(section) {
    for (const select of section.querySelectorAll('select')) {
        select.closest('tr').classList.toggle('unanswered', select.value === '');
    }
}

function setValidationMessage(section, text) {
    let message = section.querySelector('.validation-message');
    if (!message) {
        if (text === '') return;
        message = document.createElement('p');
        message.className = 'validation-message';
        message.setAttribute('role', 'alert');
        section.querySelector('.step-buttons').before(message);
    }
    message.textContent = text;
    message.hidden = text === '';
}

document.addEventListener('click', event => {
    const gotoButton = event.target.closest('[data-goto]');
        if (gotoButton) {
        // Los botones con data-validate exigen que la sección actual esté completa
        if (gotoButton.hasAttribute('data-validate')) {
            const section = gotoButton.closest('section');
            const missing = countUnanswered(section);
            if (missing > 0) {
                markUnanswered(section);
                setValidationMessage(section, missing === 1
                    ? 'Tiene 1 pregunta sin responder.' : `Tiene ${missing} preguntas sin responder.`);
                // llevar a la primera pregunta que falta
                section.querySelector('.unanswered').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
            }
        }
        showStep(gotoButton.dataset.goto);
    }

    if (event.target.closest('[data-action="restart"]')) {
        restart();
    }

    if (event.target.closest('[data-action="print"]')) {
        printResults();
    }
});

// Recalcular los puntajes cada vez que se cambia una respuesta
document.addEventListener('change', event => {
    if (event.target.matches('select')) {
        calculateScore();
        event.target.closest('tr').classList.remove('unanswered');
        const section = event.target.closest('section');
        if (!section.querySelector('.unanswered')) {
            setValidationMessage(section, '');
        }
    }
});

renderScaleTable('scalePresence', CATEGORY_BLOCKS.presence);
renderScaleTable('scaleCount', CATEGORY_BLOCKS.count);


// ------------------------- IMPRIMIR / PDF -------------------------
const originalTitle = document.title;

function pad(number) {
    return String(number).padStart(2, '0');
}

// Pone la fecha en la página y el nombre sugerido del archivo (el navegador usa el título)
function preparePrint() {
    const now = new Date();
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}-${pad(now.getMinutes())}`;
    document.title = `Resultado-phishing-${date}_${time}`;
    setText('printDate', `Generado el ${now.toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' })}`);
}

function printResults() {
    preparePrint();
    window.print();
}

// Ctrl+P
window.addEventListener('beforeprint', preparePrint);
window.addEventListener('afterprint', () => {
    document.title = originalTitle;
});