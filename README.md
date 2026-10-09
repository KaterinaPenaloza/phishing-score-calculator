# Calculadora de Puntaje de Phishing

Herramienta web interactiva diseñada para evaluar la dificultad de detección humana de correos electrónicos sospechosos de *phishing*, basada en la metodología estandarizada del **NIST Phish Scale** (NIST TN 2276).

---

## Descripción General

El *phishing* sigue siendo una de las principales amenazas de ciberseguridad para las organizaciones. 
Aunque las capacitaciones emplean simulaciones para preparar al personal, la evaluación tradicional se limita a medir la tasa de clics (*click rate*) y de reportes (*reporting rate*). Sin embargo, la guía técnica **NIST Phish Scale User Guide** demuestra que estas métricas por sí solas brindan una visión incompleta del riesgo, ya que no consideran que la dificultad de detección humana varía según el tipo de correo y el contexto del usuario.   

Esta aplicación web implementa de forma íntegra el método del NIST Phish Scale para permitir a los equipos de ciberseguridad clasificar objetivamente la dificultad de detección de un correo electrónico. Al evaluar cuantitativamente las señales observables del mensaje (*cues*) y su alineación con el rol del destinatario (*premise alignment*), la calculadora permite:

 - Contextualizar los resultados de clics y reportes en pruebas de simulación.  
 - Caracterizar las amenazas reales para personalizar el entrenamiento según los riesgos específicos de la organización.
 - Medir el riesgo humano de manera proporcional a la tolerancia y postura de seguridad de la institución.   

---

## Fundamento Teórico: NIST Phish Scale

La herramienta implementa el modelo desarrollado por el *National Institute of Standards and Technology (NIST)*, el cual combina dos componentes centrales para determinar la dificultad de detección:

1. **A.1 Señales del Correo Electronico (Email Cues):**
   * **Parte 1 (Presencia):** Indicadores técnicos, de presentación visual, lenguaje, contenido y tácticas comunes evaluados de forma binaria (*Sí/No*).
   * **Parte 2 (Conteo):** Frecuencia acumulada de errores ortográficos, inconsistencias, archivos adjuntos peligrosos, enlaces engañosos, urgencia y suplantación.

2. **A.2 Alineacion de Premisas (Premise Alignment):**
   * Evaluación de la relevancia contextual del mensaje respecto al público objetivo mediante una escala de aplicabilidad (0 a 8 puntos).
   * Mide si el correo imita un proceso laboral real, si tiene relevancia directa para el rol del usuario, si se alinea con eventos externos/internos, si genera temor a consecuencias y descuenta el impacto de capacitaciones específicas previas.

3. **A.3 Deteccion de Dificultad:**
   * Cruza la categoría de señales (*Pocos, Algunos, Muchos*) con el nivel de alineación de la premisa (*Débil, Medio, Fuerte*) para entregar el veredicto final sobre la dificultad de detección humana.

---

## Funcionalidades

* **Evaluación paso a paso:** Interfaz dividida en secciones para guiar al evaluador a través del análisis de señales y premisas.
* **Validación en tiempo real:** Control de preguntas no respondidas antes de avanzar de sección.
* **Cálculo automático:** Determinación dinámica de puntajes acumulados y categorización sin recargar la página.
* **Soporte contextual:** *Tooltips* explicativos en cada criterio para guiar el análisis técnico.

---

## Tecnologías Utilizadas

* **HTML5:** Estructura semántica de los formularios y tablas de evaluación.
* **CSS3:** Estilos personalizados con diseño adaptativo.
* **JavaScript:** Lógica del cálculo de puntajes, manipulación del DOM y navegación entre pasos.
