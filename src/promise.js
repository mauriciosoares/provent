function Promise() {
  var callbacks = [];

  function then(callback) {
    callbacks.push(callback);

    return then;
  };

  function trigger(params, context) {
    callbacks.forEach(triggerCallback.bind(this, params, context));
  };

  function triggerCallback(params, context, callback) {
    callback.apply(context, params);
  }

  return {
    _trigger: trigger,
    then: then
  }
}


module.exports = Promise;
