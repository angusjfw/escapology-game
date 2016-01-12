document.addEventListener("DOMContentLoaded", function(event) {
  var renderer = new autoDetectRenderer(512, 512);
  var stage = new Container();
  document.body.appendChild(renderer.view);

  loader
    .add(["images/treasureHunter.json"])
    .load(setup);

  var state, message, gameScene, gameOverScene;
  var dungeon, door, explorer, treasure, healthBar, id;
  var blobs, blob, spacing, xOffset, xBlob, yBlob, speed, direction;

  function setup() {
    gameScene = new Container();
    stage.addChild(gameScene);
    setUpSprites(gameScene);
    setUpControls();
    state = play;
    gameLoop();
  }

  function gameLoop(){
    requestAnimationFrame(gameLoop);
    state(); //either play() or end()
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
      moveBlob(blob);
      if (hitTestRectangle(explorer, blob)) {
        explorer.hit = true;
      }
   });
  }

  function moveBlob(blob) {
    blob.y += blob.vy;
    var blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }
  }

  function reactToHit() {
    if(explorer.hit) {
      explorer.alpha = 0.5;
      healthBar.outer.width -= 1;
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

    numberOfBlobs = 6;
    spacing = 48;
    xOffset = 150;
    speed = 2;
    direction = 1;
    blobs = [];

    for (var i = 0; i < numberOfBlobs; i++) {
      blob = new Sprite(id["blob.png"]);
      xBlob = spacing * i + xOffset;
      yBlob = randomInt(0, stage.height - blob.height);
      blob.x = xBlob;
      blob.y = yBlob;
      blob.vy = speed * direction;
      direction *= -1;
      blobs.push(blob);
      gameScene.addChild(blob);
    }

    healthBar = new Container();
    healthBar.position.set(stage.width - 170, 6);
    gameScene.addChild(healthBar);
    var innerBar = new Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 128, 8);
    innerBar.endFill();
    healthBar.addChild(innerBar);
    var outerBar = new Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0, 0, 128, 8);
    outerBar.endFill();
    healthBar.addChild(outerBar);
    healthBar.outer = outerBar;

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

  function setUpControls() {
    var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

    left.press = function() {
      explorer.vx = -5;
      explorer.vy = 0;
    };
    left.release = function() {
      if (!right.isDown && explorer.vy === 0) {
        explorer.vx = 0;
      }
    };

    up.press = function() {
      explorer.vy = -5;
      explorer.vx = 0;
    };
    up.release = function() {
      if (!down.isDown && explorer.vx === 0) {
        explorer.vy = 0;
      }
    };

    right.press = function() {
      explorer.vx = 5;
      explorer.vy = 0;
    };
    right.release = function() {
      if (!left.isDown && explorer.vy === 0) {
        explorer.vx = 0;
      }
    };

    down.press = function() {
      explorer.vy = 5;
      explorer.vx = 0;
    };
    down.release = function() {
      if (!up.isDown && explorer.vx === 0) {
        explorer.vy = 0;
      }
    };
  }
});
