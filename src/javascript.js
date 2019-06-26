// initiating the snakes for testing purposes
// when game is complete, will initate snakes within game starting
let currentGrid, snake1, snake2;

// will load when everything is ready
$(document).ready(() => {
  console.log("ready");
  let snake1 = new Snake("snake1", "s2", 2, 2, "w", "d", "s", "a", "d");
  let snake2 = new Snake("snake2", "s1", 22, 22, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowLeft");
  onePlayerGrid = new Grid([snake1], 25, 25, 75);
  twoPlayerGrid = new Grid([snake1, snake2], 25, 25, 150);
  // currentGrid.drawGrid();

  // $(document).on("keydown", () => {
  $("#start-game-btn").on("click", () => {
    $("#start-game-btn").toggle();
    $("#scores").toggle();
    $("#grid-map").toggle();
    // currentGrid = onePlayerGrid;
    currentGrid = twoPlayerGrid;
    currentGrid.startGame();
    currentGrid.animate();
    // $(document).unbind('keydown');
    // upon each key down
    $(document).on("keydown", (e) => {
      currentGrid.turnSnakes(e.key);
    })
  })



})