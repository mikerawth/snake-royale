class Grid {
  constructor(xLength, yLength) {
    this.x = xLength; // amount of tiles on the x-axis
    this.y = yLength; // amount of tiles on the y-axis

  }
  // creates grid double array, holding coordinates
  drawGrid() {
    let matrix = [];
    // let map = $('#grid-map');
    // let tile = $('<div class="grid-tile"`></div>')
    for (let row = 0; row < this.y; row++) {
      matrix[row] = []; // creating each row
      for (let col = 0; col < this.x; col++) {
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
    $(`#r${snakeObject.head[1]}c${snakeObject.head[0]}`).addClass(`snake1`)
  }
  animate() {
    return setInterval(() => {
      snake1.move();
      snake1.collide(this.x, this.y);
      this.drawSnake(snake1);
    }, 1000)
  }
}