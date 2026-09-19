---
title: 'The "Warrig V1" Self Steering Extension'
order: 7
---

# The "Warrig V1" Self Steering Extension

> Three of us spent August 2025 retrofitting autonomous control interfaces into an existing racing kart, so that a camera frame turns into a predicted steering angle.

![Onboard view over the kart's steering wheel, showing a yellow crossbar with three camera modules](/images/projects/warrig-selfdriving/hero-camera-rig.jpg "The sensor bar sitting across the nose of the kart; everything on this page is a video still, so it's all a bit soft.")

| Spec | Detail |
|---|---|
| **Timeline** | Aug. 2025 |
| **Team** | 3 |
| **Base vehicle** | Warrig V1 racing kart |
| **Tools** | Python, OpenCV, convolutional behavioral cloning model |

**Demos:** [3rd-person](https://drive.google.com/file/d/1DY8KXWwZMDoWu4PTMjFYbdtQFHuCeRST/view?usp=sharing) · [camera steering vector](https://drive.google.com/file/d/15giIAUbyDFeV1jhg_zIllsWh5seugPFA/view?usp=sharing)

## What this actually is

Warrig V1 already existed as a driveable racing kart before any of this started, so this was an autonomy extension retrofitted into an existing system rather than a new vehicle designed around autonomy from the beginning. That framing shaped the whole month: nothing here got to be designed computer-first, it had to fit a kart that was already built. The work split in two along those lines, a camera front end that produces a steering angle, and a control interface on the steering column.

## Making the picture simple before making the model smart

The tempting version of this is to feed raw frames straight into a network and let it work out what matters. It can be made to work, but the model spends a lot of its capacity learning to ignore everything in the frame that isn't the lane before it learns anything about steering.

So we did the filtering ourselves first. Camera frames go through OpenCV in Python, a Canny filter pulls out edges, and HoughLines turns those edges into lane lines. What comes out the other end is a simplified feature map, the lane geometry we care about with most of the rest of the scene thrown away, and that is what the network gets as input.

![Close crop of the yellow sensor bar with its three modules and a small display](/images/projects/warrig-selfdriving/camera-rig-closeup.jpg "A closer look from the driver's seat: three modules on the bar, with the small display mounted off to the right.")

## The model itself

The network is a modified convolutional behavioral cloning model, close in shape to NVIDIA's end-to-end architecture. Three blocks of convolution, ReLU and max pooling, then fully connected layers, then a single output node holding the predicted steering angle. Theta as a function of image features, and nothing else coming out the far side.

Behavioral cloning means the mapping is learned from recorded human driving rather than written out as a control law. We trained it with transfer learning instead of starting from random weights, so the convolutional stack begins already knowing what an edge or a gradient looks like rather than deriving all of that again.

## The other half, on the kart

The control interface on the kart side is a chain and sprocket actuator retrofitted onto the steering column, which is the hardware in the photo below. It goes onto the column as it already was; the kart's own steering was left in place rather than replaced.

![Close-up through the steering wheel showing a chain-and-sprocket actuator on the steering column](/images/projects/warrig-selfdriving/steering-actuator.jpg "The sprocket rides on the column itself, chain driven, shot through the spokes of the wheel.")

## Where it landed

Two things came out of August. The preprocessing chain does its job, handing the network simplified feature maps instead of raw frames, and the steering model is a behavioral cloning net trained with transfer learning that predicts an angle from those features. The actuator is built and fitted. I want to be straight about the scope though: what I can claim here is the vision front end, the trained model and the hardware on the column, not a lap of the kart steering itself.

The rest of what I took from it is about retrofits generally. When the vehicle already exists, a good chunk of an autonomy project isn't machine learning at all, it's deciding where you're allowed to put a sprocket.

**Related:** [The "Warrig V1" Racer](/projects/warrig-v1)
