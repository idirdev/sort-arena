import type { SortFunction } from "../types";

export const selectionSort: SortFunction = (arr, stats) => {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      stats.swaps++;
    }
  }

  return a;
};
