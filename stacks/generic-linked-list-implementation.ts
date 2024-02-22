class GenericNode<T> {
  item: T;
  next: GenericNode<T> | null = null;

  constructor(item: T) {
    this.item = item;
  }
}

class LinkedStack<T> {
  private first: GenericNode<T> | null = null;

  isEmpty() {
    return this.first === null;
  }

  push(item: T) {
    const oldFirst = this.first;
    this.first = new GenericNode(item);
    this.first.next = oldFirst;
  }

  pop() {
    if (this.first === null) {
      return undefined;
    }

    const item = this.first.item;
    this.first = this.first.next;
    return item;
  }

  toString() {
    const result: T[] = [];
    let node = this.first;

    while (node) {
      result.push(node.item);
      node = node.next;
    }

    return result.reverse().join(' ');
  }
}

const stringStack = new LinkedStack<string>();
const toBeString = ['to', 'be', 'or', 'not', '-', 'to', 'that', '-', 'like', '-', '-', 'damn'];
const intStack = new LinkedStack<number>();
const toBeInt = [-1, -1, 1, 2, 3, 4, -1, 5, 6, -1, 7, -1, -1, 8];

for (const entry of toBeString) {
  if (entry === '-') {
    stringStack.pop();
  } else {
    stringStack.push(entry);
  }
}

for (const entry of toBeInt) {
  if (entry === -1) {
    intStack.pop();
  } else {
    intStack.push(entry);
  }
}

console.log('string');
console.log('isEmpty: ', stringStack.isEmpty());
console.log('stack: ', stringStack.toString());

console.log('int');
console.log('isEmpty: ', intStack.isEmpty());
console.log('stack: ', intStack.toString());