class Snake {
  constructor(startX, startY, upKey, rightKey, downKey, leftKey) {
    this.x = startX;
    this.y = startY;
    this.head = [this.x, this.y] // coordinates of the head in array
    this.body = [[]] // array of coordinates of all the body in array
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
    this.head = [this.x, this.y];
  }
  grow() {

  }
  collide(xLimit, yLimit) {
    if (this.x >= 0 && this.x < xLimit
      && this.y >= 0 && this.y < yLimit) {
      console.log("no collision")
    } else {
      console.log('CRASH!')
    }
  }

}