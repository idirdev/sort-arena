import type { SortFunction } from "../types";

const MIN_RUN = 32;

export const timSort: SortFunction = (arr, stats) => {
  const a = [...arr];
  const n = a.length;

  function insertionSortRange(left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const key = a[i];
      let j = i - 1;

      while (j >= left) {
        stats.comparisons++;
        if (a[j] <= key) break;
        a[j + 1] = a[j];
        stats.swaps++;
        j--;
      }
      a[j + 1] = key;
    }
  }

  function merge(left: number, mid: number, right: number): void {
    const leftArr = a.slice(left, mid + 1);
    const rightArr = a.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      stats.comparisons++;

      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        i++;
      } else {
        a[k] = rightArr[j];
        j++;
      }
      stats.swaps++;
      k++;
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j];
      j++;
      k++;
    }
  }

  function computeMinRun(n: number): number {
    let r = 0;
    while (n >= MIN_RUN) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }

  const minRun = computeMinRun(n);

  // Sort individual runs using insertion sort
  for (let start = 0; start < n; start += minRun) {
    const end = Math.min(start + minRun - 1, n - 1);
    insertionSortRange(start, end);
  }

  // Merge runs progressively
  let size = minRun;
  while (size < n) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        merge(left, mid, right);
      }
    }
    size *= 2;
  }

  return a;
};
