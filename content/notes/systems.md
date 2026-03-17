---
title: "Systems Programming Notes"
label: "Systems Programming"
order: 0
---

# Systems Programming Notes

Personal notes on systems programming concepts — mostly from coursework, papers, and projects.

## Memory Management

### Stack vs Heap

The stack is fast (just decrement the stack pointer) but limited in size and lifetime. The heap is flexible but requires explicit management.

```c
// Stack allocation — freed automatically when function returns
int x = 42;
char buf[256];

// Heap allocation — must be freed manually
int *p = malloc(sizeof(int) * n);
// ... use p ...
free(p);
```

### Common Memory Bugs

| Bug | Description | Detection |
|-----|-------------|-----------|
| Use-after-free | Accessing freed memory | AddressSanitizer, Valgrind |
| Buffer overflow | Writing past array bounds | AddressSanitizer, bounds checking |
| Memory leak | Forgetting to free | Valgrind, LeakSanitizer |
| Double free | Freeing the same pointer twice | AddressSanitizer |
| Null dereference | Dereferencing a null pointer | Segfault, AddressSanitizer |

## Concurrency

### Mutex vs Spinlock

**Mutex** — puts the thread to sleep if the lock is unavailable. Good for long critical sections.

**Spinlock** — busy-waits. Good for very short critical sections where the overhead of sleeping/waking is significant.

### Condition Variables

Used to wait for a condition to become true without busy-waiting.

## File Systems

### inode

An inode stores file metadata (size, permissions, timestamps, owner) and pointers to data blocks. It does _not_ store the filename — that's stored in the directory entry.

### Write-Ahead Logging (WAL)

To ensure crash consistency, write changes to a log before applying them to the actual data structures. On recovery, replay the log to restore a consistent state.
