var Promise = require('./promise');
var toArray = require('./helpers/toArray');

function Provent(elements, event) {
  if(!event) throw new Error('You must choose an event');

  var promise = Promise();
  var handler;

  if(elements.length) elements = toArray(elements);
  else elements = [elements];


  if(!elements.length) return;

  elements.forEach(function(element) {
    element.addEventListener(event, handler = function() {
      promise._triggerAll.call(promise, toArray(arguments), this);
    });
  })

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

global.Provent = Provent;

module.exports = Provent;
