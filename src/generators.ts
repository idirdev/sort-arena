import type { ArrayType } from "./types";

/**
 * Generate a random array of the given size with values in [1, size * 10].
 */
export function generateRandom(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * size * 10) + 1);
}

/**
 * Generate an already-sorted array: [1, 2, 3, ..., size].
 */
export function generateSorted(size: number): number[] {
  return Array.from({ length: size }, (_, i) => i + 1);
}

/**
 * Generate a reverse-sorted array: [size, size-1, ..., 1].
 */
export function generateReversed(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i);
}

/**
 * Generate a nearly-sorted array: sorted, then ~5% of elements are swapped.
 */
export function generateNearlySorted(size: number): number[] {
  const arr = generateSorted(size);
  const swapCount = Math.max(1, Math.floor(size * 0.05));

  for (let i = 0; i < swapCount; i++) {
    const a = Math.floor(Math.random() * size);
    const b = Math.floor(Math.random() * size);
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }

  return arr;
}

/**
 * Generate an array with few unique values (only 5 distinct values).
 */
export function generateFewUnique(size: number): number[] {
  const values = [1, 2, 3, 4, 5];
  return Array.from({ length: size }, () =>
    values[Math.floor(Math.random() * values.length)]
  );
}

/**
 * Get a generator function by array type name.
 */
export function getGenerator(type: ArrayType): (size: number) => number[] {
  switch (type) {
    case "random":
      return generateRandom;
    case "sorted":
      return generateSorted;
    case "reversed":
      return generateReversed;
    case "nearly-sorted":
      return generateNearlySorted;
    case "few-unique":
      return generateFewUnique;
  }
}

export const ALL_ARRAY_TYPES: ArrayType[] = [
  "random",
  "sorted",
  "reversed",
  "nearly-sorted",
  "few-unique",
];
