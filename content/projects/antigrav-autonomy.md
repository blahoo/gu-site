---
title: "The \"AntiGrav\" Racer Autonomy"
label: "AntiGrav: Autonomy"
order: 4
---

# The "AntiGrav" Racer Autonomy

> The autonomy platform built onto the AntiGrav chassis: custom electric power steering, drive and brake by wire through the motor, and a four camera vision matrix on a Jetson Orin Nano. Autonomous steering homing works; the self-driving model is in development.

![The AntiGrav in the garage with the compute stack mounted on the frame](/images/projects/antigrav-autonomy/compute-install.jpg "Compute and cable run mounted on the frame.")

| Spec | Detail |
|---|---|
| **Timeline** | Aug 2026 – present |
| **Team** | 2 |
| **Status** | Autonomous steering homing working · platform complete · self-driving model in development |
| **Compute** | Jetson Orin Nano |
| **Steering** | Custom EPS module on a Kraken X60 |
| **Drive and braking** | Kraken X60 drive unit; braking through the motor, no separate brake actuator |
| **Bus** | CAN between the Orin and both Kraken units |
| **Vision** | 4 cameras: 2× PiCam3 Wide, 1× ArduCam Ultra-Wide, 1× ArduCam |
| **Base vehicle** | [The "AntiGrav" Racer](/projects/antigrav) |

**Demo:** [EPS calibration](https://drive.google.com/file/d/10xfbLiy33z1sQ2-U9XEOumM7s8hWIa3p/view?usp=sharing)

## Drive, steering and braking

- **Drive by wire:** the Kraken X60 drive unit is controlled by the Orin over CAN.
- **Brake by wire:** braking is done through the drive motor, so there's no separate hydraulic or mechanical brake actuator to control.
- **Steer by wire:** a custom electric power steering module, also on a Kraken X60 over CAN. An autonomous homing sequence finds the steering center.

![CAD render of the AntiGrav rolling platform](/images/projects/antigrav-autonomy/cad-platform.jpg "The rolling platform the autonomy hardware mounts to.")
![The Kraken x60 drive and steering unit with its power cabling](/images/projects/antigrav-autonomy/drive-unit.jpg "Kraken X60 unit and power cabling during setup.")

## Vision

Four cameras with overlapping fields of view across the front of the car: two PiCam3 Wides, one ArduCam Ultra-Wide and one ArduCam. The field of view layout was mocked up before anything was mounted.

![Mockup of the four cameras' fields of view across the front of the car](/images/projects/antigrav-autonomy/fov-diagram.jpg "FOV mockup for the four camera matrix.")
![Wide and narrow camera frames with detections drawn on](/images/projects/antigrav-autonomy/camera-detections.jpg "Wide and narrow feeds side by side with detections overlaid.")

**Related:** [The "AntiGrav" Racer](/projects/antigrav) · [The "Warrig V1" Self Driving Extension](/projects/warrig-selfdriving) · [eBurb: Autonomy Systems](/projects/eburb-autonomy)
