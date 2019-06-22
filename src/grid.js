
class Grid {
  constructor(xLength, yLength) {
    this.x = xLength; // amount of tiles on the x-axis
    this.y = yLength; // amount of tiles on the y-axis
    this.speed = 50; //speed in milliseconds

  }
  // creates grid double array, holding coordinates
  drawGrid() {
    let matrix = [];
    // let map = $('#grid-map');
    // let tile = $('<div class="grid-tile"`></div>')
    for (let row = 1; row <= this.y; row++) {
      matrix[row] = []; // creating each row
      for (let col = 1; col <= this.x; col++) {
        matrix[row][col] = $('#grid-map').append(`<div class="grid-tile" id="r${row}c${col}"></div>`);
      }
    }
    this.gameGrid = matrix;
  }
  // call upon where to return cordinates in [x][y] format
  gridLocation(xCordinate, yCordinate) {
    return this.gameGrid[yCordinate][xCordinate];
  }
  drawSnake(snakeObject) {
    snakeObject.draw();
  }
  animate() {
    this.animation = setInterval(() => {
      this.drawSnake(snake1);
    }, this.speed)
  }
  gameOver() {
    console.log("game over is called")
    clearInterval(currentGrid.animation)
    // setTimeout(() => { this.restartGame(); }, 1000)

  }
  restartGame() {
    location.reload();
  }
}

