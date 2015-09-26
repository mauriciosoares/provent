(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  return (+new Date * Math.random()).toString(36).substring(0,10);
};

},{}],2:[function(require,module,exports){
module.exports = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

},{}],3:[function(require,module,exports){
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

},{"./helpers/id":1}],4:[function(require,module,exports){
(function (global){
var Promise = require('./promise');
var toArray = require('./helpers/toArray');

function Provent(element, event) {
  if(!event) throw new Error('You must choose an event');

  var promise = Promise();

  element.addEventListener(event, function() {
    promise._trigger.call(promise, toArray(arguments), this);
  });

  return {
    then: promise.then,
    initial: true
  };
}

global.Provent = Provent;

module.exports = Provent;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./helpers/toArray":2,"./promise":3}]},{},[4]);
