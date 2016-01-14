function Explorer(texture) {
  PIXI.Sprite.call(this, texture);
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.hit = false;
}

Explorer.constructor = Explorer;
Explorer.prototype = Object.create(PIXI.Sprite.prototype);

Explorer.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
  if (currentLevel().dungeon.isIcy) {
    applyFriction(explorer, 0.05);
  }
  contain(this, {x: 28, y: 10, width: 488, height: 480});
  explorer.hit = false;
};
