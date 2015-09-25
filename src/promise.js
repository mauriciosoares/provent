function Promise() {
  this.callbacks = [];
}

Promise.prototype.then = function(callback) {
  this.callbacks.push(callback);
};

Promise.prototype.trigger = function() {
  console.log(this.callbacks);
  console.log(arguments);
}

module.exports = Promise;
