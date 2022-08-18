const makeObjectDeepCopy = (obj) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const objCopy = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value !== 'object' || value === null) {
        objCopy[key] = value;
      }

      if (typeof value === 'object' && value !== null) {
        objCopy[key] = makeObjectDeepCopy(value);
      }
    }
    return objCopy;
  }

  if (Object.prototype.toString.call(obj) === '[object Array]') {
    const arrayCopy = [];

    for (let i = 0; i < obj.length; i++) {
      const elem = obj[i];

      if (typeof elem !== 'object' || elem === null) {
        arrayCopy.push(elem);
      }

      if (typeof elem === 'object' && elem !== null) {
        arrayCopy.push(makeObjectDeepCopy(elem));
      }
    }
    return arrayCopy;
  }
  return obj;
};

const selectFromInterval = (arr, interval1, interval2) => {
  const ERROR_CONDITION_1 =
    Object.prototype.toString.call(arr) !== '[object Array]' || arr.some((elem) => Number.isNaN(parseInt(elem)));
  const ERROR_CONDITION_2 = Number.isNaN(parseInt(interval1)) || Number.isNaN(parseInt(interval2));

  if (ERROR_CONDITION_1) {
    throw new Error('Невалидное первое значение!');
  }

  if (ERROR_CONDITION_2) {
    throw new Error('Невалидный интервал!');
  } else {
    return arr.filter((elem) => {
      if (interval1 >= interval2) {
        return elem >= interval2 && elem <= interval1;
      }
      return elem >= interval1 && elem <= interval2;
    });
  }
};

const myIterable = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    let i = myIterable.from;

    return {
      next() {
        const ERROR_CONDITION_1 = !('from' in myIterable) || !('to' in myIterable);
        const ERROR_CONDITION_2 = Number.isNaN(parseInt(myIterable.from)) || Number.isNaN(parseInt(myIterable.to));
        const ERROR_CONDITION_3 = myIterable.from > myIterable.to;

        if (ERROR_CONDITION_1) {
          throw new Error('Не предоставлены значения from или to!');
        }

        if (ERROR_CONDITION_2) {
          throw new Error('from или to не являются числами!');
        }

        if (ERROR_CONDITION_3) {
          throw new Error('From не может быть больше to!');
        }

        if (i <= myIterable.to) {
          i++;
          return { value: i - 1, done: false };
        }
        return { done: true };
      },
    };
  },
};
