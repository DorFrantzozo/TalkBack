class Game {
  constructor() {
    this.board = Array(9).fill("");
    this.winner = null;
  }

  checkWinner(board, player) {
    // Define all possible winning combinations
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    // Check each winning combination
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true; // Player has won
      }
    }
    return false; // No winner yet
  }
  handleChooseSquare(squareIndex, player) {
    if (!this.winner && this.board[squareIndex] === "") {
      const newBoard = [...this.board];
      newBoard[squareIndex] = player;
      this.board = newBoard;

      if (this.checkWinner(newBoard, player)) {
        console.log(player + " - Won");
        this.winner = player;
        return { winner: this.winner, newBoard: this.board };
      } else if (!newBoard.includes("")) {
        return { winner: "draw", newBoard: this.board };
      }
      return { newBoard: this.board };
    }
  }
  handleResetGame() {
    this.board = Array(9).fill("");
    this.winner = null;
  }
}
export default Game;
