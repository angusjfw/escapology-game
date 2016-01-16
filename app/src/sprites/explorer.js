function Explorer(texture) {
  PIXI.Sprite.call(this, texture);
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.hit = false;
  this.friction = 0.05;
}

Explorer.constructor = Explorer;
Explorer.prototype = Object.create(PIXI.Sprite.prototype);

Explorer.prototype.action = function() {
  this.x += this.vx;
  this.y += this.vy;

  if (currentLevel().dungeon.isIcy) {
    applyFriction(explorer, this.friction);
  }

  contain(this, {x: 28, y: 10, width: 488, height: 480});

  if (this.hit) {
    this.alpha = 0.5;
  } else {
    this.alpha = 1;
  }
  this.hit = false;
};
