Array.prototype.myFilter = function (callbackFunc, thisArg) {
  const arr = [];

  for (let i = 0; i < this.length; i++) {
    if (callbackFunc.call(thisArg, this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
};

const createDebounceFunction = (callbackFunc, delay) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callbackFunc.apply(null, args), delay);
  };
};
