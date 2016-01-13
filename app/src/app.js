document.addEventListener("DOMContentLoaded", function(event) {
  var renderer = new autoDetectRenderer(512, 512);
  var stage = new Container();
  document.body.appendChild(renderer.view);

  loader
    .add(["images/treasureHunter.json"])
    .load(setup);

  var state, gameScene, gameOverScene, id;
  var dungeon, door, explorer, treasure, blob, healthBar, message;
  var blobs = [],
      numberOfBlobs = 6,
      blobSpacing = 48,
      blobXOffset = 150,
      blobSpeed = 2;

  function setup() {
    gameScene = new Container();
    stage.addChild(gameScene);
    setUpSprites(gameScene);
    setUpControls(explorer);
    state = play;
    gameLoop();
  }

  function gameLoop(){
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
  }

  function play() {
    explorer.move();
    moveBlobsAndTestHit();
    reactToHit();
    carryTreasure();
    checkLoss();
    checkWin();
  }

  function end() {
    gameScene.visible = false;
    gameOverScene.visible = true;
  }

  function moveBlobsAndTestHit() {
    explorer.hit = false;
    blobs.forEach(function(blob) {
      blob.move();
      if (hitTestRectangle(explorer, blob)) {
        explorer.hit = true;
      }
   });
  }

  function reactToHit() {
    if(explorer.hit) {
      explorer.alpha = 0.5;
      // healthBar.outer.width -= 1;
      healthBar.outerBar.width -= 1;
    } else {
      explorer.alpha = 1;
    }
  }

  function carryTreasure(){
    if (hitTestRectangle(explorer, treasure)) {
      treasure.x = explorer.x + 8;
      treasure.y = explorer.y + 8;
    }
  }

  function checkWin() {
    if (hitTestRectangle(treasure, door)) {
      state = end;
      message.text = "You won!";
    }
  }

  function checkLoss() {
    if (healthBar.outer.width < 0) {
      state = end;
      message.text = "You lost!";
    }
  }

  function setUpSprites(gameScene) {
    id = resources["images/treasureHunter.json"].textures;

    dungeon = new Dungeon(id["dungeon.png"]);
    gameScene.addChild(dungeon);

    door = new Door(id["door.png"]);
    door.position.set(32, 0);
    gameScene.addChild(door);

    explorer = new Explorer(id["explorer.png"]);
    explorer.x = 68;
    explorer.y = stage.height / 2 - explorer.height / 2;
    gameScene.addChild(explorer);

    treasure = new Treasure(id["treasure.png"]);
    treasure.x = stage.width - treasure.width - 48;
    treasure.y = stage.height / 2 - treasure.height / 2;
    gameScene.addChild(treasure);

    for (var i = 0; i < numberOfBlobs; i++) {
      blob = new Blob(id["blob.png"]);
      blob.x = blobSpacing * i + blobXOffset;
      blob.y = randomInt(0, stage.height - blob.height);
      blob.vy = blobSpeed * (i % 2 === 0) ? 1:-1;
      blobs.push(blob);
      gameScene.addChild(blob);
    }

    healthBar = new HealthBar();
    healthBar.position.set(stage.width - 170, 6);
    gameScene.addChild(healthBar);
    healthBar.addChild(healthBar.innerBar);
    healthBar.addChild(healthBar.outerBar);

    gameOverScene = new Container();
    stage.addChild(gameOverScene);
    gameOverScene.visible = false;
    message = new Text(
        "The End!",
        {font: "64px Futura", fill: "white"}
        );
    message.x = 120;
    message.y = stage.height / 2 - 32;
    gameOverScene.addChild(message);
  }
});
