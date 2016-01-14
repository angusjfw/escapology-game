function Hole(texture) {
  PIXI.Sprite.call(this, texture);
}

Hole.constructor = Hole;
Hole.prototype = Object.create(PIXI.Sprite.prototype);

Hole.prototype.action = function() {
  if (hitTestRectangle(explorer, this)) {
    healthBar.outerBar.width -= 10;
    this.switchScene();
    explorer.x = this.x + 50;
    explorer.y = this.y + 50;
  }
};

Hole.prototype.switchScene = function(){
  gameScene.removeChild(treasure);
  hiddenTreasure = treasure;
  treasure = new Treasure();
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
