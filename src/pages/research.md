---
layout: ../layouts/Markdown.astro
title: Research
description: CoSpRo — concept-guided relational pretraining for spurious-correlation robustness, and earlier experiments.
---

My work is about a specific failure of vision models: they latch onto whatever
happens to correlate with the label in the training data — the background, the
lighting, the context — and then fail on the cases where that correlation breaks.
Average accuracy hides this; worst-group accuracy does not.

## CoSpRo — concept-guided relational pretraining for spurious-correlation robustness

*M.Sc. thesis, in progress, at RPTU Kaiserslautern-Landau.*

> Self-supervised pretraining inherits the spurious associations in its own
> unlabeled images. CoSpRo asks a frozen vision-language teacher which of them to
> break — using no target or group labels at any point before evaluation.

Self-supervised pretraining inherits the spurious object–context associations
present in its unlabeled images, and augmentation alone does not say which
context changes should preserve object identity. CoSpRo asks a frozen
vision-language teacher instead, and uses no target or group labels while
building the graph or training the encoder.

### How it works

CLIP embeddings are decomposed into sparse, named concept
coordinates with SpLiCE, so a direction in the representation has a word attached
to it. Related concepts are merged into subspaces, and for each subspace we ask a
counterfactual question: *which image pairs become more similar once this concept
is projected out?* Such a pair is a candidate relation — the concept was part of
what separated the two images.

### Not believing the candidates too easily

Most of the method is about not believing those candidates too easily. A relation
is kept only if the removed concept is expressed differently in the two images,
and if the concepts that remain still agree. Each concept group is then scored as
a whole and calibrated against two synthetic nulls — random subspaces of equal
rank, and shuffled activations — so a group survives only if it beats what an
arbitrary projection would have produced. Surviving relations form a sparse
weighted graph that guides batch composition and supplies soft relational targets
next to an ordinary SimCLR objective. At inference the teacher, the graph and the
heads are thrown away; only the student encoder remains.

### Results so far

Waterbirds, ResNet-18, 500 epochs, four seeds, linear probe
on 224 group-balanced examples; held-out test, mean ± sd in %:

| Method | Avg. | Worst-group |
|---|---|---|
| SimCLR | 51.97 ± 2.00 | 46.82 ± 3.65 |
| CoSpRo graph, sampler only | 51.95 ± 3.32 | 46.83 ± 1.29 |
| Raw-CLIP graph, sampler only | 50.86 ± 2.61 | 45.88 ± 5.98 |
| Raw-CLIP graph + relational loss | 52.64 ± 2.39 | 48.48 ± 3.44 |
| **CoSpRo + relational loss** | **53.38 ± 1.84** | **50.64 ± 1.97** |

Worst-group accuracy improves by 3.82 points over SimCLR and by 2.16 points over
budget-matched supervision from a raw-CLIP graph. The sampler-only rows say the
gain comes from the relational objective rather than from graph-aware batching
alone, and a control that uses ordinary semantic neighbours instead of projected
ones is weaker on average — but heterogeneously so across seeds.

### What it does not show

A post-hoc audit of the graph finds real
cross-background relations *and* wrong-target edges, so projection clearly does
not simply delete the spurious signal: a linear probe still reads the background
off the learned features at above 90% accuracy. The study is one dataset, one
graph seed and four student seeds, and the selected concept groups all turned out
to be single concepts, so multi-concept grouping is unproven. Larger datasets and
more training runs are the next step.

## Earlier experiments

- **KAN vs. MLP projection heads** ([repository](https://github.com/GrGrie/kan-vs-mlp)) —
  a controlled comparison of a Kolmogorov–Arnold projection head against a plain
  MLP in a contrastive setup.
