WIP

The braking system was the system I spent the most time on through this project. While it is not as glamorous as other kinetic outputs in steering or main drive, it’s one of the least flexible systems in terms of architecture or part sourcing. 


To give a TLDR of how brakes work; Modern passenger vehicles typically use hydraulic braking systems, where pedal force is translated into hydraulic line pressure at the master cylinder, but the force required to generate the kind of hydraulic pressure is something that no human quad is designed for. To provide braking assist, there is typically a brake booster to amplify the force of your foot; usually a vacuum pressure is used in these boosters.


Given the Miata Mx5 base and frankenstein nature of eBurb, I really only had 3 main choices to provide the main hydraulic braking force:

No autonomous braking, a simple brake booster with external vacuum; rationale: safety critical, actually used in the early Tesla cars back when they weren't big enough to talk to manufacturers like Bosch - truly a bootstrapped solution
An extension of option 1: add a linear actuator which can output about a 1000lb of force and cover the roughly 40 mm of pedal travel of a general brake booster. After looking about, these are crazy expensive and generally actuate quite slowly - not optimal
Further research showed that many OEM’s, such as Tesla, Honda, or Chevrolet use a common electromagnetic brake boost solution from Bosch, the iBooster. Secondhand these units are actually about the same price as bootstrapping, while being proven to have some type of CAN communication control as their donor vehicles typically have automatic emergency brake features, or just full autopilot by Tesla.


While there are definitely other OEM proprietary systems, like the tesla model x has their own unique electromechanical brakebooster for some models, the Bosch iBooster is a staple unit which has been used in several document EV conversion projects and used across OEM’s.

As of current, there are 2 generations of the booster, no significant apparent difference in performance thus my main criteria was to get whichever unit was cheap and could work. It is also important to note that alongside controlling the brake booster, controlling the ABS system of certain vehicles is another possible approach to actuating the brakes, but I haven’t been able to find a single standalone implementation of this, or even just having the ECBM respond outside of the vehicle can network - unlike the iBooster which can work without CAN connection.


Actually, all this isn’t even to mention possible ABS integration.


—
A note about ABS:

Older cars, e.g. the early 90’s generation of Miata’s used simple wheel speed sensors to detect wheel lockups. These systems were simple and could definitely function as a closed system.

Since electric car parts don't really like to be ripped out of their body and stop working without detecting signals from the rest of the vehicle network, more advanced ABS systems which take data from a range of modern sensors like gyros, speed, acceleration, alongside wheelspeed don’t typically work standalone.

Also, I said ‘possible’ since you don’t need an ABS system for the brakes of a car to work, you just need it to be… more safe, and not risk skidding out… but that’s really only a significant concern at higher speeds.
—


Right now I have a bosch ibooster from a 2017 chevy volt sitting in my basement. While I was able to wire up the ibooster to work in failsafe mode. This mode is a simple 4 wire setup which allows the ibooster to work… well, just as a normal brake booster - but that's not really the goal here.

There are currently some issues with getting autonomous control.

I thought I found the CAN addresses and signal formats in Comma’s openBDC project, but I was horribly incorrect 
I am essentially poking at a black box as the ibooster I have is essentially ripped out of whole vehicle CAN network; I can’t really sniff traffic or general ecu interactions

Initially, when I was looking at the ibooster for braking control, I found a blog post written by Lars at EVCreate where it seemed like there were existing BDC files documenting CAN control. It is important to note, which I found out later, that each OEM ibooster runs slightly different firmware so things like the CAN addresses, checksums, and even message formatting can vary between manufacturers.

For about a week I spent hours probing the network, some key findings are that there are 3 CAN lines, 2 vehicle networks and a YAW network. The 2 vehicle networks are identical but not connected and for my Chevy Volt OEM iBooster, this network broadcasted messages at addresses 0x219 and 0x214 which appeared to log pedal travel/ movements. The YAW network is where I began to make some headway. I had to probe and found some revealed addresses around 0x7E6 → 0x7EE where the iBooster locked position, no real movement but progress nonetheless… so I continued to probe, test, again and again I was finding many ways to lock the pedal. For nights I was just staring at my screen and waiting for the probes to complete - no progress.

Back on the drawing board and doing more research, I found that there was actually very little evidence that anyone has managed to control this thing. One project I found, OpenPilot, by Comma, which essentially was Tesla autopilot before Tesla and works on hundreds of car makes and models (including Chevrolet) doesn't support the 2017 Chevy Volt. Looking through their openbdc repository actually showed literally no cross compatibility and completely different DBC data. 

One area I could access is that the data sent to the iBooster ecu is actually the pedal sensor. Looking at some online teardown videos have provided some validation for this idea as this sensor doesn't actually appear to be a travel sensor (diagnostic data) but actually a torque/ pressure sensor (provides data). 

Unplugging this sensor didn’t stop the motor startup sound, but stopped all motor assist - gs!

Probing the sensor wires with an arduino (specifically the voltage) showed that there seems to be a constant voltage difference between the two wires and they increase +0.5v from their base voltage of 2.5v and 0v, respectively.

While I will definitely pursue sensor data spoofing, right now, I landed an even larger discovery of some community DBC files for the Tesla model 3 (2017-2023) iBooster. Since this is arguably a safer and more proven solution, I have one shipped and incoming.

