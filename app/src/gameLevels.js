level1 = new Level();
function level1Setup() {
  level1.dungeon = dungeon;
  level1.explorerX = 68;
  level1.explorerY = stageSize[1] / 2 - explorer.height / 2; 
  level1.numberBlobs = 6;
  level1.blobSpacing = 48;
  level1.blobXOffset = 150;
  level1.blobSpeed = 2;
  level1.setUp();
}

level2 = new Level();
function level2Setup(){
  level2.dungeon = dungeon;
  level2.numberArrows = 5;
  level2.arrowSpeed = 3;
  level2.arrowDelay = 800;
  level2.setUp();
}

level3 = new Level();
function level3Setup() {
  level3.dungeon = iceDungeon;
  ice = true;
  level3.numberBlobs = 4;
  level3.blobSpacing = 60;
  level3.blobXOffset = 150;
  level3.blobSpeed = 2;
  level3.setUp();
  console.log(hole);
}

level4 = new Level();
function level4Setup() {
  level4.dungeon = iceDungeon;
  ice = true;
  level4.holePositions = [[55, 260], [ 240, 45], [330, 330]];
  level4.holeSizes = [[180, 180], [130, 130], [100, 100]];
  level4.setUp();
}
