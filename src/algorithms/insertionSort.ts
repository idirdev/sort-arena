import type { SortFunction } from "../types";

export const insertionSort: SortFunction = (arr, stats) => {
  const a = [...arr];
  const n = a.length;

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    while (j >= 0) {
      stats.comparisons++;
      if (a[j] <= key) break;

      a[j + 1] = a[j];
      stats.swaps++;
      j--;
    }

    a[j + 1] = key;
  }

  return a;
};
