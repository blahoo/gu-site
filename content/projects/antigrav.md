---
title: 'The "AntiGrav" Racer'
order: 3
---

# The "AntiGrav" Racer

> AntiGrav is an electric racing kart built on an all-aluminium welded space frame, and it's what the Warrig became once we stopped adding parts and started taking weight out.

![The AntiGrav at night, seen from the driver's seat, HUD lit](/images/projects/antigrav/hero-night-hud.jpg "From the driver's seat after dark; the HUD sits right in the line of sight and the headlight does the rest of the work.")

| Spec | Detail |
|---|---|
| **Timeline** | Oct 2025 – June 2026 |
| **Team** | 2 |
| **Tools** | Onshape, Ansys FEA, aluminium welding |
| **Result** | Frame 30% lighter than the Warrig's, −1.61° camber held through roll, 2–3.5 in ride height |

**Demos:** [onboard night chase](https://drive.google.com/file/d/1qXJ4t2WhvrSKP6ufUeH3D5wMhouvbM_b/view?usp=sharing) · [maiden voyage](https://drive.google.com/file/d/1UvRld5jbtaZ1TDa9qzmsmFy6na3M5w5R/view?usp=sharing)

AntiGrav is a welded aluminium space-frame kart with single-wishbone suspension, a dynamic camber setup, and a smart steering wheel that displays live telemetry. It's the follow-up to the Warrig; the key advancements are weight reduction, adjustable suspension, and an upgraded electrical system.

The chassis and fabrication method are where that weight came out. Chassis, suspension and battery were modelled as one assembly in Onshape, the frame was validated in Ansys FEA, and the frame ended up ~30% lighter than the Warrig chassis.

![Onshape render of the AntiGrav space frame](/images/projects/antigrav/cad.jpg "The render makes the triangulation obvious; every bay gets a diagonal so load runs along a tube instead of bending one.")

## Welding it up

Aluminium was quite tricky because it has low tolerance to impurities on the metal surface. It is also prone to warping as it cools, so the frame was fabricated and clamped down by sections. There was also no compromise with poor penetration since every tube is carrying load in the space-frame design.

![Welding the aluminium frame in the school shop](/images/projects/antigrav/welding.jpg "Welding in the school shop, mask down, with the part-built frame clamped to the table.")
![Close-up of a finished welded tube joint](/images/projects/antigrav/weld-joint.jpg "Custom wishbone suspension member")

## Suspension

In a hard corner, the chassis rolls, and that roll drags the outside wheel toward positive camber, which is exactly when you want that tyre flat on the ground. The single-wishbone geometry generally sits at a negative camber of -1.61 degrees but increases as the chassis rolls up to ~10 degrees (generally sits within ~4 degrees under proper air-shock pressure).

Ride height is the other half of it. In practice, the suspension holds the kart between 2 and 3.5 inches off the ground, low enough to keep roll down and still high enough to clear speed bumps on general roads.

The rack-and-pinion mounts were another component that carried some design constraints. Because the suspension rotated around a single pivot (single control arm), bump steer became a serious phenomenon to contend with. The rack was mounted from a 3D-printed member that bolts to the frame and holds the rack as close to the control arm joint as possible.

![Aluminium frame with coilovers and rack-and-pinion fitted](/images/projects/antigrav/suspension.jpg "Coilovers and the rack-and-pinion mounted up, frame still sitting on the bench.")

## Steering wheel HUD

The steering wheel incorporates an HUD that reads battery voltage, plus motor speed and temperature, in real time. Voltage is essentially our proxy for a fuel gauge, and motor temperature tells us if we're drawing too much current or applying too much load on the drive unit. Putting the display on the steering wheel rather than somewhere on the frame was for space efficiency.

![The bare aluminium kart in a parking lot with a laptop](/images/projects/antigrav/kart-parkinglot.jpg "A parking lot counts as a test bench as long as you bring the laptop.")

**Related:** [The "Warrig V2" Powertrain Revision](/projects/warrig-v2) · [The "Warrig V1" Racer](/projects/warrig-v1)
