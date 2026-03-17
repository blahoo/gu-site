---
title: "Algorithms & Data Structures"
label: "Algorithms & DS"
order: 1
---

# Algorithms & Data Structures

Notes on classic algorithms and data structures with implementations and complexity analysis.

## Sorting Algorithms

### Quicksort

Average case: O(n log n), worst case: O(n²)

```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    left = [x for x in arr[1:] if x < pivot]
    right = [x for x in arr[1:] if x >= pivot]
    return quicksort(left) + [pivot] + quicksort(right)
```

### Merge Sort

Always O(n log n), stable, requires O(n) extra space

## Graph Algorithms

### Breadth-First Search (BFS)

Explores graph level by level, useful for shortest path in unweighted graphs.

### Depth-First Search (DFS)

Explores as far as possible along each branch, useful for topological sort and cycle detection.

## Dynamic Programming

### Fibonacci

Naive recursion is O(2^n). DP reduces to O(n).

```python
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
```

### Longest Common Subsequence (LCS)

Classic DP problem with O(mn) time complexity.
