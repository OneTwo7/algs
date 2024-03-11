class MaxPQ<T> {
  private pq: T[] = [];
  private n = 0;

  isEmpty() {
    return this.n === 0;
  }

  insert(key: T) {
    this.pq[++this.n] = key;
    this.swim(this.n);
  }

  delMax() {
    const max = this.pq[1];
    this.exch(1, this.n--);
    this.sink(1);
    this.pq.length = this.n + 1;
    return max;
  }

  toString() {
    return this.pq.slice(1).join('');
  }

  private swim(k: number) {
    while (k > 1 && this.less(this.intHalf(k), k)) {
      this.exch(k, this.intHalf(k));
      k = this.intHalf(k);
    }
  }

  private sink(k: number) {
    while (k * 2 <= this.n) {
      let j = k * 2;

      if (j < this.n && this.less(j, j + 1)) {
        j++;
      }

      if (!this.less(k, j)) {
        break;
      }

      this.exch(k, j);
      k = j;
    }
  }

  private intHalf(k: number) {
    return Math.floor(k / 2);
  }

  private less(i: number, j: number) {
    return this.pq[i] < this.pq[j];
  }

  private exch(i: number, j: number) {
    [this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]];
  }
}

const heap = new MaxPQ<string>();

console.log(`assertion #1: ${heap.isEmpty() === true}`);

heap.insert('T');
heap.insert('P');
heap.insert('R');
heap.insert('N');
heap.insert('H');
heap.insert('O');
heap.insert('A');
heap.insert('E');
heap.insert('I');
heap.insert('G');

console.log(`assertion #2: ${heap.toString() === 'TPRNHOAEIG'}`);
console.log(`assertion #3: ${heap.isEmpty() === false}`);

heap.insert('S');

console.log(`assertion #4: ${heap.toString() === 'TSRNPOAEIGH'}`);

heap.delMax();

console.log(`assertion #5: ${heap.toString() === 'SPRNHOAEIG'}`);

heap.delMax();

console.log(`assertion #6: ${heap.toString() === 'RPONHGAEI'}`);

heap.insert('S');

console.log(`assertion #7: ${heap.toString() === 'SRONPGAEIH'}`);
