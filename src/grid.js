
class Grid extends Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    super(snakeArray, xBoundary, yBoundary)
    this.speed = 100; //speed in milliseconds
    this.appleArrayObject = new Apples(this.xBoundary, this.yBoundary);
    this.obsticleArrayObject = new Obstacles(this.xBoundary, this.yBoundary);
  }
  jQuerySelector(row, col, classString) {
    return `<div id="r${row + 1}c${col + 1}" class="${classString}"></div>`
  }
  drawGrid() {
    $("#grid-map").empty();
    for (let row = 0; row < this.gameMatrix.length; row++) {
      for (let col = 0; col < this.gameMatrix[row].length; col++) {
        let matrixCodeString = this.gameMatrix[row][col];
        if (matrixCodeString.slice(1) === "s1") {
          $("#grid-map").append(this.jQuerySelector(row, col, `grid-tile snake1`))
        } else if (matrixCodeString === "a") {
          $("#grid-map").append(this.jQuerySelector(row, col, `grid-tile apple`))
        }
        else if (matrixCodeString === "o") {
          $("#grid-map").append(this.jQuerySelector(row, col, `obstacle`))
        } else {
          $("#grid-map").append(this.jQuerySelector(row, col, `grid-tile`))
        }
      }
    }
  }
  animate() {
    this.animation = setInterval(() => {
      super.runGame();
      this.drawGrid();
      if (this.gameOver) {
        console.log("game over")
        this.endGame();
      }
    }, this.speed)

  }
  endGame() {
    clearInterval(this.animation)
  }
}