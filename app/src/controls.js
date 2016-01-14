function setUpControls(sprite) {
  var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = function() {
    sprite.vx = -5;
    //adding check if defined. do for all. if undefined act as if not icy.
    if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
      sprite.vy = 0;
    }
  };
  
  left.release = function() {
    if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !right.isDown && sprite.vy === 0) {
      sprite.vx = 0;
    }
  };

  up.press = function() {
    sprite.vy = -5;
    if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
      sprite.vx = 0;
    }
  };

  up.release = function() {
    if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !down.isDown && sprite.vx === 0) {
      sprite.vy = 0;
    }
  };

  right.press = function() {
    sprite.vx = 5;
    if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
      sprite.vy = 0;
    }
  };

  right.release = function() {
    if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !left.isDown && sprite.vy === 0) {
      sprite.vx = 0;
    }
  };

  down.press = function() {
    sprite.vy = 5;
    if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
      sprite.vx = 0;
    }
  };

  down.release = function() {
    if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !up.isDown && sprite.vx === 0) {
      sprite.vy = 0;
    }
  };
}
