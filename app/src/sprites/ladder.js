function Ladder(texture) {
  PIXI.Sprite.call(this, texture);
}

Ladder.constructor = Ladder;
Ladder.prototype = Object.create(PIXI.Sprite.prototype);

Ladder.prototype.action = function() {
  if (hitTestRectangle(explorer, this)) {
    ice = true;
    explorer.x -= 30;
    explorer.y -= 30;
    gameScene.removeChild(dungeon);
    holes = hiddenHoles;
    holes.forEach(function(hole) {
      gameScene.addChild(hole);
    });
    treasure = hiddenTreasure;
    gameScene.addChild(treasure);
    gameScene.removeChild(ladder);
    ladder = undefined;
  }
};
