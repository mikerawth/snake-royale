
class Grid extends Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    super(snakeArray, xBoundary, yBoundary)
    this.speed = 100; //speed in milliseconds
    this.appleArrayObject = new Apples(this.xBoundary, this.yBoundary);
    this.obsticleArrayObject = new Obsticles(this.xBoundary, this.yBoundary);
  }
  drawGrid() {
    $("#grid-map").empty();
    this.displayGrid = []
    for (let row = 0; row < this.gameMatrix.length; row++) {
      this.displayGrid[row] = []
      for (let col = 0; col < this.gameMatrix[row].length; col++) {
        if (this.gameMatrix[row][col].slice(1) === "s1") {
          this.displayGrid[row][col] = $("#grid-map").append(`<div id="r${row + 1}c${col + 1}" class="grid-tile snake1"></div>`)

        } else {
          this.displayGrid[row][col] = $("#grid-map").append(`<div id="r${row + 1}c${col + 1}" class="grid-tile"></div>`)
        }
      }
    }
  }
  animate() {
    super.runGame();
    this.drawGrid();
  }
}