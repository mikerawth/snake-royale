// initiating the snakes for testing purposes
// when game is complete, will initate snakes within game starting
let currentGrid, snake1, snake2;

// will load when everything is ready
$(document).ready(() => {
  console.log("ready");
  currentGrid = new Grid(25, 25);
  currentGrid.drawGrid();

  $("#start-game-btn").on("click", () => {
    $("#start-game-btn").toggle();
    $("#grid-map").toggle();
    currentGrid.animate();
  })



  // upon each key down
  $(document).on("keydown", (e) => {

    currentGrid.snakeObjectArray.forEach(snakeObject => {
      snakeObject.turn(e.key);
    });
  })
})