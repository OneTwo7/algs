const RED = true;
const BLACK = false;

class RedBlackBSTNode<Key, Value> {
  key: Key;
  value: Value;
  left: RedBlackBSTNode<Key, Value> | null;
  right: RedBlackBSTNode<Key, Value> | null;
  color: boolean;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = false;
  }
}

class RedBlackBST<Key, Value> {
  private root: RedBlackBSTNode<Key, Value> | null = null;

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
    if (!this.root) {
      return;
    }

    if (!this._isRed(this.root.left) && !this._isRed(this.root.right)) {
      this.root.color = RED;
    }

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
    if (!this.root) {
      return;
    }

    if (!this._isRed(this.root.left) && !this._isRed(this.root.right)) {
      this.root.color = RED;
    }

    this.root = this._deleteMin(this.root);
  }

  [Symbol.iterator]() {
    const queue: RedBlackBSTNode<Key, Value>[] = [];
    
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

  private inOrder(x: RedBlackBSTNode<Key, Value> | null, q: RedBlackBSTNode<Key, Value>[]) {
    if (!x) {
      return null;
    }

    this.inOrder(x.right, q);
    q.push(x);
    this.inOrder(x.left, q);
  }

  private _put(x: RedBlackBSTNode<Key, Value> | null, key: Key, value: Value) {
    if (!x) {
      return new RedBlackBSTNode(key, value);
    }

    if (key < x.key) {
      x.left = this._put(x.left, key, value);
    } else if (key > x.key) {
      x.right = this._put(x.right, key, value);
    } else {
      x.value = value;
    }

    return this._balance(x);
  }

  private _deleteMin(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    if (!x.left) {
      return null;
    }

    if (!this._isRed(x.left) && !this._isRed(x.right)) {
      x = this._moveRedLeft(x);
    }

    if (!x) {
      return null;
    }

    x.left = this._deleteMin(x.left);

    return this._balance(x);
  }

  private _min(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    let min = x;

    while (min.left) {
      min = min.left;
    }

    return min;
  }

  private _delete(x: RedBlackBSTNode<Key, Value> | null, key: Key) {
    if (!x) {
      return null;
    }

    if (key < x.key) {
      if (!this._isRed(x.left) && !this._isRed(x.left?.left)) {
        x = this._moveRedLeft(x);
      }

      if (!x) {
        return null;
      }

      x.left = this._delete(x.left, key);
    } else {
      if (this._isRed(x.left)) {
        x = this._rotateRight(x);
      }

      if (!x) {
        return null;
      }

      if (x.key === key && x.right === null) {
        return null;
      }

      if (!this._isRed(x.right) && !this._isRed(x.right?.left)) {
        x = this._moveRedRight(x);
      }

      if (!x) {
        return null;
      }

      if (x.key === key) {
        const minRight = this._min(x.right);

        if (!minRight) {
          return null;
        }

        x.key = minRight.key;
        x.value = minRight.value;
        x.right = this._deleteMin(x.right);
      } else {
        x.right = this._delete(x.right, key);
      }
    }

    return this._balance(x);
  }

  private _isRed(x?: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return false;
    }

    return x.color === RED;
  }

  private _rotateLeft(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    const right = x.right;

    if (!right) {
      return null;
    }

    x.right = right.left;
    right.left = x;
    right.color = x.color;
    x.color = RED;

    return right;
  }

  private _rotateRight(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    const left = x.left;

    if (!left) {
      return null;
    }

    x.left = left.right;
    left.right = x;
    left.color = x.color;
    x.color = RED;

    return left;
  }

  private _flipColors(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return;
    }

    x.color = !x.color;

    if (x.left) {
      x.left.color === !x?.left.color;
    }

    if (x.right) {
      x.right.color = !x.right.color;
    }
  }

  private _moveRedLeft(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    this._flipColors(x);

    if (this._isRed(x.right?.left)) {
      x.right = this._rotateRight(x.right);
      x = this._rotateLeft(x);
      this._flipColors(x);
    }

    return x;
  }

  private _moveRedRight(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    this._flipColors(x);

    if (this._isRed(x.left?.left)) {
      x = this._rotateRight(x);
      this._flipColors(x);
    }

    return x;
  }

  private _balance(x: RedBlackBSTNode<Key, Value> | null) {
    if (!x) {
      return null;
    }

    if (this._isRed(x.right) && !this._isRed(x.left)) {
      x = this._rotateLeft(x);
    }

    if (this._isRed(x?.left) && this._isRed(x?.right)) {
      x = this._rotateRight(x);
    }

    if (this._isRed(x?.left) && this._isRed(x?.right)) {
      this._flipColors(x);
    }

    return x;
  }
}

const redBlackTree = new RedBlackBST<string, number>();

redBlackTree.put('D', 11);
redBlackTree.put('B', 6);
redBlackTree.put('F', 17);
redBlackTree.put('A', 8);
redBlackTree.put('K', 6);
redBlackTree.put('C', 1);
redBlackTree.put('E', 9);
redBlackTree.put('G', 80);
redBlackTree.delete('O');
redBlackTree.delete('B');

const redBlackKeys: string[] = [];

for (const node of redBlackTree) {
  redBlackKeys.push(node!.key);
}

console.log(`Keys: ${redBlackKeys}`);
console.log(`Min: ${redBlackTree.min()?.key}`);
console.log(`Max: ${redBlackTree.max()?.key}`);
