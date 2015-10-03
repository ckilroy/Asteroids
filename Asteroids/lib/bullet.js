(function() {

  window.Asteroids = window.Asteroids || {}

  var Bullet = window.Asteroids.Bullet = function (args) {
    window.Asteroids.MovingObject.call(this, { color: Bullet.COLOR,
      radius: Bullet.RADIUS, vel: [5,5], game: args["game"]});
    this.pos = args["pos"];
  }

  window.Asteroids.Util.inherits(Bullet, window.Asteroids.MovingObject);

  Bullet.COLOR = "#3333FF"
  Bullet.RADIUS = 5

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    };
  };

  Bullet.prototype.isWrappable = false;
})();
