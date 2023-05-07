
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

// init();

// function init() {
//     turn = one
//     winner= null
//     render()
// }

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
const categories = []
const boardCategories = []
async function getCategories(){
    const response = await fetch('https://jservice.io/api/categories?count=100')
    const data = await response.json()
    categories.push(...data.filter(clues => clues.clues_count > 10))
for (let i = 0; i < 5; i++) {
    const currentPick = categories[Math.floor(Math.random() * categories.length)]
    boardCategories.push(currentPick)
    }
}
getCategories() 
// console.log(boardCategories)


clueBoxes.forEach((box) => {
    box.addEventListener('click', async (e) => {
        alert('hello')
    })
})

//take the categories and randomly cycle through to give me 5 categories to display on game board
 // display in the top row of game board

 