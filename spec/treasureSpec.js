describe("Treasure sprite", function() {
  var treasure;

  beforeEach(function() {
    treasure = new Treasure();
  });

  describe("defaults", function() {
    it("is positioned at 0, 0", function() {
      expect(treasure.x).toEqual(0);
      expect(treasure.y).toEqual(0);
    });
  });
});
