---
title: "Distributed KV Store"
order: 
---

# Distributed KV Store

A fault-tolerant, linearizable key-value store built on the Raft consensus algorithm. Supports concurrent clients, leader election, log replication, and snapshotting.

## Motivation

I wanted to understand distributed consensus from the ground up. Reading the Raft paper was one thing — actually implementing it exposed a dozen subtle edge cases the paper glosses over.

## Architecture

The system consists of three layers: the KV server layer (which provides linearizable reads and a deduplication table), the Raft layer (which handles leader election, log replication, and snapshotting), and the network layer (which uses gRPC for communication).

## Key Features

- **Leader election** with randomized timeouts and pre-vote phase to avoid unnecessary disruptions
- **Log replication** with batched AppendEntries RPCs for throughput
- **Snapshotting** using the InstallSnapshot RPC to avoid unbounded log growth
- **Linearizable reads** via ReadIndex to serve reads without going through the log
- **Client deduplication** table to handle retries safely

## Implementation Details

The trickiest part was getting the election safety right. Raft guarantees that at most one leader is elected per term, but the implementation has to be careful about vote splitting, stale leaders, and log divergence.

## Results

- Passes all tests in MIT 6.824 Lab 2 and Lab 3 (1000+ iterations with race detector)
- Throughput: ~15,000 ops/sec on a 3-node cluster (local network)
- Latency: p99 < 5ms for writes under moderate load

**Tags:** `go` `distributed-systems` `raft` `consensus` `grpc`
