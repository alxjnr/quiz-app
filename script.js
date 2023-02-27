const startQuizButton = document.createElement("button");
const answerOne = document.createElement("button");
const answerTwo = document.createElement("button");
const answerThree = document.createElement("button");
const answerFour = document.createElement("button");
const tryAgain = document.createElement("button");

let quizArray = [];
let score = 0;
let currentQuestion = 0;

tryAgain.addEventListener("click", () => {
  quizArray = [];
  generateQuizQuestions().then(() => {
    score = 0;
    currentQuestion = 0;
    loadQuestion();
  });
});

function generateQuizQuestions() {
  return fetch("https://the-trivia-api.com/api/questions")
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
      console.log(quizArray);
    });
}

function quizHome(currentQuestion) {
  const container = document.createElement("section");
  const text = document.createElement("h2");

  document.body.appendChild(container);
  container.appendChild(text);
  container.appendChild(startQuizButton);

  text.innerText = "press start to begin the quiz";
  startQuizButton.innerText = "start";

  container.setAttribute("id", "main-content-box");
}

startQuizButton.addEventListener("click", () => {
  loadQuestion();
});

function loadQuestion() {
  if (currentQuestion === 10) {
    scoreScreen();
  } else {
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

    console.log(shuffledIndex);

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

  text.innerText = "final score: ";
  scoreBox.innerText = `${score}/10`;
  tryAgain.innerText = "try again";

  container.setAttribute("id", "main-content-box");
}

answerOne.addEventListener("click", () => {
  if (answerOne.innerText === quizArray[currentQuestion][4]) {
    score++;
  }
  console.log(score);
  currentQuestion++;
  loadQuestion();
});

answerTwo.addEventListener("click", () => {
  if (answerTwo.innerText === quizArray[currentQuestion][4]) {
    score++;
  }
  console.log(score);
  currentQuestion++;
  loadQuestion();
});

answerThree.addEventListener("click", () => {
  if (answerThree.innerText === quizArray[currentQuestion][4]) {
    score++;
  }
  console.log(score);
  currentQuestion++;
  loadQuestion();
});

answerFour.addEventListener("click", () => {
  if (answerFour.innerText === quizArray[currentQuestion][4]) {
    score++;
  }
  console.log(score);
  currentQuestion++;
  loadQuestion();
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
