/*----- constants -----*/
const players = {
  one: "playerOne",
  two: "playerTwo",
};

/*----- state variables -----*/
let turn;
let winner;

/*----- cached elements  -----*/

const gameBoard = document.getElementById("game-board");
const p1Score = document.getElementById("p1-score");
const p2Score = document.getElementById("p2-score");
const modal = document.getElementById("questionModal");
const closeBtn = document.getElementsByClassName("closeBtn")[0];

/*----- event listeners -----*/
//Button to close modal
closeBtn.addEventListener("click", closeModal);
//Close modal by clicking outside of it
window.addEventListener("click", outsideClick);

/*----- functions -----*/

// init();

// function init() {
//     turn = one
//     winner= null
//     render()
// }

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
      box.setAttribute("clueId", currentPick.id);
      gameBoard.appendChild(box);
    }
  }
  console.log("clues: ", boardClues);
}
start().then(() => {
  const clueBoxes = document.querySelectorAll(".board-box");

  clueBoxes.forEach((box) => {
    box.addEventListener("click", openModal);
  });
});

//function to open modal
function openModal(e) {
  modal.style.display = "block";
  const clueId = e.target.getAttribute("clueId");
  console.log(clueId);
}

//closes modal with button
function closeModal() {
  modal.style.display = "none";
}

//closes modal by clicking outside of it
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
