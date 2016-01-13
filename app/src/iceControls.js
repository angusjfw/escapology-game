function setUpIceControls(sprite) {
    left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = function() {
    sprite.vx = -5;
  };

  up.press = function() {
    sprite.vy = -5;
  };

  right.press = function() {
    sprite.vx = 5;
  };

  down.press = function() {
    sprite.vy = 5;
  };

  left.release = function() {};
  up.release = function() {};
  right.release = function() {};
  down.release = function() {};
}

function unsetKeys() {
  [left, up, right, down].forEach(function(key) {
    window.removeEventListener("keydown", key.upHandler.bind(key));
    window.removeEventListener("keyup", key.upHandler.bind(key));
  });
}
