class Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    this.snakeArray = snakeArray; // array of Snake Objects
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.appleArrayObject = new Apples(this.xBoundary, this.yBoundary);
    this.obsticleArrayObject = new Obsticles(this.xBoundary, this.yBoundary);
  }
  generateMatrix() {
    let matrix = [];
    for (let row = 0; row < this.yBoundary; row++) {
      matrix[row] = [];
      for (let col = 0; col < this.xBoundary; col++) {
        matrix[row][col] = ""; // empty space
      }
    }
    this.gameMatrix = matrix;
  }
  snakeByMatrixCode(matrixCodeString) {
    for (let i = 0; i < this.snakeArray.length; i++) {
      if (this.snakeArray[i].matrixCode === matrixCodeString) {
        return this.snakeArray[i];
      }
    }
  }
  isSpaceAvailable(cordinateArray) {
    if (this.gameMatrix[cordinateArray[0]][cordinateArray[1]] === "") {
      // console.log(`space is available`);
      return true;
    } else {
      // console.log(`space is occupied by ${this.gameMatrix[cordinateArray[0]][cordinateArray[1]]}`)
      return false
    }
  }
  populateMatrixWithObjects() {
    // apples
    // going through array of apples
    for (let i = 0; i < this.appleArrayObject.collectionOfUs.length; i++) {
      if (this.isSpaceAvailable(this.appleArrayObject.collectionOfUs[i])) {
        this.gameMatrix[this.appleArrayObject.collectionOfUs[i][0]][this.appleArrayObject.collectionOfUs[i][1]] = `a`;
      }
      // else if(this.gameMatrix[this.appleArrayObject.collectionOfUs[i][0]][this.appleArrayObject.collectionOfUs[i][1]].slice(0,1) === "h") {
      //   this.snakeByMatrixCode(this.gameMatrix[this.appleArrayObject.collectionOfUs[i][0]][this.appleArrayObject.collectionOfUs[i][1]].slice(1)).grow();
      // }
    }
  }
  populateMatrixWithSnakes() {
    // BUG: first apple snake eats will grow two bodies...minor
    // TEMP FIX: Snake startS with some body arrays
    // snakes
    for (let i = 0; i < this.snakeArray.length; i++) {
      // move the snakes
      this.snakeArray[i].move()


      // detect eating
      if (this.gameMatrix[this.snakeArray[i].head[0]][this.snakeArray[i].head[1]] === `a`) {
        this.snakeArray[i].grow();
        this.appleArrayObject.generate();
        this.appleArrayObject.removeFromCollection(this.snakeArray[i].head)
      }

      // detect obsticle
      if (this.gameMatrix[this.snakeArray[i].head[0]][this.snakeArray[i].head[1]] === `o`) {
        console.log('game over')
      }





      // populate the body 
      for (let j = 0; j < this.snakeArray[i].body.length; j++) {
        this.gameMatrix[this.snakeArray[i].body[j][0]][this.snakeArray[i].body[j][1]] = `b${this.snakeArray[i].matrixCode}`;
      }

      // then populate head
      this.gameMatrix[this.snakeArray[i].head[0]][this.snakeArray[i].head[1]] = `h${this.snakeArray[i].matrixCode}`;
    }
  }

  runGame() {
    this.generateMatrix();
    this.populateMatrixWithObjects();
    this.populateMatrixWithSnakes();
    console.log(this.gameMatrix);
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  }

}