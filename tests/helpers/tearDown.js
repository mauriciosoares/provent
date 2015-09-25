module.exports = function setup() {
  var div = document.getElementById('test');
  div.parentNode.removeChild(div);
}
