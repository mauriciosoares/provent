module.exports = function setup() {
  var div = document.getElementById('test');
  var a = document.createElement('a');
  a.id = 'link-test';

  div.appendChild(a);
}
