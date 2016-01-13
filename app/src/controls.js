function setUpControls(sprite) {
  var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = function() {
    sprite.vx = -5;
    sprite.vy = 0;
  };
  
  left.release = function() {
    if (!right.isDown && sprite.vy === 0) {
      sprite.vx = 0;
    }
  };

  up.press = function() {
    sprite.vy = -5;
    sprite.vx = 0;
  };

  up.release = function() {
    if (!down.isDown && sprite.vx === 0) {
      sprite.vy = 0;
    }
  };

  right.press = function() {
    sprite.vx = 5;
    sprite.vy = 0;
  };

  right.release = function() {
    if (!left.isDown && sprite.vy === 0) {
      sprite.vx = 0;
    }
  };

  down.press = function() {
    sprite.vy = 5;
    sprite.vx = 0;
  };

  down.release = function() {
    if (!up.isDown && sprite.vx === 0) {
      sprite.vy = 0;
    }
  };
}
