/*----- constants -----*/
const players = {
  one: 'playerOne',
  two: 'playerTwo',
};

/*----- state variables -----*/
let turn;
let winner;
let answer;
let p1Score;
let p2Score;
let reward;
let currentBox;

// const clueBoxes = document.querySelectorAll(".board-box");
let categories = [];
let boardCategories = [];
let boardClues = [];

/*----- cached elements  -----*/

const gameBoard = document.getElementById('game-board');
const p1ScoreEl = document.getElementById('p1-score');
const p2ScoreEl = document.getElementById('p2-score');
const modal = document.getElementById('questionModal');
const closeBtn = document.getElementsByClassName('closeBtn')[0];
const startButton = document.querySelector('.startButton');
const startGameModal = document.querySelector('.startGameModal');
const answerButton = document.querySelector('.answerButton');
const userAnswer = document.querySelector('.userAnswer');
const p1ScoreBox = document.querySelector('#p1');
const p2ScoreBox = document.querySelector('#p2');
const answerEl = document.querySelector('#answerEl');
const responseMessageEl = document.querySelector('#responseMessage');
const winnerMessageEl = document.querySelector('.winnerMessage');
const playAgain = document.querySelector('.playAgainBtn');
const endGameModalEl = document.querySelector('.endGameModal');
/*----- event listeners -----*/

//Starts game by closing intro modal
startButton.addEventListener('click', () => {
  closeStartGameModal();
});

//Submits player answer
answerButton.addEventListener('click', () => {
  currentBox.classList.add('invisible');
  compareAnswer();
  setTimeout(() => {
    closeQuestionModal();

    const box = document.querySelector('.board-box:not(.invisible)');
    // GAME OVER
    if (!box) {
      determineWinner();
      endGameModalEl.classList.remove('hidden');
    }
  }, 3000);
});

//Restarts game when Play Again is clicked
playAgain.addEventListener('click', () => {
  init();
});
/*----- functions -----*/

//Start Game
init();

function init() {
  answer = null;
  reward = 0;
  currentBox = null;
  turn = players.one;
  winner = null;
  p1Score = 0;
  p2Score = 0;
  p1ScoreEl.textContent = p1Score;
  p2ScoreEl.textContent = p2Score;
  p2ScoreBox.classList.remove('active');
  p1ScoreBox.classList.add('active');
  winnerMessageEl.innerHTML = '';
  endGameModalEl.classList.add('hidden');
  categories = [];
  boardCategories = [];
  boardClues = [];
  start();
}

// function that gets categories from api, filters them based on clue quantity, and randomly selects 5 from array for game board
async function getCategories() {
  const response = await fetch('https://jservice.io/api/categories?count=100');
  const data = await response.json();
  categories.push(...data.filter((clues) => clues.clues_count > 10));
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * categories.length);
    const currentPick = categories[index];
    categories.splice(index, 1);
    boardCategories.push(currentPick);
  }
}

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
  gameBoard.innerHTML = '';

  await getCategories();
  console.log('boardCategories: ', boardCategories);
  for (let i = 0; i < 5; i++) {
    let box = document.createElement('div');
    box.className = 'category';
    box.innerHTML = boardCategories[i].title.toUpperCase();
    gameBoard.appendChild(box);

    const clues = await getClues(boardCategories[i].id); //handles clues
    for (let i = 0; i < 4; i++) {
      const currentPick = clues[Math.floor(Math.random() * clues.length)]; //randomly selects clues
      boardClues.push(currentPick);
      let box = document.createElement('div');
      box.classList.add('board-box');
      box.setAttribute('data', `$${i + 1}00`); //populates values on board
      const value = box.getAttribute('data');
      box.innerText = value;
      box.setAttribute('clueQuestion', currentPick.question);

      box.addEventListener('click', () => {
        // opens question modal
        currentBox = box;
        modal.classList.add('open');
        const clueQuestion = currentPick.question;
        const trivia = document.getElementById('questionContent');
        answer = currentPick.answer.toLowerCase();
        trivia.innerHTML = clueQuestion;
        reward = (i + 1) * 100;

        responseMessageEl.innerHTML = ``;
        answerEl.classList.remove('hidden');
      });

      gameBoard.appendChild(box);
    }
  }
  console.log('clues: ', boardClues);
}

//closes modal
function closeQuestionModal() {
  modal.classList.remove('open');
}

function openStartGameModal() {
  startGameModal.classList.add('open');
}

function closeStartGameModal() {
  startGameModal.classList.remove('open');
}

function restartsGame() {
  endGameModal.classList.remove('open');
}

function compareAnswer() {
  const value = userAnswer.value.toLowerCase();

  // RIGHT
  if (value === answer) {
    if (turn === players.one) {
      p1Score += reward;
      p1ScoreEl.textContent = p1Score;
    } else {
      p2Score += reward;
      p2ScoreEl.textContent = p2Score;
    }
    responseMessageEl.innerHTML = `${value} is correct!`;
    answerEl.classList.add('hidden');

    // WRONG
  } else {
    if (turn === players.one) {
      p1Score -= reward;
      p1ScoreEl.textContent = p1Score;
      turn = players.two;
      p2ScoreBox.classList.add('active');
      p1ScoreBox.classList.remove('active');
    } else {
      p2Score -= reward;
      p2ScoreEl.textContent = p2Score;
      turn = players.one;
      p1ScoreBox.classList.add('active');
      p2ScoreBox.classList.remove('active');
    }

    responseMessageEl.innerHTML = `"${value}" is incorrect!`;
    answerEl.classList.add('hidden');
  }
  userAnswer.value = '';
}

function determineWinner() {
  if (p1Score === p2Score) {
    winnerMessageEl.innerHTML = `Tie Game, play again!`;
  } else if (p1Score > p2Score) {
    winnerMessageEl.innerHTML = `Player 1 wins JEOPARDY!`;
  } else {
    winnerMessageEl.innerHTML = `Player 2 wins JEOPARDY!`;
  }
}
