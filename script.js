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
    
        /*----- event listeners -----*/
    
    
        /*----- functions -----*/

    function createGameBoard() {
        for (let i = 0; i < 30; i++) {
            let box = document.createElement('div')
            box.className = 'board-box'
            gameBoard.appendChild(box)
        }
    }
    createGameBoard()



   