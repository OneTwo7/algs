interface UnionFindInstance {
  union: (firstNode: number, secondNode: number) => void;
  connected: (firstNode: number, secondNode: number) => boolean;
  find: (node: number) => number;
  count: () => number;
}

export interface UnionFind {
  new(numberOfNodes: number): UnionFindInstance;
};

export function test(Implementation: UnionFind): boolean {
  const instance = new Implementation(16);

  instance.union(1, 7);
  instance.union(2, 9);
  instance.union(15, 16);
  instance.union(7, 8);
  instance.union(1, 2);
  instance.union(10, 16);
  instance.union(9, 3);
  instance.union(7, 12);

  return instance.connected(3, 12);
}
