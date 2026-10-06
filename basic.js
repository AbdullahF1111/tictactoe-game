// ===============================
// Gameboard Module (IIFE + Closure + Private Scope)
// ===============================
// IIFE: Immediately Invoked Function Expression
// Closure: board array is private inside the IIFE
// Scope: board is NOT global; only accessible through returned methods
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""]; // private array (closure)

  const getBoard = () => board; // function accessing private scope

  const updateCell = (index, marker) => {
    board[index] = marker;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) board[i] = "";
  };

  return { getBoard, updateCell, resetBoard }; // public API
})();


// ===============================
// Player Factory (Factory Function)
// ===============================
// Factory: returns a new player object
// Function: normal function, not a constructor
// No IIFE: because we need multiple players
function Player(name, marker) {
  return { name, marker };
}


// ===============================
// Game Controller Module (IIFE + Closure + Private Scope)
// ===============================
// IIFE: only one game controller instance
// Closure: currentPlayer, players, and winner are private
// Factory usage: creates players using Player()
const GameController = (() => {
  const player1 = Player("Player 1", "X"); // factory instance
  const player2 = Player("Player 2", "O"); // factory instance

  let currentPlayer = player1; // private variable (closure)
  let winner = null;           // private variable to store the winner
  let winningCombo = null;     // private variable to store the winning combination

  // Winning combinations (Rows, Columns, Diagonals)
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
  ];

  // Function: check if there is a winner
  const checkWin = () => {
    const board = Gameboard.getBoard();
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winningCombo = combo;
        return currentPlayer; // winner found
      }
    }
    return null;
  };
  let tie = false;
  // Function: check if the board is full (Tie)
  const checkTie = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  // Function: controls game flow per round
  const playRound = (index) => {
    if (winner || Gameboard.getBoard()[index] !== "") {
      console.log("Cell is already taken or the game is over!");
      return;
    }

    Gameboard.updateCell(index, currentPlayer.marker);

    // Check for win condition after each move
    winner = checkWin();
    if (winner) {
      console.log(`🎉 Congratulations! Winner is: ${winner.name} (${winner.marker})`);
      return;
    }

    // Check for tie condition
    if (checkTie()) {
      tie = true;
      return;
    }

    switchPlayer();
  };

  // Function: private helper to switch turns
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer; // public getter
  const getWinner = () => winner;               // public getter

  const restartGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    winner = null;
    tie = false;
    winningCombo = null;
  };
  const isTie = () => tie;
const getWinningCombo = () => winningCombo;

return { playRound, getCurrentPlayer, getWinner, isTie, getWinningCombo, restartGame };})();


// ===============================


// Terminal Simulation Loop
// ===============================
// Simulating a full game sequence automatically in the terminal

// console.log("=== Tic Tac Toe Game Simulation Started ===");

// // Predefined moves sequence (Player 1 takes the top row to win)
// const moves = [0, 4, 1, 3, 2]; 

// for (let i = 0; i < moves.length; i++) {
//   if (GameController.getWinner()) break;

//   console.log(`\nTurn: ${GameController.getCurrentPlayer().name} places marker at index ${moves[i]}`);
//   GameController.playRound(moves[i]);


// }
// console.log("\nFinal Board State:", Gameboard.getBoard());


const DisplayController = (() => {
  const boardEl = document.querySelector("#board");
  const statusEl = document.querySelector("#status");
  const restartBtn = document.querySelector("#restart");

  const render = () => {
    boardEl.innerHTML = "";
    const gameOver = GameController.getWinner() !== null || GameController.isTie();
    const winningCombo = GameController.getWinningCombo() || [];

    Gameboard.getBoard().forEach((marker, index) => {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.textContent = marker;
      cell.dataset.index = index;
      cell.disabled = marker !== "" || gameOver;

      if (winningCombo.includes(index)) {
        cell.classList.add("winner");
      }

      boardEl.appendChild(cell);
    });

    updateStatus();
  };

  const updateStatus = () => {
    const winner = GameController.getWinner();
    if (winner) {
      statusEl.textContent = `🎉 Winner: ${winner.name} (${winner.marker})`;
    } else if (GameController.isTie()) {
      statusEl.textContent = "🤝 It's a Tie!";
    } else {
      const p = GameController.getCurrentPlayer();
      statusEl.textContent = `${p.name}'s turn (${p.marker})`;
    }
  };

  boardEl.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return;
    GameController.playRound(Number(index));
    render();
  });

  restartBtn.addEventListener("click", () => {
    GameController.restartGame();
    render();
  });

  render();
})();