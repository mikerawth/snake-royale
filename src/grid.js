
class Grid {
  constructor(xLength, yLength) {
    this.x = xLength; // amount of tiles on the x-axis
    this.y = yLength; // amount of tiles on the y-axis
    this.speed = 75; //speed in milliseconds
    this.snake1 = new Snake("snake1", 3, 3, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft");
    this.snakeObjectArray = [this.snake1]
    this.appleObjectArray = [];
    this.obsticleObjectArray = [];
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
  gridLocationCompare(arrayOne, arrayTwo) {
    if (arrayOne[0] === arrayTwo[0] && arrayOne[1] === arrayTwo[1]) {
      return true;
    }
    return false;
  }

  moveSnakes() {
    this.snakeObjectArray.forEach(snakeObject => {
      snakeObject.move();
    })
  }
  removeSnakes() {
    this.snakeObjectArray.forEach(snakeObject => {
      // snakeObject.draw();

      snakeObject.jQuerySelector(snakeObject.head).removeClass(snakeObject.name)
      snakeObject.jQuerySelector(snakeObject.head).removeClass("head")
      snakeObject.body.forEach((bodyTile) => {
        snakeObject.jQuerySelector(bodyTile).removeClass(snakeObject.name)
      })
    });
  }
  drawSnakes() {
    this.snakeObjectArray.forEach(snakeObject => {
      snakeObject.jQuerySelector(snakeObject.head).addClass(snakeObject.name)
      snakeObject.jQuerySelector(snakeObject.head).addClass("head")
      snakeObject.body.forEach((bodyTile) => {
        snakeObject.jQuerySelector(bodyTile).addClass(snakeObject.name);
      })


    });
  }
  animate() {
    this.animation = setInterval(() => {
      this.placeApples();
      this.removeSnakes();
      this.moveSnakes();
      if (!this.collisionDetection()) {
        this.drawSnakes();
        this.snakeEatsApple();
      }
    }, this.speed)
  }
  generateApple() {
    let randomX = Math.ceil(Math.random() * this.x)
    let randomY = Math.ceil(Math.random() * this.y)
    console.log(`generating apple at ${[randomX, randomY]}`)
    this.appleObjectArray.push([randomX, randomY]);
  }
  placeApples() {
    if (this.appleObjectArray.length === 0) {
      this.generateApple();
      this.appleObjectArray.forEach(apple => {
        this.jQuerySelector(apple).addClass("apple");
      })
    }
  }
  clearApple(arrayOfCoordinates, index) {
    this.jQuerySelector(arrayOfCoordinates).removeClass("apple");
    this.appleObjectArray.splice(index, 1);
  }
  snakeEatsApple() {
    this.snakeObjectArray.forEach(snakeObject => {
      this.appleObjectArray.forEach((apple, index) => {
        if (this.gridLocationCompare(snakeObject.head, apple)) {
          snakeObject.grow();
          snakeObject.score += 1;
          this.clearApple(apple, index);
        }
      })
    })
  }
  snakeHitsOwnBody(snakeObject) {
    for (let i = 0; i < snakeObject.body.length; i++) {
      if (this.gridLocationCompare(snakeObject.head, snakeObject.body[i])) {
        return true;
      }
    }
    return false;
  }
  generateObsticle() {
    let randomX = Math.ceil(Math.random() * this.x)
    let randomY = Math.ceil(Math.random() * this.y)
    console.log(`generating obsticle at ${[randomX, randomY]}`)
    this.appleObjectArray.push([randomX, randomY]);
  }
  addSnakeBodiesToObsticleArray() {
    this.snakeObjectArray.forEach(snakeObject => {
      for (let i = 0; i < snakeObject.body.length; i++) {
        this.obsticleObjectArray.push(snakeObject.body[i]);
      }
    })
    console.log(this.obsticleObjectArray);
  }
  collisionDetection() {
    this.snakeObjectArray.forEach(snakeObject => {
      if (!(snakeObject.x > 0) || !(snakeObject.x <= this.x)
        || !(snakeObject.y > 0) || !(snakeObject.y <= this.y)
        || this.snakeHitsOwnBody(snakeObject)) {
        this.gameOver();
        return true;
      } else {
        return false;
      }
    })
  }
  gameOver() {
    console.log("game over is called")
    console.log(this.snakeObjectArray[0].score)
    alert(`You got ${this.snakeObjectArray[0].score} apples!`)
    clearInterval(currentGrid.animation)
    this.restartGame();

  }
  restartGame() {
    location.reload();
  }
  jQuerySelector(arrayOfCoordinates) {
    return $(`#r${arrayOfCoordinates[1]}c${arrayOfCoordinates[0]}`);
  }
}

