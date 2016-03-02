function Treasure(texture) {
  PIXI.Sprite.call(this, texture);
}

Treasure.constructor = Treasure;
Treasure.prototype = Object.create(PIXI.Sprite.prototype);

Treasure.prototype.action = function() {
  if (hitTestRectangle(explorer, treasure)) {
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }
};
