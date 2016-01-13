function setUpControls(sprite) {
  var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vx = -5;
  };

  left.release = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vx = slow(sprite.vx, 1);
  };

  up.press = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vy = -5;
  };

  up.release = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vy = slow(sprite.vy, 1);
  };

  right.press = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vx = 5;
  };
  
  right.release = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vx = slow(sprite.vx, -1);
  };

  down.press = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vy = 5;
  };

  down.release = function() {
    console.log(sprite.vx, sprite.vy);
    sprite.vy = slow(sprite.vy, -1);
  };
}

function slow(velocity, direction) {
  if (velocity < 0 && 0 < direction) {
    console.log('slowing!');
    return velocity += 1;
  }
  if (direction < 0 && 0 < velocity) {
    console.log('slowing!');
    return velocity -= 1;
  }
}
