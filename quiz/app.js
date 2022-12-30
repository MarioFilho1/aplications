const correctAnswers = ["B", "C", "B", "A", "C", "A"];
const form = document.querySelector(".form");
const activeScore = document.querySelector(".d-none");
const activePopup = document.querySelector(".removepopup");
const div = document.querySelector(".container-score");
const sendForm = document.querySelector(".sendform");
const stopSendForm = document.querySelector(".stopsendform");
let score = 0;
let questions = [];
let timer = null;

const getQuestion = () => {
  const divs = document.querySelectorAll(".container-question");
  divs.forEach((div) => {
    questions.push(div.firstElementChild);
  });
};

const verifyAnswer = () => {
  let userAnswers = [];

  correctAnswers.forEach((correctAnswer, index) => {
    {
      const userAnswer = form[`inputAnswer${index + 1}`].value;
      userAnswers.push(userAnswer);
    }
  });

  return userAnswers;
};

const existUnmarkedQuestion = (userAnswers) => {
  const isUnmarkedQuestion = (question) => {
    return question === "";
  };

  if (userAnswers.some(isUnmarkedQuestion)) {
    activePopup.classList.remove("removepopup");
    scrollTo(0, 0);
    return;
  }

  testCorrectAnswerAndInsertIcon(userAnswers);
};

const testCorrectAnswerAndInsertIcon = (answers) => {
  answers.forEach((answer, index) => {
    const isCorrectAnswer = answer === correctAnswers[index];

    if (isCorrectAnswer) {
      score += 16.66;
      questions[index].setAttribute("class", "success none");
      return;
    }
    questions[index].setAttribute("class", "error none");
  });
  animationTimer();
};

const animationTimer = () => {
  let counter = 0;

  timer = setInterval(() => {
    div.querySelector("span").textContent = `${counter}%`;

    if (counter === Math.round(score)) {
      clearInterval(timer);
    }
    counter++;
  }, 5);
  showFinalResult();
};

showFinalResult = () => {
  form.querySelector(".submit").setAttribute("disabled", true);
  scrollTo(0, 0);
  questions.forEach((question) => {
    question.classList.remove("none");
  });

  activeScore.classList.remove("d-none");
};

form.addEventListener("submit", (event) => {
  getQuestion();
  event.preventDefault();
  const answers = verifyAnswer();
  existUnmarkedQuestion(answers);
});

sendForm.addEventListener("click", () => {
  activePopup.classList.add("removepopup");
  const answer = verifyAnswer();
  testCorrectAnswerAndInsertIcon(answer);
});

stopSendForm.addEventListener("click", () => {
  activePopup.classList.add("removepopup");
});
