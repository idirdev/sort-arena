export interface SortStats {
  comparisons: number;
  swaps: number;
}

export interface SortFunction {
  (arr: number[], stats: SortStats): number[];
}

export interface BenchmarkResult {
  algorithm: string;
  arraySize: number;
  arrayType: string;
  timeMs: number;
  comparisons: number;
  swaps: number;
  memoryKB: number;
  verified: boolean;
}

export interface AlgorithmEntry {
  name: string;
  fn: SortFunction;
  timeComplexity: { best: string; avg: string; worst: string };
  spaceComplexity: string;
  stable: boolean;
}

export type ArrayType = "random" | "sorted" | "reversed" | "nearly-sorted" | "few-unique";
