class Calculator {
  constructor(previousOperandText, currentOperandText, memory) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.memory = memory;
    this.allClear();
    this.updateDisplay();
  }

  allClear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.memoryClear();
  }

  memoryAdd() {
    const prev = this.memory;
    const current = this.currentOperand;

    if (!current) {
      return;
    }

    if (prev.innerText === '') {
      prev.innerText = parseFloat(current);
    } else {
      prev.innerText = parseFloat(prev.innerText) + parseFloat(current);
    }
  }

  memorySubtract() {
    const prev = this.memory;
    const current = this.currentOperand;

    if (!current) {
      return;
    }

    if (prev.innerText === '') {
      prev.innerText = -parseFloat(current);
    } else {
      prev.innerText = parseFloat(prev.innerText) - parseFloat(current);
    }
  }

  memoryClear() {
    this.memory.innerText = '';
  }

  memoryRecall() {
    if (this.memory.innerText === '') {
      return;
    }

    this.currentOperand = this.memory.innerText;
  }

  reverse() {
    if (this.currentOperand === '' || this.currentOperand === '0') {
      return;
    }

    this.currentOperand = -this.currentOperand;
  }

  delete() {
    const lastDeleted = this.currentOperand.toString().slice(0, -1);

    if (lastDeleted === '') {
      this.currentOperand = '0';
    } else {
      this.currentOperand = lastDeleted;
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    if (number !== '.' && this.currentOperand === '0') {
      this.currentOperand = '';
      this.currentOperand = this.currentOperand.toString() + number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      this.operation = operation;
      return;
    }

    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    let string;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    const sum = (prev + current).toFixed(8).toString();
    const subtraction = (prev - current).toFixed(8).toString();
    const multiplication = (prev * current).toFixed(8).toString();
    const division = (prev / current).toFixed(8).toString();

    const cutZeroes = (str) => {
      string = str;

      if (str.includes('.') && str.slice(-1) === '0') {
        string = str.slice(0, -1);
        cutZeroes(string);
      }

      if (str.slice(-1) === '.') {
        string = str.slice(0, -1);
      }

      return string;
    };

    if (Number.isNaN(prev) || Number.isNaN(current)) {
      return;
    }

    switch (this.operation) {
      case '+':
        computation = cutZeroes(sum);
        break;

      case '-':
        computation = cutZeroes(subtraction);
        break;

      case '*':
        computation = cutZeroes(multiplication);
        break;

      case '÷':
        if (current === 0) {
          alert('Нельзя делить на 0');
          return;
        }

        computation = cutZeroes(division);
        break;

      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;

    if (this.operation !== undefined) {
      this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const reverseButton = document.querySelector('[data-reverse]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const previousOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');
const memory = document.querySelector('[data-memory]');

const memoryClearButton = document.querySelector('[data-memoty-clear]');
const memoryRecallButton = document.querySelector('[data-memory-recall]');
const memoryAddButton = document.querySelector('[data-memory-add]');
const memorySubtractButton = document.querySelector('[data-memory-subtract]');

const calculator = new Calculator(previousOperandText, currentOperandText, memory);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

reverseButton.addEventListener('click', () => {
  calculator.reverse();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateDisplay();
});

memoryClearButton.addEventListener('click', () => {
  calculator.memoryClear();
});

memoryRecallButton.addEventListener('click', () => {
  calculator.memoryRecall();
  calculator.updateDisplay();
});

memoryAddButton.addEventListener('click', () => {
  calculator.memoryAdd();
});

memorySubtractButton.addEventListener('click', () => {
  calculator.memorySubtract();
});
