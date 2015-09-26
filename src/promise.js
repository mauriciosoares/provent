var id = require('./helpers/id');

function Promise() {
  var callbacks = [];

  function then(callback) {
    var callbackId = (this.initial) ? id() : this;

    callbacks.push(callback);

    console.log(callbackId);

    return {
      then: then.bind(callbackId)
    };
  };

  var prev;

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
