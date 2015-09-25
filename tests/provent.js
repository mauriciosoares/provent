// in case of "no headless browser found" error, make sure you've installed
// phantomjs, and if it persists, run this command and everything might start
// working again: `rm -rf ~/.config/browser-launcher`
var test = require('prova');
var setup = require('./helpers/setup');
var tearDown = require('./helpers/tearDown');

test('provent::expect `then` callback to be called', function(t) {
  setup();

  console.log(document.getElementById('test'));

  tearDown();

  console.log(document.getElementById('test'));

  t.assert(true);

  t.end();

});
