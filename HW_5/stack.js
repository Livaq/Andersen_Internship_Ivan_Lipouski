class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(maxSize) {
    this.first = null;
    this.last = null;
    this.size = 0;

    if (Number.isNaN(parseInt(maxSize)) && maxSize !== undefined) {
      throw new Error('invalid size');
    }

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

  push(value) {
    if (this.size === this.maxSize) {
      throw new Error('Stack exceeds max capacity!');
    }

    const newNode = new Node(value);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const prevNode = this.first;
      this.first = newNode;
      this.first.next = prevNode;
    }

    this.size++;
  }

  pop() {
    if (!this.first) {
      throw new Error('Stack is empty!');
    }

    const prevNode = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first.next;
    this.size--;
    return prevNode.value;
  }

  peek() {
    if (!this.first) {
      return null;
    }

    return this.first.value;
  }

  isEmpty() {
    return !this.first;
  }

  toArray() {
    const arr = [];

    if (this.first) {
      const fillArray = (elem) => {
        arr.push(elem.value);

        if (elem.next !== null) {
          fillArray(elem.next);
        }
      };

      fillArray(this.first);
      return arr.reverse();
    }

    return [];
  }
}

module.exports = { Stack, Node };
