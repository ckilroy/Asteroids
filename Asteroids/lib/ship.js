(function() {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (args) {
    window.Asteroids.MovingObject.call(this, { color: Ship.COLOR,
      radius: Ship.RADIUS, game: args["game"]});
    this.vel = [0,0];
    this.pos = args["pos"];
  };

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "#DB2929";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function() {
    if (arguments[1]["key"] === 'up') { var impulse = 1 };
    if (arguments[1]["key"] === 'down') { var impulse = -1 };

    this.vel[0] += impulse;
    this.vel[1] += impulse;
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet({vel: this.vel,
                                              pos: this.pos,
                                              game: this.game});
    this.game.add(bullet);
  };
})();
