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
