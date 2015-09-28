module.exports = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};
