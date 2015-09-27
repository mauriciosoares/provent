(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  return (+new Date * Math.random()).toString(36).substring(0,10);
};

},{}],2:[function(require,module,exports){
module.exports = function(toCheck) {
  return typeof toCheck === 'function';
};

},{}],3:[function(require,module,exports){
module.exports = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

},{}],4:[function(require,module,exports){
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
  };

  function triggerAll(params, context) {
    for(id in callbacks) {
      callbacks[id].forEach(triggerCallback.bind(this, params, context));
    }
  };

  function triggerCallback(params, context, callback, index) {
    callbackReturn = callback.callback.apply(context, ((index > 0) ? [callbackReturn] : params));
  }


  function setRejectContext(context) {
    reject = function(id) {
      if(id) return removeThenCallback(id);

      this.element.removeEventListener(this.event, this.handler);
      callbacks = {};
    }.bind(context);

    return reject;
  }

  function removeThenCallback(id) {
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
  }
}


module.exports = Promise;

},{"./helpers/id":1,"./helpers/isFunction":2}],5:[function(require,module,exports){
(function (global){
var Promise = require('./promise');
var toArray = require('./helpers/toArray');

function Provent(element, event) {
  if(!event) throw new Error('You must choose an event');

  var promise = Promise();
  var handler;

  element.addEventListener(event, handler = function() {
    promise._triggerAll.call(promise, toArray(arguments), this);
  });

  return {
    initial: true,
    then: promise.then,
    reject: promise.setRejectContext({
      element: element,
      event: event,
      handler: handler
    })
  };
}

global.Provent = Provent;

module.exports = Provent;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./helpers/toArray":3,"./promise":4}]},{},[5]);
