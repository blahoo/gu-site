---
title: "The \"AntiGrav\" Racer Autonomy"
label: "AntiGrav — Autonomy"
order: 4
---

# The "AntiGrav" Racer Autonomy

> Turning the AntiGrav chassis into something that can drive itself: custom steering, braking through the motor, and four cameras looking out the front.

![The AntiGrav in the garage with the compute stack mounted on the frame](/images/projects/antigrav-autonomy/compute-install.jpg "The compute and its cable run living on the frame, which is the point where this stopped being a kart with a laptop on it.")

| Spec | Detail |
|---|---|
| **Timeline** | Aug 2026 – present |
| **Team** | 2 |
| **Compute** | Orin Nano NX |
| **Cameras** | 2× PiCam3 Wide, 1× ArduCam Ultra-Wide, 1× ArduCam |
| **Actuation** | Kraken x60 drive unit / power steering unit, over CAN |
| **Status** | Platform working; self-driving model in development |

**Demo:** [EPS calibration](https://drive.google.com/file/d/10xfbLiy33z1sQ2-U9XEOumM7s8hWIa3p/view?usp=sharing)

## What this is

The [AntiGrav chassis](/projects/antigrav) already existed and already drove. This is the layer on top of it: a custom electric power steering system, drive and brake by wire, and a camera matrix. Two of us, starting August 2026, still going.

The braking is the part worth pausing on, because it isn't a brake actuator. Braking is done through the motor. That removes a whole mechanical subsystem from the problem, which on a car this size is a real simplification rather than a compromise.

![CAD render of the AntiGrav rolling platform](/images/projects/antigrav-autonomy/cad-platform.jpg "The platform the autonomy hardware has to fit onto, wheels and all.")
![The Kraken x60 drive and steering unit with its power cabling](/images/projects/antigrav-autonomy/drive-unit.jpg "The Kraken x60 that does both the driving and the steering, still on the carpet during setup.")

## Four cameras, not one

The vision side is a four camera matrix: two PiCam3 Wides, one ArduCam Ultra-Wide, and one ArduCam. The reason for a matrix rather than a single camera is coverage. A car that has to see what's beside it as well as what's ahead of it wants overlapping fields rather than one narrow cone, and picking a mix of lenses is cheaper than trying to get one sensor to do every job.

![Mockup of the four cameras' fields of view across the front of the car](/images/projects/antigrav-autonomy/fov-diagram.jpg "The FOV mockup: working out on paper how far the four fields overlap before mounting anything.")

Laying that out as a mockup first is the whole trick. Camera placement is one of those decisions that is nearly free to change in a drawing and genuinely annoying to change once there are brackets on the car.

![Wide and narrow camera frames with detections drawn on](/images/projects/antigrav-autonomy/camera-detections.jpg "The wide and narrow feeds running side by side with detections drawn on, which is the first sign the matrix is actually usable.")

## Talking to the hardware

The Orin Nano NX is the main compute, and it talks to the Kraken x60 drive and power steering unit over CAN. That bus is the same reason [the eBurb work](/projects/eburb-autonomy) took the shape it did: once a unit speaks CAN, getting it to move is a messaging problem rather than a wiring problem, and you can develop against it without rebuilding the car every time.

## Where it's at

Two things are done. There's an autonomous steering homing sequence, which is the unglamorous prerequisite for everything else; the car has to know where its own wheels are pointed before any model gets a say. And the physical platform that autonomy needs is built and working.

What's left is the interesting half. The custom self-driving model is still in development, so nothing here is driving itself yet.

**Related:** [The "AntiGrav" Racer](/projects/antigrav) · [The "Warrig V1" Self-Steering Extension](/projects/warrig-selfdriving) · [eBurb — Autonomy Systems](/projects/eburb-autonomy)
