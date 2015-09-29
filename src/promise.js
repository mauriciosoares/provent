import i from './helpers/id';
import isFunction from './helpers/isFunction';

function Promise() {
  let callbacks = {};
  let callbackReturn;
  let reject;

  function then(id, callback) {
    if(isFunction(id)) {
      callback = id;
      id = false;
    }
    const callbackId = (this.initial) ? i() : this;

    callbacks[callbackId] = callbacks[callbackId] || [];
    callbacks[callbackId].push({
      callback,
      id
    });

    return {
      then: then.bind(callbackId),
      reject
    };
  }

  function _triggerAll(params, context) {
    for(let id in callbacks) {
      callbacks[id].forEach(triggerCallback.bind(this, params, context));
    }
  }

  function triggerCallback(params, context, callback, index) {
    callbackReturn = callback.callback.apply(context, ((index > 0) ? [callbackReturn] : params));
  }


  function setRejectContext(context) {
    reject = function(id) {
      if(id) return removeThenCallback(id);

      this.elements.forEach((element) => {
        element.removeEventListener(this.event, this.handler);
      });

      callbacks = {};
    }.bind(context);

    return reject;
  }

  function removeThenCallback(id) {
    for(let cbId in callbacks) {
      callbacks[cbId] = callbacks[cbId].reduce((newArray, item) => {
        if(id !== item.id) newArray.push(item);
        return newArray;
      }, []);
    }

    return true;
  }

  return {
    _triggerAll,
    reject,
    setRejectContext,
    then
  };
}

export default Promise;
