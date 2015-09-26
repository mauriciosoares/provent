(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  return (+new Date * Math.random()).toString(36).substring(0,10);
};

},{}],2:[function(require,module,exports){
module.exports = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

},{}],3:[function(require,module,exports){
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

},{"./helpers/id":1}],4:[function(require,module,exports){
(function (global){
var Promise = require('./promise');
var toArray = require('./helpers/toArray');

function Provent(element, event) {
  if(!event) throw new Error('You must choose an event');

  var promise = Promise();
  var handler;

  element.addEventListener(event, handler = function() {
    promise._trigger.call(promise, toArray(arguments), this);
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
},{"./helpers/toArray":2,"./promise":3}]},{},[4]);
