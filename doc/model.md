# Forces and Motion: Basics - Model Description

@author Sam Reid (PhET Interactive Simulations)

This document is a high-level description of the model used in PhET's _Forces and Motion: Basics_ simulation.

## Overview

The _Forces and Motion: Basics_ simulation allows exploration of forces and motion concepts. Users can apply forces to objects and observe their motion, friction, and acceleration. The simulation includes four main screens:
*   **Net Force:** Explore how forces combine to create a net force and affect the motion of a cart in a tug-of-war game.
*   **Motion:** Investigate the relationship between force, mass, and acceleration by pushing objects of different masses.
*   **Friction:** Examine the effects of friction on motion by pushing objects across a surface with adjustable friction.
*   **Acceleration:** Focus on the concept of acceleration and its relationship to force and mass, with an accelerometer and water-filled bucket to measure acceleration.

## Net Force Screen

### Symbols

*   **F_left**: Force exerted by pullers on the left side
*   **F_right**: Force exerted by pullers on the right side
*   **F_net**: Net Force (Sum of Forces)
*   **v**: Velocity (of the cart)
*   **x**: Position (of the cart)

### Units

*   **Force**: Newtons (N)
*   **Velocity**: Meters per second (m/s) - although not directly displayed as a value, it's used in calculations. Speed is displayed.
*   **Position**: Meters (m) - the game ends when the cart reaches +/- `NetForceModel.GAME_LENGTH`.

### Physics Concepts

The Tug of War screen (Net Force screen) primarily demonstrates:

*   **Net Force:** The core concept is how individual forces combine to produce a net force. Forces are applied by "pullers" on either side of a central cart.
*   F_net = F_right_total + F_left_total (where F_left_total is negative).
*   **Balanced Forces:** If the total force to the left equals the total force to the right (F_net = 0), the forces are balanced, and the cart does not accelerate. If it's already moving, it continues at a constant velocity (though in this specific model, if F_net is 0, velocity also tends to be 0 or is not initiated).
*   **Unbalanced Forces:** If the total force to one side is greater than the other (F_net ≠ 0), the forces are unbalanced, and the cart accelerates in the direction of the greater force.
*   **Newton's Second Law (Simplified):** The cart mass is not explicitly settable by the user (it's part of the cart's properties). The acceleration of the cart is proportional to the net force. The simulation uses a simplified relationship for velocity change: `newV = cart.velocityProperty.get() + netForce * dt`.

### Pullers and Cart

*   **Cart:** A central object on wheels to which two ropes are attached, one on each side. The motion of the cart is determined by the net force applied by the pullers.
*   **Pullers:** Character figures of different sizes that can be attached to knots on the ropes.
*   **Sizes and Forces:**
    *   Small Puller: Exerts 50 N of force.
    *   Medium Puller: Exerts 100 N of force.
    *   Large Puller: Exerts 150 N of force.
*   **Teams:** Pullers are color-coded (blue for the left team, red for the right team). Colors can be customized in the preferences.
*   **Attachment:** Pullers are dragged from a toolbox area and snap to available knots on their respective team's rope. Each rope has 4 knots and therefore can have 0-4 pullers attached at a time.
*   **Rope:** The rope itself is assumed to be massless, inextensible, and always fully taut. The force is transmitted directly from the pullers to the cart.

### Net Force Calculation

*   **Left Force (F_left):** The sum of forces from all pullers attached to the left (blue) rope. This value is negative as it pulls to the left.
*   `F_left = - (sum of forces of all blue pullers)`
*   **Right Force (F_right):** The sum of forces from all pullers attached to the right (red) rope. This value is positive as it pulls to the right.
*   `F_right = sum of forces of all red pullers`
*   **Net Force (F_net):** The total force acting on the cart.
*   `F_net = F_left + F_right`
*   The simulation displays these individual forces and the sum of forces (if selected via checkbox).

### Trial Mechanics

*   **Starting the Game:** The simulation starts (cart begins to move if there is a nonzero net force) when the "Go" button is pressed.
*   **Motion Dynamics:**
*   The cart's velocity is updated based on the net force using the formula: `new_velocity = old_velocity + F_net * dt`.
*   The cart's position is updated based on this velocity: `new_position = old_position + new_velocity * dt`.
*   **Winning Condition:** The trial ends when the cart's front wheel reaches a certain distance from the center
*   If `cart.position > NetForceModel.GAME_LENGTH`, the right team wins.
*   If `cart.position < -NetForceModel.GAME_LENGTH`, the left team wins.
*   **Game Over:** When the game ends, the cart stops, its velocity is set to zero, and its position is set to the maximum game length reached.
*   **Return Cart:** A "Return Cart" button resets the cart to the center, stops its motion, and allows for a new trial with the same or different puller configuration. This also resets the game timer and speed indicator.

### Simplifications

*   **Mass of Cart:** The mass of the cart is constant and not explicitly shown to the user.
*   **No Friction:** The cart is assumed to move without any friction from the ground or air resistance.
*   **Puller Strength:** Pullers exert a constant force regardless of how tired they might get in a real tug of war.
*   **Rope Properties:** The rope is assumed to be perfectly inextensible and massless.
*   **Discrete Knots:** Pullers can only attach to specific, discrete points (knots) on the rope. It is irrelevant which knot a puller is attached to, as the force is transmitted directly to the cart.

