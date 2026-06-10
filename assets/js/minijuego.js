document.addEventListener("DOMContentLoaded", () => {
  // 1. Banco de preguntas (Podes estirarlo o cargarlo desde una API)
  const quizData = [
    {
      question:
        "¿Cuál de estas plantas ayuda a ahuyentar plagas de forma natural en la huerta?",
      options: ["Tomate", "Copete (Caléndula)", "Lechuga", "Papa"],
      correct: 1, // Índice de la respuesta correcta
    },
    {
      question:
        "¿Con qué frecuencia general se debe regar un semillero recién plantado?",
      options: [
        "Cada 3 días",
        "Solo cuando salga el sol",
        "Manteniendo la tierra húmeda sin encharcar",
        "Una vez por semana",
      ],
      correct: 2,
    },
    {
      question:
        "Asociación de cultivos: ¿Qué hortaliza se lleva excelente creciendo junto al Tomate?",
      options: ["Albahaca", "Menta", "Hinojo", "Ninguna, le saca nutrientes"],
      correct: 0,
    },
  ];

  // 2. Variables de estado del juego
  let currentQuestionIndex = 0;
  let score = 0;

  // 3. Elementos del DOM
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const questionCounter = document.getElementById("question-counter");
  const progressBar = document.getElementById("progress-bar");

  const correctAnswersSpan = document.getElementById("correct-answers");
  const totalQuestionsSpan = document.getElementById("total-questions");
  const feedbackMessage = document.getElementById("feedback-message");
  const btnRestart = document.getElementById("btn-restart");

  // 4. Inicializar el juego
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
  }

  // 5. Cargar Pregunta Actual
  function loadQuestion() {
    const currentData = quizData[currentQuestionIndex];

    // Actualizar textos y contador
    questionText.textContent = currentData.question;
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;

    // Actualizar barra de progreso
    const progressPercent = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Limpiar opciones viejas
    optionsContainer.innerHTML = "";

    // Renderizar opciones nuevas
    currentData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.classList.add("option-btn");
      button.textContent = option;
      // Guardamos el índice en el botón para verificarlo después
      button.dataset.index = index;
      button.addEventListener("click", selectOption);
      optionsContainer.appendChild(button);
    });
  }

  // 6. Al seleccionar una opción
  function selectOption(e) {
    const selectedButton = e.target;
    const selectedIndex = parseInt(selectedButton.dataset.index);
    const correctIndex = quizData[currentQuestionIndex].correct;

    // Deshabilitar todos los botones para que no sigan clickeando
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach((btn) => (btn.disabled = true));

    // Validar respuesta
    if (selectedIndex === correctIndex) {
      selectedButton.classList.add("correct");
      score++;
    } else {
      selectedButton.classList.add("wrong");
      // Al que era correcto le ponemos verde sutil para que el usuario aprenda
      allButtons[correctIndex].classList.add("correct");
    }

    // Esperar 1.5 segundos antes de pasar a la siguiente para dar feedback visual
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  // 7. Mostrar Pantalla de Resultados
  function showResults() {
    progressBar.style.width = "100%"; // Llena la barra al final
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    correctAnswersSpan.textContent = score;
    totalQuestionsSpan.textContent = quizData.length;

    // Feedback personalizado según el puntaje
    if (score === quizData.length) {
      feedbackMessage.textContent =
        "¡Excelente! Sos un maestro/a huertero. Tus plantas deben estar radiantes.";
    } else if (score >= quizData.length / 2) {
      feedbackMessage.textContent =
        "¡Buen intento! Tenés buena base, ideal para seguir metiendo las manos en la tierra.";
    } else {
      feedbackMessage.textContent =
        "¡No te preocupes! La huerta es pura experimentación. ¡A seguir aprendiendo!";
    }
  }

  // Evento de reinicio
  btnRestart.addEventListener("click", startQuiz);

  // Arrancar el juego por primera vez
  startQuiz();
});
