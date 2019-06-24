class Snake {
  constructor(name, matrixCode, startX, startY, upKey, rightKey, downKey, leftKey) {
    this.name = name;
    this.matrixCode = matrixCode;
    this.x = startX;
    this.y = startY;
    this.head = [this.x, this.y] // id which snake head is in
    this.body = []; // gets bigger through grow()
    // all of the Snake directions
    // can be called by 'snake.up, snake.down, snake.left, snake.right
    this.up = upKey
    this.right = rightKey
    this.down = downKey
    this.left = leftKey
    this.currentDirection = this.right; // starting direction
    this.score = 0; //snake's score
  }
  turn(directionString) {
    // allowed directions.  since we can have multiple snakes, we do the check within the snake class, not the code
    let directions = [this.up, this.right, this.down, this.left];
    // from testing, determines the problimatic body spot that the snake could turn into
    // if player makes a u-turn too quickly, snake would go into itself
    // by using bodyDetection, snake will not turn into itself with two keys if key input is too quick
    let bodyDetection = this.body[this.body.length - 1];
    // if string is valid
    if (directions.includes(directionString)) {
      // figure out which direction to turn
      switch (directionString) {
        // snake facing up or down can only turn left or right
        case this.up:
        case this.down:
          if (bodyDetection[0] === (this.x - 1)
            || bodyDetection[0] === (this.x + 1))
            this.currentDirection = directionString;
          break;
        // snake facing left or right can only turn up or down
        case this.right:
        case this.left:
          if (bodyDetection[1] === (this.y - 1)
            || bodyDetection[1] === (this.y + 1))
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

    this.body.push(this.head);
    this.body.shift();
    this.head = [this.x, this.y];

  }
  grow() {
    if (this.body.length === 0) {
      this.body.push(this.head);
    }
    this.body.unshift(this.body[0]);

  }
  // used in grid.js for drawing
  jQuerySelector(locationArray) {
    return $(`#r${locationArray[1]}c${locationArray[0]}`)
  }
}