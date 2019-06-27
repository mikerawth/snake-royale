class Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    this.snakeArray = snakeArray; // array of Snake Objects
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.appleArrayObject = new Items(this.xBoundary, this.yBoundary);
    this.gameOver = false;
    this.hasTimeLimit = false;
    this.gameOverMessage = "";
  }

  // creation of each matrix
  generateMatrix() {
    this.gameMatrix = [];
    for (let row = 0; row < this.yBoundary; row++) {
      this.gameMatrix[row] = [];
      for (let col = 0; col < this.xBoundary; col++) {
        this.gameMatrix[row][col] = "_"; // empty space
        // populate border
        this.populateBorder(row, col)
        // populate snakes
        this.populateSnakes(row, col)
      }
    }
    // populate apples
    this.populateMatrixWithApples();
  }

  populateBorder(row, col) {
    if (row === 0 || row === this.yBoundary - 1 ||
      col === 0 || col === this.xBoundary - 1) {
      this.gameMatrix[row][col] = "o"
    }
  }

  populateSnakes(row, col) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];
      // populate snake's body first
      for (let j = 0; j < currentSnake.body.length; j++) {
        let currentSnakeBodyTile = currentSnake.body[j];
        if (currentSnakeBodyTile[1] === row && currentSnakeBodyTile[0] === col) {
          this.gameMatrix[row][col] = `b${this.snakeArray[i].matrixCode}`
        }
      }
      // populate snake's head next (would overwrite body on matrix)
      let currentSnakeHead = this.snakeArray[i].head;
      if (currentSnakeHead[1] === row && currentSnakeHead[0] === col) {
        this.gameMatrix[row][col] = `h${this.snakeArray[i].matrixCode}`
      }
    }
  }

  populateMatrixWithApples() {
    let appleArray = this.appleArrayObject.collectionOfUs
    let counter = appleArray.length;
    while (counter < 3) {
      this.appleArrayObject.generateRandom();
      counter++;
    }

    for (let i = 0; i < appleArray.length; i++) {
      let currentApple = appleArray[i];
      if (this.isSpaceAvailable(currentApple)) {
        this.gameMatrix[currentApple[1]][currentApple[0]] = `a`;
      } else {
        this.appleArrayObject.removeFromCollection(currentApple)
      }
    }
  }

  // for random Item generation
  isSpaceAvailable(cordinateArray) {
    if (this.gameMatrix[cordinateArray[1]][cordinateArray[0]] === "_") {
      return true;
    } else {
      return false
    }
  }

  snakesCollideIntoSomethingOrWillMove() {
    // go through each snake
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];
      let predictedSnakePosition = this.nextSnakePosition(currentSnake);
      // detect if snake will collide first
      if (this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] === `o`
        || this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]].slice(1, 2) === `s`) {
        currentSnake.crash = true;

      } else {
        // if snake doesn't collide, detect if it will eat an apple
        if (this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] === `a`) {
          currentSnake.grow();
          currentSnake.score += 1;
        }
        currentSnake.crash = false;
        // move the head in the matrix for the next snake
        // if snake won't collide into anything, snake just moves
        currentSnake.move();

      }
    }
  }

  // for detection
  nextSnakePosition(snakeObject) {
    let predictedX = snakeObject.head[0];
    let predictedY = snakeObject.head[1];
    switch (snakeObject.currentDirection) {
      case snakeObject.up:
        predictedY -= 1;
        break;
      case snakeObject.right:
        predictedX += 1;
        break;
      case snakeObject.down:
        predictedY += 1;
        break;
      case snakeObject.left:
        predictedX -= 1;
        break;
    }
    return [predictedX, predictedY];
  }

  // this function is read on javascript.js with an event listener for keydown
  turnSnakes(directionString) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      this.snakeArray[i].turn(directionString);
    }
  }

  growBodyOfEachSnakeBy(number) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      let tempCounter = number;
      do {
        this.snakeArray[i].grow()
        tempCounter--;
      } while (tempCounter > 0)
    }
  }

  startGame() {
    this.generateMatrix();
    this.growBodyOfEachSnakeBy(2);
    this.runTimer();
  }

  runGame() {
    this.snakesCollideIntoSomethingOrWillMove();
    this.generateMatrix();
    this.isGameOver();
  }
  isGameOver() {
    for (let i = 0; i < this.snakeArray.length; i++) {
      if (this.snakeArray[i].crash === true) {
        this.gameOver = true;

      }
    }
    return this.gameOver;
  }

  gameOverMessage() {
    if (this.snakeArray.length === 1) {
      //run single player game over (display score)
      this.gameOverMessage = `Game over.  You scored ${this.snakeArray[0].score} points`
    }
    // multiplayer game over, determine winner
    else {
      //draw
      if (this.snakeArray[0].crash === true && this.snakeArray[1].crash === true) {
        this.gameOverMessage = "Draw! Both of you crashed at the same time"
      }
      else if (this.snakeArray[0].score === this.snakeArray[1].score) {
        this.gameOverMessage = `Draw! Time is up! Both of you scored ${this.snakeArray[0].score}`
      }
      //snake1 wins
      else if (this.snakeArray[0].crash === false && this.snakeArray[1].crash === true
        || this.snakeArray[0].score > this.snakeArray[1]) {
        this.gameOverMessage = `Player 1 Wins! Score: ${this.snakeArray[0].score}`
      }
      //snake2 wins
      else {
        this.gameOverMessage = `Player 2 Wins! Score: ${this.snakeArray[1].score}`
      }
    }
    console.log(this.gameOverMessage);
  }
  startTimer() {
    console.log('timer is starting')
    this.time = 0;
    this.currentTimer = setInterval(() => {
      this.time += 1;
      console.log(this.time)
      if (this.gameOver === true) {
        clearInterval(this.currentTimer);
      }
    }, 1000)
  }

  startCountDown() {
    console.log('countdown is starting')
    this.time = 30;
    this.currentTimer = setInterval(() => {
      this.time -= 1;
      console.log(this.time)
      if (this.time === 0) {
        this.gameOver = true;
      }
      if (this.gameOver) {
        clearInterval(this.currentTimer)
        return this.gameOver
      }
    }, 1000)
  }

  runTimer() {
    if (this.hasTimeLimit === true) {
      this.startCountDown();
    } else {
      this.startTimer();
    }
  }

}