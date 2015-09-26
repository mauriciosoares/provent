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
