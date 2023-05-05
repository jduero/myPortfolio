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
  gameOver!: boolean;
  difficultyLevel : string = 'easy';
  isHidden! : boolean;
  aiSymbol : string = 'O';
  winningSymbol! : string;
  draw! : boolean;
  constructor() { }

  ngOnInit(): void { }

  difficulty(event : Event)
  {
    this.difficultyLevel = (event.target as HTMLInputElement).value;
    this.resetGame();
    
  }

  changePlayerSymbol(event : Event){
    this.currentPlayer = (event.target as HTMLInputElement).value;
    this.aiSymbol = this.currentPlayer == 'X' ? 'O' : this.currentPlayer == 'O' ? 'X' : 'X';
    this.resetGame();
  }

  makeMove(row: number, col: number): void {
    if (this.board[row][col] !== '') {
      return;
    }

    this.board[row][col] = this.currentPlayer;
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
        }
      }
    } else if(this.difficultyLevel === 'medium') {
        if (this.getWinningMove() === '') {
          do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
          } while (this.board[row][col] !== '');
          
          this.board[row][col] = this.aiSymbol;
        }
    }else{
      do {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
      } while (this.board[row][col] !== '');
      
      this.board[row][col] = this.aiSymbol;
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
        return this.board[i][2] = this.aiSymbol;
      }
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.board[i][2] &&
        this.board[i][1] === ''
      ) {
        return this.board[i][1] = this.aiSymbol;
      }
      if (
        this.board[i][0] === '' &&
        this.board[i][1] !== '' &&
        this.board[i][1] == this.board[i][2]
      ) {
        return this.board[i][0] = this.aiSymbol;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] !== '' &&
        this.board[0][i] === this.board[1][i] &&
        this.board[2][i] === ''
      ) {
        return this.board[2][i] = this.aiSymbol;
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.board[1][i] &&
        this.board[0][i] === ''
      ) {
        return this.board[0][i] = this.aiSymbol;
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.board[0][i] &&
        this.board[1][i] === ''
      ) {
        return this.board[1][i] = this.aiSymbol;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[2][2] === ''
    ) {
      return this.board[2][2] = this.aiSymbol;
    }
    if (
      this.board[2][2] !== '' &&
      this.board[0][0] === '' &&
      this.board[2][2] === this.board[1][1]
    ) {
      return this.board[0][0] = this.aiSymbol;
    }
    if (
      this.board[2][2] !== '' &&
      this.board[1][1] === '' &&
      this.board[2][2] === this.board[0][0]
    ) {
      return this.board[1][1] = this.aiSymbol;
    }
    if (
      this.board[2][0] !== '' &&
      this.board[0][2] === '' &&
      this.board[2][0] === this.board[1][1]
    ) {
      return this.board[0][2] = this.aiSymbol;
    }
    if (
      this.board[0][2] !== '' &&
      this.board[2][0] === '' &&
      this.board[0][2] === this.board[1][1]
    ) {
      return this.board[2][0] = this.aiSymbol;
    }
    if (
      this.board[0][2] !== '' &&
      this.board[1][1] === '' &&
      this.board[0][2] === this.board[2][0]
    ) {
      return this.board[1][1] = this.aiSymbol;
    }

    // Return null if there is no winner
    return '';
  }

  getWinningMoveHard() : string{
    
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.aiSymbol &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][2] === ''
      ) {
        return this.board[i][2] = this.aiSymbol;
      }
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.aiSymbol &&
        this.board[i][0] === this.board[i][2] &&
        this.board[i][1] === ''
      ) {
        return this.board[i][1] = this.aiSymbol;
      }
      if (
        this.board[i][0] === '' &&
        this.board[i][1] !== '' &&
        this.board[i][1] === this.aiSymbol &&
        this.board[i][1] == this.board[i][2]
      ) {
        return this.board[i][0] = this.aiSymbol;
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
        return this.board[2][i] = this.aiSymbol;
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.aiSymbol &&
        this.board[2][i] === this.board[1][i] &&
        this.board[0][i] === ''
      ) {
        return this.board[0][i] = this.aiSymbol;
      }
      if (
        this.board[2][i] !== '' &&
        this.board[2][i] === this.aiSymbol &&
        this.board[2][i] === this.board[0][i] &&
        this.board[1][i] === ''
      ) {
        return this.board[1][i] = this.aiSymbol;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.aiSymbol &&
      this.board[0][0] === this.board[1][1] &&
      this.board[2][2] === ''
    ) {
      return this.board[2][2] = this.aiSymbol;
    }
    if (
      this.board[2][2] !== '' &&
      this.board[2][2] === this.aiSymbol &&
      this.board[0][0] === '' &&
      this.board[2][2] === this.board[1][1]
    ) {
      return this.board[0][0] = this.aiSymbol;
    }
    if (
      this.board[2][2] !== '' &&
      this.board[2][2] === this.aiSymbol &&
      this.board[1][1] === '' &&
      this.board[2][2] === this.board[0][0]
    ) {
      return this.board[1][1] = this.aiSymbol;
    }
    if (
      this.board[2][0] !== '' &&
      this.board[2][0] === this.aiSymbol &&
      this.board[0][2] === '' &&
      this.board[2][0] === this.board[1][1]
    ) {
      return this.board[0][2] = this.aiSymbol;
    }
    if (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.aiSymbol &&
      this.board[2][0] === '' &&
      this.board[0][2] === this.board[1][1]
    ) {
      return this.board[2][0] = this.aiSymbol;
    }
    if (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.aiSymbol &&
      this.board[1][1] === '' &&
      this.board[0][2] === this.board[2][0]
    ) {
      return this.board[1][1] = this.aiSymbol;
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
  
    
    //this.currentPlayer = 'X';
    this.gameOver = false;
  }
}
