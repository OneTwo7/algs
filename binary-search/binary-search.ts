export function binarySearch<T>(a: Array<T>, target: T): number {
    let low = 0;
    let high = a.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (target < a[mid]) {
            high = mid - 1;
        } else if (target > a[mid]) {
            low = mid + 1;
        } else {
            return mid;
        }
    }

    return -1;
}
