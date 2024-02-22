class StackNode {
  item: string;
  next: StackNode | null = null;

  constructor(item: string) {
    this.item = item;
  }
}

class LinkedStackOfStrings {
  private first: StackNode | null = null;

  isEmpty() {
    return this.first === null;
  }

  push(item: string) {
    const oldFirst = this.first;
    this.first = new StackNode(item);
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
    const result: string[] = [];
    let node = this.first;

    while (node) {
      result.push(node.item);
      node = node.next;
    }

    return result.reverse().join(' ');
  }
}

const stack = new LinkedStackOfStrings();
const toBe = ['to', 'be', 'or', 'not', '-', 'to', 'that', '-', 'like', '-', '-', 'damn'];

for (const entry of toBe) {
  if (entry === '-') {
    stack.pop();
  } else {
    stack.push(entry);
  }
}

console.log('isEmpty: ', stack.isEmpty());
console.log('stack: ', stack.toString());
