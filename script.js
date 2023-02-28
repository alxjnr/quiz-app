const startQuizButton = document.createElement("button");
const answerOne = document.createElement("button");
const answerTwo = document.createElement("button");
const answerThree = document.createElement("button");
const answerFour = document.createElement("button");
const tryAgain = document.createElement("button");
const easyButton = document.createElement("button");
const mediumButton = document.createElement("button");
const hardButton = document.createElement("button");
const homeButton = document.createElement("button");
const mixed = document.createElement("button");

let quizArray = [];
let score = 0;
let currentQuestion = 0;
let isDifficultySelected = false;
let selectedDifficulty;
const questionTimeout = 1800;

tryAgain.addEventListener("click", () => {
  quizArray = [];
  generateQuizQuestions(selectedDifficulty).then(() => {
    score = 0;
    currentQuestion = 0;
    loadQuestion();
  });
});

homeButton.addEventListener("click", () => {
  location.reload();
});

easyButton.addEventListener("click", () => {
  quizArray = [];
  isDifficultySelected = true;
  selectedDifficulty = "easy";
  generateQuizQuestions("easy").then(() => {
    loadQuestion();
  });
});

mediumButton.addEventListener("click", () => {
  quizArray = [];
  isDifficultySelected = true;
  selectedDifficulty = "medium";
  generateQuizQuestions("medium").then(() => {
    loadQuestion();
  });
});

hardButton.addEventListener("click", () => {
  quizArray = [];
  isDifficultySelected = true;
  selectedDifficulty = "hard";
  generateQuizQuestions("hard").then(() => {
    loadQuestion();
  });
});

mixed.addEventListener("click", () => {
  quizArray = [];
  isDifficultySelected = true;
  selectedDifficulty = "mixed";
  generateQuizQuestions("mixed").then(() => {
    loadQuestion();
  });
});

