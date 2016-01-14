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
  console.log(treasure);
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
  level3.setUp();
}

level4 = new Level();
function level4Setup() {
  level4.dungeon = iceDungeon;
  ice = true;
  level4.numberBlobs = 4;
  level4.blobSpacing = 60;
  level4.blobXOffset = 150;
  level4.blobSpeed = 2;
  level4.setUp();
}

