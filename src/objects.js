class Objects {
  constructor(xBoundary, yBoundary) {
    this.collectionOfUs = [];
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.className = "object" // no intention of calling object directly.  This is place holder for grid.js functions
    this.matrixCode = "x"
  }
  cordinatesArray(xCordinate, yCordinate) {
    return [xCordinate, yCordinate]
  }
  pushIntoCollection(arrayContainingCordinates) {
    this.collectionOfUs.push(arrayContainingCordinates);
  }
  jQuerySelector(arrayContainingCordinates) {
    return $(`#r${arrayContainingCordinates[1]}c${arrayContainingCordinates[0]}`);
  }
  locateWithinCollection(arrayOfCordinates) {
    for (let i = 0; i < this.collectionOfUs.length; i++) {
      if (this.collectionOfUs[i][0] === arrayOfCordinates[0]
        && this.collectionOfUs[i][1] === arrayOfCordinates[1]) {
        return i;
      }
    }
    return -1;
  }
  removeFromCollection(arrayOfCordinates) {
    this.collectionOfUs.splice(this.locateWithinCollection(arrayOfCordinates), 1)
  }
  generate() {
    let randomX = Math.floor(Math.random() * this.xBoundary)
    let randomY = Math.floor(Math.random() * this.yBoundary)
    this.pushIntoCollection(this.cordinatesArray(randomX, randomY));
  }
  generateAmount(numberToGenerate) {
    while (numberToGenerate > 0) {
      this.generate()
      if (this.locateWithinCollection(this.collectionOfUs[this.collectionOfUs.length - 1]) === -1) {
        numberToGenerate -= 1;
      } else {
        this.removeFromCollection(this.collectionOfUs[this.collectionOfUs.length - 1])
      }
    }
  }
  removeUsFromGrid() {
    for (let i = 0; i < this.collectionOfUs.length; i++) {
      this.jQuerySelector(this.collectionOfUs[i]).removeClass(this.className);
    }
  }
  addUsToGrid() {
    for (let i = 0; i < this.collectionOfUs.length; i++) {
      this.jQuerySelector(this.collectionOfUs[i]).addClass(this.className);
    }
  }
}

class Apples extends Objects {
  constructor(xBoundary, yBoundary) {
    super(xBoundary, yBoundary);
    this.className = "apple";
    this.matrixCode = "a"
  }
}

class Obsticles extends Objects {
  constructor(xBoundary, yBoundary) {
    super(xBoundary, yBoundary);
    this.className = "obsticle";
  }
}