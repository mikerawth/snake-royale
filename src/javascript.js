// initiating the snakes for testing purposes
// when game is complete, will initate snakes within game starting
let currentGrid, snake1, snake2;



// will load when everything is ready
$(document).ready(() => {
  console.log("ready");
  let snake1 = new Snake("snake1", "s1", 2, 13, "w", "d", "s", "a", "d");
  let snake2 = new Snake("snake2", "s2", 4, 14, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp");
  onePlayerGrid = new Grid([snake1], 25, 25);
  twoPlayerGrid = new Grid([snake1, snake2], 25, 25);

  $('.option-buttons.player button').on("click", (e) => {
    $(e.currentTarget).addClass("selected");
    if ($(e.currentTarget).is("#one-player")) {
      $("#two-player").removeClass("selected");
    } else {
      $("#one-player").removeClass("selected");
    }
  })

  $('.option-buttons.speed button').on("click", (e) => {
    $(e.currentTarget).addClass("selected");
    if ($(e.currentTarget).is("#slow-speed")) {
      $("#fast-speed").removeClass("selected");
    } else {
      $("#slow-speed").removeClass("selected");
    }
  })


  // $(document).on("keydown", () => {
  $("#start-game-btn").on("click", () => {
    $("#start-game-btn").toggle();
    $("#scores").toggle();
    $("#grid-map").toggle();

    if ($('#one-player').is(".selected")) {
      currentGrid = onePlayerGrid;
    } else {
      currentGrid = twoPlayerGrid;
    }

    if ($('#slow-speed').is(".selected")) {
      currentGrid.speed = 150;
    } else {
      currentGrid.speed = 75;
    }

    currentGrid.startGame();
    currentGrid.animate();
    // $(document).unbind('keydown');
    // upon each key down
    $(document).on("keydown", (e) => {
      currentGrid.turnSnakes(e.key);
    })
  })



})