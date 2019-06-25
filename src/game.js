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
  // not currently using
  snakeByMatrixCode(matrixCodeString) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      if (this.snakeArray[i].matrixCode === matrixCodeString) {
        return this.snakeArray[i];
      }
    }
  }
  isSpaceAvailable(cordinateArray) {
    if (this.gameMatrix[cordinateArray[1]][cordinateArray[0]] === "_") {
      return true;
    } else {
      return false
    }
  }
  populateMatrixWithObjects() {
    // apples
    // going through array of apples
    for (let i = 0; i < this.appleArrayObject.collectionOfUs.length; i++) {
      if (this.isSpaceAvailable(this.appleArrayObject.collectionOfUs[i])) {
        this.gameMatrix[this.appleArrayObject.collectionOfUs[i][1]][this.appleArrayObject.collectionOfUs[i][0]] = `a`;
      }
      // else if(this.gameMatrix[this.appleArrayObject.collectionOfUs[i][0]][this.appleArrayObject.collectionOfUs[i][1]].slice(0,1) === "h") {
      //   this.snakeByMatrixCode(this.gameMatrix[this.appleArrayObject.collectionOfUs[i][0]][this.appleArrayObject.collectionOfUs[i][1]].slice(1)).grow();
      // }
    }
  }

  turnSnakes(directionString) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      this.snakeArray[i].turn(directionString);
    }
  }
  populateMatrixWithSnakes() {
    // BUG: first apple snake eats will grow two bodies...minor
    // TEMP FIX: Snake startS with some body arrays
    // snakes
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];

      // move the snakes
      currentSnake.move()

      if (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] === `o`) {
        this.gameOver = true;
        return this.gameOver;
      } else {
        // detect obstacle
        if (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] === `a`) {
          currentSnake.grow();
          this.appleArrayObject.generate();
          this.appleArrayObject.removeFromCollection(currentSnake.head)
        }

        // populate the body 
        for (let j = 0; j < currentSnake.body.length; j++) {
          let currentSnakeBody = currentSnake.body[j];
          this.gameMatrix[currentSnakeBody[1]][currentSnakeBody[0]] = `b${currentSnake.matrixCode}`;
        }

        // then populate head
        this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] = `h${currentSnake.matrixCode}`;
        return this.gameOver;
      }

    }
  }

  runGame() {
    if (this.gameOver === false) {
      this.generateMatrix();
      this.populateMatrixWithObjects();
      this.populateMatrixWithSnakes();
    }
  }

}