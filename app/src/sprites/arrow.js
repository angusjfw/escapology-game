function Arrow(texture) {
  PIXI.Sprite.call(this, texture);
}

Arrow.constructor = Arrow;
Arrow.prototype = Object.create(PIXI.Sprite.prototype);

Arrow.prototype.move = function() {
  this.x += this.vx;
};
