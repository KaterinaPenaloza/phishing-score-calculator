function calculateScore() {
    // ************************* TABLA A1_1 ****************************
    // Puntaje para la tabla 1 sección A1_1
    const tblA1_1 = document.getElementById('questionsTableA1_1');
    let score1 = 0;
    for (let i = 1; i < tblA1_1.rows.length; i++) {
        const selectElement = tblA1_1.rows[i].cells[1].querySelector('select');
        if (selectElement) {
            const answer = selectElement.value;
            if (answer === 'si') {
                score1 += 1;
            }
        }
    }
    // ********************** CATEGORIA A1_1 *************************
    // Actualizar el resultado total en la segunda tabla
    document.getElementById('tblA1_1Score').textContent = score1;
    // Determinar y mostrar la categoría de la sección A1_1
    let categoryA1_1 = determineCategoryA1_1();
    document.getElementById('categoryA1_1').textContent = categoryA1_1;



    // ********************** TABLA A1_2 *************************
    // Puntaje para la tabla 2 sección A1_2
    const tblA1_2 = document.getElementById('questionsTableA1_2');
    let score2 = 0;
    for (let i = 1; i < tblA1_2.rows.length; i++) {
        const selectElement = tblA1_2.rows[i].cells[1].querySelector('select');
        if (selectElement) {
            const answer = parseInt(selectElement.value, 10) || 0;
            score2 += answer;
        }
    }
    // ********************** CATEGORIA A1_2 *************************
    // Actualizar el resultado total en la segunda tabla
    document.getElementById('tblA1_2Score').textContent = score2;
    // Determinar y mostrar la categoría de la sección A1_2
    let categoryA1_2 = determineCategoryA1_2();
    document.getElementById('categoryA1_2').textContent = categoryA1_2;
    



    // ********************** CATEGORIA A1 *************************
    // Calcular y mostrar el puntaje total (suma de las dos tablas)
    const totalScore = score1 + score2;
    document.getElementById('totalScore').textContent = totalScore;
    // Determinar y mostrar la categoría de la sección A1
    let categoryA1 = determineCategoryA1();
    document.getElementById('category1').textContent = categoryA1;




    // ********************** TABLA 3 *************************
    // Puntaje para la tabla 1 sección A2
    const tblA2 = document.getElementById('questionsTableA2');
    let score3 = 0;
    for (let i = 1; i < tblA2.rows.length; i++) {
        const selectElement = tblA2.rows[i].cells[1].querySelector('select');
        if (selectElement) {
            const answer = parseInt(selectElement.value, 10) || 0;
            // Si no es la última fila, sumar el valor
            if (i < tblA2.rows.length - 1) {
                score3 += answer;
            } else {
                // Si es la última fila, restar el valor
                score3 -= answer;
            }
        }
    }
    // ********************** CATEGORIA A2 *************************
    // Actualizar el resultado total en la tabla 1 sección A2
    document.getElementById('tblA2Score').textContent = score3;
    // Determinar y mostrar la categoría
    let categoryA2 = determineCategoryA2();
    document.getElementById('category2').textContent = categoryA2;




     // ********************** CATEGORIA FINAL *************************
    // Determinar y mostrar la categoría
    let finalScore = totalScore + score3;
    document.getElementById('finalScore').textContent = finalScore;
    determineFinalCategory(categoryA1, categoryA2);
    const finalScoreValue = parseInt(document.getElementById('finalScore').textContent);

    //Poner colores al puntaje que da
    // Más puntaje, más fácil = amarillo
    if (finalScoreValue >= 32) {
        document.getElementById('finalScore').style.backgroundColor = 'rgb(240, 238, 130)';
    } else if(finalScoreValue >= 12 && finalScoreValue < 32){
        document.getElementById('finalScore').style.backgroundColor = 'rgb(240, 238, 130)';
    }else if(finalScoreValue >= 0 && finalScoreValue < 12){
        document.getElementById('finalScore').style.backgroundColor = 'rgb(245, 176, 97)';
    }    
}




//****** Determinar Categorias ******//
function determineCategoryA1_1() {
    // Crear la nueva categorización
    const A1_1CategoryCell = document.getElementById("categoryA1_1");
    const A1_1DescriptionCell = document.getElementById("A1_1CategoryDescription");
    const descriptions = {
        'Rango de señales bajas': 'Aquí no se proporcionan suficientes señales para que el correo electronico sea categorizado como malicioso o phishing.',
        'Rango de señales medias': 'Este rango entrega señales claras pero no determinantes para considerarlo phishing.',
        'Rango de señales altas': 'Este rango presenta señales o indicios suficientes de que el correo es sospechoso o phishing.',
    };
    const tblA1_1Score = parseInt(document.getElementById('tblA1_1Score').textContent);
    let categoryA1_1 = '';
    if (tblA1_1Score >= 0 && tblA1_1Score <= 3) {
        categoryA1_1 = 'Rango de señales bajas';
    } else if (tblA1_1Score >= 4 && tblA1_1Score <= 6) {
        categoryA1_1 = 'Rango de señales medias';
    } else if (tblA1_1Score >= 7) {
        categoryA1_1 = 'Rango de señales altas';
    }
    // Mostrar la información en las dos columnas
    A1_1CategoryCell.textContent = categoryA1_1;
    A1_1DescriptionCell.textContent = descriptions[categoryA1_1];
    return categoryA1_1;
}

