class Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    this.snakeArray = snakeArray; // array of Snake Objects
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.appleArrayObject = new Items(this.xBoundary, this.yBoundary);
    // this.obstacleArrayObject = new Items(this.xBoundary, this.yBoundary);
    this.gameOver = false;
  }
  // generateSnakes() {
  //   this.snake1 = new Snake("snake1", "s1", 2, 2, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowRight");
  //   this.snake2 = new Snake("snake2", "s2", 23, 23, "W", "D", "S", "A", "A");
  //   this.pushSnakesInArray([snake1, snake2])
  // }
  // pushSnakesInArray(arrayOfSnakes) {
  //   for (let i = 0; i < arrayOfSnakes.length; i++) {
  //     this.snakeArray.push(arrayOfSnakes[i]);
  //   }
  // }
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
      console.log(this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]])
      if (this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]] === `o`
        || this.gameMatrix[predictedSnakePosition[1]][predictedSnakePosition[0]].slice(1, 2) === `s`) {
        this.gameOver = true;
      } else {
        this.gameOver = false;
        currentSnake.move()
        if (this.gameMatrix[currentSnake.head[1]][currentSnake.head[0]] === `a`) {
          currentSnake.grow();
          currentSnake.score += 1;
          this.appleArrayObject.removeFromCollection(currentSnake.head)
        }
      }
    }
    return this.gameOver;
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
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();

  }

  runGame() {
    this.generateMatrix();
    this.populateMatrixWithApples();
    this.populateMatrixWithSnakes();
  }

}