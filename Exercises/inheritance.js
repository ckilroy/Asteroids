Function.prototype.inherits = function (parentClass) {
  var Surrogate = function() {};
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
};

var Animal = function(color) {
  this.color = color;
};

Animal.prototype.breathe = function() { return "breathe!"; };

var Cat = function(color, name) {
  this.color = color;
  this.name = name;
}

Cat.inherits(Animal);

Cat.prototype.meow = function() { return "meow!"; };

var sennacy = new Cat("orange", "Sennacy");

console.log(sennacy.breathe());
console.log(sennacy.meow());
