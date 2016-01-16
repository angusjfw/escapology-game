function Arrow(texture) {
  PIXI.Sprite.call(this, texture);
}

Arrow.constructor = Arrow;
Arrow.prototype = Object.create(PIXI.Sprite.prototype);

Arrow.prototype.action = function() {
  this.x += this.vx;
  var arrowHitsWall = contain(this, {x: 12, y: 10, width: 580, height: 480});
  if (arrowHitsWall === "right" || arrowHitsWall === "left") {
    this.vx = 0;
  }

  if (hitTestRectangle(explorer, this)) {
    healthBar.damage(3);
    explorer.hit = true;
  }
};
