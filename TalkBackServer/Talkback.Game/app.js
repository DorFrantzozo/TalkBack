import express from "express";
import cors from "cors";
import router from "./Routes/authRoutes.js";
import connectDB from "./config/database.js";
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests only from this origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);



// Constants
const NUM_POINTS = 24;
const NUM_CHECKERS = 15;

// Helper function to initialize the board
function initializeBoard() {
  const board = new Array(NUM_POINTS).fill(0);
  // Setup the initial positions of checkers
  board[0] = 2;  // Two black checkers on point 1
  board[5] = -5; // Five white checkers on point 6
  board[7] = -3; // Three white checkers on point 8
  board[11] = 5; // Five black checkers on point 12
  board[12] = -5; // Five white checkers on point 13
  board[16] = 3; // Three black checkers on point 17
  board[18] = 5; // Five black checkers on point 19
  board[23] = -2; // Two white checkers on point 24
  return board;
}

// Function to check if a move is valid
function isValidMove(board, from, to, player) {
  // Check if the player is moving their own checker
  if ((player === 'black' && board[from] > 0) || (player === 'white' && board[from] < 0)) {
    // Check if the destination point is within bounds
    if (to >= 0 && to < NUM_POINTS) {
      // Check if there are no opponent checkers or only one opponent checker on the destination point
      if (board[to] >= -1) {
        // Check if the move is within the allowed range of the dice
        const distance = Math.abs(to - from);
        return distance <= 6; // Assuming a standard six-sided dice
      }
    }
  }
  return false;
}

// Function to move a checker
function moveChecker(board, from, to) {
  board[from]--;
  board[to]++;
}

// Function to roll a six-sided dice
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

module.exports = {
  initializeBoard,
  isValidMove,
  moveChecker,
  rollDice
};