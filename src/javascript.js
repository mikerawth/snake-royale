// initiating the snakes for testing purposes
// when game is complete, will initate snakes within game starting
let currentGrid, snake1, snake2;

// will load when everything is ready
$(document).ready(() => {
  console.log("ready");
  currentGrid = new Grid(10, 10);
  currentGrid.drawGrid();
  snake1 = new Snake(3, 3, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft");

  currentGrid.animate();


  // upon each key down
  $(document).on("keydown", (e) => {
    snake1.turn(e.key);
  })
})