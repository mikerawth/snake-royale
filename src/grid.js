
class Grid extends Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    super(snakeArray, xBoundary, yBoundary)
    this.speed = 100; //speed in milliseconds
    this.appleArrayObject = new Apples(this.xBoundary, this.yBoundary);
    this.obsticleArrayObject = new Obsticles(this.xBoundary, this.yBoundary);
    this.displayGrid = [];
  }
  drawGrid() {
    let matrix = []
    super.generateMatrix();
    for (let row = 0; row < this.gameMatrix.length; row++) {
      matrix[row] = []
      for (let col = 0; col < this.gameMatrix[row].length; col++) {
        matrix[row][col] = $("#grid-map").append(`<div id="r${row + 1}c${col + 1}" class="grid-tile"></div>`)
      }
    }
    this.displayGrid = matrix;
  }
}