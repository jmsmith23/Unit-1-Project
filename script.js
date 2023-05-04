
/*----- constants -----*/
const players =  {
    one: 'playerOne',
    two: 'playerTwo'
}

/*----- state variables -----*/
let turn;
let board;
let winner;

/*----- cached elements  -----*/

const gameBoard = document.getElementById('game-board')
const p1Score = document.getElementById('p1-score')
const p2Score = document.getElementById('p2-score')
// const clueBox = document.getElementsByClassName('board-box')
const modal = document.getElementById('questionModal')
/*----- event listeners -----*/



/*----- functions -----*/

// Creates game board dynamically
function createGameBoard() {
    for (let i = 1; i <= 30; i++) {
        let box = document.createElement('div')
        if (i <= 5) {
            box.className = 'category'
        } else {
            box.className = 'board-box'
        }
        gameBoard.appendChild(box)
    }
}

createGameBoard()

const clueBoxes = document.querySelectorAll('.board-box')

clueBoxes.forEach((box) => {
    box.addEventListener('click', () => {
        alert('Hello')
    })
})



