import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css'],
})
export class TictactoeComponent implements OnInit {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  currentPlayer: string = 'X';
  gameOver! : boolean;
  constructor() {}

  ngOnInit(): void {}

  makeMove(row: number, col: number): void {
    if (this.board[row][col] !== '') {
      return;
    }

    this.board[row][col] = this.currentPlayer;
    if (this.checkForWinner()) {
      // Handle game over
      this.gameOver = true;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.aiMove();
    }
  }

  checkForWinner(): boolean {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        this.board[row][0] !== '' &&
        this.board[row][0] === this.board[row][1] &&
        this.board[row][0] === this.board[row][2]
      ) {
        return true;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] !== '' &&
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col]
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    ) {
      return true;
    }
    if (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    ) {
      return true;
    }

    // Check for tie
    if (!this.board.flat().includes('')) {
      // Game is over and it's a tie
      return true;
    }

    return false;
  }

  aiMove(): void {
    let row: number;
    let col: number;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (this.board[row][col] !== '');
    this.board[row][col] = this.currentPlayer;
    this.currentPlayer = 'X';
  }

  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.gameOver = false;
  }
}
