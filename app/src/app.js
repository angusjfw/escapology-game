var state, level, win, thisLevel, thisLevelSetup, id;
var newLevelScene, gameScene, endScene, gameOverScene;
var levelMessage, endMessage, progressMessage, replayMessage;
var newLevelDelay = 900;
var level = 1;
var maxLevel = 8;
var font = {font: "64px Futura", fill: "white", align: "center",
    dropShadow: "true", dropShadowColor: "#6DAA2C", dropShadowDistance: 4};
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
    controlScenes();
    spriteAction([blobs, arrows, holes, [explorer], [ladder], [treasure]]);
    checkLoss();
    checkWin();
    cb();
  }

  function levelSetup(cb) {
    clearScene();
    thisLevel = currentLevel();
    gameScene = thisLevel.gameScene;
    stage.addChild(gameScene);
    thisLevel.setUp();
    showLevelMessage();

    setTimeout(function() {
      stage.removeChild(newLevelScene);
      newLevelScene.visible = false;
      state = play;
      cb();
    }, newLevelDelay);
  }

  function end(cb) {
    stage.addChild(endScene);
    endScene.addChild(endMessage);
    gameScene.filters = [new PIXI.filters.DotScreenFilter()];
    setTimeout(function() {
      endScene.removeChild(endMessage);
      stage.removeChild(endScene);
      endScene.visible = false;
      stage.addChild(gameOverScene);
      gameOverScene.visible = true;
      gameOverScene.addChild(replayMessage);
      gameOverScene.addChild(progressMessage);
      completed = win ? level:(level-1);
      progressMessage.text = "You completed\n" + completed + "/" + maxLevel +
                             " levels!";
    }, 1500);
    cb();
  }

  function replay() {
    document.location.reload();
  }

  function controlScenes() {
    gameOverScene.visible = false;
    endScene.visible = true;
    gameScene.filters = null;
  }


  function clearScene() {
    for (var i = stage.children.length - 1; i >= 0; i--) {
      stage.removeChild(stage.children[i]);
    }
  }
  
  function showLevelMessage() {
    gameScene.filters = [new PIXI.filters.SmartBlurFilter()];
    stage.addChild(newLevelScene);
    levelMessage.text = "Level " + level + "!";
    newLevelScene.addChild(levelMessage);
    newLevelScene.visible = true;
    renderer.render(stage);
  }

  function spriteAction(spriteTypes) {
    spriteTypes.forEach(function(spriteType) {
      spriteType.forEach(function(sprite) {
        if (sprite) {
          sprite.action();
        }
      });
    });
  }

  function checkWin() {
    if (hitTestRectangle(treasure, door)) {
      if (level == maxLevel) {
        endMessage.text = "You won!";
        win = true;
        state = end;
      } else {
        level += 1;
        state = levelSetup;
      }
    }
  }

  function checkLoss() {
    if (healthBar.outerBar.width < 0) {
      endMessage.text = "You lost!";
      win = false;
      state = end;
    }
  }

  function setUpMessages() {
    newLevelScene = new Container();
    levelMessage = new Text("Level " + level + "!", font);
    levelMessage.x = 140;
    levelMessage.y = stageSize[1] / 2 - 70;

    endScene = new Container();
    endMessage = new Text("", font);
    endMessage.x = 130;
    endMessage.y = stageSize[1] / 2 - 70;

    gameOverScene = new Container();
    progressMessage = new Text("", font);
    progressMessage.x = stageSize[0] / 2 - 216;
    progressMessage.y = stageSize[1] / 2 - 170;
    replayMessage = new Text("Play again?", font);
    replayMessage.x = 94;
    replayMessage.y = 300;
    replayMessage.interactive = true;
    replayMessage.on('mousedown', replay);
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
