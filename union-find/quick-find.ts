class QuickFind {
    private nodes: number[];

    constructor(num: number) {
        this.nodes = new Array(num);

        for (let i = 0; i < num; i++) {
            this.nodes[i] = i;
        }
    }

    connected(firstIndex: number, secondIndex: number) {
        return this.nodes[firstIndex] === this.nodes[secondIndex];
    }

    union(firstIndex: number, secondIndex: number) {
        if (this.connected(firstIndex, secondIndex)) {
            return;
        }

        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] === this.nodes[firstIndex]) {
                this.nodes[i] = this.nodes[secondIndex];
            }
        }
    }
}
