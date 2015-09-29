import Promise from './promise';
import toArray from './helpers/toArray';

function Provent(elements, event) {
  if(!event) throw new Error('You must choose an event');

  let promise = Promise();
  let handler;

  if(elements.length) elements = toArray(elements);
  else elements = [elements];


  if(!elements.length) return;

  elements.forEach((element) => {
    element.addEventListener(event, handler = function() {
      promise._triggerAll.call(promise, toArray(arguments), this);
    });
  });

  return {
    initial: true,
    then: promise.then,
    reject: promise.setRejectContext({
      elements,
      event,
      handler
    })
  };
}

export default Provent;
