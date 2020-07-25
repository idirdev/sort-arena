import type { AlgorithmEntry, BenchmarkResult, SortStats, ArrayType } from "./types";
import { getGenerator } from "./generators";

/**
 * Verify that an array is sorted in ascending order.
 */
function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

/**
 * Benchmark a single algorithm on a specific array type and size.
 * Runs the sort, measures time, counts comparisons/swaps, and verifies correctness.
 */
export function benchmarkOne(
  algo: AlgorithmEntry,
  arrayType: ArrayType,
  size: number
): BenchmarkResult {
  const generator = getGenerator(arrayType);
  const input = generator(size);

  const stats: SortStats = { comparisons: 0, swaps: 0 };

  // Measure memory before
  const memBefore = process.memoryUsage().heapUsed;

  // Measure time
  const startTime = performance.now();
  const result = algo.fn(input, stats);
  const endTime = performance.now();

  // Measure memory after
  const memAfter = process.memoryUsage().heapUsed;
  const memoryKB = Math.max(0, (memAfter - memBefore) / 1024);

  const timeMs = endTime - startTime;
  const verified = isSorted(result) && result.length === input.length;

  return {
    algorithm: algo.name,
    arraySize: size,
    arrayType,
    timeMs: parseFloat(timeMs.toFixed(3)),
    comparisons: stats.comparisons,
    swaps: stats.swaps,
    memoryKB: parseFloat(memoryKB.toFixed(1)),
    verified,
  };
}

/**
 * Run benchmarks for all algorithms on all array types for a given size.
 */
export function benchmarkAll(
  algorithms: AlgorithmEntry[],
  size: number,
  arrayTypes: ArrayType[] = ["random"]
): BenchmarkResult[] {
  const results: BenchmarkResult[] = [];

  for (const arrayType of arrayTypes) {
    for (const algo of algorithms) {
      // Skip O(n^2) algorithms for very large inputs
      if (size > 50_000 && ["Bubble Sort", "Selection Sort", "Insertion Sort"].includes(algo.name)) {
        results.push({
          algorithm: algo.name,
          arraySize: size,
          arrayType,
          timeMs: -1,
          comparisons: -1,
          swaps: -1,
          memoryKB: 0,
          verified: false,
        });
        continue;
      }

      results.push(benchmarkOne(algo, arrayType, size));
    }
  }

  return results;
}

/**
 * Run a head-to-head comparison between two algorithms across multiple sizes.
 */
export function benchmarkCompare(
  algo1: AlgorithmEntry,
  algo2: AlgorithmEntry,
  sizes: number[] = [100, 1000, 5000, 10000],
  arrayType: ArrayType = "random"
): Array<{ size: number; results: [BenchmarkResult, BenchmarkResult] }> {
  return sizes.map((size) => ({
    size,
    results: [
      benchmarkOne(algo1, arrayType, size),
      benchmarkOne(algo2, arrayType, size),
    ],
  }));
}
