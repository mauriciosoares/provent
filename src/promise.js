var i = require('./helpers/id');

function Promise() {
  var callbacks = {};
  var callbackReturn;
  var reject;

  function then(callback) {
    var callbackId = (this.initial) ? i() : this;

    callbacks[callbackId] = callbacks[callbackId] || [];
    callbacks[callbackId].push(callback);

    return {
      then: then.bind(callbackId),
      reject: reject
    };
  };

  function trigger(params, context) {
    for(id in callbacks) {
      callbacks[id].forEach(triggerCallback.bind(this, params, context));
    }
  };

  function triggerCallback(params, context, callback, index) {
    callbackReturn = callback.apply(context, ((index > 0) ? [callbackReturn] : params));
  }


  function setRejectContext(context) {
    reject = function(id) {
      if(id) return;

      this.element.removeEventListener(this.event, this.handler);
      callbacks = {};
    }.bind(context);

    return reject;
  }

  return {
    _trigger: trigger,
    reject: reject,
    setRejectContext: setRejectContext,
    then: then
  }
}


module.exports = Promise;
