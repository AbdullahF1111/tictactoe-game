# Tic Tac Toe

A two-player Tic Tac Toe game that runs in the browser, built with vanilla HTML, CSS, and JavaScript. The project focuses on clean code structure: the game logic is fully separated from the user interface.

## Features

- Two-player game (X vs O) on a 3x3 grid
- Live status message showing whose turn it is
- Winner and tie announcements
- Winning cells highlighted in green
- Taken cells and finished games are locked from further clicks
- Restart button to start a new game at any time

## Tech Stack

- HTML5
- CSS3 (Grid layout)
- JavaScript (ES6+), no libraries or frameworks

## Project Structure

```
tic-tac-toe/
├── index.html    # Page skeleton: title, status, board container, restart button
├── style.css     # Styling and board grid layout
├── script.js     # Game logic and display logic
└── README.md
└── .gitignore
```

## How to Run

1. Download or clone the project.
2. Make sure `index.html`, `style.css`, and `script.js` are in the same folder.
3. Open `index.html` in any modern browser.

No installation or build step is needed.

## How to Play

1. Player 1 plays as **X** and goes first.
2. Click any empty cell to place your marker.
3. Players take turns until someone gets three in a row (horizontal, vertical, or diagonal), or the board fills up for a tie.
4. Click **Restart** to play again.

Deploy with GitHub Pages

GitHub Pages hosts the game for free so anyone can play it from a link.

## Live demo: https://abdullahf1111.github.io/tictactoe-game/

## Code Architecture

The code is split into three parts, each with a single responsibility:

| Module | Pattern | Responsibility |
|---|---|---|
| `Gameboard` | IIFE module | Stores the board array privately and exposes `getBoard`, `updateCell`, `resetBoard` |
| `Player` | Factory function | Creates player objects with a name and marker |
| `GameController` | IIFE module | Game rules: turns, win detection, tie detection, restart |
| `DisplayController` | IIFE module | Everything related to the DOM: rendering the board, status messages, click events |

### Key concepts used

- **Closures and private scope:** board and game state are hidden inside IIFEs and only reachable through the returned public methods.
- **Separation of concerns:** the game logic never touches the DOM, and the UI never calculates wins.
- **Render from state:** the board is redrawn from `Gameboard.getBoard()` after every change, so the UI always matches the game state.
- **Event delegation:** a single click listener on the board handles all cells.

## Possible Improvements

- Let players enter their own names
- Add a score counter across rounds
- Add a single-player mode against the computer (simple AI, then Minimax)
- Add winning-cell animation
- Add sound effects

## License

This project is open for learning and personal use.
