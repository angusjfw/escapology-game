function Dungeon(texture) {
  PIXI.Sprite.call(this, texture);
}

Dungeon.constructor = Dungeon;
Dungeon.prototype = Object.create(PIXI.Sprite.prototype);
