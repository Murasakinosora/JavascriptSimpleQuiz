const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "In which year did the United States declare its independence?",
    answers: [
      { text: "1676", correct: false },
      { text: "1776", correct: true },
      { text: "1876", correct: false },
      { text: "1976", correct: false },
    ],
  },
  {
    question: "I What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Fe", correct: false },
      { text: "Cu", correct: false },
    ],
  },
];

const questElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const nextElement = document.getElementById("next");

let current = 0;
let score = 0;

function start() {
  current = 0;
  score = 0;
  nextElement.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[current];
  let no = current + 1;
  questElement.innerHTML = no + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerElement.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
      console.log(answer.correct);
    }
    button.addEventListener("click", selectAnswer);
  });

  /*for (let x in currentQuestion.answers) {
    const button = document.createElement("button");
    button.innerHTML = currentQuestion.answers[x].text;
    button.classList.add("btn");
    answerElement.appendChild(button);
    if (currentQuestion.answers.correct) {
      
    }
    button.addEventListener("click", selectAnswer());
  }*/
}

function selectAnswer(e) {
  const selected = e.target;
  const isCorrect = selected.dataset.correct === "true";

  if (isCorrect) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("incorrect");
  }

  Array.from(answerElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextElement.style.display = "block";
}

nextElement.addEventListener("click", () => {
  if (current < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function resetState() {
  nextElement.style.display = "none";
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function handleNextButton() {
  current++;
  if (current < questions.length) {
    resetState();
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  let x = document.getElementById("score");
  x.innerHTML = `You scored ${score} out of ${questions.length - 1} `;
}
start();
