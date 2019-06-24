class Object {
  constructor() {
    this.x;
    this.y;
  }
  positionArray() {
    return [this.x, this.y]
  }
  jQuerySelector(x, y) {
    return $(`#r${y}c${x}`);
  }
}

class Apple extends Object {
  constructor() {
    super(x, y);
    this.name = "apple";
  }
}