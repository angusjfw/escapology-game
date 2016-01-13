function HealthBar() {
  PIXI.Container.call(this);
  this.x = 0;
  this.y = 0;
}

HealthBar.constructor = HealthBar;
HealthBar.prototype = Object.create(PIXI.Container.prototype);
