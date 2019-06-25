class Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    this.snakeArray = snakeArray; // array of Snake Objects
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.appleArrayObject = new Apples(this.xBoundary, this.yBoundary);
    this.obstacleArrayObject = new Obstacles(this.xBoundary, this.yBoundary);
    this.gameOver = false;
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
    // apples
    // going through array of apples
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
  populateMatrixWithSnakes() {
    // snakes
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];

      // move the snakes
      currentSnake.move()


      // detect obstacle
      if (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] === `o` ||
        (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]]).slice(0, 1) === `b`) {
        this.gameOver = true;
      } else {
        if (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] === `a`) {
          currentSnake.grow();
          // this.appleArrayObject.generate();
          this.appleArrayObject.removeFromCollection(currentSnake.head)
        }

        // populate the body 
        for (let j = 0; j < currentSnake.body.length; j++) {
          let currentSnakeBody = currentSnake.body[j];
          this.gameMatrix[currentSnakeBody[1]][currentSnakeBody[0]] = `b${currentSnake.matrixCode}`;
        }
        // then populate head
        this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] = `h${currentSnake.matrixCode}`;
        this.gameOver = false;
      }
      return this.gameOver;

    }
  }

  startGame() {
    this.generateMatrix();
    this.appleArrayObject.generate(13, 13);
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();
  }

  runGame() {
    // if (this.gameOver === false) {
    this.generateMatrix();
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();
    // }
  }

}