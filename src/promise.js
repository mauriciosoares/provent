var id = require('./helpers/id');

function Promise() {
  var callbacks = {};
  var callbackReturn;

  function then(callback) {
    console.log('before');
    // console.log(Date);
    // console.log(Math);
    console.log(id());
    console.log(id());
    console.log('before2');
    var callbackId = (this.initial) ? id() : this;
    console.log(callbackId);
    console.log('after');

    callbacks[callbackId] = callbacks[callbackId] || [];
    callbacks[callbackId].push(callback);

    return {
      then: then.bind(callbackId)
    };
  };

  var prev;

  function trigger(params, context) {
    for(id in callbacks) {
      callbacks[id].forEach(triggerCallback.bind(this, params, context));
    }
  };

  function triggerCallback(params, context, callback, index) {
    callbackReturn = callback.apply(context, ((index > 0) ? [callbackReturn] : params));
  }

  return {
    _trigger: trigger,
    then: then
  }
}


module.exports = Promise;
