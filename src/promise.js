var i = require('./helpers/id');
var isFunction = require('./helpers/isFunction');

function Promise() {
  var callbacks = {};
  var callbackReturn;
  var reject;

  function then(id, callback) {
    if(isFunction(id)) {
      callback = id;
      id = false;
    }
    var callbackId = (this.initial) ? i() : this;

    callbacks[callbackId] = callbacks[callbackId] || [];
    callbacks[callbackId].push({
      callback: callback,
      id: id
    });

    return {
      then: then.bind(callbackId),
      reject: reject
    };
  }

  function triggerAll(params, context) {
    var id;
    for(id in callbacks) {
      callbacks[id].forEach(triggerCallback.bind(this, params, context));
    }
  }

  function triggerCallback(params, context, callback, index) {
    callbackReturn = callback.callback.apply(context, ((index > 0) ? [callbackReturn] : params));
  }


  function setRejectContext(context) {
    reject = function(id) {
      if(id) return removeThenCallback(id);

      this.elements.forEach(function(element) {
        element.removeEventListener(this.event, this.handler);
      }.bind(this));

      callbacks = {};
    }.bind(context);

    return reject;
  }

  function removeThenCallback(id) {
    var cbId;
    for(cbId in callbacks) {
      callbacks[cbId] = callbacks[cbId].reduce(function(newArray, item) {
        if(id !== item.id) newArray.push(item);
        return newArray;
      }, []);
    }

    return true;
  }

  return {
    _triggerAll: triggerAll,
    reject: reject,
    setRejectContext: setRejectContext,
    then: then
  };
}


module.exports = Promise;
