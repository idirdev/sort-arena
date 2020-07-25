import type { SortFunction } from "../types";

export const mergeSort: SortFunction = (arr, stats) => {
  const a = [...arr];

  function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      stats.comparisons++;
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
      stats.swaps++;
    }

    while (i < left.length) {
      result.push(left[i]);
      i++;
    }

    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    return result;
  }

  function sort(array: number[]): number[] {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = sort(array.slice(0, mid));
    const right = sort(array.slice(mid));

    return merge(left, right);
  }

  return sort(a);
};