## Motion Screens Model

### Symbols

*   **F_applied**: Applied Force
*   **F_friction**: Friction Force
*   **F_sum**: Sum of Forces (Net Force)
*   **m**: Mass
*   **a**: Acceleration
*   **v**: Velocity
*   **x**: Position

### Units

*   **Force**: Newtons (N)
*   **Mass**: Kilograms (kg)
*   **Acceleration**: Meters per second squared (m/s²)
*   **Velocity**: Meters per second (m/s)
*   **Position**: Meters (m)

### Physics Concepts

The motion screens (Motion, Friction, and Acceleration) are based on fundamental classical mechanics principles:

*   **Newton's Second Law of Motion:** The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (a = F_sum / m).
*   **Friction:** A force that opposes motion between surfaces in contact.
  *   **Static Friction:** The friction that prevents an object from moving when a force is applied. The model approximates static friction; if the applied force is less than or equal to the maximum static friction, the friction force will be equal and opposite to the applied force, resulting in no motion.
  *   **Kinetic Friction:** The friction that acts on a moving object. It is typically less than static friction and is modeled as a constant value opposing the direction of motion. The kinetic friction is calculated as 0.75 * coefficient of friction * mass * g.
*   **Net Force (Sum of Forces):** The vector sum of all forces acting on an object. If the net force is zero, the object's velocity remains constant (either at rest or moving at a constant velocity). If the net force is non-zero, the object accelerates.

### Interactive Items

Users can interact with various objects on these screens. Each object has a specific mass:

*   **Crate (Small):** 50 kg
*   **Refrigerator:** 200 kg
*   **Trash Can:** 100 kg
*   **Adult Man:** 80 kg
*   **Young Girl:** 40 kg
*   **Mystery Object:** 50 kg
*   **Water Bucket:** 100 kg (Only available on the "Acceleration" screen)

These objects can be stacked on top of each other (up to a limit of 3 items, if a 4th is added the bottom one is removed). The total mass of the stack is used in physics calculations. A pusher (representing a human figure) applies force to these objects. The pusher can fall over if the speed of the objects becomes too high.

### Force Calculations

*   **Applied Force (F_applied):** This is the force exerted by the pusher on the stack of objects. The user can control this force, typically ranging from -500 N to +500 N. The direction of the force is indicated by its sign (positive for right, negative for left).
*   **Friction Force (F_friction):**
  *   If the object is stationary and the magnitude of the applied force is less than or equal to the maximum static friction force (μ_s * N, where μ_s is the coefficient of static friction and N is the normal force, N = mass * g), the friction force is equal and opposite to the applied force.
  *   If the object is moving, or if the applied force exceeds the maximum static friction, kinetic friction acts in the direction opposite to the velocity. The model calculates kineti friction as 0.75 * μ_k * N (where μ_k is the coefficient of kinetic friction, assumed to be the same as the friction coefficient value, and N = mass * g). The gravitational acceleration `g` is taken as 10.0 m/s², as described in https://github.com/phetsims/forces-and-motion-basics/issues/132
  *   The friction coefficient can be adjusted by the user in the "Friction" and "Acceleration" screens. In the "Motion" screen, friction is effectively zero (skateboard).
*   **Sum of Forces (F_sum):** This is the net force acting on the stack of objects, calculated as F_sum = F_applied + F_friction. This net force determines the acceleration of the objects.

### Motion Calculations

*   **Acceleration (a):** Calculated using Newton's Second Law: a = F_sum / m_total, where m_total is the total mass of the stacked objects. If the total mass is zero (no objects in the stack), acceleration is zero.
*   **Velocity (v):** The velocity of the stack of objects is updated each time step (dt) based on the acceleration: v_new = v_old + a * dt.
  *   If the net force and acceleration are zero, velocity remains constant.
  *   The simulation caps the velocity at the max speed (40 m/s). If this speed is exceeded, the pusher falls over.
  *   A key aspect of the model is that if the friction force would cause the object to reverse direction, the velocity is set to zero instead. This prevents hysteresis oscillations when an object comes to rest due to friction.
*   **Position (x):** The position of the stack of objects is updated each time step based on the velocity: x_new = x_old + v * dt.
*   **Speed:** The magnitude of the velocity (|v|).

### Simplifications

*   **Gravitational Acceleration (g):** Assumed to be 10.0 m/s² for simplicity in calculating normal force and friction, instead of the more precise 9.81 m/s².
*   **One-Dimensional Motion:** All motion is restricted to a single horizontal dimension.
*   **Rigid Bodies:** All objects are treated as rigid bodies that do not deform.
*   **Pusher Behavior:** The pusher falls over if the max speed is exceeded. The pusher stands back up after a short delay (2 seconds) or if a force is applied in the opposite direction of the fall, or if the pusher is far off-screen. This is a simplified representation rather than a complex physics-based model of balance.
*   **Stacking Limit:** A maximum of 3 items can be stacked. Adding a fourth item causes the bottom item of the stack to return to its initial position.
*   **Coefficient of Kinetic Friction:** The model uses a simplified kinetic friction calculation where the kinetic friction force is 0.75 times the static friction force (μ_k = 0.75 * μ_s).
*   **Motion Screen Friction:** In the "Motion" screen, objects are on skateboards, and friction is considered negligible (effectively zero).

