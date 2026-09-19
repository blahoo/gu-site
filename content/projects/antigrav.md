---
title: 'The "AntiGrav" Racer'
order: 3
---

# The "AntiGrav" Racer

> AntiGrav is an electric racing kart built on an all-aluminium welded space frame, and it's what the Warrig before it turned into once we stopped adding parts and started taking weight out.

![The AntiGrav at night, seen from the driver's seat, HUD lit](/images/projects/antigrav/hero-night-hud.jpg "From the driver's seat after dark; the HUD sits right in the line of sight and the headlight does the rest of the work.")

| Spec | Detail |
|---|---|
| **Timeline** | Oct 2025 – June 2026 |
| **Team** | 2 |
| **Tools** | Onshape, Ansys FEA, aluminium welding |

**Demos:** [onboard night chase](https://drive.google.com/file/d/1qXJ4t2WhvrSKP6ufUeH3D5wMhouvbM_b/view?usp=sharing) · [maiden voyage](https://drive.google.com/file/d/1dG_FIXDV7duS3u6ZOHWZH4F3C5nNYbYD/view?usp=sharing)

## What it is

AntiGrav is a welded aluminium space frame kart with single wishbone suspension, a dynamic camber setup, and a steering wheel that displays its own telemetry. It's the follow-up to the Warrig that came before it, and the thing it's really about is weight.

The chassis is where that weight came out. Chassis, suspension and battery were modelled as one assembly in Onshape, the frame was validated in Ansys FEA, and the frame ended up 30% lighter than the Warrig's.

![Onshape render of the AntiGrav space frame](/images/projects/antigrav/cad.jpg "The render makes the triangulation obvious; every bay gets a diagonal so load runs along a tube instead of bending one.")

## Welding it up

The rack-and-pinion mounts are part of the frame rather than brackets bolted on afterwards. That was the whole argument for designing the chassis and the steering together: steering loads land on tube junctions instead of halfway along a tube where they'd just bend something.

Aluminium is the part of this that took the most patience. It pulls as it cools, so the frame went together clamped down in sections, and a joint that looks fine from one side can be cold underneath. There's no hiding a bad bead in a space frame either, because every tube is carrying load.

![Welding the aluminium frame in the school shop](/images/projects/antigrav/welding.jpg "Welding in the school shop, mask down, with the part-built frame clamped to the table.")
![Close-up of a finished welded tube joint](/images/projects/antigrav/weld-joint.jpg "A diagonal brace joint up close; aluminium shows you every mistake you made.")

## The camber argument

In a hard corner the chassis rolls, and roll drags the outside wheel toward positive camber, which is exactly when you want that tyre flat on the ground. The single wishbone geometry is set up to fight that: it holds a constant negative camber of -1.61 degrees through the roll instead of giving it away mid-turn.

Ride height is the other half of it. In practice the suspension holds the kart between 2 and 3.5 inches off the ground, low enough to keep roll down and still high enough to clear whatever the pavement does next.

![Aluminium frame with coilovers and rack-and-pinion fitted](/images/projects/antigrav/suspension.jpg "Coilovers and the rack-and-pinion mounted up, frame still sitting on the bench.")

## Telemetry where the driver is already looking

The steering wheel carries a HUD that reads battery voltage plus motor speed and temperature in real time. Voltage is the fuel gauge, and motor temperature is the number you want to watch climbing well before it turns into a problem.

Putting it on the wheel rather than somewhere on the frame was the point. A display you have to look down for is a display you check when it's already too late, and on a kart this low there isn't really a dashboard to look down at anyway.

![The bare aluminium kart in a parking lot with a laptop](/images/projects/antigrav/kart-parkinglot.jpg "A parking lot counts as a test bench as long as you bring the laptop.")

## Where it landed

The run goes Oct 2025 to June 2026, and what it leaves behind is a chassis 30% lighter than the Warrig's, a suspension that holds -1.61 degrees of camber where it matters, a kart sitting between 2 and 3.5 inches off the ground, and a wheel that reports its own numbers. Two people, one frame.

**Related:** [The "Warrig V2" Powertrain Revision](/projects/warrig-v2) · [The "Warrig V1" Racer](/projects/warrig-v1)
