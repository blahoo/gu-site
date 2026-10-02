---
title: 'The "Warrig V1" Self Driving Extension'
order: 7
---

# The "Warrig V1" Self Driving Extension

> An autonomy retrofit for the Warrig V1 kart: a camera front end that turns lane lines into a predicted steering angle, and a chain-driven actuator on the existing steering column.

![Onboard view over the kart's steering wheel, showing a yellow crossbar with three camera modules](/images/projects/warrig-selfdriving/hero-camera-rig.jpg "The sensor bar across the nose of the kart (video still).")

| Spec | Detail |
|---|---|
| **Timeline** | Aug 2025 |
| **Team** | 3 |
| **Status** | Vision pipeline, trained steering model and column actuator built; no full autonomous lap |
| **Base vehicle** | [The "Warrig V1" Racer](/projects/warrig-v1) |
| **Pre-processing** | Python + OpenCV: Canny edge detection, HoughLines lane extraction |
| **Model** | Modified convolutional behavioral cloning network, similar to NVIDIA's end-to-end model |
| **Output** | Single node: predicted steering angle, θ = f(image features) |
| **Training** | Behavioral cloning from recorded driving, with transfer learning |
| **Actuation** | Chain and sprocket actuator retrofitted onto the steering column |

**Demos:** [3rd-person](https://drive.google.com/file/d/1DY8KXWwZMDoWu4PTMjFYbdtQFHuCeRST/view?usp=sharing) · [camera steering vector](https://drive.google.com/file/d/15giIAUbyDFeV1jhg_zIllsWh5seugPFA/view?usp=sharing)

## Vision pipeline

- **Edges:** camera frames are filtered in OpenCV with a Canny edge detector.
- **Lanes:** HoughLines turns the edges into lane lines.
- **Features:** the result is a simplified feature map of the lane geometry, which is the network's input instead of the raw frame.

![Close crop of the yellow sensor bar with its three modules and a small display](/images/projects/warrig-selfdriving/camera-rig-closeup.jpg "The sensor bar from the driver's seat, with a small display mounted to the right.")

## Model

| Layer | Detail |
|---|---|
| **Feature extractor** | 3 × (convolution + ReLU → max pooling) |
| **Head** | Fully connected layers |
| **Output** | 1 node: steering angle θ |

The network is trained by behavioral cloning, learning the mapping from recorded driving, and starts from pretrained weights through transfer learning.

## Actuation

A chain and sprocket actuator is retrofitted onto the kart's existing steering column, leaving the original steering in place.

![Close-up through the steering wheel showing a chain-and-sprocket actuator on the steering column](/images/projects/warrig-selfdriving/steering-actuator.jpg "Chain-driven sprocket on the steering column, shot through the wheel.")

**Related:** [The "Warrig V1" Racer](/projects/warrig-v1) · [The "AntiGrav" Racer Autonomy](/projects/antigrav-autonomy)
