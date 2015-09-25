// in case of "no headless browser found" error, make sure you've installed
// phantomjs, and if it persists, run this command and everything might start
// working again: `rm -rf ~/.config/browser-launcher`
var test = require('tape');

test('beep book', function(t) {
  t.plan(2);
  t.equal(1 + 1, 2);
  t.ok(true);
});
