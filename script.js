
/*----- constants -----*/
const players =  {
    one: 'playerOne',
    two: 'playerTwo'
}

/*----- state variables -----*/
let turn;
let winner;



/*----- cached elements  -----*/

const gameBoard = document.getElementById('game-board')
const p1Score = document.getElementById('p1-score')
const p2Score = document.getElementById('p2-score')
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

// Selects the game board boxes and add a click Event Listener to them
const clueBoxes = document.querySelectorAll('.board-box')

async function getCategories(){
    const response = await fetch('https://jservice.io/api/categories?count=100')
    const data = await response.json()
    console.log(data)
}

getCategories()


clueBoxes.forEach((box) => {
    box.addEventListener('click', async (e) => {
        alert('hello')
    })
})




