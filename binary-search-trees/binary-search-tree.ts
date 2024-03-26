class BSTNode<Key, Value> {
  key: Key;
  value: Value;
  left: BSTNode<Key, Value> | null;
  right: BSTNode<Key, Value> | null;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST<Key, Value> {
  private root: BSTNode<Key, Value> | null = null;

  put(key: Key, value: Value) {
    this.root = this._put(this.root, key, value);
  }

  get(key: Key) {
    let x = this.root;

    while (x) {
      if (key < x.key) {
        x = x.left;
      } else if (key > x.key) {
        x = x.right;
      } else {
        return x.value;
      }
    }

    return null;
  }

  delete(key: Key) {
    this.root = this._delete(this.root, key);
  }

  min() {
    let curr = this.root;

    while(curr?.left) {
      curr = curr.left;
    }

    return curr;
  }

  max() {
    let curr = this.root;

    while(curr?.right) {
      curr = curr.right;
    }

    return curr;
  }

  deleteMin() {
    this.root = this._deleteMin(this.root);
  }

  [Symbol.iterator]() {
    const queue: BSTNode<Key, Value>[] = [];
    
    this.inOrder(this.root, queue);

    return {
      next: () => {
        if (!queue.length) {
          return {
            done: true,
          };
        }

        return {
          done: false,
          value: queue.pop(),
        };
      },
    };
  }

  private inOrder(x: BSTNode<Key, Value> | null, q: BSTNode<Key, Value>[]) {
    if (!x) {
      return null;
    }

    this.inOrder(x.right, q);
    q.push(x);
    this.inOrder(x.left, q);
  }

  private _put(x: BSTNode<Key, Value> | null, key: Key, value: Value) {
    if (!x) {
      return new BSTNode(key, value);
    }

    if (key < x.key) {
      x.left = this._put(x.left, key, value);
    } else if (key > x.key) {
      x.right = this._put(x.right, key, value);
    } else {
      x.value = value;
    }

    return x;
  }

  private _deleteMin(x: BSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    if (!x.left) {
      return x.right;
    }

    x.left = this._deleteMin(x.left);
    return x;
  }

  private _min(x: BSTNode<Key, Value>) {
    let min = x;

    while (min.left) {
      min = min.left;
    }

    return min;
  }

  private _delete(x: BSTNode<Key, Value> | null, key: Key) {
    if (!x) {
      return null;
    }

    if (key < x.key) {
      x.left = this._delete(x.left, key);
    } else if (key > x.key) {
      x.right = this._delete(x.right, key);
    } else {
      if (!x.right) {
        return x.left;
      }

      if (!x.left) {
        return x.right;
      }

      const temp = x;
      x = this._min(temp.right!);
      x.right = this._deleteMin(temp.right);
      x.left = temp.left;
    }

    return x;
  }
}

const tree = new BST<string, number>();

tree.put('D', 11);
tree.put('B', 6);
tree.put('F', 17);
tree.put('A', 8);
tree.put('K', 6);
tree.put('C', 1);
tree.put('E', 9);
tree.put('G', 80);
tree.delete('O');
tree.delete('B');

const keys: string[] = [];

for (const node of tree) {
  keys.push(node!.key);
}

console.log(`Keys: ${keys}`);
console.log(`Min: ${tree.min()?.key}`);
console.log(`Max: ${tree.max()?.key}`);
