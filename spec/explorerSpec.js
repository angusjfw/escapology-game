describe("Explorer sprite", function() {
  var explorer;

  beforeEach(function() {
    explorer = new Explorer();
  });

  describe("defaults", function() {
    it("is stationary", function() {
      expect(explorer.vx).toEqual(0);
      expect(explorer.vy).toEqual(0);
    });

    it("is positioned at 0, 0", function() {
      expect(explorer.x).toEqual(0);
      expect(explorer.y).toEqual(0);
    });

    it("is not hit", function() {
      expect(explorer.hit).toBe(false);
    });
  });

  xit("is able to move", function() {
    explorer.vx = 1;
    explorer.move();
    expect(explorer.x).toEqual(1);
  });
});
