---
title: "The \"Warrig V1\" Racer"
order: 6
---

# The "Warrig V1" Racer

> Warrig V1 is an all-aluminum electric racer built for an efficiency competition, and the car where I ran the chassis and the powertrain.

![The Warrig V1 frame clamped to a bench in the school machine shop](/images/projects/warrig-v1/hero-frame-shop.jpg "The bare frame clamped to the shop table mid-build, before any of the driveline went in.")

| | |
|---|---|
| **Timeline** | Oct 2024 – May 2025 |
| **Team** | 5–10 |
| **My scope** | Chassis and powertrain |
| **Tools** | Onshape, Fusion 360 FEA |
| **Result** | 26 km/h real-world top speed |

## What it is

Warrig V1 is an all-aluminum electric racer built between October 2024 and May 2025 by a team that floated between 5 and 10 people. I directed the chassis development and handled the powertrain side: the frame, the mounts that everything else hangs off, and the electrical path from the battery to the motor. Steering was its own subteam, which matters more than it sounds like it should.

The competition is an efficiency event, not a drag race, and that reframes basically every decision. You're not chasing peak power, you're chasing the things that quietly eat it; mass you have to accelerate, friction in the driveline, and losses between the pack and the motor. So the brief I gave myself was short. Keep it light, keep it stiff, keep the losses down, and stay inside the 2025 rules the whole way.

![A horizontal bandsaw cutting aluminum stock](/images/projects/warrig-v1/bandsaw.jpg "Cutting aluminum stock on the shop's horizontal bandsaw.")

## The chassis

The frame is aluminum throughout, and the part I care most about is that the rack-and-pinion mounts are integrated into the structure instead of being brackets bolted on afterward. Bracketry is where compliance sneaks in, and compliance in the steering mounts reads to the driver as slop in the steering even when the rack itself is fine. Building the mounts into the structure also meant the steering subteam and I had to agree on geometry early rather than negotiate it at assembly.

The other constraint I held onto was a low center of gravity, again in coordination with steering, since the two trade against each other constantly. Frame designs went through Onshape and Fusion 360 FEA before fabrication.

![FEA plot of the frame with load arrows and a colour scale](/images/projects/warrig-v1/fea.jpg "Fusion FEA on the frame model.")
![Close-up of the rack-and-pinion steering assembly mounted on the frame rails](/images/projects/warrig-v1/steering-rack.jpg "The rack and pinion with its boot, sitting across the frame rails.")

## Power, and not throwing it away

The pack is an Interstate MTX350. From there the circuit is deliberately boring: battery through a fuse and a switch, into a 12–24V booster converter, then into the motor controller with the throttle as its input, and out to the motor. I verified the whole path end to end before full system testing, because an efficiency car that browns out the moment it's under load is just a heavy sculpture.

![Electrical schematic of the power path from battery to motor](/images/projects/warrig-v1/circuit.jpg "The circuit as drawn: a 50A fuse and switch ahead of the booster, with a high-power resistor on the output side.")

Drive is by chain, which made the ratio tunable without redesigning anything structural. Most of the gains at the end came from chasing friction out of the driveline rather than asking the motor for more, and the car ended up with a real-world top speed of 26 km/h.

![The rear spoked wheel with chain and sprocket, strapped down](/images/projects/warrig-v1/chain-drive.jpg "Chain and sprocket on the rear wheel, strapped down.")

## Where it landed

What we ended up with is a lightweight, modular chassis that passed the 2025 rules, an adjustable front geometry, and a low enough CG that the handling and stability were noticeably better than the thing deserved on paper.

![The assembled kart on yellow stands in the shop](/images/projects/warrig-v1/assembled.jpg "The car mostly complete on stands, mirror and bars fitted.")

Adjustable front geometry was the quiet win; it meant the geometry could be tuned on the built car rather than locked in CAD months earlier. For a car built around structure and packaging rather than around a big number, that was where most of the payoff showed up.

![The Warrig parked outside a brick building at night](/images/projects/warrig-v1/night-exterior.jpg "Parked outside under the door light, still bare aluminium, with a hat left on the roll hoop.")

**Related:** [The "Warrig V2" Powertrain Revision](/projects/warrig-v2) · [The "Warrig V1" Self-Steering Extension](/projects/warrig-selfdriving) · [The "AntiGrav" Racer](/projects/antigrav)