function generateQuizQuestions(difficulty = "easy") {
  if (difficulty === "mixed") {
    return fetch(`https://the-trivia-api.com/api/questions`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((obj) => {
          quizArray.push([
            obj.question,
            obj.incorrectAnswers[0],
            obj.incorrectAnswers[1],
            obj.incorrectAnswers[2],
            obj.correctAnswer,
          ]);
        });
      });
  } else {
    return fetch(
      `https://the-trivia-api.com/api/questions?difficulty=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => {
        data.forEach((obj) => {
          quizArray.push([
            obj.question,
            obj.incorrectAnswers[0],
            obj.incorrectAnswers[1],
            obj.incorrectAnswers[2],
            obj.correctAnswer,
          ]);
        });
      });
  }
}

function quizHome(currentQuestion) {
  const container = document.createElement("section");
  const text = document.createElement("h2");

  document.body.appendChild(container);
  container.appendChild(text);
  container.appendChild(easyButton);
  container.appendChild(mediumButton);
  container.appendChild(hardButton);
  container.appendChild(mixed);

  easyButton.innerText = "easy";
  mediumButton.innerText = "medium";
  hardButton.innerText = "hard";
  mixed.innerText = "mixed";
  text.innerText = "select a difficulty to begin the quiz";

  container.setAttribute("id", "main-content-box");
  text.setAttribute("id", "start-text");
  startQuizButton.setAttribute("id", "start-quiz-button");
}

startQuizButton.addEventListener("click", () => {
  if (isDifficultySelected) {
    loadQuestion();
  } else {
    const difficultyText = document.getElementById("difficulty-text");
    difficultyText.style.color = "red";
  }
});

function loadQuestion() {
  answerOne.disabled = false;
  answerTwo.disabled = false;
  answerThree.disabled = false;
  answerFour.disabled = false;

  if (currentQuestion === 10) {
    scoreScreen();
  } else {
    answerOne.style.backgroundColor = "#fee6e3";
    answerTwo.style.backgroundColor = "#fee6e3";
    answerThree.style.backgroundColor = "#fee6e3";
    answerFour.style.backgroundColor = "#fee6e3";

    const mainContent = document.getElementById("main-content-box");
    mainContent.remove();

    const container = document.createElement("section");
    const questionContainer = document.createElement("section");
    const text = document.createElement("h2");

    answerOne.setAttribute("id", "answer-button-one");
    questionContainer.setAttribute("id", "question-title-container");

    document.body.appendChild(container);
    container.appendChild(questionContainer);
    questionContainer.appendChild(text);

    container.appendChild(answerOne);
    container.appendChild(answerTwo);
    container.appendChild(answerThree);
    container.appendChild(answerFour);

    const shuffledIndex = shuffleArray([1, 2, 3, 4]);

    text.innerText = quizArray[currentQuestion][0];
    answerOne.innerText = quizArray[currentQuestion][shuffledIndex[0]];
    answerTwo.innerText = quizArray[currentQuestion][shuffledIndex[1]];
    answerThree.innerText = quizArray[currentQuestion][shuffledIndex[2]];
    answerFour.innerText = quizArray[currentQuestion][shuffledIndex[3]];

    container.setAttribute("id", "main-content-box");
  }
}

function scoreScreen() {
  const mainContent = document.getElementById("main-content-box");
  mainContent.remove();

  const container = document.createElement("section");
  const text = document.createElement("h2");
  const scoreBox = document.createElement("h1");

  document.body.appendChild(container);
  container.appendChild(text);
  container.appendChild(scoreBox);
  container.appendChild(tryAgain);
  container.appendChild(homeButton);

  text.innerText = "final score: ";
  scoreBox.innerText = `${score}/10`;
  tryAgain.innerText = "try again";
  homeButton.innerText = "home";

  container.setAttribute("id", "main-content-box");
  text.setAttribute("id", "score-screen-text");
  tryAgain.setAttribute("id", "try-again-button");
  homeButton.setAttribute("id", "home-button");
}

answerOne.addEventListener("click", () => {
  if (answerOne.innerText === quizArray[currentQuestion][4]) {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
    });
    score++;
    answerOne.style.backgroundColor = "lightgreen";
  } else {
    answerOne.style.backgroundColor = "red";
  }

  if (answerTwo.innerText === quizArray[currentQuestion][4]) {
    answerTwo.style.backgroundColor = "lightgreen";
  }

  if (answerThree.innerText === quizArray[currentQuestion][4]) {
    answerThree.style.backgroundColor = "lightgreen";
  }

  if (answerFour.innerText === quizArray[currentQuestion][4]) {
    answerFour.style.backgroundColor = "lightgreen";
  }

  answerOne.disabled = true;
  answerTwo.disabled = true;
  answerThree.disabled = true;
  answerFour.disabled = true;

  currentQuestion++;
  setTimeout(loadQuestion, questionTimeout);
});

answerTwo.addEventListener("click", () => {
  if (answerOne.innerText === quizArray[currentQuestion][4]) {
    answerOne.style.backgroundColor = "lightgreen";
  }
  if (answerTwo.innerText === quizArray[currentQuestion][4]) {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
    });
    score++;
    answerTwo.style.backgroundColor = "lightgreen";
  } else {
    answerTwo.style.backgroundColor = "red";
  }

  if (answerThree.innerText === quizArray[currentQuestion][4]) {
    answerThree.style.backgroundColor = "lightgreen";
  }

  if (answerFour.innerText === quizArray[currentQuestion][4]) {
    answerFour.style.backgroundColor = "lightgreen";
  }

  answerOne.disabled = true;
  answerTwo.disabled = true;
  answerThree.disabled = true;
  answerFour.disabled = true;

  currentQuestion++;
  setTimeout(loadQuestion, questionTimeout);
});

answerThree.addEventListener("click", () => {
  if (answerOne.innerText === quizArray[currentQuestion][4]) {
    answerOne.style.backgroundColor = "lightgreen";
  }
  if (answerTwo.innerText === quizArray[currentQuestion][4]) {
    answerTwo.style.backgroundColor = "lightgreen";
  }

  if (answerThree.innerText === quizArray[currentQuestion][4]) {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
    });
    score++;
    answerThree.style.backgroundColor = "lightgreen";
  } else {
    answerThree.style.backgroundColor = "red";
  }

  if (answerFour.innerText === quizArray[currentQuestion][4]) {
    answerFour.style.backgroundColor = "lightgreen";
  }

  answerOne.disabled = true;
  answerTwo.disabled = true;
  answerThree.disabled = true;
  answerFour.disabled = true;

  currentQuestion++;
  setTimeout(loadQuestion, questionTimeout);
});

answerFour.addEventListener("click", () => {
  if (answerOne.innerText === quizArray[currentQuestion][4]) {
    answerOne.style.backgroundColor = "lightgreen";
  }
  if (answerTwo.innerText === quizArray[currentQuestion][4]) {
    answerTwo.style.backgroundColor = "lightgreen";
  }

  if (answerThree.innerText === quizArray[currentQuestion][4]) {
    answerThree.style.backgroundColor = "lightgreen";
  }

  if (answerFour.innerText === quizArray[currentQuestion][4]) {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
    });
    score++;
    answerFour.style.backgroundColor = "lightgreen";
  } else {
    answerFour.style.backgroundColor = "red";
  }

  answerOne.disabled = true;
  answerTwo.disabled = true;
  answerThree.disabled = true;
  answerFour.disabled = true;

  currentQuestion++;
  setTimeout(loadQuestion, questionTimeout);
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

generateQuizQuestions().then(() => {
  quizHome();
});
