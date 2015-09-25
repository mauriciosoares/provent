(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Promise() {
  this.callbacks = [];
}

Promise.prototype.then = function(callback) {
  this.callbacks.push(callback);
};

Promise.prototype.trigger = function() {
  console.log(this.callbacks);
  console.log(arguments);
}

module.exports = Promise;

},{}],2:[function(require,module,exports){
var Promise = require('./promise');
var toArray = require('./toArray');

function Provent(element, event) {
  if(!event) throw new Error('You must choose an event');

  var promise = new Promise();

  element.addEventListener(event, function() {
    promise.trigger.apply(promise, toArray(arguments));
  });

  return promise;
}

window.Provent = window.Provent || Provent;

},{"./promise":1,"./toArray":3}],3:[function(require,module,exports){
module.exports = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

},{}]},{},[2]);
