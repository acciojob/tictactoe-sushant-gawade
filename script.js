const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitBtn = document.getElementById('submit');
const playerInputDiv = document.querySelector('.player-input');
const gameDiv = document.querySelector('.game');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'x'; // lowercase, as test expects 'x' and 'o'
let board = Array(9).fill('');

submitBtn.addEventListener('click', () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === '' || player2 === '') {
    alert('Please enter names for both players!');
    return;
  }

  // Switch to game view
  playerInputDiv.style.display = 'none';
  gameDiv.style.display = 'block';

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;

    if (board[index] !== '') return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      disableBoard();
      return;
    }

    if (board.every(c => c !== '')) {
      messageDiv.textContent = `It's a draw!`;
      return;
    }

    // Switch turn
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = 'o';
    } else {
      currentPlayer = player1;
      currentSymbol = 'x';
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function disableBoard() {
  cells.forEach(cell => cell.style.pointerEvents = 'none');
}