function determineCategoryA1_2() {
    // Crear la nueva categorización
    const A1_2CategoryCell = document.getElementById("categoryA1_2");
    const A1_2DescriptionCell = document.getElementById("A1_2CategoryDescription");
    const descriptions = {
        'Rango de señales bajas': 'No se proporcionan suficientes señales para que el correo electronico sea categorizado como malicioso o phishing.',
        'Rango de señales medias': 'Este rango entrega señales claras pero no determinantes para considerarlo phishing.',
        'Rango de señales altas': 'Este rango presenta señales o indicios suficientes de que el correo es sospechoso o phishing.',
    };
    const tblA1_2Score = parseInt(document.getElementById('tblA1_2Score').textContent);
    let categoryA1_2 = '';
    if (tblA1_2Score >= 0 && tblA1_2Score <= 8) {
        categoryA1_2 = 'Rango de señales bajas';
    } else if (tblA1_2Score >= 9 && tblA1_2Score <= 14) {
        categoryA1_2 = 'Rango de señales medias';
    } else if (tblA1_2Score >= 15) {
        categoryA1_2 = 'Rango de señales altas';
    }
    // Mostrar la información en las dos columnas
    A1_2CategoryCell.textContent = categoryA1_2;
    A1_2DescriptionCell.textContent = descriptions[categoryA1_2];
    return categoryA1_2;
}

function determineCategoryA1() {
    // Crear la nueva categorización
    const A1CategoryCell = document.getElementById("categoryA1");
    const A1DescriptionCell = document.getElementById("A1CategoryDescription");
    const descriptions = {
        'Pocos (más difícil)': 'Un correo electrónico de phishing calificado como "pocos" o "más difícil" presenta menos indicios o señales que podrían ayudar a identificar su naturaleza maliciosa. En otras palabras, es más desafiante para los destinatarios detectar que se trata de un intento de phishing debido a la escasez de pistas evidentes en el mensaje. La falta de claras señales o indicios dificulta la identificación de la amenaza, lo que puede aumentar la efectividad del ataque, ya que los usuarios podrían ser menos propensos a notar cualquier actividad sospechosa en el correo electrónico.',
        'Alguno': 'Se evidencia que estos correos electrónicos pueden mostrar algunos elementos sospechosos, pero no son extremadamente evidentes ni totalmente sutiles. La evaluación de pistas en los correos electrónicos de phishing es crucial para que los usuarios puedan identificar posibles amenazas y tomar medidas de seguridad adecuadas.',
        'Muchos (menos difícil)': 'Hay múltiples indicadores o características en el correo electrónico que podrían levantar sospechas y alertar al destinatario sobre su naturaleza maliciosa. Este aumento en las señales no solo amplía las oportunidades para detectar el phishing, sino que también sugiere que el correo electrónico puede contener múltiples elementos sospechosos o incoherencias que podrían revelar su intención fraudulenta. ',
    };
    const totalScore = parseInt(document.getElementById('totalScore').textContent);
    let categoryA1 = '';
    if (totalScore >= 0 && totalScore <= 8) {
        categoryA1 = 'Pocos (más difícil)';
    } else if (totalScore >= 9 && totalScore <= 14) {
        categoryA1 = 'Alguno';
    } else if (totalScore >= 15) {
        categoryA1 = 'Muchos (menos difícil)';
    }
    // Mostrar la información en las dos columnas
    A1CategoryCell.textContent = categoryA1;
    A1DescriptionCell.textContent = descriptions[categoryA1];
    return categoryA1;
}

