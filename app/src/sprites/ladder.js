function Ladder(texture) {
  PIXI.Sprite.call(this, texture);
}

Ladder.constructor = Ladder;
Ladder.prototype = Object.create(PIXI.Sprite.prototype);

Ladder.prototype.action = function() {
  if (hitTestRectangle(explorer, this)) {
    //explorer.x -= 30;
    //explorer.y -= 30;
    currentLevel().dungeon = hiddenDungeon;
    gameScene.removeChild(dungeon);
    holes = hiddenHoles;
    holes.forEach(function(hole) {
      gameScene.addChildAt(hole, 2);
    });
    treasure = hiddenTreasure;
    gameScene.addChild(treasure);
    gameScene.addChild(door);
    gameScene.removeChild(ladder);
    gameScene.removeChild(explorer);
    gameScene.addChild(explorer);
    ladder = undefined;
  }
};
