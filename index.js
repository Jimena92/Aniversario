const questions = [
    {
        question: "¿Cuál fue el primer regalo que te di?",
        options: ["A) Libro", "B) Pulsera", "C) Playera"],
        correctAnswer: "A"
    },
    {
        question: "¿Cuál fue la primera película que vimos juntas?",
        options: ["A) Payaso loco", "B) REC", "C) It 2"],
        correctAnswer: "C"
    },
    {
        question: "¿Quién dio el primer beso?",
        options: ["A) Pelona", "B) Lunita", "C) Un ovni"],
        correctAnswer: "A"
    },
    {
        question: "¿A dónde hemos ido de viaje?",
        options: ["A) Iztapalapa", "B) Averno", "C) Puebla"],
        correctAnswer: "C"
    },
    {
        question: "Nuestro lugar favorito ",
        options: ["A) Taquería", "B) El nido", "C) Taberna"],
        correctAnswer: "B"
    },
    {
        question: "¿Qué nos encanta comer juntas?",
        options: ["A) Pizza", "B) Tacos de bIstec", "C) Mollejas"],
        correctAnswer: "B"
    },
 
    {
        question: "¿Cuál es mi mayor miedo?",
        options: ["A) La muerte de alguien querido", "B) Insectos", "C) Fracaso"],
        correctAnswer: "A"
    },
    {
        question: "¿Qué es lo que más me gusta hacer? Ta dificilonga esta, ¿vedá? 👀",
        options: ["A) Jugar videojuegos", "B) Ver películas", "C) Leer"],
        correctAnswer: "C"
    },
    {
        question: "Mi personaje favorito de Jarry Potah",
        options: ["A) Luna Lovegood", "B) Remus Lupin", "C) Un trol feo"],
        correctAnswer: "A"
    },
    {
        question: "¿Cuánto durará nuestro amor?",
        options: ["A) Ya ni hay amor", "B) Olgüeis forebá", "C) Hasta hoy"],
        correctAnswer: "B"
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(option[0]);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    
    // Buscar el botón correspondiente a la respuesta correcta e incorrecta
    const correctButton = Array.from(optionsContainer.getElementsByTagName("button")).find(button => button.textContent.startsWith(correctAnswer));
    const selectedButton = Array.from(optionsContainer.getElementsByTagName("button")).find(button => button.textContent.startsWith(selectedAnswer));

    // Resaltar la respuesta correcta en verde
    correctButton.style.backgroundColor = "#00ff00"; // Cambia el color de fondo a verde

    if (selectedAnswer === correctAnswer) {
        feedbackElement.textContent = "¡Respuesta correcta!";
        score++;
    } else {
        feedbackElement.textContent = "Respuesta incorrecta. La respuesta correcta es " + correctAnswer;

        // Resaltar la respuesta incorrecta en rojo
        selectedButton.style.backgroundColor = "#FF0000"; // Cambia el color de fondo a rojo
    }

    // Deshabilitar todos los botones para evitar más clics
    const options = optionsContainer.getElementsByTagName("button");
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            displayQuestion();
            feedbackElement.textContent = ""; // Limpia el mensaje de retroalimentación
        }, 1500); // Espera 1.5 segundos antes de mostrar la siguiente pregunta
    } else {
        setTimeout(() => {
            endGame();
        }, 1500); // Espera 1.5 segundos antes de mostrar el puntaje final
    }
}

function endGame() {
    optionsContainer.innerHTML = "";
    questionElement.textContent = "¡Felicitaciones! Has completado el juego.";
    
    // Calcula el número total de preguntas y respuestas correctas
    const totalQuestions = questions.length;
    const correctAnswers = score;

    // Muestra el número de respuestas correctas de las preguntas totales
    feedbackElement.textContent = `Acertaste ${correctAnswers}/${totalQuestions}`;

    // Agregar un botón para volver a empezar solo al final del juego
    if (currentQuestionIndex === questions.length) {
        const restartButton = document.createElement("button");
        restartButton.textContent = "¡Volver a jugar!";
        restartButton.className = "restart-button";
        restartButton.onclick = restartGame;
        optionsContainer.appendChild(restartButton);
    }
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    feedbackElement.textContent = "";
    scoreElement.textContent = "Puntaje: " + score;

    // Restaurar el estilo de los botones de opción
    const options = optionsContainer.getElementsByTagName("button");
    for (let i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "#ff6666"; // Restaura el color de fondo a rojo
        options[i].disabled = false; // Habilita los botones nuevamente
    }
}