function determineCategoryA2() {
    // Crear la nueva categorización
    const A2CategoryCell = document.getElementById("categoryA2");
    const A2DescriptionCell = document.getElementById("A2CategoryDescription");
    const descriptions = {
        'Fuerte': 'El contenido del correo electrónico se adapta de manera significativa y efectiva a las características, intereses o expectativas de la audiencia. Esta alta alineación dificulta la detección del correo electrónico como un intento de phishing, ya que se ajusta de manera convincente a las percepciones y contextos familiares para los destinatarios.',
        'Medio': 'La alineación moderada indica que el correo electrónico comparte ciertos elementos relevantes para la audiencia, pero puede haber áreas donde la adaptación no sea tan precisa o convincente. La dificultad para detectar el correo electrónico como un phish es moderada en este escenario.',
        'Débil': 'Esto implica que el contenido del correo electrónico tiene una adaptación limitada o deficiente a las características, intereses o expectativas de la audiencia. La baja alineación hace que el correo electrónico sea menos difícil de detectar como un intento de phishing, ya que es probable que los destinatarios noten discrepancias o anomalías en el contenido que no coinciden con su contexto habitual.',
    };
    const totalScore2 = parseInt(document.getElementById('tblA2Score').textContent);
    let categoryA2 = '';
    if (totalScore2 <= 10) {
        categoryA2 = 'Débil';
    } else if (totalScore2 >= 11 && totalScore2 <= 17) {
        categoryA2 = 'Medio';
    } else if (totalScore2 >= 18) {
        categoryA2 = 'Fuerte';
    }

    // Mostrar la información en las dos columnas
    A2CategoryCell.textContent = categoryA2;
    A2DescriptionCell.textContent = descriptions[categoryA2];
    return categoryA2;
}



function determineFinalCategory(categoryA1, categoryA2) {
    // Crear la nueva categorización
    const category1Cell = document.getElementById("category1");
    const category1DescriptionCell = document.getElementById("category1Description");
    const descriptions1 = {
        'Pocos (más difícil)': 'Un correo electrónico de phishing calificado como "pocos" o "más difícil" presenta menos indicios o señales que podrían ayudar a identificar su naturaleza maliciosa. En otras palabras, es más desafiante para los destinatarios detectar que se trata de un intento de phishing debido a la escasez de pistas evidentes en el mensaje. La falta de claras señales o indicios dificulta la identificación de la amenaza, lo que puede aumentar la efectividad del ataque, ya que los usuarios podrían ser menos propensos a notar cualquier actividad sospechosa en el correo electrónico.',
        'Alguno': 'Se evidencia que estos correos electrónicos pueden mostrar algunos elementos sospechosos, pero no son extremadamente evidentes ni totalmente sutiles. La evaluación de pistas en los correos electrónicos de phishing es crucial para que los usuarios puedan identificar posibles amenazas y tomar medidas de seguridad adecuadas.',
        'Muchos (menos difícil)': 'Hay múltiples indicadores o características en el correo electrónico que podrían levantar sospechas y alertar al destinatario sobre su naturaleza maliciosa. Este aumento en las señales no solo amplía las oportunidades para detectar el phishing, sino que también sugiere que el correo electrónico puede contener múltiples elementos sospechosos o incoherencias que podrían revelar su intención fraudulenta. ',
    };
    const category2Cell = document.getElementById("category2");
    const category2DescriptionCell = document.getElementById("category2Description");
    const descriptions2 = {
        'Fuerte': 'El contenido del correo electrónico se adapta de manera significativa y efectiva a las características, intereses o expectativas de la audiencia. Esta alta alineación dificulta la detección del correo electrónico como un intento de phishing, ya que se ajusta de manera convincente a las percepciones y contextos familiares para los destinatarios.',
        'Medio': 'La alineación moderada indica que el correo electrónico comparte ciertos elementos relevantes para la audiencia, pero puede haber áreas donde la adaptación no sea tan precisa o convincente. La dificultad para detectar el correo electrónico como un phish es moderada en este escenario.',
        'Débil': 'Esto implica que el contenido del correo electrónico tiene una adaptación limitada o deficiente a las características, intereses o expectativas de la audiencia. La baja alineación hace que el correo electrónico sea menos difícil de detectar como un intento de phishing, ya que es probable que los destinatarios noten discrepancias o anomalías en el contenido que no coinciden con su contexto habitual.',
    };
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
        // Moderately to Least difficult
    } else if (categoryA1 === 'Alguno' && categoryA2 === 'Débil') {
        finalCategory = 'Moderadamente a menos dificil';
        // Least difficult
    } else if (categoryA1 === 'Muchos (menos difícil)' && categoryA2 === 'Débil') {
        finalCategory = 'Menos dificil';
    }

    // Mostrar la información en las dos columnas
    let category1 = categoryA1
    let category2 = categoryA2
    category1Cell.textContent = category1
    category1DescriptionCell.textContent = descriptions1[category1]

    category2Cell.textContent = category2
    category2DescriptionCell.textContent = descriptions2[category2]

    finalCategoryCell.textContent = finalCategory;
    finalDescriptionCell.textContent = descriptions[finalCategory];
    return finalCategory;
}

