/*----- constants -----*/ 
const SPRITE = {
    '1' : 'X',
    '-1' : 'O',
    'null': ''
};

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*----- app's state (variables) -----*/ 
let board, turn, winner;

/*----- cached element references -----*/ 
const message = document.querySelector('h2');
const squares = document.querySelectorAll('.square');

/*----- event listeners -----*/ 
document.querySelector('button').addEventListener('click', init);
document.querySelector('.game-board').addEventListener('click', handleMove);

/*----- functions -----*/
init();

function init() {
    board = new Array(9).fill(null);
    turn = 1;
    winner = null;
    render();
}

function handleMove(evt) {
    const moveIdx = parseInt(evt.target.dataset.square);
    if(board[moveIdx] || winner) return;
    board[moveIdx] = turn;
    turn *= -1
    winner = getWinner();
    render();
}

function getWinner() {
    for(let i = 0; i < COMBOS.length; i++){
        if(Math.abs(board[COMBOS[i][0]] + 
                    board[COMBOS[i][1]] + 
                    board[COMBOS[i][2]]) === 3) return board[COMBOS[i][0]];
    } 
    if(board.includes(null)) return null;
    return "T";
}

function render() {
    board.forEach(function(elem, idx) {
        squares[idx].textContent = SPRITE[elem];
    });

    if(!winner) {
        message.textContent = `${SPRITE[turn]}'s Turn`;
    } else if(winner === "T") {
        message.textContent = 'Tie Game!';
    } else {
        message.textContent = `${SPRITE[winner]} Wins!`;
    }
}