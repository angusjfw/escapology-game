var state, level, thisLevel, thisLevelSetup, ice, gameScene, newLevelScene, gameOverScene;
var endMessage, levelMessage;
var newLevelDelay = 800;
var level = 1;
var maxLevel = 6;
var font = {font: "64px Futura", fill: "white"};
var stageSize = [512, 512];

var id, dungeon, door, explorer, treasure, blob, arrow, hole, ladder, healthBar;
var hiddenTreasure;
var blobs = [];
var arrows = [];
var holes = [];
var hiddenHoles = [];

document.addEventListener("DOMContentLoaded", function(event) {
  var renderer = new autoDetectRenderer(stageSize[0], stageSize[1]);
  var stage = new Container();
  document.body.appendChild(renderer.view);

  loader
    .add(["images/treasureHunter.json"])
    .add(["images/icyDungeon.png"])
    .add(["images/arrow.png"])
    .add(["images/hole.png"])
    .add(["images/ladder.png"])
    .load(setup);

  function setup() {
    setUpMessages();
    setUpSprites();
    setUpControls(explorer);
    state = levelSetup;
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
    useLadder();
    moveDangersAndTestHit([blobs, arrows, holes]);
    reactToHit();
    carryTreasure();
    checkLoss();
    checkWin();
    cb();
  }

  function levelSetup(cb) {
    clearScene();
    stage.addChild(newLevelScene);
    levelMessage.text = "Level " + level + "!";
    newLevelScene.addChild(levelMessage);
    newLevelScene.visible = true;
    renderer.render(stage);

    setTimeout(function() {
      thisLevel = window["level" + level];
      thisLevelSetup = window["level" + level + "Setup"];
      gameScene = thisLevel.gameScene;
      stage.addChild(gameScene);
      thisLevelSetup();

      newLevelScene.visible = false;
      gameScene.visible = true;
      state = play;
      cb();
    }, newLevelDelay);
  }

  function end(cb) {
    stage.addChild(gameOverScene);
    gameOverScene.addChild(endMessage);
    gameScene.visible = false;
    gameOverScene.visible = true;
    cb();
  }

  function useLadder() {
    if (ladder) {
      ladder.action();
    }
  }



  function moveDangersAndTestHit(dangerTypes) {
    dangerTypes.forEach(function(dangerType) {
      dangerType.forEach(function(danger) {
        danger.action();
        if (hitTestRectangle(explorer, danger)) {
          explorer.hit = true;
        }
      });
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
        state = levelSetup;
      }
    }
  }

  function checkLoss() {
    if (healthBar.outerBar.width < 0) {
      state = end;
      endMessage.text = "You lost!";
    }
  }

  function setUpMessages() {
    gameOverScene = new Container();
    endMessage = new Text("The End!", font);
    endMessage.x = 120;
    endMessage.y = stageSize[1] / 2 - 32;

    newLevelScene = new Container();
    levelMessage = new Text("Level " + level + "!", font);
    levelMessage.x = 120;
    levelMessage.y = stageSize[1] / 2 - 32;
  }

  function setUpSprites() {
    id = resources["images/treasureHunter.json"].textures;
    iceDungeon = new Dungeon(resources["images/icyDungeon.png"].texture);
    dungeon = new Dungeon(id["dungeon.png"]);
    door = new Door(id["door.png"]);
    explorer = new Explorer(id["explorer.png"]);
    treasure = new Treasure(id["treasure.png"]);
    healthBar = new HealthBar();
  }

  function clearScene() {
    for (var i = stage.children.length - 1; i >= 0; i--) {
      stage.removeChild(stage.children[i]);
    }
    ice = false;
  }
});
