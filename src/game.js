class Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    this.snakeArray = snakeArray; // array of Snake Objects
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.appleArrayObject = new Items(this.xBoundary, this.yBoundary);
    this.gameOver = false;
    this.hasTimeLimit = false;
  }
  generateMatrix() {
    let matrix = [];
    for (let row = 0; row < this.yBoundary; row++) {
      matrix[row] = [];
      for (let col = 0; col < this.xBoundary; col++) {
        if (row === 0 || row === this.yBoundary - 1 ||
          col === 0 || col === this.xBoundary - 1) {
          matrix[row][col] = "o"
        } else {
          matrix[row][col] = "_"; // empty space
        }
      }
    }
    this.gameMatrix = matrix;
  }

  isSpaceAvailable(cordinateArray) {
    if (this.gameMatrix[cordinateArray[1]][cordinateArray[0]] === "_") {
      return true;
    } else {
      return false
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
      if (this.isSpaceAvailable(appleArray[i])) {
        this.gameMatrix[appleArray[i][1]][appleArray[i][0]] = `a`;
      } else {
        this.appleArrayObject.removeFromCollection(appleArray[i])
      }
    }
  }

  turnSnakes(directionString) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      this.snakeArray[i].turn(directionString);
    }
  }
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
  populateSnakeBody(snakeObject) {
    for (let j = 0; j < snakeObject.body.length; j++) {
      // let currentSnakeBody = snakeObject.body[j];
      let predictedX = snakeObject.body[j][0];
      let predictedY = snakeObject.body[j][1];
      // if (j = 0) {
      //   this.gameMatrix[predictedY][predictedX] = "_"
      // } else {
      this.gameMatrix[predictedY][predictedX] = `b${snakeObject.matrixCode}`;
      // }
    }
  }
  populateMatrixWithSnakes() {
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];
      let predictedSnakePosition = this.nextSnakePosition(currentSnake);
      this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] = `h${currentSnake.matrixCode}`;
      this.populateSnakeBody(currentSnake);
      // detect obstacle
      if (this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] === `o`
        || this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]].slice(1, 2) === `s`) {
        currentSnake.crash = true;
      }
      else {
        currentSnake.crash = false;
        currentSnake.move()
        if (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] === `a`) {
          currentSnake.grow();
          currentSnake.score += 1;
          this.appleArrayObject.removeFromCollection(currentSnake.head)
        }
      }
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
    this.growBodyOfEachSnakeBy(5);
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();
    this.runTimer();
  }

  runGame() {
    this.generateMatrix();
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();
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