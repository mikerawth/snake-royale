class Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    this.snakeArray = snakeArray; // array of Snake Objects
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.appleArrayObject = new Items(this.xBoundary, this.yBoundary);
    // this.obstacleArrayObject = new Items(this.xBoundary, this.yBoundary);
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
  // snakeCollisionCheck(){
  //   for(let i = 0; i < this.snakeArray.length; i++) {
  //     let currentSnake
  //   }
  // }
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

  populateMatrixWithObstacle() {
    let randomX = Math.floor(Math.random() * (this.xBoundary - 2)) + 1
    let randomY = Math.floor(Math.random() * (this.yBoundary - 2)) + 1
    if (this.isSpaceAvailable([randomX, randomY])) {
      this.gameMatrix[randomX, randomY] = `o`;
    } else {
      this.turnSnakespopulateMatrixWithObstacle()
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
  populateMatrixWithSnakes() {
    // snakes
    for (let i = 0; i < this.snakeArray.length; i++) {
      let currentSnake = this.snakeArray[i];

      let predictedSnakeHeadPosition = this.nextSnakePosition(currentSnake)
      // populate the body 
      for (let j = 0; j < currentSnake.body.length; j++) {
        let currentSnakeBody = currentSnake.body[j];
        this.gameMatrix[currentSnakeBody[1]][currentSnakeBody[0]] = `b${currentSnake.matrixCode}`;
      }
      // detect obstacle

      if (this.gameMatrix[predictedSnakeHeadPosition[1]][predictedSnakeHeadPosition[0]] === `o`
        || this.gameMatrix[predictedSnakeHeadPosition[1]][predictedSnakeHeadPosition[0]].slice(0, 1) === `b`) {
        this.gameOver = true;

      } else {
        this.gameOver = false;
        currentSnake.move()
        if (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] === `a`) {
          currentSnake.grow();
          // this.populateMatrixWithObstacle();
          currentSnake.score += 1;
          this.appleArrayObject.removeFromCollection(currentSnake.head)
        }
      }
      // // populate the body 
      // for (let j = 0; j < currentSnake.body.length; j++) {
      //   let currentSnakeBody = currentSnake.body[j];
      //   this.gameMatrix[currentSnakeBody[1]][currentSnakeBody[0]] = `b${currentSnake.matrixCode}`;
      // }

      // populate head
      this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] = `h${currentSnake.matrixCode}`;

      return this.gameOver;

    }
  }

  startGame() {
    this.snakeArray[0].grow();
    this.generateMatrix();
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();
    console.log(this.gameMatrix);

  }

  runGame() {
    // if (this.gameOver === false) {
    this.generateMatrix();
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();
    // }
  }

}