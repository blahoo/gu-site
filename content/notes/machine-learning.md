---
title: "Machine Learning Notes"
label: "Machine Learning"
order: 2
---

# Machine Learning Notes

Notes on ML concepts, algorithms, and best practices.

## Neural Networks

### Backpropagation

The chain rule applied to neural networks. For each weight, compute the gradient by multiplying partial derivatives along the path from output to that weight.

### Activation Functions

| Function | Range | Use Case |
|----------|-------|----------|
| ReLU | [0, ∞) | Hidden layers |
| Sigmoid | (0, 1) | Binary classification |
| Tanh | (-1, 1) | Hidden layers |
| Softmax | (0, 1) | Multi-class classification |

## Optimization

### Gradient Descent Variants

**Vanilla SGD:** Update weights in the direction of negative gradient. Simple but can oscillate.

**Momentum:** Accumulate gradient direction over time, smoothing oscillations.

**Adam:** Combines momentum and adaptive learning rates per parameter.

## Regularization

**L1 (Lasso):** Adds |w| to loss, encourages sparsity.

**L2 (Ridge):** Adds w² to loss, encourages small weights.

**Dropout:** Randomly zero out activations during training to prevent co-adaptation.

**Batch Normalization:** Normalize layer inputs to have zero mean and unit variance, stabilizes training.

## Evaluation Metrics

| Metric | Use Case |
|--------|----------|
| Accuracy | Balanced classes |
| Precision | Minimize false positives |
| Recall | Minimize false negatives |
| F1 Score | Imbalanced classes |
| AUC-ROC | Threshold-independent |
