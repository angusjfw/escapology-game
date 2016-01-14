function Hole(texture) {
  PIXI.Sprite.call(this, texture);
}

Hole.constructor = Hole;
Hole.prototype = Object.create(PIXI.Sprite.prototype);

Hole.prototype.action = function() {
  if (hitTestRectangle(explorer, this)) {
    healthBar.outerBar.width -= 10;
    gameScene.addChildAt(dungeon, 1);
    ladder = new Ladder(resources["images/ladder.png"].texture);
    ladder.position.set(this.x - 25, this.y - 25);
    ladder.width = 30;
    ladder.height = 30;
    gameScene.addChild(ladder);
    console.log(gameScene);
    console.log(ladder);
    gameScene.removeChild(treasure);
    hiddenTreasure = treasure;
    treasure = new Sprite();
    holes.forEach(function(hole) {
      gameScene.removeChild(hole);
    });
    hiddenHoles = holes;
    holes = [];
    ice = false;
    explorer.x = this.x + 50;
    explorer.y = this.y + 50;
  }
};
