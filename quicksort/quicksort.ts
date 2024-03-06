import { exch, shuffle } from "./utils";

function less<T>(a: T, b: T) {
  return a < b;
}

function partition<T>(a: T[], lo: number, hi: number) {
  let i = lo;
  let j = hi + 1;

  while (true) {
    while (less(a[++i], a[lo])) {
      if (i === hi) {
        break;
      }
    }

    while (less(a[lo], a[--j])) {
      if (j === lo) {
        break;
      }
    }

    if (i >= j) {
      break;
    }

    exch(a, i, j);
  }

  exch(a, lo, j);
  return j;
}

function sortArray<T>(a: T[], lo: number, hi: number) {
  if (hi <= lo) {
    return;
  }

  const j = partition(a, lo, hi);

  sortArray(a, lo, j - 1);
  sortArray(a, j + 1, hi);
}

function quicksort<T>(a: T[]) {
  shuffle(a);
  sortArray(a, 0, a.length - 1);
}

const stringArray = ['K', 'R', 'A', 'T', 'E', 'L', 'E', 'P', 'U', 'I', 'M', 'Q', 'C', 'X', 'O', 'S'];

quicksort(stringArray);

console.log(stringArray);
