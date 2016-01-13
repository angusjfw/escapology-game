function HealthBar() {
  PIXI.Container.call(this);
  this.x = 0;
  this.y = 0;

  this.innerBar = new Graphics();
  this.innerBar.beginFill(0x000000);
  this.innerBar.drawRect(0, 0, 128, 8);
  this.innerBar.endFill();

  this.outerBar = new Graphics();
  this.outerBar.beginFill(0xFF3300);
  this.outerBar.drawRect(0, 0, 128, 8);
  this.outerBar.endFill();
}

HealthBar.constructor = HealthBar;
HealthBar.prototype = Object.create(PIXI.Container.prototype);
