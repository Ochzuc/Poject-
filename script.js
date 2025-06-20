let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const boardContainer = document.getElementById("board");
const statusText = document.getElementById("status");

function createBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.innerText = cell;
    div.addEventListener("click", handleMove);
    boardContainer.appendChild(div);
  });
}

function handleMove(event) {
  const index = event.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;
  board[index] = currentPlayer;
  event.target.innerText = currentPlayer;
  if (checkWin()) {
    statusText.innerText = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
  } else if (!board.includes("")) {
    statusText.innerText = "Empate!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Vez do jogador ${currentPlayer}`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = `Vez do jogador ${currentPlayer}`;
  createBoard();
}

createBoard();
statusText.innerText = `Vez do jogador ${currentPlayer}`;
