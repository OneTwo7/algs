class QueueNode {
  item: string;
  next: QueueNode | null = null;

  constructor(item: string) {
    this.item = item;
  }
}

class LinkedQueueOfStrings {
  private first: QueueNode | null = null;
  private last: QueueNode | null = null;

  isEmpty() {
    return this.first === null;
  }

  enqueue(item: string) {
    const oldLast = this.last;
    this.last = new QueueNode(item);
    this.last.next = null;

    if (this.isEmpty()) {
      this.first = this.last;
    } else {
      oldLast!.next = this.last;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.first!.item;
    this.first = this.first!.next;

    if (this.isEmpty()) {
      this.last = null;
    }

    return item;
  }

  toString() {
    const result: string[] = [];
    let node = this.first;

    while (node) {
      result.push(node.item);
      node = node.next;
    }

    return result.join(' ');
  }
}

const queue = new LinkedQueueOfStrings();
const toBe2 = ['-', '-', 'to', 'be', 'or', 'not', '-', 'to', 'that', '-', 'like', '-', '-', 'damn'];

for (const entry of toBe2) {
  if (entry === '-') {
    queue.dequeue();
  } else {
    queue.enqueue(entry);
  }
}

console.log('isEmpty: ', queue.isEmpty());
console.log('queue: ', queue.toString());
