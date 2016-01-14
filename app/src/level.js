function Level() {
  this.gameScene = new Container();
  this.doorPosition = [0, 0];
  this.explorerX = 0;
  this.explorerY = 0;
  this.treasureX = 0;
  this.treasureY = 0;
  this.numberBlobs = 0;
  this.blobSpacing = 0;
  this.blobXOffset = 0;
  this.blobSpeed = 0;
  this.numberArrows = 0;
  this.arrowSpeed = 0;
  this.arrowDelay = 9999;
}

var arrowMaker = 0;

Level.prototype.setUp = function() {
  blobs = [];
  arrows = [];
  door.position.set(this.doorPosition[0], this.doorPosition[1]);
  explorer.x = this.explorerX;
  explorer.y = this.explorerY;  
  treasure.x = this.treasureX;
  treasure.y = this.treasureY;
  healthBar.position.set(stageSize[0] - 170, 6);
  healthBar.addChild(healthBar.innerBar);
  healthBar.addChild(healthBar.outerBar);
  this.gameScene.addChild(this.dungeon);
  this.gameScene.addChild(this.door);
  this.gameScene.addChild(explorer);
  this.gameScene.addChild(treasure);
  this.gameScene.addChild(healthBar);
  this.createBlobWave(this.numberBlobs);
  clearInterval(arrowMaker);
  this.createArrowWave(this.numberArrows);
  that = this;
  arrowMaker = setInterval(function() {
    that.createArrowWave(that.numberArrows);
  }, this.arrowDelay);
};

Level.prototype.createBlob = function(i) {
  blob = new Blob(id["blob.png"]);
  blob.x = this.blobSpacing * i + this.blobXOffset;
  blob.y = randomInt(0, stageSize[1] - blob.height);
  blob.vy = this.blobSpeed * (i % 2 === 0) ? 1:-1;
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
