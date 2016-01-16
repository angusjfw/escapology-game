function Hole(texture) {

  PIXI.Sprite.call(this, texture);
  this.hitbox = new PIXI.Sprite();
  this.addChild(this.hitbox);
}

Hole.constructor = Hole;
Hole.prototype = Object.create(PIXI.Sprite.prototype);

Hole.prototype.action = function() {
  if (hitTestRectangle(explorer, this.hitbox)) {
    healthBar.damage(20);
    this.switchScene();
    explorer.x = this.x + 30;
    explorer.y = this.y + 30;
  }
};

Hole.prototype.switchScene = function(){
  gameScene.removeChild(treasure);
  hiddenTreasure = treasure;
  treasure = new Treasure();
  gameScene.removeChild(door);
  holes.forEach(function(hole) {
    gameScene.removeChild(hole);
  });
  hiddenHoles = holes;
  holes = [];
  hiddenDungeon = currentLevel().dungeon;
  currentLevel().dungeon = dungeon;
  gameScene.addChildAt(dungeon, 1);
  ladder = new Ladder(resources["images/ladder.png"].texture);
  ladder.position.set(this.x - 35, this.y - 30);
  ladder.width = 30;
  ladder.height = 30;
  gameScene.addChild(ladder);
};

Hole.prototype.positionHitbox = function() {
  this.hitbox.x = this.x + (this.width * 0.18);
  this.hitbox.y = this.y + (this.height * 0.18);
  this.hitbox.width = this.width * 0.64;
  this.hitbox.height = this.height * 0.64;
};
