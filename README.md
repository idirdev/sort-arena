# Sort Arena

> Lab project — sorting algorithm visualization and performance comparison.

Sorting algorithm benchmark and comparison tool. Measure execution time, comparisons, swaps, and memory usage across 8 sorting algorithms with multiple array distributions.

## Features

- 8 sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, Heap, Radix, Tim Sort
- 5 array generators: random, sorted, reversed, nearly-sorted, few-unique
- Colored CLI output with bar charts
- Head-to-head algorithm comparison mode
- Correctness verification on every run
- Auto-skip O(n^2) algorithms on large inputs

## Getting Started

```bash
npm install
npm run bench          # benchmark all algorithms
npm run dev -- --list  # list algorithms
```

## Usage

```bash
# Benchmark all with custom size
npx tsx src/index.ts --all 10000

# Full benchmark (all array types)
npx tsx src/index.ts --full 5000

# Compare two algorithms
npx tsx src/index.ts --compare "Quick Sort" "Tim Sort"

# List available algorithms
npx tsx src/index.ts --list
```

## Example Output

```
Algorithm         Time      Comparisons          Swaps      Memory  OK  Bar
────────────────────────────────────────────────────────────────────────────
Bubble Sort     52.310ms      49,995,000     24,886,213     0.0KB  yes  ████████████████████████████████
Selection Sort  18.442ms       4,999,500          9,991     0.0KB  yes  ██████████░░░░░░░░░░░░░░░░░░░░
Insertion Sort  11.230ms      25,012,344     25,012,344     0.0KB  yes  ██████░░░░░░░░░░░░░░░░░░░░░░░░
Merge Sort       1.204ms         120,416         69,008    64.2KB  yes  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Quick Sort       0.891ms          82,144         19,220     0.0KB  yes  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Heap Sort        1.832ms         213,000         85,998     0.0KB  yes  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Radix Sort       1.105ms               0        130,000    48.1KB  yes  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Tim Sort         0.943ms          78,120         38,492    32.0KB  yes  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Fastest: Quick Sort (0.891ms, 82,144 comparisons, 19,220 swaps)
```

## Algorithms

| Algorithm      | Best       | Average    | Worst      | Space    | Stable |
|---------------|------------|------------|------------|----------|--------|
| Bubble Sort   | O(n)       | O(n^2)     | O(n^2)     | O(1)     | Yes    |
| Selection Sort| O(n^2)     | O(n^2)     | O(n^2)     | O(1)     | No     |
| Insertion Sort| O(n)       | O(n^2)     | O(n^2)     | O(1)     | Yes    |
| Merge Sort    | O(n log n) | O(n log n) | O(n log n) | O(n)     | Yes    |
| Quick Sort    | O(n log n) | O(n log n) | O(n^2)     | O(log n) | No     |
| Heap Sort     | O(n log n) | O(n log n) | O(n log n) | O(1)     | No     |
| Radix Sort    | O(nk)      | O(nk)      | O(nk)      | O(n+k)   | Yes    |
| Tim Sort      | O(n)       | O(n log n) | O(n log n) | O(n)     | Yes    |

## Tech Stack

- TypeScript
- Node.js
- No external dependencies

---

## 🇫🇷 Documentation en français

### Description
`sort-arena` est un outil de benchmark et de comparaison d'algorithmes de tri en ligne de commande. Il mesure le temps d'exécution, le nombre de comparaisons, d'échanges et l'utilisation mémoire pour 8 algorithmes de tri sur 5 types de distributions de tableaux, avec vérification automatique de la correction.

### Installation
```bash
npm install
npm run bench
```

### Utilisation
```bash
# Benchmark de tous les algorithmes avec une taille personnalisée
npx tsx src/index.ts --all 10000

# Comparer deux algorithmes
npx tsx src/index.ts --compare "Quick Sort" "Tim Sort"

# Benchmark complet (tous types de tableaux)
npx tsx src/index.ts --full 5000

# Lister les algorithmes disponibles
npx tsx src/index.ts --list
```

Consultez la documentation anglaise ci-dessus pour les détails des algorithmes, les complexités et les exemples de sortie.