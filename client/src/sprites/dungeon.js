function Dungeon(texture, isIcy) {
  PIXI.Sprite.call(this, texture);
  this.isIcy = isIcy;
}

Dungeon.constructor = Dungeon;
Dungeon.prototype = Object.create(PIXI.Sprite.prototype);
