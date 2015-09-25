# Provent

API Definition

var bodyClick = Provent(document.body, 'click'); // 'click' may also be an array of events: ['click', 'mouseover']

// logs on click
bodyClick.then(function() {
  console.log('clicked');
});

// logs on click
bodyClick.then('identifier', function() {
  console.log('clicked');
});
// unsubscribe to the identifier callback
bodyClick.forget('identifier');

// unsubscribe to all callbacks, and unatach the event to the DOM
bodyClick.forget();


// Provent.all([body, div], {
//   atLeast: 3
// }).then(function() {

// })


// if 2 thens are concatenated, the result of the subsequent shoud be the return of the previous
bodyClick.then(function(val) {
  val // event
  return true;
}).then(function(val) {
  val // true
}).then(function(val) {
  val // undefined
})



Add the capability to track previous events -- is it gonna be usefull? maybe not :/
bodyClick.allThen(function() {

});
