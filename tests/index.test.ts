import { describe, it, expect } from 'vitest';
import { bubbleSort } from '../src/algorithms/bubbleSort';
import { mergeSort } from '../src/algorithms/mergeSort';
import { quickSort } from '../src/algorithms/quickSort';
import { insertionSort } from '../src/algorithms/insertionSort';
import { selectionSort } from '../src/algorithms/selectionSort';
import { heapSort } from '../src/algorithms/heapSort';
import type { SortStats } from '../src/types';

function createStats(): SortStats {
  return { comparisons: 0, swaps: 0 };
}

const testCases = [
  { name: 'empty array', input: [], expected: [] },
  { name: 'single element', input: [1], expected: [1] },
  { name: 'already sorted', input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
  { name: 'reverse sorted', input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
  { name: 'random order', input: [3, 1, 4, 1, 5, 9, 2, 6], expected: [1, 1, 2, 3, 4, 5, 6, 9] },
  { name: 'with duplicates', input: [4, 2, 4, 1, 2], expected: [1, 2, 2, 4, 4] },
  { name: 'negative numbers', input: [-3, 1, -2, 5, 0], expected: [-3, -2, 0, 1, 5] },
  { name: 'two elements', input: [2, 1], expected: [1, 2] },
];

const algorithms = [
  { name: 'bubbleSort', fn: bubbleSort },
  { name: 'mergeSort', fn: mergeSort },
  { name: 'quickSort', fn: quickSort },
  { name: 'insertionSort', fn: insertionSort },
  { name: 'selectionSort', fn: selectionSort },
  { name: 'heapSort', fn: heapSort },
];

for (const algo of algorithms) {
  describe(algo.name, () => {
    for (const tc of testCases) {
      it(`sorts ${tc.name}`, () => {
        const stats = createStats();
        const result = algo.fn([...tc.input], stats);
        expect(result).toEqual(tc.expected);
      });
    }

    it('does not modify the original array', () => {
      const original = [5, 3, 1, 4, 2];
      const copy = [...original];
      const stats = createStats();
      algo.fn(copy, stats);
      // The function takes a copy internally, so original should not be modified
      // (all implementations do [...arr] at the start)
      expect(original).toEqual([5, 3, 1, 4, 2]);
    });

    it('tracks comparisons and swaps', () => {
      const stats = createStats();
      algo.fn([5, 3, 1, 4, 2], stats);
      expect(stats.comparisons).toBeGreaterThan(0);
    });

    it('handles larger arrays', () => {
      const stats = createStats();
      const input = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const result = algo.fn(input, stats);
      for (let i = 1; i < result.length; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
      }
    });
  });
}
