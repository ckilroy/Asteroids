(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function (args) {
    window.Asteroids.MovingObject.call(this, { color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      vel: window.Asteroids.Util.randomVec(), game: args["game"]});
    this.pos = args["pos"];
  };

  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.COLOR = "#963CD2";
  Asteroid.RADIUS = 30;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Ship) {
      otherObject.relocate();
    }
    if (otherObject instanceof window.Asteroids.Bullet) {
      this.game.remove(this);
      this.game.remove(otherObject);
    };
  };

})();
