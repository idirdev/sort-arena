import type { SortFunction } from "../types";

export const quickSort: SortFunction = (arr, stats) => {
  const a = [...arr];

  function partition(low: number, high: number): number {
    // Median-of-three pivot selection
    const mid = Math.floor((low + high) / 2);
    if (a[low] > a[mid]) { [a[low], a[mid]] = [a[mid], a[low]]; stats.swaps++; }
    if (a[low] > a[high]) { [a[low], a[high]] = [a[high], a[low]]; stats.swaps++; }
    if (a[mid] > a[high]) { [a[mid], a[high]] = [a[high], a[mid]]; stats.swaps++; }

    // Use mid as pivot, move to high-1
    [a[mid], a[high - 1]] = [a[high - 1], a[mid]];
    stats.swaps++;
    const pivot = a[high - 1];

    let i = low;
    let j = high - 1;

    while (true) {
      while (true) { i++; stats.comparisons++; if (a[i] >= pivot) break; }
      while (true) { j--; stats.comparisons++; if (a[j] <= pivot) break; }

      if (i >= j) break;
      [a[i], a[j]] = [a[j], a[i]];
      stats.swaps++;
    }

    [a[i], a[high - 1]] = [a[high - 1], a[i]];
    stats.swaps++;
    return i;
  }

  function sort(low: number, high: number): void {
    if (high - low < 2) {
      // Use insertion sort for small subarrays
      if (high > low) {
        stats.comparisons++;
        if (a[low] > a[high]) {
          [a[low], a[high]] = [a[high], a[low]];
          stats.swaps++;
        }
      }
      return;
    }

    const pi = partition(low, high);
    sort(low, pi - 1);
    sort(pi + 1, high);
  }

  if (a.length > 1) sort(0, a.length - 1);
  return a;
};
