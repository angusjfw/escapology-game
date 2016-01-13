describe("HealthBar container", function() {
  var healthBar;

  beforeEach(function() {
    healthBar = new HealthBar();
  });

  describe("defaults", function() {
    it("is positioned at 0, 0", function() {
      expect(healthBar.x).toEqual(0);
      expect(healthBar.y).toEqual(0);
    });
  });
});
