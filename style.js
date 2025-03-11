let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let Xwins = 0;
let Ywins = 0;
const scoreXDisplay = document.getElementById('scoresx');
const scoreYDisplay = document.getElementById('scoresy');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('next');
const resetGame1 = document.getElementById('reset');
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function init() {
    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            handleCellClick(cell);
        });
    });
    resetButton.addEventListener('click', resetGame);
    updateStatus();
}
resetGame1.addEventListener('click',()=>{
    location.reload()
})

function handleCellClick(cell) {
    let index = cell.getAttribute('data-index');

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    let winPattern = checkWin();

    if (checkWin(winPattern)) {
        gameActive = false;
        cells.forEach(cell => {
            cell.style.opacity = '0.3'
        });
        winPattern.forEach(index => {
            cells[index].style.backgroundColor = '#5c5b5a'
            cells[index].style.opacity = '1'
        });
        if (currentPlayer == 'X') {
            Xwins += 1;
        }
        else {
            Ywins += 1;
        }
        updateStatus(`Player ${currentPlayer} wins!`);
        console.log(`Player ${currentPlayer} wins!`);
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        updateStatus("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}


    function checkWin() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return [a, b, c]; // A winning pattern is found
            }
        }
        return null; // No winning pattern
    }
    

function checkDraw() {
    return board.every(cell => cell !== '');
}

function updateStatus(message) {
    if (gameActive) {
        scoreXDisplay.textContent = `X = ${Xwins}`;
        scoreYDisplay.textContent = `O = ${Ywins}`;
        if(currentPlayer == 'X'){
            scoreXDisplay.style.borderColor = '#535bf2';
            scoreYDisplay.style.borderColor = '';
        }else{
            scoreYDisplay.style.borderColor = '#535bf2';
            scoreXDisplay.style.borderColor = '';
        }
    }
}

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#1a1a1a'
        cell.style.opacity = '1'
    });
    
    updateStatus();
}

// Start the game
init();
