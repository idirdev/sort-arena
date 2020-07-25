import type { SortFunction } from "../types";

export const radixSort: SortFunction = (arr, stats) => {
  const a = [...arr];
  if (a.length <= 1) return a;

  // Handle negative numbers by separating them
  const negatives = a.filter((n) => n < 0).map((n) => -n);
  const positives = a.filter((n) => n >= 0);

  function radixSortPositive(input: number[]): number[] {
    if (input.length === 0) return input;

    let maxVal = input[0];
    for (let i = 1; i < input.length; i++) {
      stats.comparisons++;
      if (input[i] > maxVal) maxVal = input[i];
    }

    let exp = 1;
    const result = [...input];

    while (Math.floor(maxVal / exp) > 0) {
      const buckets: number[][] = Array.from({ length: 10 }, () => []);

      for (let i = 0; i < result.length; i++) {
        const digit = Math.floor(result[i] / exp) % 10;
        buckets[digit].push(result[i]);
        stats.swaps++;
      }

      let idx = 0;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
          result[idx] = buckets[i][j];
          stats.swaps++;
          idx++;
        }
      }

      exp *= 10;
    }

    return result;
  }

  const sortedPositives = radixSortPositive(positives);
  const sortedNegatives = radixSortPositive(negatives).reverse().map((n) => -n);

  return [...sortedNegatives, ...sortedPositives];
};
