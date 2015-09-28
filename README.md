# Provent [![Build Status](https://travis-ci.org/mauriciosoares/provent.svg?branch=master)](https://travis-ci.org/mauriciosoares/provent) [![Coverage Status](https://img.shields.io/coveralls/mauriciosoares/provent.svg)](https://coveralls.io/r/mauriciosoares/provent)

Promises and Events... combined.

## Install

Install it via Bower or NPM.

```
bower install provent

npm install provent
```

## Why?

To provide a promise like syntax for attaching handlers to the DOM.

This helps you to reuse the same event for dealing with multiple stuff across your code.

```js
// old way
document.querySelector('a').addEventListener('click', function() {
  // some code
});

// Provent way
var aClick = Provent(document.querySelector('a'), 'click');
```

in the `Provent` way you can use the `aClick` variable to attach callbacks anywhere in your code, like this:

```js
var aClick = Provent(document.querySelector('a'), 'click');

aClick.then(function(event) {
  // your code
});

// lots and lots of awesome code

aClick.then(function(event) {
  // your code, again!
});
```

This way you are using the same handler created by Provent, but attaching a second callback, nice isn't it?!

Also, the `event` parameter points to the same object as the `addEventListener` callback, and so does the `this` variable as well.

## Features + Examples

* Easy syntax to reuse the same event handler multiple times

```js
var aClick = Provent(document.querySelector('a'), 'click');

aClick.then(function(event) {
  // your code
});

// lots and lots of awesome code

aClick.then(function(event) {
  // your code, again!
});
```

* Support for DOM Nodelists

```js
// I'm using querySelectorAll here.
var aClick = Provent(document.querySelectorAll('a'), 'click');
```

* Return values across the `then` method.

```js
var aClick = Provent(document.querySelector('a'), 'click');

aClick.then(function(param) {
  // param here points to the DOM event
  return true;
}).then(function(param) {
  // param here points to `true` (returned previously)
  return false;
}).then(function(param) {
  // param here points to `false` (returned previously)
});
```

* Stop a `then` callback at anytime using an ID and the `reject` method.

```js
var aClick = Provent(document.querySelector('a'), 'click');

aClick.then(function(param) {

}).then('#toDelete', function(param) { // notice the first is a "string id"
  // this callback will never be triggered;
}).then(function(param) {

});

// this will cancel the `then` method that has the `#toDelete` id
aClick.reject('#toDelete');
```

* Stop all callbacks and remove the event listener from the element using `reject` method with no parameters.

```js
var aClick = Provent(document.querySelector('a'), 'click');

aClick.then(function(param) {
  // will not be triggered
}).then(function(param) {
  // will not be triggered
}).then(function(param) {
  // will not be triggered
});

// this will remove the event listener.
aClick.reject();
```

## API

#### Provent( element, event )
Add the event listener to the element, and returns a "promise".

- `element` (DOM Reference | NodeList) the elements that will add the handler
- `event` (String) The type of event that will be added to the element (this can be any value that would work with `addEventListener`)

__usage__

```js
var aClick = Provent(document.querySelector('a'), 'click');
```

#### Provent.then( [id,] callback )
Used to attach callbacks to the element, returns the same promise with the previous returned value as parameter.

- `id` (String[Optional]) Used to remove the callback using `reject`
- `callback` (Function) The callback of the element when it's triggered

__usage__

```js
var aClick = Provent(document.querySelector('a'), 'click');

aClick.then(function(param) {
  console.log(param); // DOM event
  console.log(this); // DOM element
  return true; // value goes to the next `then` callback

}).then('#optionalId', function(param) {
  console.log(param); // true
});
```

#### Provent.reject( [thenId] )
Removes all the callbacks and the DOM event from the element.

If the `thenId` is passed, removes only the `then` callbacks that had the same id registered.

- `thenId` (String) The same id of the `then` callback that will be removed

__usage__

```js
var aClick = Provent(document.querySelector('a'), 'click');

aClick.then(function() {})
  .then('#optionalId', function() {});

aClick.reject('#optionalId'); // the second callback will be removed
aClick.reject(); // all callbacks and the event listener are removed
```

## Maintainer

- Mauricio Soares - <http://twitter.com/omauriciosoares>

## Contributing

1. [Fork](http://help.github.com/forking/) Provent
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. Send me a [Pull Request](https://help.github.com/articles/using-pull-requests)
5. That's it!

Please respect the indentation rules and code style.

## Testing

You need [NodeJS](http://nodejs.org/) installed on your machine

1. Run `npm install`
2. Run `npm test`

## Browser Support

| <img src="https://cloud.githubusercontent.com/assets/2321259/10144396/c4ae0e48-65f3-11e5-999a-2067aec38a86.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://cloud.githubusercontent.com/assets/2321259/10144401/d06d3d1c-65f3-11e5-852f-db9edc80a6b6.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://cloud.githubusercontent.com/assets/2321259/10144407/d99e6ee2-65f3-11e5-94e7-82d07cbc13d4.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://cloud.githubusercontent.com/assets/2321259/10144413/e32494fa-65f3-11e5-981d-d13a9e47f4cb.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://cloud.githubusercontent.com/assets/2321259/10144441/10ae1194-65f4-11e5-9757-a80d16ee50b7.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| latest ✔ | latest ✔ | 9+ ✔ | latest ✔ | latest ✔ |
