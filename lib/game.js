(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.fishies = [];
    this.addFish();
    this.ship = new window.Asteroids.Ship({pos: this.randomPosition(), game: this});
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  // Game.NUM_FISHIES = 4;

  Game.prototype.addFish = function() {
    while(this.fishies.length < Game.NUM_FISHIES) {
      this.add(new window.Asteroids.Fish({pos: this.randomPosition(),
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
    if (obj instanceof window.Asteroids.Fish) {
      this.fishies.push(obj);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    };
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof window.Asteroids.Fish) {
      this.fishies.splice(this.fishies.indexOf(obj), 1);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    };
  };

  Game.prototype.allObjects = function() {
    var allObjects = this.fishies.slice();
    allObjects.push(this.ship);
    return allObjects.concat(this.bullets);
  };

  Game.prototype.isOutOfBounds = function(pos) {
    (pos[0] < 0 || pos[0] > Game.DIM_X) || (pos[1] < 0 || pos[1] > Game.DIM_Y)
  };
})();