---
title: "Thrust Vector Controlled Rocket"
order: 9
---

# Thrust Vector Controlled Rocket

> A solo build: a small rocket that holds its heading by aiming its motor, run by a flight computer I designed and soldered myself.

![The assembled TVC rocket on the bench](/images/projects/tvc-rocket/hero-rocket.jpg "Where the airframe sits right now: printed white body, green gimbal collar down near the motor, four fins at the tail.")

| | |
|---|---|
| **Timeline** | 2026 – present |
| **Team** | 1 |
| **Tools** | Onshape, custom PCB design, ESP32, C, 3D printing |
| **Mass** | 1200 g today, 600 g target |
| **Status** | Not yet flown, iterating toward the maiden flight |

## Why vector the thrust

The airframe has four fins and they do most of the work of keeping it pointed the right way. The catch is that fins only bite once there's enough air moving over them, and the slowest part of the flight is the first part, right off the pad, which is also where a light rocket is easiest to upset. Vectoring the thrust covers that gap: you tilt the motor and correct yourself instead of waiting on airspeed to show up.

Which is why the flight computer counts as much as the gimbal here. Something has to know which way the rocket is actually pointing and decide where to aim the motor, so stable, controlled flight comes out of the two together, the mechanical gimbal and a custom ESP32 based computer driving it. Team of one, which means every subsystem is mine to get wrong.

![CAD view of the body tube and internals](/images/projects/tvc-rocket/cad-body.jpg "Body tube rendered transparent so you can see what the fins are sharing the airframe with: the motor tube and the gimbal mount buried inside.")

## The gimbal and the airframe

Mechanically this is a 2 axis TVC gimbal, 3d printed, articulated by two small servo motors. Servos aren't the most elegant actuator you could pick for a job like this, but on a gimbal this size they're light, they're cheap, and they run straight off the same board that's doing the thinking.

The nose cone I did properly rather than by eye. It's modelled in Onshape following the ideal x^(1/2) profile, which is what you want for sub mach 1 speeds; keeping it parametric means when the rest of the airframe moves, the cone follows instead of getting redrawn.

![CAD cutaway of the nose cone with servos](/images/projects/tvc-rocket/cad-nosecone.jpg "The cutaway is the view I actually work in, since it's the only way to see the profile and the servos on the base plate in the same picture.")

## The flight computer

A lot of the electronics work happens on a breadboard, where you find out whether a sensor really talks to you the way its datasheet claims for the price of some jumper wire instead of a board order.

![Breadboard prototype in a baking tray](/images/projects/tvc-rocket/breadboard.jpg "CAN adapter, one servo and a lot of jumper wire, corralled in a baking tray so none of it wanders off the desk.")

The flight computer itself integrates the ESP32 microcontroller, a barometer, an accelerometer, SD storage for logging, and the servo motor controller, all in as space efficient a form factor as I could manage. There isn't much room inside a rocket body, and every millimetre of board is a millimetre of airframe.

![Flight computer schematic sheet](/images/projects/tvc-rocket/schematic.jpg "The schematic blocked out into main computer, additional boards, power system and servos.")

What exists today is a breakout PCB, put together by hand at the bench. It's the version that gets replaced once the chip PCB is done.

![Hand soldering the breakout board](/images/projects/tvc-rocket/soldering.jpg "Assembling the breakout flight computer by hand, iron and blue silicone mat, which is how every revision of this board has gone together so far.")

## Teaching it which way is up

The control software is written in C. Attitude is tracked with quaternion positioning rather than plain euler angles, mostly to avoid the gimbal lock problem that bites you exactly when the rocket is doing something interesting, and the correction itself runs through a PID loop driving the two gimbal servos.

![Bench testing the flight computer](/images/projects/tvc-rocket/bench-test.jpg "Multimeter and alligator clips on the board while it drives the servos, which is the only honest way to check the hardware agrees with the schematic.")

## Where it's at

Right now it's a 1200 gram platform that theoretically hits all the parameters it needs for controlled flight. That word theoretically is doing real work: it hasn't flown, and I'm not flying it until the numbers are better than theory.

The next pass is a chip PCB instead of the current breakout, plus another look at component design and material choice, with the goal of getting the whole thing to 600 grams before the maiden flight.
