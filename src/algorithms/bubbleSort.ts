import type { SortFunction } from "../types";

export const bubbleSort: SortFunction = (arr, stats) => {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++;

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        stats.swaps++;
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return a;
};
