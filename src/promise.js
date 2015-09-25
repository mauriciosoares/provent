function Promise() {
  this.callbacks = [];
}

Promise.prototype.then = function(callback) {
  this.callbacks.push(callback);
};

Promise.prototype.trigger = function(params, context) {
  this.callbacks.forEach(this.triggerCallback.bind(this, params, context));
};

Promise.prototype.triggerCallback = function(params, context, callback) {
  callback.apply(context, params);
}

module.exports = Promise;
