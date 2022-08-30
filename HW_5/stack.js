class Stack {
  constructor(maxSize) {
    this.stack = {};
    this.count = 0;
    this.maxSize = maxSize || 10;
  }

  static fromIterable(iterable) {
    if (!(typeof iterable[Symbol.iterator] === 'function')) {
      throw new Error('Неитерируемая сущность!');
    }

    const stack = new Stack();
    stack.maxSize = iterable.length;

    for (const el of iterable) {
      stack.push(el);
    }

    return stack;
  }

  push(elem) {
    if (this.count === this.maxSize) {
      throw new Error('Стэк переполнен!');
    }

    this.stack[this.count] = elem;
    this.count++;
  }

  pop() {
    if (this.count === 0) {
      throw new Error('Стэк Пуст!');
    }

    this.count--;
    const lastElement = this.stack[this.count];
    delete this.stack[this.count];
    return lastElement;
  }

  peek() {
    if (this.count === 0) {
      return null;
    }

    return this.stack[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  toArray() {
    return [...Object.values(this.stack)];
  }

  show() {
    console.log(this.stack);
  }
}

const stack1 = new Stack(2);
console.log(stack1.isEmpty());
stack1.push(123);
console.log(stack1.isEmpty());
stack1.show();
stack1.push('qweqw');
console.log(stack1.toArray());
stack1.show();
stack1.pop();
stack1.show();
stack1.pop();
stack1.show();
console.log(stack1.isEmpty());
const stack2 = Stack.fromIterable([1,2,3]);
stack2.show();


module.exports = { Stack };