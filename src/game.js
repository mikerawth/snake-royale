class Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    this.snakeArray = snakeArray; // array of Snake Objects
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.appleArrayObject = new Items(this.xBoundary, this.yBoundary);
    this.gameOver = false;
    this.hasTimeLimit = false;
  }

  // creation of each matrix
  generateMatrix() {
    let matrix = [];
    for (let row = 0; row < this.yBoundary; row++) {
      matrix[row] = [];
      for (let col = 0; col < this.xBoundary; col++) {
        matrix[row][col] = "_"; // empty space

        // populate border
        if (row === 0 || row === this.yBoundary - 1 ||
          col === 0 || col === this.xBoundary - 1) {
          matrix[row][col] = "o"
        }


        // populate snakes
        for (let i = 0; i < this.snakeArray.length; i++) {
          let currentSnake = this.snakeArray[i];
          // populate snake's body first
          for (let j = 0; j < currentSnake.body.length; j++) {
            let currentSnakeBodyTile = currentSnake.body[j];
            if (currentSnakeBodyTile[1] === row && currentSnakeBodyTile[0] === col) {
              matrix[row][col] = `b${this.snakeArray[i].matrixCode}`
            }
          }
          // populate snake's head next (would overwrite body on matrix)
          let currentSnakeHead = this.snakeArray[i].head;
          if (currentSnakeHead[1] === row && currentSnakeHead[0] === col) {
            matrix[row][col] = `h${this.snakeArray[i].matrixCode}`
          }
        }
      }
    }
    // populate apples
    this.gameMatrix = matrix;
    this.populateMatrixWithApples();
  }

  populateBorder(y, x) {
    if (y === 0 || y === this.yBoundary - 1 ||
      x === 0 || x === this.xBoundary - 1) {
      matrix[y][x] = "o"
    }
  }


  // current way
  populateSnakes(y, x) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];
      // populate snake's body first
      for (let j = 0; j < currentSnake.body.length; j++) {
        let currentSnakeBodyTile = currentSnake.body[j];
        if (currentSnakeBodyTile[1] === y && currentSnakeBodyTile[0] === x) {
          matrix[y][x] = `b${this.snakeArray[i].matrixCode}`
        }
      }
      // populate snake's head next (would overwrite body on matrix)
      let currentSnakeHead = this.snakeArray[i].head;
      if (currentSnakeHead[1] === y && currentSnakeHead[0] === x) {
        matrix[y][x] = `h${this.snakeArray[i].matrixCode}`
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

  snakesCollidesIntoSomethingOrWillMove() {
    // go through each snake
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];
      let predictedSnakePosition = this.nextSnakePosition(currentSnake);
      // detect if snake will collide first
      if (this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] === `o`
        || this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]].slice(1, 2) === `s`) {
        currentSnake.crash = true;

        // if snake doesn't collide, detect if it will eat an apple
      } else if (this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] === `a`) {
        this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] = `h${currentSnake.matrixCode}`
        currentSnake.crash = false;
        currentSnake.grow();
        currentSnake.move();

        // if snake won't collide into anything, snake just moves
      } else {
        this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] = `h${currentSnake.matrixCode}`
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
    this.snakesCollidesIntoSomethingOrWillMove();
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
    this.time = 5;
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