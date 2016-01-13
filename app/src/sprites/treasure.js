function Treasure(texture) {
  PIXI.Sprite.call(this, texture);
}

Treasure.constructor = Treasure;
Treasure.prototype = Object.create(PIXI.Sprite.prototype);
