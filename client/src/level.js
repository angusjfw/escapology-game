function Level() {
  this.gameScene = new Container();
  this.doorPosition = [32, 0];
  this.explorerX = 32;
  this.explorerY = 0;
  this.explorerFriction = 0.05;
  this.treasureX = 436;
  this.treasureY = 440;
  this.numberBlobs = 0;
  this.blobSpacing = 48;
  this.blobXOffset = 102;
  this.blobSpeed = 2;
  this.numberArrows = 0;
  this.arrowSpacing = 100;
  this.arrowYOffset = 46;
  this.arrowSpeed = 3;
  this.arrowDelay = 9999;
  this.holePositions = [];
  this.holeSizes = [];
}

var arrowMaker = 0;

Level.prototype.populate = function() {
  blobs = [];
  arrows = [];
  holes = [];
  door.position.set(this.doorPosition[0], this.doorPosition[1]);
  explorer.x = this.explorerX;
  explorer.y = this.explorerY;
  explorer.vx = 0;
  explorer.vy = 0;
  explorer.friction = this.explorerFriction;
  treasure.x = this.treasureX;
  treasure.y = this.treasureY;
  healthBar.position.set(stageSize[0] - 170, 6);
  healthBar.addChild(healthBar.innerBar);
  healthBar.addChild(healthBar.outerBar);
  this.dungeon = window[this.dungeon];
  this.gameScene.addChild(this.dungeon);
  this.gameScene.addChild(door);
  this.gameScene.addChild(treasure);
  this.gameScene.addChild(healthBar);
  this.createHoles(this.holePositions);
  this.createBlobWave(this.numberBlobs);
  clearInterval(arrowMaker);
  this.createArrowWave(this.numberArrows);
  that = this;
  arrowMaker = setInterval(function() {
    that.createArrowWave(that.numberArrows);
  }, this.arrowDelay);
  this.gameScene.addChild(explorer);
};

Level.prototype.createHoles = function(positions){
  for (var i = 0; i < positions.length; i++) {
    hole = new Hole(resources["images/hole.png"].texture);
    hole.position.set(positions[i][0], positions[i][1]);
    hole.width = this.holeSizes[i][0];
    hole.height = this.holeSizes[i][1];
    hole.positionHitbox();
    holes.push(hole);
    this.gameScene.addChild(hole);
  }
};

Level.prototype.createBlob = function(i) {
  blob = new Blob(id["blob.png"]);
  blob.x = this.blobSpacing * i + this.blobXOffset;
  blob.y = randomInt(0, stageSize[1] - blob.height);
  blob.vy = (i % 2 === 0) ? this.blobSpeed:-this.blobSpeed;
  blobs.push(blob);
  this.gameScene.addChild(blob);
};

Level.prototype.createBlobWave = function(number) {
  for (var i = 0; i < number; i++) {
    this.createBlob(i);
  }
};

Level.prototype.createArrow = function(x, y) {
  arrow = new Arrow(resources["images/arrow.png"].texture);
  arrow.width = 40;
  arrow.height = 10;
  arrow.position.set(x, y);
  arrow.vx = this.arrowSpeed;
  arrows.push(arrow);
  this.gameScene.addChild(arrow);
};

Level.prototype.createArrowWave = function(number){
  for (var i = 0; i < number; i++) {
    this.createArrow(20, this.arrowYOffset+(i*this.arrowSpacing));
  }
};
