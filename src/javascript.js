// initiating the snakes for testing purposes
// when game is complete, will initate snakes within game starting
let currentGrid, snake1, snake2;



// will load when everything is ready
$(document).ready(() => {
  console.log("ready");
  let snake1 = new Snake("snake1", "s1", 2, 13, "w", "d", "s", "a", "d");
  let snake2 = new Snake("snake2", "s2", 23, 13, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowLeft");
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
  $(document).on("keydown", (e) => {
    if (e.key === "Enter") {
      $(document).unbind("keydown");

      $("#start-game-btn").toggle();
      $("#left-display").toggle();
      $("#right-display").toggle();
      $("#place-holder").toggle();
      $("#grid-map").toggle();
      $("#start-menu").toggle();

      if ($('#one-player').is(".selected")) {
        currentGrid = onePlayerGrid;
        $(".does-not-exist").toggle();
      } else {
        currentGrid = twoPlayerGrid;
        currentGrid.hasTimeLimit = true;
        $("#player-two-score").toggle();
      }

      if ($('#slow-speed').is(".selected")) {
        currentGrid.speed = 150;
      } else {
        currentGrid.speed = 50;

      }

      currentGrid.startGame();
      currentGrid.animate();
      $(document).on("keydown", (e) => {
        currentGrid.turnSnakes(e.key);
      })

    }

  })



})