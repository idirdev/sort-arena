import type { AlgorithmEntry, ArrayType } from "./types";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";
import { radixSort } from "./algorithms/radixSort";
import { timSort } from "./algorithms/timSort";
import { benchmarkAll, benchmarkCompare } from "./benchmark";
import { printResultsTable, printComparisonTable } from "./reporter";
import { ALL_ARRAY_TYPES } from "./generators";

const ALGORITHMS: AlgorithmEntry[] = [
  {
    name: "Bubble Sort",
    fn: bubbleSort,
    timeComplexity: { best: "O(n)", avg: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    stable: true,
  },
  {
    name: "Selection Sort",
    fn: selectionSort,
    timeComplexity: { best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    stable: false,
  },
  {
    name: "Insertion Sort",
    fn: insertionSort,
    timeComplexity: { best: "O(n)", avg: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    stable: true,
  },
  {
    name: "Merge Sort",
    fn: mergeSort,
    timeComplexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
  },
  {
    name: "Quick Sort",
    fn: quickSort,
    timeComplexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n^2)" },
    spaceComplexity: "O(log n)",
    stable: false,
  },
  {
    name: "Heap Sort",
    fn: heapSort,
    timeComplexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stable: false,
  },
  {
    name: "Radix Sort",
    fn: radixSort,
    timeComplexity: { best: "O(nk)", avg: "O(nk)", worst: "O(nk)" },
    spaceComplexity: "O(n + k)",
    stable: true,
  },
  {
    name: "Tim Sort",
    fn: timSort,
    timeComplexity: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
  },
];

function printHeader(): void {
  console.log("\n\x1b[1m\x1b[35m  SORT ARENA  \x1b[0m");
  console.log("\x1b[2mSorting Algorithm Benchmark Tool\x1b[0m\n");
}

function printUsage(): void {
  console.log("Usage:");
  console.log("  sort-arena --all [size]                    Benchmark all algorithms");
  console.log("  sort-arena --compare <algo1> <algo2>       Compare two algorithms");
  console.log("  sort-arena --full [size]                   Full benchmark (all array types)");
  console.log("  sort-arena --list                          List available algorithms");
  console.log("");
  console.log("Examples:");
  console.log("  sort-arena --all 5000");
  console.log('  sort-arena --compare "Quick Sort" "Merge Sort"');
  console.log("  sort-arena --full 10000");
}

function findAlgorithm(name: string): AlgorithmEntry | undefined {
  return ALGORITHMS.find(
    (a) => a.name.toLowerCase() === name.toLowerCase()
  );
}

function main(): void {
  printHeader();

  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }

  if (args.includes("--list")) {
    console.log("Available algorithms:\n");
    for (const algo of ALGORITHMS) {
      const stable = algo.stable ? "\x1b[32mstable\x1b[0m" : "\x1b[33munstable\x1b[0m";
      console.log(
        `  \x1b[36m${algo.name.padEnd(18)}\x1b[0m` +
        `Time: ${algo.timeComplexity.avg.padEnd(12)} ` +
        `Space: ${algo.spaceComplexity.padEnd(10)} ${stable}`
      );
    }
    return;
  }

  if (args.includes("--all")) {
    const sizeIdx = args.indexOf("--all") + 1;
    const size = sizeIdx < args.length ? parseInt(args[sizeIdx]) || 10000 : 10000;

    console.log(`Benchmarking all algorithms with array size: ${size.toLocaleString()}\n`);
    console.log("Array type: random\n");

    const results = benchmarkAll(ALGORITHMS, size, ["random"]);
    printResultsTable(results);
    return;
  }

  if (args.includes("--full")) {
    const sizeIdx = args.indexOf("--full") + 1;
    const size = sizeIdx < args.length ? parseInt(args[sizeIdx]) || 5000 : 5000;

    console.log(`Full benchmark with array size: ${size.toLocaleString()}\n`);

    for (const arrayType of ALL_ARRAY_TYPES) {
      console.log(`\n\x1b[1mArray type: ${arrayType}\x1b[0m`);
      const results = benchmarkAll(ALGORITHMS, size, [arrayType]);
      printResultsTable(results);
    }
    return;
  }

  if (args.includes("--compare")) {
    const idx = args.indexOf("--compare");
    const name1 = args[idx + 1];
    const name2 = args[idx + 2];

    if (!name1 || !name2) {
      console.error("Please provide two algorithm names to compare.");
      console.error('Example: --compare "Quick Sort" "Merge Sort"');
      return;
    }

    const algo1 = findAlgorithm(name1);
    const algo2 = findAlgorithm(name2);

    if (!algo1) { console.error(`Algorithm not found: "${name1}"`); return; }
    if (!algo2) { console.error(`Algorithm not found: "${name2}"`); return; }

    console.log(`Comparing: ${algo1.name} vs ${algo2.name}\n`);

    const sizes = [100, 500, 1000, 5000, 10000, 25000];
    const comparison = benchmarkCompare(algo1, algo2, sizes);
    printComparisonTable(comparison);
    return;
  }

  printUsage();
}

main();
