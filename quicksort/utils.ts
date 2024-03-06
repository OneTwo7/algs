export function exch<T>(a: T[], i: number, j: number) {
  const swap = a[i];
  a[i] = a[j];
  a[j] = swap;
}

export function shuffle<T>(a: T[]) {
  const { length } = a;
  let r: number;

  for (let i = 0; i < length; i++) {
    r = Math.floor(Math.random() * (i + 1));
    exch(a, i, r);
  }
}
