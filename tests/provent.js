// in case of "no headless browser found" error, make sure you've installed
// phantomjs, and if it persists, run this command and everything might start
// working again: `rm -rf ~/.config/browser-launcher`
var test = require('prova');
var Provent = require('../src/provent.js');
var setup = require('./helpers/setup');
var tearDown = require('./helpers/tearDown');
var addLink = require('./helpers/addLink');

console.log(Provent);

test('provent::expect `then` callback to be called', function(t) {
  var link;

  setup();
  addLink();

  link = document.getElementById('link-test');
  console.log(Provent);

  Provent(link, 'click').then(function() {
    t.pass(':D');
    console.log('clicked');
  })
  // console.log(Provent);

  // Provent(link, 'click');

  link.click();

  t.end();

  tearDown();
});
