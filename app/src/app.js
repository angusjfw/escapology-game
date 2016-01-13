var state, level, gameScene, newLevelScene, gameOverScene;
var endMessage, levelMessage;
var level = 1;
var maxLevel = 3;
var ice = false;
var font = {font: "64px Futura", fill: "white"};

var id, dungeon, door, explorer, treasure, blob, arrow, healthBar;
var arrows = [],
    arrowSpeed = 3;
var blobs = [],
    numberOfBlobs = 6,
    blobSpacing = 48,
    blobXOffset = 150,
    blobSpeed = 2;

document.addEventListener("DOMContentLoaded", function(event) {
  var renderer = new autoDetectRenderer(512, 512);
  var stage = new Container();
  document.body.appendChild(renderer.view);

  loader
    .add(["images/treasureHunter.json"])
    .add(["images/arrow.png"])
    .add(["images/icyDungeon.png"])
    .load(setup);

  function setup() {
    gameScene = new Container();
    stage.addChild(gameScene);
    setUpSprites(gameScene);
    setUpControls(explorer);
    state = play;
    gameLoop();
  }

  function gameLoop(){
    state(function() {
      renderer.render(stage);
      requestAnimationFrame(gameLoop);
    });
  }

  function play(cb) {
    explorer.move();
    if (blobs.length !== 0) {
      moveBlobsAndTestHit();
    }
    if (arrows.length !== 0) {
      moveArrowsAndTestHit();
    }
    reactToHit();
    carryTreasure();
    checkLoss();
    checkWin();
    cb();
  }

  function level_setup(cb) {
    levelMessage.text = "Level " + level + "!";
    gameScene.visible = false;
    newLevelScene.visible = true;
    renderer.render(stage);

    setTimeout(function() {
      switch (level) {
        case 2:
        blobs = clearEnemies(blobs);
        createArrowWave();
        arrowMaker = setInterval(function(){
          createArrowWave();
        },1000);
          break;
        case 3:
          clearInterval(arrowMaker);
          arrows = clearEnemies(arrows);
          icyDungeon();
          ice = true;
          break;
      }

      newLevelScene.visible = false;
      gameScene.visible = true;
      state = play;
      resetTreasure();
      cb();
    }, 800);
  }

  function end(cb) {
    gameScene.visible = false;
    gameOverScene.visible = true;
    cb();
  }

  function moveBlobsAndTestHit() {
    blobs.forEach(function(blob) {
      blob.move();
      if (hitTestRectangle(explorer, blob)) {
        explorer.hit = true;
      }
    });
  }

  function moveArrowsAndTestHit() {
    arrows.forEach(function(arrow) {
      arrow.move();
      if (hitTestRectangle(explorer, arrow)) {
        explorer.hit = true;
      }
    });
  }

  function reactToHit() {
    if(explorer.hit) {
      explorer.alpha = 0.5;
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
      if (level == maxLevel) {
        state = end;
        endMessage.text = "You won!";
      } else {
        level += 1;
        state = level_setup;
      }
    }
  }

  function checkLoss() {
    if (healthBar.outerBar.width < 0) {
      state = end;
      endMessage.text = "You lost!";
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
      createBlob(i);
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
    endMessage = new Text("The End!", font);
    endMessage.x = 120;
    endMessage.y = stage.height / 2 - 32;
    gameOverScene.addChild(endMessage);

    newLevelScene = new Container();
    stage.addChild(newLevelScene);
    newLevelScene.visible = false;
    levelMessage = new Text("Level " + level + "!", font);
    levelMessage.x = 120;
    levelMessage.y = stage.height / 2 - 32;
    newLevelScene.addChild(levelMessage);
  }

  function resetTreasure() {
    treasure.x = stage.width - treasure.width - 48;
    treasure.y = stage.height / 2 - treasure.height / 2;
  }

  function createBlob(i) {
    blob = new Blob(id["blob.png"]);
    blob.x = blobSpacing * i + blobXOffset;
    blob.y = randomInt(0, stage.height - blob.height);
    blob.vy = blobSpeed * (i % 2 === 0) ? 1:-1;
  }

  function createArrow(x, y) {
    arrow = new Arrow(resources["images/arrow.png"].texture);
    arrow.width = 20;
    arrow.height = 40;
    arrow.rotation = 1.6;
    arrow.position.set(x, y);
    arrow.vx = arrowSpeed;
    arrows.push(arrow);
    gameScene.addChild(arrow);
  }

  function createArrowWave(){
    for (var i = 0; i < 5; i++) {
      createArrow(20, 60+(i*100));
    }
  }

  function icyDungeon() {
    dungeon = new Dungeon(resources["images/icyDungeon.png"].texture);
    gameScene.addChildAt(dungeon, 1);
  }

  function clearEnemies(type) {
    type.forEach(function(enemy) {
      gameScene.removeChild(enemy);
    });
    return [];
  }
});
