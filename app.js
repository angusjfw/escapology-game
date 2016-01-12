document.addEventListener("DOMContentLoaded", function(event) {

  var autoDetectRenderer = PIXI.autoDetectRenderer;
  var loader = PIXI.loader;
  var resources = PIXI.loader.resources;
  var Container = PIXI.Container;
  var TextureCache = PIXI.utils.TextureCache;
  var Rectangle = PIXI.Rectangle;
  var Sprite = PIXI.Sprite;
  var Text = PIXI.Text;
  var Graphics = PIXI.Graphics;

  var renderer = new autoDetectRenderer(512, 512);
  var stage = new Container();
  document.body.appendChild(renderer.view);

  loader
    .add(["images/treasureHunter.json"])
    .load(setup);

  var state, explorer, treasure, chimes, exit, player, dungeon,
      door, healthBar, message, gameScene, gameOverScene, enemies, id;

  var blobs, blob, spacing, xOffset, xBlob, yBlob, speed, direction;

  function setup() {
    gameScene = new Container();
    stage.addChild(gameScene);
    setupSprites(gameScene);

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

    state = play;
    gameLoop();
  }

  function setupSprites(gameScene) {
    id = resources["images/treasureHunter.json"].textures;

    dungeon = new Sprite(id["dungeon.png"]);
    gameScene.addChild(dungeon);

    door = new Sprite(id["door.png"]);
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

  function gameLoop(){
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
  }

  function play() {
    explorer.move();
    //Contain the explorer inside the area of the dungeon
    contain(explorer, {x: 28, y: 10, width: 488, height: 480});
    //contain(explorer, stage);
    //Set `explorerHit` to `false` before checking for a collision
    explorer.hit = false;
    //Loop through all the sprites in the `enemies` array
    blobs.forEach(function(blob) {
      //Move the blob
      blob.y += blob.vy;
      //Check the blob's screen boundaries
      var blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
      //If the blob hits the top or bottom of the stage, reverse
      //its direction
      if (blobHitsWall === "top" || blobHitsWall === "bottom") {
        blob.vy *= -1;
      }
      //Test for a collision. If any of the enemies are touching
      //the explorer, set `explorerHit` to `true`
      if(hitTestRectangle(explorer, blob)) {
        explorer.hit = true;
      }
    });

    if(explorer.hit) {
      //Make the explorer semi-transparent
      explorer.alpha = 0.5;
      //Reduce the width of the health bar's inner rectangle by 1 pixel
      healthBar.outer.width -= 1;
    } else {
      //Make the explorer fully opaque (non-transparent) if it hasn't been hit
      explorer.alpha = 1;
    }
    //Check for a collision between the explorer and the treasure
    if (hitTestRectangle(explorer, treasure)) {
      //If the treasure is touching the explorer, center it over the explorer
      treasure.x = explorer.x + 8;
      treasure.y = explorer.y + 8;
    }
    //Does the explorer have enough health? If the width of the `innerBar`
    //is less than zero, end the game and display "You lost!"
    if (healthBar.outer.width < 0) {
      state = end;
      message.text = "You lost!";
    }
    //If the explorer has brought the treasure to the exit,
    //end the game and display "You won!"
    if (hitTestRectangle(treasure, door)) {
      state = end;
      message.text = "You won!";
    }
  }

  function end() {
    gameScene.visible = false;
    gameOverScene.visible = true;
  }
});
