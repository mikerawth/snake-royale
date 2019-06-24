
class Grid extends Game {
  constructor(snakeArray, xBoundary, yBoundary) {
    super(snakeArray, xBoundary, yBoundary)
    this.speed = 100; //speed in milliseconds
    this.appleArrayObject = new Apples(this.xBoundary, this.yBoundary);
    this.obsticleArrayObject = new Obsticles(this.xBoundary, this.yBoundary);
    // this.x = xLength; // amount of tiles on the x-axis
    // this.y = yLength; // amount of tiles on the y-axis
    // this.snake1 = new Snake("snake1", 3, 3, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft");
    // // this.snake2 = new Snake("snake2", 22, 22, "W", "D", "S", "A");
    // this.snakeObjectArray = [this.snake1]
    // this.appleObjectArray = [];
    // this.obsticleObjectArray = [];
  }
  // creates grid double array, holding coordinates
  // grid.js
  // generateMatrix() {
  //   super.generateMatrix();
  // }
  // drawGrid() {
  //   let matrix = [];
  //   // let map = $('#grid-map');
  //   // let tile = $('<div class="grid-tile"`></div>')
  //   for (let row = 1; row <= this.y; row++) {
  //     matrix[row] = []; // creating each row
  //     for (let col = 1; col <= this.x; col++) {
  //       matrix[row][col] = $('#grid-map').append(`<div class="grid-tile" id="r${row}c${col}"></div>`);
  //     }
  //   }
  //   this.gameGrid = matrix;
  // }

  // // game.js
  // gridLocationCompare(arrayOne, arrayTwo) {
  //   if (arrayOne[0] === arrayTwo[0] && arrayOne[1] === arrayTwo[1]) {
  //     return true;
  //   }
  //   return false;
  // }

  // // game.js
  // moveSnakes() {
  //   this.snakeObjectArray.forEach(snakeObject => {
  //     snakeObject.move();
  //   })
  // }

  // // grid.js
  // removeSnakes() {
  //   this.snakeObjectArray.forEach(snakeObject => {
  //     // snakeObject.draw();

  //     snakeObject.jQuerySelector(snakeObject.head).removeClass(snakeObject.name)
  //     snakeObject.jQuerySelector(snakeObject.head).removeClass("head")
  //     snakeObject.body.forEach((bodyTile) => {
  //       snakeObject.jQuerySelector(bodyTile).removeClass(snakeObject.name)
  //     })
  //   });
  // }

  // //grid.js
  // drawSnakes() {
  //   this.snakeObjectArray.forEach(snakeObject => {
  //     snakeObject.jQuerySelector(snakeObject.head).addClass(snakeObject.name)
  //     snakeObject.jQuerySelector(snakeObject.head).addClass("head")
  //     snakeObject.body.forEach((bodyTile) => {
  //       snakeObject.jQuerySelector(bodyTile).addClass(snakeObject.name);
  //     })
  //   });
  // }

  // grid.js
  // animate() {
  //   this.animation = setInterval(() => {
  //     this.placeApples();
  //     this.removeSnakes();
  //     this.moveSnakes();
  //     if (!this.collisionDetection()) {
  //       this.drawSnakes();
  //       this.snakeEatsApple();
  //     }
  //   }, this.speed)
  // }

  // object (generate())
  // generateApple() {
  //   let randomX = Math.ceil(Math.random() * this.x)
  //   let randomY = Math.ceil(Math.random() * this.y)
  //   console.log(`generating apple at ${[randomX, randomY]}`)
  //   this.appleObjectArray.push([randomX, randomY]);
  // }

  // grid.js
  // convert all placeObjects to one place function
  // placeApples() {
  //   if (this.appleObjectArray.length === 0) {
  //     this.generateApple();
  //     this.appleObjectArray.forEach(apple => {
  //       this.jQuerySelector(apple).addClass("apple");
  //     })
  //   }
  // }

  // grid.js
  // convert all clears to one function
  // clearApple(arrayOfCoordinates, index) {
  //   this.jQuerySelector(arrayOfCoordinates).removeClass("apple");
  //   this.appleObjectArray.splice(index, 1);
  // }

  // game.js
  // snakes and apples/mice are independent of each other
  // they meet in the game
  // snakeEatsApple() {
  //   this.snakeObjectArray.forEach(snakeObject => {
  //     this.appleObjectArray.forEach((apple, index) => {
  //       if (this.gridLocationCompare(snakeObject.head, apple)) {
  //         snakeObject.grow();
  //         this.updateScore(snakeObject);
  //         this.clearApple(apple, index);
  //         this.placeObsticle()
  //       }
  //     })
  //   })
  // }

  // game.js (will also have a displayScore in grid.js)
  // updateScore(snakeObject) {
  //   snakeObject.score += 1;
  //   $(`#scores .${snakeObject.name}`).text(snakeObject.score);
  // }

  // game.js (convert to snake hitting any object/snake)
  // snakeHitsOwnBody(snakeObject) {
  //   for (let i = 0; i < snakeObject.body.length; i++) {
  //     if (this.gridLocationCompare(snakeObject.head, snakeObject.body[i])) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // object.js
  // generateObsticle() {
  //   console.log('function called')
  //   let randomX = Math.ceil(Math.random() * this.x)
  //   let randomY = Math.ceil(Math.random() * this.y)
  //   let randomCordinates = [randomX, randomY];
  //   // this.obsticleObjectArray.forEach(obsticle => {
  //   if ((!this.obsticleObjectArray.indexOf(randomCordinates) !== -1)) {
  //     this.obsticleObjectArray.push(randomCordinates);
  //   }
  //   else {
  //     this.generateObsticle();
  //   }
  //   // })
  // }
  // object.js
  // placeObsticle() {
  //   this.generateObsticle();
  //   this.obsticleObjectArray.forEach(obsticle => {
  //     this.jQuerySelector(obsticle).addClass("obsticle");
  //   })
  // }
  // game.js
  // addSnakeBodiesToObsticleArray() {
  //   this.snakeObjectArray.forEach(snakeObject => {
  //     for (let i = 0; i < snakeObject.body.length; i++) {
  //       this.obsticleObjectArray.push(snakeObject.body[i]);
  //     }
  //   })
  //   console.log(this.obsticleObjectArray);
  // }
  // if snake hits obsticle, return true
  // game.js (make function for snake colliding with anything)
  // snakeCollidesWithAnObsticle(snakeObject) {
  //   for (let i = 0; i < this.obsticleObjectArray.length; i++) {
  //     if (this.gridLocationCompare(snakeObject.head, this.obsticleObjectArray[i])) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // game.js
  // collisionDetection() {
  //   this.snakeObjectArray.forEach(snakeObject => {
  //     if (!(snakeObject.x > 0) || !(snakeObject.x <= this.x)
  //       || !(snakeObject.y > 0) || !(snakeObject.y <= this.y)
  //       || this.snakeHitsOwnBody(snakeObject)
  //       || this.snakeCollidesWithAnObsticle(snakeObject)
  //     ) {
  //       this.gameOver();
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  // }

  // game.js
  // gameOver() {
  //   clearInterval(currentGrid.animation)
  //   $("#restart-btn").toggle();
  //   $("#restart-btn").on("click", () => {
  //     this.restartGame();
  //   })
  // }

  // game.js (will need to reset snakes & objects in a state)
  // restartGame() {
  //   location.reload();
  // }
  // jQuerySelector(arrayOfCoordinates) {
  //   return $(`#r${arrayOfCoordinates[1]}c${arrayOfCoordinates[0]}`);
  // }
}

