---
title: "FlightMap Aerial Survey Drone"
order: 8
---

# FlightMap Aerial Survey Drone

> FlightMap is an FPV quadcopter I rebuilt into an autonomous survey platform that flies a grid on its own and photographs whatever is underneath it.

![The quadcopter in flight, seen as a small silhouette against a pale blue sky above a playing field](/images/projects/flightmap/hero-inflight.jpg "Out over the test field, where the whole platform is a dot from the ground.")

| Field | Value |
|---|---|
| **Timeline** | June – Aug 2025 |
| **Team** | 1 |
| **Stack** | ArduPilot, Raspberry Pi Zero + Pi camera, FPV quad hardware |

**Demo:** [liftoff](https://drive.google.com/drive/folders/16dTl3lpo7SFj9BGV8I6KyINorMOtdAt6)

## Why a quad and not something purpose-built

The idea came from building envelope surveying, the kind of inspection and maintenance work civil engineering firms do on large roofs or on the upper face of something tall. The hard part there isn't the looking, it's getting a camera into position and doing it consistently. An aircraft that flies a defined area by itself and comes back with photos of it solves the positioning problem, and that was really the whole brief I gave myself.

I started from an FPV-style quadcopter rather than a purpose-built survey airframe. FPV parts are cheap, replaceable and extremely well documented, and more importantly the firmware side is open, so I could actually get into the autopilot instead of being stuck with whatever flight modes a sealed consumer drone felt like giving me. The tradeoff is that nothing is integrated out of the box; an FPV quad is built to be flown by a person watching a video feed, so every autonomous piece had to be added on.

![Bare carbon fibre quadcopter frame partway through assembly on a workbench mat](/images/projects/flightmap/frame-build.jpg "This is the stage before any of the autonomy hardware went on, when it was still just an FPV quad.")

## The stack

It splits cleanly into two halves. The flight half is the flight computer running ArduPilot, the power distribution and ESCs driving the motors, and the video transmitter feeding the ground station. That side is responsible for staying in the air and following a mission, and nothing else.

The survey half is a Raspberry Pi Zero with a Pi camera, added as its own subsystem rather than folded into the flight computer. That's the part of the split I liked: the imaging payload sits on its own board, so it isn't in the flight-critical path and the autopilot's job doesn't change based on what the camera is doing.

![Macro shot of the flight controller PCB with coloured motor wires soldered to its gold pads](/images/projects/flightmap/flight-controller.jpg "The board ArduPilot actually runs on, which is where the autonomous side of this starts.")

## Making ArduPilot talk to the pi

The interesting work was the handoff between the two halves. ArduPilot knows where the aircraft is and what waypoint it's on; the pi is the thing holding the camera. Getting those two to agree meant building a workflow across UART and PWM, so the pi has both a real data link and a simple signal line to work from.

The two lines do different jobs. UART is the actual conversation, the data side of it, and PWM is the blunt one, a signal you can read without parsing anything. That was the reasoning I had at the time rather than something I tested one arrangement against another to prove.

![The assembled quadcopter on a desk with mismatched green and pink propellers](/images/projects/flightmap/assembled.jpg "The camera module strapped across the top plate is the survey half of the aircraft; everything under it is the flight half.")

## Flight testing

Bench behaviour and flight behaviour are not the same thing, so the design only counted as validated once it had flown with the camera integrated and everything running together.

![Green quadcopter frame standing on a workbench in front of a household fan](/images/projects/flightmap/bench-fan.jpg "Frame on the bench in front of a fan, back when the whole project still lived indoors.")

The FPV video link stays useful here even on an autonomous aircraft. It's flying itself, sure, but I'm still the one who has to notice when it's flying itself somewhere I didn't intend.

![FPV ground station monitor resting on a lap outdoors on grass, two antennas attached to the top](/images/projects/flightmap/fpv-osd.jpg "The text over that feed is the live telemetry, which is how I could tell what the autopilot thought it was doing without waiting for it to land.")

## Where it landed

What I ended up with is a drone that does autonomous flight planning, specifically the grid survey pattern that mapping work actually needs, and an aerial photography platform that can be pointed at a land survey or mapping mission rather than at a hobby flight. It isn't a commercial product and I wasn't trying to build one. It's proof that the survey capability I wanted is reachable with open firmware and a pile of FPV parts, which was the question I set out to answer.
