
class Grid extends Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    super(snakeArray, xBoundary, yBoundary)
    this.speed = 150; //speed in milliseconds
    this.appleArrayObject = new Items(this.xBoundary, this.yBoundary);
    // this.obsticleArrayObject = new Obstacles(this.xBoundary, this.yBoundary);
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
        } else if (matrixCodeString.slice(1) === "s2") {
          $("#grid-map").append(this.jQuerySelector(row, col, `grid-tile snake2`))
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
  displayScore() {
    $("#player-one-score span.snake1").text(this.snakeArray[0].score)
    if (this.snakeArray.length === 2) {
      $("#player-two-score span.snake2").text(this.snakeArray[1].score)
    }
  }
  displayTimer() {
    $("#timer").text(this.time);
    // $("#timer").text(currentGrid.time)
  }
  displayEndGameMessage() {
    super.gameOverMessage();
    $("#end-game-message").text(this.gameOverMessage);
  }
  animate() {
    this.animation = setInterval(() => {
      super.runGame();
      this.drawGrid();
      this.displayScore();
      this.displayTimer();
      if (this.gameOver) {
        this.endGame();
        this.displayEndGameMessage();
      }
    }, this.speed)
  }
  endGame() {
    clearInterval(this.animation)
    $("#end-game-message").toggle();
    $(document).on("keydown", (e) => {
      if (e.key === "Enter") {
        location.reload();
      }
    })
  }
}