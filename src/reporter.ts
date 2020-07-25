import type { BenchmarkResult } from "./types";

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgRed: "\x1b[41m",
};

/**
 * Format a number with commas for readability.
 */
function formatNum(n: number): string {
  if (n < 0) return "skipped";
  return n.toLocaleString("en-US");
}

/**
 * Format time in ms with color coding.
 */
function formatTime(ms: number): string {
  if (ms < 0) return `${COLORS.dim}skipped${COLORS.reset}`;
  if (ms < 1) return `${COLORS.green}${ms.toFixed(3)}ms${COLORS.reset}`;
  if (ms < 100) return `${COLORS.yellow}${ms.toFixed(2)}ms${COLORS.reset}`;
  if (ms < 1000) return `${COLORS.red}${ms.toFixed(1)}ms${COLORS.reset}`;
  return `${COLORS.red}${(ms / 1000).toFixed(2)}s${COLORS.reset}`;
}

/**
 * Draw a horizontal bar using block characters.
 */
function drawBar(value: number, maxValue: number, width: number = 30): string {
  if (value < 0 || maxValue <= 0) return COLORS.dim + "-".repeat(width) + COLORS.reset;
  const filled = Math.round((value / maxValue) * width);
  const bar = "█".repeat(filled) + "░".repeat(width - filled);

  if (value / maxValue < 0.33) return COLORS.green + bar + COLORS.reset;
  if (value / maxValue < 0.66) return COLORS.yellow + bar + COLORS.reset;
  return COLORS.red + bar + COLORS.reset;
}

/**
 * Print a results table for benchmark output.
 */
export function printResultsTable(results: BenchmarkResult[]): void {
  if (results.length === 0) {
    console.log("No results to display.");
    return;
  }

  const maxTime = Math.max(...results.map((r) => r.timeMs).filter((t) => t >= 0));

  const nameWidth = Math.max(15, ...results.map((r) => r.algorithm.length)) + 2;

  // Header
  console.log("");
  console.log(
    `${COLORS.bold}${"Algorithm".padEnd(nameWidth)}` +
    `${"Time".padStart(12)}  ` +
    `${"Comparisons".padStart(14)}  ` +
    `${"Swaps".padStart(14)}  ` +
    `${"Memory".padStart(10)}  ` +
    `${"OK".padStart(4)}  ` +
    `Bar${COLORS.reset}`
  );
  console.log("─".repeat(nameWidth + 12 + 14 + 14 + 10 + 4 + 34 + 10));

  // Rows
  for (const r of results) {
    const ok = r.verified
      ? `${COLORS.green}yes${COLORS.reset}`
      : r.timeMs < 0
      ? `${COLORS.dim} - ${COLORS.reset}`
      : `${COLORS.red} NO${COLORS.reset}`;

    const line =
      `${COLORS.cyan}${r.algorithm.padEnd(nameWidth)}${COLORS.reset}` +
      `${formatTime(r.timeMs).padStart(22)}  ` +
      `${formatNum(r.comparisons).padStart(14)}  ` +
      `${formatNum(r.swaps).padStart(14)}  ` +
      `${r.memoryKB >= 0 ? r.memoryKB.toFixed(1) + "KB" : "   -"}`.padStart(10) +
      `  ${ok}  ` +
      drawBar(r.timeMs, maxTime);

    console.log(line);
  }

  console.log("─".repeat(nameWidth + 12 + 14 + 14 + 10 + 4 + 34 + 10));

  // Fastest
  const validResults = results.filter((r) => r.timeMs >= 0);
  if (validResults.length > 0) {
    const fastest = validResults.reduce((a, b) => (a.timeMs < b.timeMs ? a : b));
    console.log(
      `\n${COLORS.green}${COLORS.bold}Fastest: ${fastest.algorithm}${COLORS.reset} ` +
      `(${fastest.timeMs.toFixed(3)}ms, ${formatNum(fastest.comparisons)} comparisons, ${formatNum(fastest.swaps)} swaps)`
    );
  }
}

/**
 * Print comparison results between two algorithms.
 */
export function printComparisonTable(
  comparisons: Array<{ size: number; results: [BenchmarkResult, BenchmarkResult] }>
): void {
  console.log("");
  console.log(
    `${COLORS.bold}${"Size".padStart(10)}  ` +
    `${"".padEnd(18)}Time        ` +
    `${"".padEnd(18)}Time        ` +
    `Winner${COLORS.reset}`
  );

  if (comparisons.length > 0) {
    const [r1, r2] = comparisons[0].results;
    console.log(
      `${"".padStart(10)}  ` +
      `${COLORS.cyan}${r1.algorithm.padEnd(18)}${COLORS.reset}${"".padStart(12)}` +
      `${COLORS.magenta}${r2.algorithm.padEnd(18)}${COLORS.reset}`
    );
  }

  console.log("─".repeat(80));

  for (const { size, results: [r1, r2] } of comparisons) {
    const winner = r1.timeMs <= r2.timeMs ? r1.algorithm : r2.algorithm;
    const speedup = r1.timeMs <= r2.timeMs
      ? (r2.timeMs / r1.timeMs).toFixed(1)
      : (r1.timeMs / r2.timeMs).toFixed(1);

    console.log(
      `${formatNum(size).padStart(10)}  ` +
      `${formatTime(r1.timeMs).padStart(22)}${"".padStart(8)}` +
      `${formatTime(r2.timeMs).padStart(22)}${"".padStart(8)}` +
      `${COLORS.green}${winner}${COLORS.reset} (${speedup}x)`
    );
  }
}
