function Door(texture) {
  PIXI.Sprite.call(this, texture);
}

Door.constructor = Door;
Door.prototype = Object.create(PIXI.Sprite.prototype);
