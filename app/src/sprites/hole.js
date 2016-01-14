function Hole(texture) {
  PIXI.Sprite.call(this, texture);
}

Hole.constructor = Hole;
Hole.prototype = Object.create(PIXI.Sprite.prototype);

Hole.prototype.action = function() {
  if (hitTestRectangle(explorer, this)) {
    explorer.x = this.x + 50;
    explorer.y = this.y + 50;
  }
};
