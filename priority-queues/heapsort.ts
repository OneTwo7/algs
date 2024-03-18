type PriorityQueue<T> = {
  n: number;
  heap: T[];
};

function intHalf(k: number) {
  return Math.floor(k / 2);
}

function less<T>({ heap }: PriorityQueue<T>, i: number, j: number) {
  return heap[i] < heap[j];
}

function exch<T>({ heap }: PriorityQueue<T>, i: number, j: number) {
  [heap[i], heap[j]] = [heap[j], heap[i]];
}

function swim<T>(pq: PriorityQueue<T>, k: number) {
  while (k > 1 && less(pq, intHalf(k), k)) {
    exch(pq, k, intHalf(k));
    k = intHalf(k);
  }
}

function sink<T>(pq: PriorityQueue<T>, k: number) {
  while (k * 2 <= pq.n) {
    let j = k * 2;

    if (j < pq.n && less(pq, j, j + 1)) {
      j++;
    }

    if (!less(pq, k, j)) {
      break;
    }

    exch(pq, k, j);
    k = j;
  }
}

function insert<T>(pq: PriorityQueue<T>, item: T) {
  pq.heap[++pq.n] = item;
  swim(pq, pq.n);
}

function delMax<T>(pq: PriorityQueue<T>) {
  const max = pq.heap[1];
  exch(pq, 1, pq.n--);
  sink(pq, 1);
  delete pq.heap[pq.n + 1];
  return max;
}

function heapsort<T>(pq: PriorityQueue<T>) {
  const pqClone = structuredClone(pq);
  const result: T[] = new Array(pq.n - 1);

  for (let i = pq.n - 1; i >= 0; i--) {
    result[i] = delMax(pqClone);
  }

  return result;
}

const priorityQueue: PriorityQueue<string | null> = {
  n: 0,
  heap: [null],
};

for (const char of 'SORTEXAMPLE') {
  insert(priorityQueue, char);
}

console.log(`assertion #1: ${priorityQueue.heap.slice(1).join('') === 'XSTPLRAMOEE'}`);

console.log(`assertion #2: ${heapsort(priorityQueue).every((item, idx, arr) => item !== null && (idx === 0 || item >= arr[idx - 1]!))}`);
