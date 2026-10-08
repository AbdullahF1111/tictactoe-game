import { Gameboard } from "./gameboard.js";
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

export { GameController };