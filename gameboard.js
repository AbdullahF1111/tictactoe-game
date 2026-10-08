// ===============================
// Gameboard Module (IIFE + Closure + Private Scope)
// ===============================
// IIFE: Immediately Invoked Function Expression
// Closure: board array is private inside the IIFE
// Scope: board is NOT global; only accessible through returned methods
export const Gameboard = (() => {
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

