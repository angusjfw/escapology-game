level1 = new Level();
level1.setUp = function() {
  level1.dungeon = "dungeon";
  level1.explorerX = 68;
  level1.explorerY = stageSize[1] / 2 - explorer.height / 2; 
  level1.numberBlobs = 7;
  level1.populate();
};

level2 = new Level();
level2.setUp = function(){
  level2.dungeon = "dungeon";
  level2.numberArrows = 5;
  level2.arrowDelay = 1000;
  level2.populate();
};

level3 = new Level();
level3.setUp = function() {
  level3.dungeon = "iceDungeon";
  level3.numberBlobs = 5;
  level3.blobSpacing = 60;
  level3.blobXOffset = 130;
  level3.populate();
};

level4 = new Level();
level4.setUp = function() {
  level4.dungeon = "iceDungeon";
  level4.holePositions = [[55, 250], [ 240, 45], [330, 330]];
  level4.holeSizes = [[200, 200], [130, 130], [100, 100]];
  level4.populate();
};

level5 = new Level();
level5.setUp = function() {
  level5.dungeon = "dungeon";
  level5.numberBlobs = 7;
  level5.numberArrows = 5;
  level5.arrowDelay = 1800;
  level5.populate();
};

level6 = new Level();
level6.setUp = function() {
  level6.dungeon = "iceDungeon";
  level6.explorerFriction = 0.07;
  level6.numberBlobs = 4;
  level6.blobSpacing = 60;
  level6.blobXOffset = 150;
  level6.numberArrows = 5;
  level6.arrowDelay = 2000;
  level6.holePositions = [[180, 200]];
  level6.holeSizes = [[150, 150]];
  level6.populate();
};

level7 = new Level();
level7.setUp = function() {
  level7.dungeon = "iceDungeon";
  level7.explorerFriction = 0.08;
  level7.holePositions = [[35, 220], [65, 70], [330, 32], [230,280], [165, 115], [200, 425], [330, 330], [335, 165]];
  level7.holeSizes = [[100, 100], [28, 28], [50, 50], [32, 32], [66, 66], [47, 47], [80, 80], [70, 70]];
  level7.populate();
};
