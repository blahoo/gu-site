---
title: "ML Training Pipeline"
order: 
---

# ML Training Pipeline

A distributed training framework built on Ray that makes it easy to run large-scale experiments with automatic checkpointing, hyperparameter search, and experiment tracking.

## Motivation

I was frustrated with how much boilerplate was required to run distributed PyTorch training. Most frameworks either do too much (hiding important details) or too little (leaving you to wire everything together). I wanted something in between.

## Features

- **Data-parallel training** using PyTorch DDP with automatic device placement
- **Hyperparameter search** with Bayesian optimization (via Optuna)
- **Experiment tracking** integrated with Weights & Biases
- **Fault tolerance** — jobs resume from the last checkpoint after worker failure
- **Resource scheduling** via Ray's actor model

## Architecture

The framework uses Ray for distributed execution and a custom checkpoint store for fault recovery. Workers communicate via Ray's object store for efficient data transfer.

## Results

Successfully trained a 7B parameter model on 8 GPUs with 95% efficiency (near-linear scaling). Reduced training time by 40% compared to naive distributed training due to optimized communication patterns.

**Tags:** `python` `distributed-systems` `machine-learning` `ray` `pytorch`
