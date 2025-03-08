let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
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

function handleCellClick(cell) {
    let index = cell.getAttribute('data-index');

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    let winPattern = checkWin();

    if (checkWin(winPattern)) {
        gameActive = false;
        winPattern.forEach(index => {
            cells[index].style.backgroundColor = '#5c5b5a'
        });
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
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusDisplay.textContent = message;
    }
}

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#1a1a1a'
    });
    updateStatus();
}

// Start the game
init();
