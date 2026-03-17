---
title: "Toy Compiler"
order: 1
---

# Toy Compiler

A compiler for Pebble, a small statically-typed language with first-class functions, pattern matching, and type inference. Targets LLVM IR.

## Language Features

The language supports static typing with type inference, pattern matching on algebraic data types, first-class functions and closures, immutability by default, and tail call optimization.

## Compiler Phases

1. **Lexer** — tokenize source code
2. **Parser** — build abstract syntax tree (AST)
3. **Type checker** — infer types and check consistency
4. **IR generation** — lower to LLVM IR
5. **Optimization** — apply LLVM passes
6. **Codegen** — emit native code

## Implementation Highlights

- Hand-written recursive descent parser with error recovery
- Hindley-Milner type inference with unification
- LLVM bindings via the `llvm-sys` crate
- Comprehensive test suite with property-based testing

## Performance

Compiles to efficient native code with minimal overhead. Fibonacci(40) runs in ~1 second (vs ~10 seconds for naive Python).

**Tags:** `rust` `compilers` `llvm` `type-systems` `language-design`
