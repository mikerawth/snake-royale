class Snake {
  constructor(name, startX, startY, upKey, rightKey, downKey, leftKey) {
    this.name = name;
    this.x = startX;
    this.y = startY;
    this.head = $(`#r${this.y}c${this.x}`) // id which snake head is in
    this.body = [$(`#r${this.y}c${this.x}`), $(`#r${this.y}c${this.x}`), $(`#r${this.y}c${this.x}`), $(`#r${this.y}c${this.x}`)] // array of coordinates in jQuery form (such as this.head)
    // all of the Snake directions
    // can be called by 'snake.up, snake.down, snake.left, snake.right
    this.up = upKey
    this.right = rightKey
    this.down = downKey
    this.left = leftKey
    this.currentDirection = this.right; // starting direction
    this.score; //snake's score
  }
  turn(directionString) {
    // allowed directions.  since we can have multiple snakes, we do the check within the snake class, not the code
    let directions = [this.up, this.right, this.down, this.left];
    // if string is valid
    if (directions.includes(directionString)) {
      // figure out which direction to turn
      switch (directionString) {
        // snake facing up or down can only turn left or right
        case this.up:
        case this.down:
          if (this.currentDirection === this.left || this.currentDirection === this.right)
            this.currentDirection = directionString;
          break;
        // snake facing left or right can only turn up or down
        case this.right:
        case this.left:
          if (this.currentDirection === this.up || this.currentDirection === this.down)
            this.currentDirection = directionString;
          break;
      }
    }
  }
  move() {
    // moving cordinates based on direction
    switch (this.currentDirection) {
      case this.up:
        this.y -= 1;
        break;
      case this.right:
        this.x += 1
        break;
      case this.down:
        this.y += 1;
        break;
      case this.left:
        this.x -= 1;
        break;
    }
    // currentGrid is definded in javascript.js
    // if snake will NOT collide, snake will move
    if (!this.collide(currentGrid.x, currentGrid.y)) {
      this.body.push(this.head);
      this.body.shift();
      this.head = $(`#r${this.y}c${this.x}`);
    };
  }
  grow() {

  }
  draw() {
    this.head.removeClass(this.name) // removing previous body
    this.head.removeClass("head")
    this.body.forEach((bodyTile) => {
      return bodyTile.removeClass(this.name)
    })
    this.grow(); // grow first, then move
    this.move();
    this.head.addClass(this.name)
    this.head.removeClass("head")
    this.body.forEach((bodyTile) => {
      return bodyTile.addClass(this.name)
    })
  }
  // return true when snake hits object or border
  collide(xLimit, yLimit) {
    // border
    if (!(this.x > 0) || !(this.x <= xLimit)
      || !(this.y > 0) || !(this.y <= yLimit)) {
      currentGrid.gameOver();
      return true;
    } else {
      console.log(`snake now at ${this.x}, ${this.y}`)
      return false;
    }
  }


}