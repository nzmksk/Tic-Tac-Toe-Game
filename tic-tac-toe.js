const prompt = require("prompt-sync")({ sigint: true });

class TicTacToe {
  constructor() {
    this.board = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
    };

    this.winCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    this.regEx = /[N, Y]/;
    this.currentPlayer;
    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.ended = false;
  }

  // Display the board
  printBoard() {
    console.log(`
    ${this.board[1]} | ${this.board[2]} | ${this.board[3]}
    ---------
    ${this.board[4]} | ${this.board[5]} | ${this.board[6]}
    ---------
    ${this.board[7]} | ${this.board[8]} | ${this.board[9]}`);
  }

  // Initialize a new game
  newGame() {
    console.log("\nStarting a new game...");
    this.printBoard();
  }

  // Take input from user
  playerTurn() {
    console.log(
      `\nPlayer ${this.currentPlayer}'s turn. Select a box from 1-9 to place your marker.`
    );
    return prompt(">>> ");
  }

  // Check if the move made by the current player is valid or not
  validateMove(position) {
    if (parseInt(position) > 0 && parseInt(position) < 10) {
      if (this.board[parseInt(position)] === parseInt(position)) {
        return true;
      }
    }
    return false;
  }

  // Mark the board at the chosen position with the player's marker
  markBoard(position, mark) {
    this.board[position] = mark;
    return this.board;
  }

  // Check if the current player wins with his/her last move
  checkWin(player) {
    let playerCombination = [];
    for (let position in this.board) {
      if (this.board[position] === player) {
        playerCombination.push(parseInt(position));
      }
    }

    if (playerCombination.length < 3) {
      return false;
    } else {
      for (let combination of this.winCombinations) {
        if (combination.every((item) => playerCombination.includes(item))) {
          return true;
        }
      }
      return false;
    }
  }

  // Check whether the board is fully occupied or not
  checkFull() {
    return Object.keys(this.board).every(
      (key) => this.board[key] == "O" || this.board[key] == "X"
    );
  }

  // Display the scoreboard
  scoreboard() {
    console.log(`
=+=+=+=+=+=+=+=+=+=
   Current score:
     O - ${this.scoreP1} pts
     X - ${this.scoreP2} pts
=+=+=+=+=+=+=+=+=+=`);
  }

  // Switch player after turn end or restart
  switchPlayer() {
    this.currentPlayer == "X"
      ? (this.currentPlayer = "O")
      : (this.currentPlayer = "X");
  }

  // Restart game
  restart() {
    while (true) {
      console.log("\nRestart game? [Y]es or [N]o?");
      let input = prompt(">>> ").toUpperCase();

      // If player wants to restart game
      if (input == "Y") {
        for (let position in this.board) {
          this.board[position] = parseInt(position);
        }
        this.newGame();
        break;
      }

      // If player wants to stop playing
      else if (input == "N") {
        if (this.scoreP1 > this.scoreP2) {
          console.log("\nPlayer O is victorious!");
        } else if (this.scoreP2 > this.scoreP1) {
          console.log("\nPlayer X is victorious!");
        } else {
          console.log("\nGame ended in draw!");
        }
        console.log(`
=+=+=+=+=+=+=+=+=+=
    Final score:
     O - ${this.scoreP1} pts
     X - ${this.scoreP2} pts
=+=+=+=+=+=+=+=+=+=
`);
        this.ended = true;
        break;
      }

      // If the user's input doesn't match with the restricted input
      else if (!input.match(this.regEx) || input.length > 1) {
        console.log("Please enter Y for [Yes] or N for [No] only!");
      }
    }
  }
}

game = new TicTacToe();
const players = ["X", "O"];

// First player of the first game is selected randomly
let index = Math.floor(Math.random() * players.length);
game.currentPlayer = players[index];
game.newGame();

// While game has not ended
while (!game.ended) {
  let position = game.playerTurn();

  // If player's move is valid
  if (game.validateMove(position)) {
    game.markBoard(position, game.currentPlayer);
    game.printBoard();

    // If current player satisfies the win condition
    if (game.checkWin(game.currentPlayer)) {
      console.log(`
${game.currentPlayer} player wins!`);

      // Score count
      game.currentPlayer == "O" ? (game.scoreP1 += 1) : (game.scoreP2 += 1);
      game.scoreboard();

      game.restart();
    }

    // If current player doesn't win and the board is full
    else if (game.checkFull()) {
      console.log(`
Draw!`);

      // Score count
      game.scoreP1 += 0.5;
      game.scoreP2 += 0.5;
      game.scoreboard();

      game.restart();
    }

    game.switchPlayer();
  }

  // If player's move is not valid
  else {
    console.log("Invalid input! You may select an empty box only. Try again.");
    game.printBoard();
  }
}
