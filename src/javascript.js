// initiating the snakes for testing purposes
// when game is complete, will initate snakes within game starting
let currentGrid, snake1, snake2, tempObject;

// will load when everything is ready
$(document).ready(() => {
  console.log("ready");
  currentGrid = new Grid(25, 25);
  currentGrid.drawGrid();
  tempObject = new Object;

  // let counter = 3;
  // while (counter > 0) {
  //   snake1.grow();
  //   counter--;
  // }

  $("#start-game-btn").on("click", () => {
    currentGrid.animate();
  })



  // upon each key down
  $(document).on("keydown", (e) => {

    currentGrid.snakeObjectArray.forEach(snakeObject => {
      snakeObject.turn(e.key);
    });
  })
})