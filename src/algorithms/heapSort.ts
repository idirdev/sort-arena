import type { SortFunction } from "../types";

export const heapSort: SortFunction = (arr, stats) => {
  const a = [...arr];
  const n = a.length;

  function heapify(size: number, rootIdx: number): void {
    let largest = rootIdx;
    const left = 2 * rootIdx + 1;
    const right = 2 * rootIdx + 2;

    if (left < size) {
      stats.comparisons++;
      if (a[left] > a[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      stats.comparisons++;
      if (a[right] > a[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIdx) {
      [a[rootIdx], a[largest]] = [a[largest], a[rootIdx]];
      stats.swaps++;
      heapify(size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    stats.swaps++;
    heapify(i, 0);
  }

  return a;
};
