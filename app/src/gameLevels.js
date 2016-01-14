level1 = new Level();
function level1Setup() {
  level1.dungeon = dungeon;
  level1.door = door;
  level1.doorPosition = [32, 0];
  level1.explorerX = 68;
  level1.explorerY = stageSize[1] / 2 - explorer.height / 2; 
  level1.treasureX = stageSize[0] - treasure.width - 48;
  level1.treasureY = stageSize[1] / 2 - treasure.height / 2;
  level1.numberBlobs = 6;
  level1.blobSpacing = 48;
  level1.blobXOffset = 150;
  level1.blobSpeed = 2;
  level1.setUp();
}

level2 = new Level();
function level2Setup(){
  level2.dungeon = dungeon;
  level2.door = door;
  level2.doorPosition = [32, 0];
  level2.explorerX = 32;
  level2.explorerY = 0; 
  level2.treasureX = stageSize[0] - treasure.width - 48;
  level2.treasureY = stageSize[1] / 2 - treasure.height / 2;
  level2.numberArrows = 5;
  level2.arrowSpeed = 3;
  level2.arrowDelay = 800;
  level2.setUp();
}

level3 = new Level();
function level3Setup() {
  level3.dungeon = iceDungeon;
  ice = true;
  level3.door = door;
  level3.doorPosition = [32, 0];
  level3.explorerX = 32;
  level3.explorerY = 0; 
  level3.treasureX = stageSize[0] - treasure.width - 48;
  level3.treasureY = stageSize[1] / 2 - treasure.height / 2;
  level3.setUp();
}
