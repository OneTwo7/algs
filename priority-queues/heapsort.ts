function less<T>(heap: T[], i: number, j: number) {
  return heap[i] < heap[j];
}

function exch<T>(heap: T[], i: number, j: number) {
  [heap[i], heap[j]] = [heap[j], heap[i]];
}

function sink<T>(heap: T[], k: number, n?: number) {
  if (!n) {
    n = heap.length - 1;
  }

  while (k * 2 <= n) {
    let j = k * 2;

    if (j < n && less(heap, j, j + 1)) {
      j++;
    }

    if (!less(heap, k, j)) {
      break;
    }

    exch(heap, k, j);
    k = j;
  }
}

function delMax<T>(heap: T[]) {
  let n = heap.length - 1;
  const max = heap[1];
  exch(heap, 1, n--);
  sink(heap, 1, n);
  heap.length = n + 1;
  return max;
}

function heapsort<T>(heap: T[]) {
  const heapClone = structuredClone(heap);
  const n = heapClone.length - 2;
  const result: T[] = new Array(n);

  for (let i = n; i >= 0; i--) {
    result[i] = delMax(heapClone);
  }

  return result;
}

const a = [null, ...'SORTEXAMPLE'.split('')];

for (let i = a.length; i > 0; i--) {
  sink(a, i);
}

console.log(`assertion #1: ${a.slice(1).join('') === 'XTSPLRAMOEE'}`);

console.log(`assertion #2: ${heapsort(a).every((item, idx, arr) => item !== null && (idx === 0 || item >= arr[idx - 1]!))}`);
