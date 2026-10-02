---
title: "Thrust Vector Controlled Rocket"
order: 9
---

# Thrust Vector Controlled Rocket

> "So you brought a bomb home?"
>
> My dad, in a stern tone, about this project.

![The assembled TVC rocket on the bench](/images/projects/tvc-rocket/hero-rocket.jpg "Where the airframe sits right now: printed white body, green gimbal collar down near the motor, four fins at the tail.")

| | |
|---|---|
| **Timeline** | 2026 – present |
| **Team** | 2 |
| **Tools** | Onshape, custom PCB design, ESP32, C, 3D printing |
| **Mass** | 1200 g today, 600 g target |
| **Status** | Not yet flown: needs to drop from 1200 g to 600 g first (chip PCB in place of the breakout, plus lighter components and materials) |

## Where it came from

For as long as I can remember, I've been fascinated by rockets: Lego first, popsicle sticks in middle school, and now the half-kilogram rocket, a thrust vector controlled build sitting on my workbench with a custom ESP32 flight computer.

It taught me that innovation often looks strange from the outside. It also forced me to be resourceful: part of it was funded by a $500 grant from Hack Club, and most of what I know came from digging through Stack Overflow and Reddit. The clerk at the rocket store in Kitchener understood it instantly.

The "half kilogram" is more goal than description: it's 1200 g today, and getting to 600 g before the first flight is the current challenge.

## Why vector the thrust

Fins only stabilize a rocket once there's enough air moving over them, and the slowest part of the flight is right off the pad, which is also where a light rocket is easiest to knock off course. Thrust vector control covers that gap: tilt the motor and correct the heading directly instead of waiting on airspeed.

That makes the flight computer as important as the gimbal. Something has to know which way the rocket is pointing and decide where to aim the motor, so controlled flight comes from the two together: a mechanical gimbal and a custom ESP32 based computer driving it.

![CAD view of the body tube and internals](/images/projects/tvc-rocket/cad-body.jpg "Body tube rendered transparent to show what shares the airframe with the fins: the motor tube and the gimbal mount.")

## The gimbal and the airframe

The gimbal is 2-axis and 3D printed, moved by two small servo motors. Servos aren't the most precise actuator for this, but at this size they're light, cheap, and run straight off the flight computer.

The nose cone is modelled in Onshape on the ideal x^(1/2) profile for sub Mach 1 speeds. It's parametric, so when the rest of the airframe changes, the cone updates with it.

![CAD cutaway of the nose cone with servos](/images/projects/tvc-rocket/cad-nosecone.jpg "The cutaway view: the only way to see the cone profile and the servos on the base plate at the same time.")

## The flight computer

Most of the electronics get proven on a breadboard first, where finding out a sensor doesn't behave like its datasheet costs some jumper wire instead of a board order.

![Breadboard prototype in a baking tray](/images/projects/tvc-rocket/breadboard.jpg "CAN adapter, one servo and a lot of jumper wire, kept in a baking tray so none of it wanders off the desk.")

The flight computer combines an ESP32 microcontroller, a barometer, an accelerometer, SD storage for logging, and the servo controller, packed as small as I could get it. There isn't much room inside a rocket body: every millimetre of board is a millimetre of airframe.

![Flight computer schematic sheet](/images/projects/tvc-rocket/schematic.jpg "The schematic, blocked out into main computer, additional boards, power system and servos.")

The current version is a breakout PCB, hand assembled at the bench. It gets replaced once the chip PCB is done.

![Hand soldering the breakout board](/images/projects/tvc-rocket/soldering.jpg "Hand soldering the breakout flight computer, which is how every revision of this board has gone together so far.")

The control code is written in C. Attitude is tracked with quaternions instead of Euler angles, mostly to avoid gimbal lock, and the correction runs through a PID loop driving the two gimbal servos.

![Bench testing the flight computer](/images/projects/tvc-rocket/bench-test.jpg "Multimeter and alligator clips on the board while it drives the servos, checking the hardware against the schematic.")

