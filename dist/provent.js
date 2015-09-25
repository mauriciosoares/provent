(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
(function (global){
var Promise = require('./promise');
var toArray = require('./helpers/toArray');

function Provent(element, event) {
  if(!event) throw new Error('You must choose an event');

  var promise = Promise();

  element.addEventListener(event, function() {
    promise._trigger.call(promise, toArray(arguments), this);
  });

  return promise;
}

global.Provent = Provent;

module.exports = Provent;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./helpers/toArray":1,"./promise":2}]},{},[3]);
