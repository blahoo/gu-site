---
title: "eBurb — Electric Suburban Shuttle"
label: "eBurb"
order: 1
---

# eBurb — Electric Suburban Shuttle

> eBurb is a proof-of-concept electric shuttle built around Miata MX-5 suspension, meant to do short driverless runs around a suburb.

![Welding the steel tube chassis in the garage](/images/projects/eburb-chassis/hero-welding.jpg "A home garage, a flux core welder, and a kayak that is permanently in the way.")

| Spec | Detail |
|---|---|
| **Timeline** | Sept 2025 – present |
| **Team** | 2 |
| **Tools** | Onshape, Fusion 360 FEA, flux-core welding |
| **Donor hardware** | Mazda Miata MX-5 subframe and suspension, 2016 Nissan Leaf HV pack |
| **Funding** | STEM climate project grants from the Town of Oakville and Bloomberg Philanthropies |

## What it is

eBurb is an electric vehicle POC for short driverless shuttling in suburban areas. The idea we're building toward is the short suburban trips that don't really justify getting a car out. The look is borrowed from the cybertruck.

There are two of us, we started in September 2025, and it's still very much in progress. The build is funded by STEM climate project grants from the Town of Oakville and Bloomberg Philanthropies.

![Onshape render of the eBurb tube chassis](/images/projects/eburb-chassis/cad-frame.jpg "The frame in Onshape, with the seat pan and floor drawn as part of the structure rather than bolted on later.")
![Onshape wireframe with side safety panels](/images/projects/eburb-chassis/cad-panels.jpg "Same frame with the safety walls added, which is when the thing stopped looking like a go-kart.")

## Starting from a Miata

Suspension geometry is the single worst thing to design from scratch. Get a control arm pickup wrong by a few millimetres and the car fights you everywhere, and you have no way of knowing whether it's the geometry or your driving. So we didn't design it. The whole chassis was drawn in Onshape around a Mazda Miata MX-5 subframe and its suspension geometry, folded into one load-carrying chassis instead of hanging a donor cradle off a separate frame.

The knock-on effect is that the chassis has to do more jobs at once. Seating, the safety walls, and the suspension mounts all got integrated into the primary structure, so there isn't really a "frame" and then a "body"; there's one thing that carries all of it.

![Measuring coilover angle with an angle protractor](/images/projects/eburb-chassis/suspension-angle.jpg "Pulling angles off the actual coilover, because the CAD is only as honest as the numbers you feed it.")

## Welding it up

The chassis is mild steel, fabricated with flux core welding and whatever machining the job needed.

The part we spent the most thinking time on was where we wanted the structure to fail. The frame has deliberate "soft-failure" safety zones built into it; sections meant to give up first and eat energy, rather than letting load walk straight into where people sit. Structural performance was validated in Fusion 360 FEA.

![The welded chassis on jack stands in the garage](/images/projects/eburb-chassis/chassis-garage.jpg "Up on stands with the suspension corners hung; those mounts are part of the frame, not a bolted-on cradle.")

## Where it landed

The thing we're happiest about is that suspension loads transfer directly through the primary structure. Because the mounts are part of the frame instead of bolted to a subframe that's bolted to the frame, forces get distributed better and there's less material doing nothing but connecting two other pieces of material. Better load path and lower mass out of the same decision.

![Wider garage shot with the Leaf drive unit on the floor](/images/projects/eburb-chassis/garage-wide.jpg "The drive unit is out of the Leaf and waiting; nothing about where it mounts is settled yet.")

## What's next

Right now the work is integrating a 2016 Nissan Leaf HV main battery into the chassis. Mounting, service access, and where in the frame the pack can actually sit are all still open.

![Sitting on the Leaf battery pack in a truck bed](/images/projects/eburb-chassis/leaf-pack-truck.jpg "Getting the pack home; it is heavier and more awkward than every photo of one suggests.")
![The opened Leaf pack and rear subframe on the garage floor](/images/projects/eburb-chassis/leaf-pack-garage.jpg "Measuring up what the pack and subframe actually need before either goes near the chassis.")

The braking side of the vehicle has its own write-up: [choosing a brake booster](/notes/chevy-booster).

**Related:** [eBurb — Autonomy Systems](/projects/eburb-autonomy)
