module.exports = function() {
  return (+new Date * Math.random()).toString(36).substring(0,10);
};
