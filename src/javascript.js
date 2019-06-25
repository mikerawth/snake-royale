// initiating the snakes for testing purposes
// when game is complete, will initate snakes within game starting
let currentGrid, snake1, snake2;

// will load when everything is ready
$(document).ready(() => {
  console.log("ready");
  let snake1 = new Snake("snake1", "s1", 2, 2, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowRight");
  let snake2 = new Snake("snake2", "s2", 22, 22, "w", "d", "s", "a", "a");
  currentGrid = new Grid([snake1, snake2], 25, 25);
  // currentGrid.drawGrid();

  $("#start-game-btn").on("click", () => {
    $("#start-game-btn").toggle();
    $("#scores").toggle();
    $("#grid-map").toggle();
    // currentGrid.appleArrayObject.generateSpecfic(2, 1)
    currentGrid.startGame();
    currentGrid.animate();
  })



  // upon each key down
  $(document).on("keydown", (e) => {
    currentGrid.turnSnakes(e.key);
  })
})