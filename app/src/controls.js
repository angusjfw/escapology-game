function setUpControls(sprite) {
  var left = [keyboard(37), keyboard(65), keyboard(72)],
    up = [keyboard(38), keyboard(87), keyboard(75)],
    right = [keyboard(39), keyboard(68), keyboard(76)],
    down = [keyboard(40), keyboard(83), keyboard(74)];

  left.forEach(function(leftKey) {
    leftKey.press = function() {
      sprite.vx = -5;
      if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
        sprite.vy = 0;
      }
    };
    
    leftKey.release = function() {
      if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !right.isDown && sprite.vy === 0) {
        sprite.vx = 0;
      }
    };
  });

  up.forEach(function(upKey) {
    upKey.press = function() {
      sprite.vy = -5;
      if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
        sprite.vx = 0;
      }
    };

    upKey.release = function() {
      if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !down.isDown && sprite.vx === 0) {
        sprite.vy = 0;
      }
    };
  });

  right.forEach(function(rightKey) {
    rightKey.press = function() {
      sprite.vx = 5;
      if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
        sprite.vy = 0;
      }
    };

    rightKey.release = function() {
      if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !left.isDown && sprite.vy === 0) {
        sprite.vx = 0;
      }
    };
  });

  down.forEach(function(downKey) {
    downKey.press = function() {
      sprite.vy = 5;
      if (!currentLevel().dungeon || !currentLevel().dungeon.isIcy) {
        sprite.vx = 0;
      }
    };

    downKey.release = function() {
      if ((!currentLevel().dungeon || !currentLevel().dungeon.isIcy) && !up.isDown && sprite.vx === 0) {
        sprite.vy = 0;
      }
    };
  });
}
