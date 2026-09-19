---
title: "eBurb — Autonomy Systems"
order: 2
---

# eBurb — Autonomy Systems

> eBurb's autonomy side: OEM steering, braking and drive hardware from production vehicles, retrofitted to take orders from me over CAN instead of from the car each part was built for.

![Toyota Corolla EPS column on a desk with test leads and a laptop showing a CAN trace](/images/projects/eburb-autonomy/hero-eps-can.jpg "The column is the easy half; the laptop is where the actual work happens.")

| | |
|---|---|
| **Timeline** | Feb 2026 – present |
| **Team** | 1 |
| **Hardware** | 2020 Tesla Model 3 brake booster, 2022 Toyota Corolla EPS, OEM angle sensor and throttle pedal, 2016 Nissan Leaf motor |
| **Method** | CAN, public .dbc files, dealership service schematics |

**Demos:** [steering](https://drive.google.com/file/d/1IdaZ_wL8n1usdoSTimA-GVZJogF9AOfD/view?usp=sharing) · [braking](https://drive.google.com/file/d/1VOVuWqMSjVJX5CiWTpgQC259svGWVd6H/view?usp=sharing)

## What it actually is

Three things have to take orders electronically before anything moves without hands and feet on it: steering, braking, and drive. That's what this is. All of it is OEM hardware from production vehicles, retrofitted to listen to me over CAN instead of to the car it was built for. Steer by wire, brake by wire, drive by wire, out of parts that were never designed to answer to anything but their original vehicle.

The hardware under electronic control right now: a 2020 Tesla Model 3 brake booster, a 2022 Toyota Corolla EPS, an OEM angle sensor, a throttle pedal, and a 2016 Nissan Leaf motor. It's a solo project and it's still going.

![Tesla Model 3 brake booster with white fluid reservoir on a bench, wired with test leads](/images/projects/eburb-autonomy/brake-booster.jpg "The Model 3 booster gets talked to on the bench, reservoir and all, long before it goes anywhere near a brake line.")

## Why OEM parts instead of my own actuators

The tempting version of this is a stepper strapped to the steering shaft and a linear actuator shoving the brake pedal. I didn't want that. Those are slow, they have no real failure story, and they throw away all the engineering already sitting inside a production unit: the force, the speed and the fault handling are designed in before I ever touch it.

The trade is that you don't get a datasheet. An OEM module expects to wake up on a bus with the rest of the car's modules, and on my bench that traffic isn't there. So the work stops being mechanical and becomes figuring out what each unit expects to hear. That came from public .dbc files, official schematics written for dealership technicians, and open source forums where somebody has usually already burned a weekend on the exact connector I'm holding. I went deeper on why the brake architecture ended up this way in [my note on the booster](/notes/chevy-booster).

![Hand holding an OEM connector and pigtail in front of a gold steering motor housing](/images/projects/eburb-autonomy/connector.jpg "Half the effort is just proving which wire in the pigtail is which, from schematics and forum posts.")
![Bench covered in CAN transceiver breakout boards and jumper wires](/images/projects/eburb-autonomy/can-bench.jpg "A transceiver per module, so I can talk to one without the others listening in.")

## Reading the bus

Every unit follows the same loop, and it's boring in a good way. Get it powered and on the bench, listen to what it says when nothing is happening, then move something by hand and watch which bytes move with it. Where a public .dbc covers the messages that's half the job gone, and where it doesn't, the schematics and the forum threads have to sort out the wiring first.

![Aftermarket steering wheel bolted to the EPS column, clamped to a folding table in a basement workshop](/images/projects/eburb-autonomy/steering-wheel.jpg "An aftermarket wheel clamped to a folding table, so I can turn the column by hand and check the sensor's answer against it.")

Same idea on the drive side, with one difference: the Leaf motor is driven through CAN messages I reverse engineered rather than took from a public .dbc.

![OEM throttle pedal wired to an Arduino and a USB-CAN dongle on a striped mat](/images/projects/eburb-autonomy/throttle-pedal.jpg "The pedal is just a sensor: the Arduino reads it, the dongle puts it on the bus, and the motor that acts on it lives somewhere else entirely.")

## Where it's at

Each of these answers to me electronically now: the booster, the EPS, the angle sensor, the pedal and the Leaf motor. Started in February, still going, still one set of hands on it.

**Related:** [eBurb — Electric Suburban Shuttle](/projects/eburb-chassis)
