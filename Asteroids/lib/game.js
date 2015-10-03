(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new window.Asteroids.Ship({pos: this.randomPosition(), game: this});
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 4;

  Game.prototype.addAsteroids = function() {
    while(this.asteroids.length < Game.NUM_ASTEROIDS) {
      this.add(new window.Asteroids.Asteroid({pos: this.randomPosition(),
                                              game: this}));
    };
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);
    return [x, y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];

    if (x <= 0) {
      x += Game.DIM_X
    } else if (x >= Game.DIM_X) {
      x -= Game.DIM_X
    };

    if (y <= 0) {
      y += Game.DIM_Y
    } else if (y >= Game.DIM_Y) {
      y -= Game.DIM_Y
    };

    return [x, y];
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.allObjects().length; i++) {
      for(var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        };
      };
    };
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof window.Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    };
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof window.Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    };
  };

  Game.prototype.allObjects = function() {
    var allObjects = this.asteroids.slice();
    allObjects.push(this.ship);
    return allObjects.concat(this.bullets);
  };

  Game.prototype.isOutOfBounds = function(pos) {
    (pos[0] < 0 || pos[0] > Game.DIM_X) || (pos[1] < 0 || pos[1] > Game.DIM_Y)
  };
})();
