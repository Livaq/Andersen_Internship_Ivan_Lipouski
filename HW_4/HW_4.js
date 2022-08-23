class Calculator {
  constructor(num1, num2) {
    const errorCondition = Number.isNaN(parseInt(num1)) || Number.isNaN(parseInt(num2));

    if (errorCondition) {
      throw new Error('Невалидное значение!');
    }

    this.setX(num1);
    this.setY(num2);
    this.logSum = this.logSum.bind(this);
    this.logMul = this.logMul.bind(this);
    this.logSub = this.logSub.bind(this);
    this.logDiv = this.logDiv.bind(this);
  }

  setX(newNum1) {
    if (Number.isNaN(parseInt(newNum1))) {
      throw new Error('Значение 1 невалидно');
    }

    this.num1 = newNum1;
  }

  setY(newNum2) {
    if (Number.isNaN(parseInt(newNum2))) {
      throw new Error('Значение 2 невалидно');
    }

    this.num2 = newNum2;
  }

  logSum() {
    console.log(this.num1 + this.num2);
  }

  logMul() {
    console.log(this.num1 * this.num2);
  }

  logSub() {
    console.log(this.num1 - this.num2);
  }

  logDiv() {
    if (this.num2 === 0) {
      throw new Error('Невозможно делить на ноль!');
    }

    console.log(this.num1 / this.num2);
  }
}

function concatStrings(string, separator) {
  return function (nextStr) {
    if (nextStr === undefined) {
      return string;
    }

    if (typeof nextStr !== 'string') {
      return concatStrings(string, separator);
    }

    if (typeof separator === 'string') {
      return concatStrings(`${string}${separator}${nextStr}`, separator);
    }

    return concatStrings(`${string}${nextStr}`, separator);
  };
}