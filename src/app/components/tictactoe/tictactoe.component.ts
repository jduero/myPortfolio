import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class TictactoeComponent implements OnInit {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  symbolVisibility: boolean[][] = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  currentPlayer: string = 'X';
  gameOver!: boolean;
  difficultyLevel: string = 'easy';
  isHidden!: boolean;
  aiSymbol: string = 'O';
  winningSymbol!: string;
  draw!: boolean;
  winningCells: number[][] = [];

  constructor() {}

  ngOnInit(): void {}

  difficulty(event: Event) {
    this.difficultyLevel = (event.target as HTMLInputElement).value;
    this.resetGame();
  }

  changePlayerSymbol(event: Event) {
    this.currentPlayer = (event.target as HTMLInputElement).value;
    this.aiSymbol =
      this.currentPlayer == 'X' ? 'O' : this.currentPlayer == 'O' ? 'X' : 'X';
    this.resetGame();
  }

  isWinningCell(row: number, col: number): boolean {
    return this.winningCells.some((cell) => cell[0] === row && cell[1] === col);
  }

  isRowWinningCell(row: number): boolean {
    return (
      this.board[row][0] !== '' &&
      this.board[row][0] === this.board[row][1] &&
      this.board[row][0] === this.board[row][2]
    );
  }
  
  isColumnWinningCell(column: number): boolean {
    return (
      this.board[0][column] !== '' &&
      this.board[0][column] === this.board[1][column] &&
      this.board[0][column] === this.board[2][column]
    );
  }
  
  isLeftDiagonalWinningCell(): boolean {
    return (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    );
  }
  
  isRightDiagonalWinningCell(): boolean {
    return (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    );
  }

  
  makeMove(row: number, col: number): void {
    if (this.board[row][col] !== '') {
      return;
    }

    // Assign the symbol to the cell
    this.board[row][col] = this.currentPlayer;

    // Update the symbol visibility for the cell
    this.symbolVisibility[row][col] = true;

    if (this.checkForWinner()) {
      // Handle game over
      this.gameOver = true;
      this.winningSymbol = this.currentPlayer;
    } else {
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
        // Set the winning cells for the row
        this.winningCells = [
          [row, 0],
          [row, 1],
          [row, 2],
        ];

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
        // Set the winning cells for the col
        this.winningCells = [
          [0, col],
          [1, col],
          [2, col],
        ];

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
      this.draw = true;
      return true;
    }

    return false;
  }

  aiMove(): void {
    let row: number;
    let col: number;
    if (this.difficultyLevel === 'hard') {
      if (this.getWinningMoveHard() === '') {
        if (this.getWinningMove() === '') {
          do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
          } while (this.board[row][col] !== '');

          this.board[row][col] = this.aiSymbol;
          this.symbolVisibility[row][col] = true;
        }
      }
    } else if (this.difficultyLevel === 'medium') {
      if (this.getWinningMove() === '') {
        do {
          row = Math.floor(Math.random() * 3);
          col = Math.floor(Math.random() * 3);
        } while (this.board[row][col] !== '');

        this.board[row][col] = this.aiSymbol;
        this.symbolVisibility[row][col] = true;
      }
    } else {
      do {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
      } while (this.board[row][col] !== '');

      this.board[row][col] = this.aiSymbol;
      this.symbolVisibility[row][col] = true;
    }
    if (this.checkForWinner()) {
      // Handle game over
      this.gameOver = true;
      this.winningSymbol = this.aiSymbol;
    }
  }

  // for medium difficulties
  getWinningMove(): string {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][2] === ''
      ) {
        return (this.board[i][2] = this.aiSymbol);
      }
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.board[i][2] &&
        this.board[i][1] === ''
      ) {
        return (this.board[i][1] = this.aiSymbol);
      }
      if (
        this.board[i][0] === '' &&
        this.board[i][1] !== '' &&
        this.board[i][1] == this.board[i][2]
      ) {
        return (this.board[i][0] = this.aiSymbol);
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] !== '' &&
        this.board[0][i] === this.board[1][i] &&
        this.board[2][i] === ''
      ) {
        return (this.board[2][i] = this.aiSymbol);
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.board[1][i] &&
        this.board[0][i] === ''
      ) {
        return (this.board[0][i] = this.aiSymbol);
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.board[0][i] &&
        this.board[1][i] === ''
      ) {
        return (this.board[1][i] = this.aiSymbol);
      }
    }

    // Check diagonals
    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[2][2] === ''
    ) {
      return (this.board[2][2] = this.aiSymbol);
    }
    if (
      this.board[2][2] !== '' &&
      this.board[0][0] === '' &&
      this.board[2][2] === this.board[1][1]
    ) {
      return (this.board[0][0] = this.aiSymbol);
    }
    if (
      this.board[2][2] !== '' &&
      this.board[1][1] === '' &&
      this.board[2][2] === this.board[0][0]
    ) {
      return (this.board[1][1] = this.aiSymbol);
    }
    if (
      this.board[2][0] !== '' &&
      this.board[0][2] === '' &&
      this.board[2][0] === this.board[1][1]
    ) {
      return (this.board[0][2] = this.aiSymbol);
    }
    if (
      this.board[0][2] !== '' &&
      this.board[2][0] === '' &&
      this.board[0][2] === this.board[1][1]
    ) {
      return (this.board[2][0] = this.aiSymbol);
    }
    if (
      this.board[0][2] !== '' &&
      this.board[1][1] === '' &&
      this.board[0][2] === this.board[2][0]
    ) {
      return (this.board[1][1] = this.aiSymbol);
    }

    // Return null if there is no winner
    return '';
  }

  getWinningMoveHard(): string {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.aiSymbol &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][2] === ''
      ) {
        return (this.board[i][2] = this.aiSymbol);
      }
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.aiSymbol &&
        this.board[i][0] === this.board[i][2] &&
        this.board[i][1] === ''
      ) {
        return (this.board[i][1] = this.aiSymbol);
      }
      if (
        this.board[i][0] === '' &&
        this.board[i][1] !== '' &&
        this.board[i][1] === this.aiSymbol &&
        this.board[i][1] == this.board[i][2]
      ) {
        return (this.board[i][0] = this.aiSymbol);
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] !== '' &&
        this.board[0][i] === this.aiSymbol &&
        this.board[0][i] === this.board[1][i] &&
        this.board[2][i] === ''
      ) {
        return (this.board[2][i] = this.aiSymbol);
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.aiSymbol &&
        this.board[2][i] === this.board[1][i] &&
        this.board[0][i] === ''
      ) {
        return (this.board[0][i] = this.aiSymbol);
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.aiSymbol &&
        this.board[2][i] === this.board[0][i] &&
        this.board[1][i] === ''
      ) {
        return (this.board[1][i] = this.aiSymbol);
      }
    }

    // Check diagonals
    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.aiSymbol &&
      this.board[0][0] === this.board[1][1] &&
      this.board[2][2] === ''
    ) {
      return (this.board[2][2] = this.aiSymbol);
    }
    if (
      this.board[2][2] !== '' &&
      this.board[2][2] === this.aiSymbol &&
      this.board[0][0] === '' &&
      this.board[2][2] === this.board[1][1]
    ) {
      return (this.board[0][0] = this.aiSymbol);
    }
    if (
      this.board[2][2] !== '' &&
      this.board[2][2] === this.aiSymbol &&
      this.board[1][1] === '' &&
      this.board[2][2] === this.board[0][0]
    ) {
      return (this.board[1][1] = this.aiSymbol);
    }
    if (
      this.board[2][0] !== '' &&
      this.board[2][0] === this.aiSymbol &&
      this.board[0][2] === '' &&
      this.board[2][0] === this.board[1][1]
    ) {
      return (this.board[0][2] = this.aiSymbol);
    }
    if (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.aiSymbol &&
      this.board[2][0] === '' &&
      this.board[0][2] === this.board[1][1]
    ) {
      return (this.board[2][0] = this.aiSymbol);
    }
    if (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.aiSymbol &&
      this.board[1][1] === '' &&
      this.board[0][2] === this.board[2][0]
    ) {
      return (this.board[1][1] = this.aiSymbol);
    }

    // Return null if there is no winner
    return '';
  }

  resetGame(): void {
    this.isHidden = true;

    setTimeout(() => {
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      this.isHidden = false;
    }, 500); // wait for 500ms for the fade out animation to complete

    this.draw = false;
    this.gameOver = false;
  }
}
