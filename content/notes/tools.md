---
title: "Tools & Workflow"
label: "Tools & Workflow"
order: 3
---

# Tools & Workflow

Notes on development tools, debugging techniques, and productivity tips.

## Debugging

### GDB Basics

```bash
gdb ./program
(gdb) break main          # set breakpoint at main
(gdb) run                 # start execution
(gdb) next                # step over
(gdb) step                # step into
(gdb) print variable      # print variable value
(gdb) backtrace           # show call stack
(gdb) continue            # resume execution
```

### Valgrind for Memory Leaks

```bash
valgrind --leak-check=full ./program
```

Shows memory leaks, use-after-free, and other memory errors.

### AddressSanitizer

Compile with `-fsanitize=address` to detect memory errors at runtime.

## Performance Profiling

### perf

Linux profiling tool for CPU and cache analysis.

```bash
perf record ./program     # record performance data
perf report               # view results
perf stat ./program       # show statistics
```

## Version Control

### Git Workflow

```bash
git checkout -b feature/new-feature    # create branch
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create pull request, review, merge
git checkout main
git pull origin main
```

### Useful Git Commands

```bash
git rebase -i HEAD~5                   # interactive rebase last 5 commits
git bisect start                       # binary search for bug-introducing commit
git stash                              # temporarily save changes
git cherry-pick <commit>               # apply specific commit to current branch
```
