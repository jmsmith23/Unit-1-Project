/*----- constants -----*/
const players = {
  one: "playerOne",
  two: "playerTwo",
};

/*----- state variables -----*/
let turn;
let winner;
let answer;
let p1Score;
let p2Score;
let reward;

/*----- cached elements  -----*/

const gameBoard = document.getElementById("game-board");
const p1ScoreEl = document.getElementById("p1-score");
const p2ScoreEl = document.getElementById("p2-score");
const modal = document.getElementById("questionModal");
const closeBtn = document.getElementsByClassName("closeBtn")[0];
const startButton = document.querySelector(".startButton");
const startGameModal = document.querySelector(".startGameModal");
const answerButton = document.querySelector(".answerButton");
const userAnswer = document.querySelector(".userAnswer");
const p1ScoreBox = document.querySelector("p1");
const p2ScoreBox = document.querySelector("p2");

/*----- event listeners -----*/
//Button to close modal
closeBtn.addEventListener("click", closeQuestionModal);
//Close modal by clicking outside of it
window.addEventListener("click", outsideClick);
//Starts game by closing intro modal
startButton.addEventListener("click", () => {
  closeStartGameModal();
});
//Submits player answer
answerButton.addEventListener("click", () => {
  compareAnswer();
});
/*----- functions -----*/

init();

function init() {
  turn = players.one;
  winner = null;
  p1Score = 0;
  p2Score = 0;
  // render()
}

// const clueBoxes = document.querySelectorAll(".board-box");
const categories = [];
const boardCategories = [];
const boardClues = [];

// function that gets categories from api, filters them based on clue quantity, and randomly selects 5 from array for game board
async function getCategories() {
  const response = await fetch("https://jservice.io/api/categories?count=100");
  const data = await response.json();
  categories.push(...data.filter((clues) => clues.clues_count > 10));
  for (let i = 0; i < 5; i++) {
    const currentPick =
      categories[Math.floor(Math.random() * categories.length)];
    boardCategories.push(currentPick);
  }
}

// console.log(boardCategories);

//function that get clues from API that match the retrieved category by ID
async function getClues(categoryId) {
  const response = await fetch(
    `https://jservice.io/api/clues?category=${categoryId}`
  );
  const data = await response.json();
  return data;
}

//Takes returned categories and clues from API, formats quantity for game board and creates board elements with them
async function start() {
  await getCategories();
  console.log("boardCategories: ", boardCategories);
  for (let i = 0; i < 5; i++) {
    let box = document.createElement("div");
    box.className = "category";
    box.innerHTML = boardCategories[i].title.toUpperCase();
    gameBoard.appendChild(box);

    const clues = await getClues(boardCategories[i].id);
    for (let i = 0; i < 4; i++) {
      const currentPick = clues[Math.floor(Math.random() * clues.length)];
      boardClues.push(currentPick);
      let box = document.createElement("div");
      box.classList.add("board-box");
      box.setAttribute("data", `$${i + 1}00`);
      const value = box.getAttribute("data");
      box.innerText = value;
      box.setAttribute("clueQuestion", currentPick.question);

      box.addEventListener("click", () => {
        modal.classList.add("open");
        const clueQuestion = currentPick.question;
        const trivia = document.getElementById("questionContent");
        answer = currentPick.answer.toLowerCase();
        trivia.innerHTML = clueQuestion;
        reward = (i + 1) * 100;
      });

      gameBoard.appendChild(box);
    }
  }
  console.log("clues: ", boardClues);
}

start();

//closes modal with button
function closeQuestionModal() {
  modal.classList.remove("open");
}

//closes modal by clicking outside of it
function outsideClick(e) {
  if (e.target == modal) {
    closeQuestionModal();
  }
}

function openStartGameModal() {
  startGameModal.classList.add("open");
}

function closeStartGameModal() {
  startGameModal.classList.remove("open");
}

function compareAnswer() {
  const value = userAnswer.value.toLowerCase();
  if (value === answer) {
    if (turn === players.one) {
      p1Score += reward;
      p1ScoreEl.textContent = p1Score;
    } else {
      p2Score += reward;
      p2ScoreEl.textContent = p2Score;
    }
  } else {
    if (turn === players.one) {
      p1Score -= reward;
      p1ScoreEl.textContent = p1Score;
      turn = players.two;
    } else {
      p2Score -= reward;
      p2ScoreEl.textContent = p2Score;
      turn = players.one;
    }
  }
  userAnswer.value = "";
}
