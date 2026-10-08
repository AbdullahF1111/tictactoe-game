import { GameController } from "./gameController.js";
import { Gameboard } from "./gameboard.js";
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