function Level() {
  this.gameScene = new Container();
  this.doorPosition = [32, 0];
  this.explorerX = 32;
  this.explorerY = 0;
  this.treasureX = 436;
  this.treasureY = 244;
  this.numberBlobs = 0;
  this.blobSpacing = 48;
  this.blobXOffset = 102;
  this.blobSpeed = 2;
  this.numberArrows = 0;
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
    hole.hitbox.x = hole.x + (hole.width * 0.17);
    hole.hitbox.y = hole.y + (hole.height * 0.17);
    hole.hitbox.width = hole.width * 0.66;
    hole.hitbox.height = hole.height * 0.66;
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
  arrow.width = 20;
  arrow.height = 40;
  arrow.rotation = 1.6;
  arrow.position.set(x, y);
  arrow.vx = this.arrowSpeed;
  arrows.push(arrow);
  this.gameScene.addChild(arrow);
};

Level.prototype.createArrowWave = function(number){
  for (var i = 0; i < number; i++) {
    this.createArrow(20, 60+(i*100));
  }
};
