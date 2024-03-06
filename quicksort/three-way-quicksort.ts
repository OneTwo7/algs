import { exch, shuffle } from "./utils";

function compare<T>(a: T, b: T) {
  if (a < b) {
    return -1;
  }

  if (a === b) {
    return 0;
  }

  return 1;
}

function threeWaySortArray<T>(a: T[], lo: number, hi: number) {
  if (hi <= lo) {
    return;
  }

  let lt = lo;
  let gt = hi;
  const v = a[lo];
  let i = lo;
  let cmp = 0;

  while (i <= gt) {
    cmp = compare(a[i], v);

    if (cmp < 0) {
      exch(a, lt++, i++);
    } else if (cmp > 0) {
      exch(a, i, gt--);
    } else {
      i++;
    }
  }

  threeWaySortArray(a, lo, lt - 1);
  threeWaySortArray(a, gt + 1, hi);
}

function threeWayQuicksort<T>(a: T[]) {
  shuffle(a);
  threeWaySortArray(a, 0, a.length - 1);
}

const numArray = new Array(100000).fill(0).map(() => Math.random());

threeWayQuicksort(numArray);

console.log(`isSorted:`, numArray.every((num, idx) => idx === 0 || numArray[idx - 1] <= num));
