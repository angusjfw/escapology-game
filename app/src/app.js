var state, level, thisLevel, thisLevelSetup, gameScene, id;
var newLevelScene, gameOverScene, levelMessage, endMessage;
var newLevelDelay = 800;
var level = 1;
var maxLevel = 6;
var font = {font: "64px Futura", fill: "white"};
var stageSize = [512, 512];

var dungeon, door, explorer, treasure, blob, arrow, hole, ladder, healthBar;
var hiddenDungeon;
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
    showLevelMessage();

    setTimeout(function() {
      thisLevel = currentLevel();
      gameScene = thisLevel.gameScene;
      stage.addChild(gameScene);
      thisLevel.setUp();

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

  function clearScene() {
    for (var i = stage.children.length - 1; i >= 0; i--) {
      stage.removeChild(stage.children[i]);
    }
  }
  
  function showLevelMessage() {
    stage.addChild(newLevelScene);
    levelMessage.text = "Level " + level + "!";
    newLevelScene.addChild(levelMessage);
    newLevelScene.visible = true;
    renderer.render(stage);
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
        if (hitTestRectangle(explorer, danger) && !(danger instanceof Hole)) {
          explorer.hit = true;
        }
      });
    });
  }

  function reactToHit() {
    if(explorer.hit) {
      explorer.alpha = 0.5;
      healthBar.damage(1);
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
    iceDungeon = new Dungeon(resources["images/icyDungeon.png"].texture, true);
    dungeon = new Dungeon(id["dungeon.png"], false);
    door = new Door(id["door.png"]);
    explorer = new Explorer(id["explorer.png"]);
    treasure = new Treasure(id["treasure.png"]);
    healthBar = new HealthBar();
  }
});
