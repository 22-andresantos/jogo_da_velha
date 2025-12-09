let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initializeBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  updateTurnIndicator();
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);

  if (gameBoard[index] !== "" || !gameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken", currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    const winnerName = currentPlayer === "X" ? "Jogador X" : "Jogador O";
    showWinnerMessage(`${winnerName} ganhou! 🎉`, currentPlayer);
    gameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    showWinnerMessage("Empate! 🤝", "draw");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnIndicator();
}

function showWinnerMessage(message, winner) {
  const winnerMessageEl = document.getElementById("winner-message");
  const turnIndicator = document.getElementById("turn-indicator");

  winnerMessageEl.textContent = message;
  winnerMessageEl.className = "winner-message show";

  if (winner === "X") {
    winnerMessageEl.classList.add("x-wins");
  } else if (winner === "O") {
    winnerMessageEl.classList.add("o-wins");
  } else {
    winnerMessageEl.classList.add("draw");
  }

  turnIndicator.textContent = "";
}

function updateTurnIndicator() {
  if (!gameActive) return;

  const turnIndicator = document.getElementById("turn-indicator");
  const playerName = currentPlayer === "X" ? "Jogador X" : "Jogador O";
  const playerColor = currentPlayer === "X" ? "#ff6b6b" : "#4ecdc4";

  turnIndicator.textContent = `Vez de: ${playerName}`;
  turnIndicator.style.color = playerColor;
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  const winnerMessageEl = document.getElementById("winner-message");
  winnerMessageEl.textContent = "";
  winnerMessageEl.className = "winner-message";

  initializeBoard();
}

document.getElementById("reset-button").addEventListener("click", resetGame);

initializeBoard();
