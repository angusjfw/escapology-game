function Treasure(texture) {
  PIXI.Sprite.call(this, texture);
  this.x = 0;
  this.y = 0;
}

Treasure.constructor = Treasure;
Treasure.prototype = Object.create(PIXI.Sprite.prototype);
