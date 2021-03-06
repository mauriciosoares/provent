(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Provent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function () {
  return (+new Date() * Math.random()).toString(36).substring(0, 10);
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function (toCheck) {
  return typeof toCheck === 'function';
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersId = require('./helpers/id');

var _helpersId2 = _interopRequireDefault(_helpersId);

var _helpersIsFunction = require('./helpers/isFunction');

var _helpersIsFunction2 = _interopRequireDefault(_helpersIsFunction);

function Promise() {
  var callbacks = {};
  var callbackReturn = undefined;
  var reject = undefined;

  function then(id, callback) {
    if ((0, _helpersIsFunction2['default'])(id)) {
      callback = id;
      id = false;
    }
    var callbackId = this.initial ? (0, _helpersId2['default'])() : this;

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

  function _triggerAll(params, context) {
    for (var id in callbacks) {
      callbacks[id].forEach(triggerCallback.bind(this, params, context));
    }
  }

  function triggerCallback(params, context, callback, index) {
    callbackReturn = callback.callback.apply(context, index > 0 ? [callbackReturn] : params);
  }

  function setRejectContext(context) {
    reject = (function (id) {
      var _this = this;

      if (id) return removeThenCallback(id);

      this.elements.forEach(function (element) {
        element.removeEventListener(_this.event, _this.handler);
      });

      callbacks = {};
    }).bind(context);

    return reject;
  }

  function removeThenCallback(id) {
    for (var cbId in callbacks) {
      callbacks[cbId] = callbacks[cbId].reduce(function (newArray, item) {
        if (id !== item.id) newArray.push(item);
        return newArray;
      }, []);
    }

    return true;
  }

  return {
    _triggerAll: _triggerAll,
    reject: reject,
    setRejectContext: setRejectContext,
    then: then
  };
}

exports['default'] = Promise;
module.exports = exports['default'];

},{"./helpers/id":1,"./helpers/isFunction":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

var _helpersToArray = require('./helpers/toArray');

var _helpersToArray2 = _interopRequireDefault(_helpersToArray);

function Provent(elements, event) {
  if (!event) throw new Error('You must choose an event');

  var promise = (0, _promise2['default'])();
  var handler = undefined;

  if (elements.length) elements = (0, _helpersToArray2['default'])(elements);else elements = [elements];

  if (!elements.length) return;

  elements.forEach(function (element) {
    element.addEventListener(event, handler = function () {
      promise._triggerAll.call(promise, (0, _helpersToArray2['default'])(arguments), this);
    });
  });

  return {
    initial: true,
    then: promise.then,
    reject: promise.setRejectContext({
      elements: elements,
      event: event,
      handler: handler
    })
  };
}

exports['default'] = Provent;
module.exports = exports['default'];

},{"./helpers/toArray":3,"./promise":4}]},{},[5])(5)
});