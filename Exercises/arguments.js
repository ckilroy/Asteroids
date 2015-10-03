var sum = function () {
  var args = Array.prototype.slice.apply(arguments);
  var total = 0;
  for (var i = 0; i < args.length; i++) {
    total += args[i];
  };
  return total;
};

Function.prototype.myBind = function (obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  console.log("args: " + args + "arguments: " + arguments)
  var fn = this;
  return function () {
    return fn.apply(obj, args);
  };
};


var curriedSum = function(numArgs) {
  var numbers = [];

  var _curriedSum = function(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      var total = 0;
      numbers.forEach( function(value) { total += value; });
      return total;
    }
    else {
      return _curriedSum;
    };
  };
  return _curriedSum;
};


Function.prototype.curry = function(numArgs) {
  var args = [];
  var fn = this;

  var _curry = function(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      console.log("args: " + args + "fn: " + fn);
      return fn.apply(null, args);
    } else {
      return _curry;
    };
  };
  return _curry;
};
