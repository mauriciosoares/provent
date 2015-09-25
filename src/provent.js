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

window.Provent = window.Provent || Provent;
