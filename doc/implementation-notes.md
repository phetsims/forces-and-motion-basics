# Forces and Motion: Basics - Implementation Notes

@author Jules (Google)

## Table of Contents

* [Introduction](#introduction)
* [General Considerations](#general-considerations)
  * [Query Parameters](#query-parameters)
  * [Memory Management](#memory-management)
  * [Coordinate Frames](#coordinate-frames)
* [Model](#model)
  * [Net Force Screen (`NetForceModel.ts`)](#net-force-screen-netforcemodelts)
  * [Motion, Friction, and Acceleration Screens (`MotionModel.ts`)](#motion-friction-and-acceleration-screens-motionmodelts)
  * [Class Hierarchies](#class-hierarchies)
  * [Other Important Model Classes](#other-important-model-classes)
* [View](#view)
  * [General Structure](#general-structure)
  * [Net Force Screen (`NetForceScreenView.ts`)](#net-force-screen-netforcescreenviewts)
  * [Motion, Friction, and Acceleration Screens (`MotionScreenView.ts`)](#motion-friction-and-acceleration-screens-motionscreenviewts)
  * [Common View Elements](#common-view-elements)
* [PhET-iO](#phet-io)
  * [General](#general)
  * [IO Types](#io-types)
  * [Dynamic PhET-iO Elements](#dynamic-phet-io-elements)
  * [PhetioObject Subclasses](#phetioobject-subclasses)

## Introduction

This document contains notes related to the implementation of **Forces and Motion: Basics**. This is not an exhaustive
description of the implementation. The intention is to provide a concise high-level overview, and to supplement the
internal documentation (source code comments) and external documentation (design documents).

Before reading this document, please read:

* [model.md](https://github.com/phetsims/forces-and-motion-basics/blob/main/doc/model.md)

You are also encouraged to read:

* [PhET Development Overview](https://github.com/phetsims/phet-info/blob/main/doc/phet-development-overview.md)
* [PhET Software Design Patterns](https://github.com/phetsims/phet-info/blob/main/doc/phet-software-design-patterns.md)

## General Considerations

### Query Parameters

The simulation supports the following query parameters:

* `showItemToolboxes` (boolean, default: `true`): Allows hiding the item toolboxes in screens like Net Force, Motion,
  and Friction. When `false`, the toolboxes for items (e.g., crates, people, pucks) are not displayed.
* `pullerColor` (string, default: `'blueRed'`, valid values: `'blueRed'`, `'purpleOrange'`): Sets the colors of the
  pullers (tug-of-war people) in the Net Force screen. `'blueRed'` uses blue for the left team and red for the right
  team. `'purpleOrange'` uses purple for the left team and orange for the right team.
* `showForceArrowLabels` (boolean, default: `true`): Primarily for internal use, such as generating screenshots for
  publication. When `false`, labels on force arrows (e.g., "Applied Force", "Friction Force", "Sum of Forces") are
  hidden.

Running the simulation with `?log` in the URL will print all registered query parameters and their current values to the
browser's developer console.

### Memory Management

**Instantiation**

Most objects in the simulation are instantiated at startup and persist for the entire lifetime of the simulation. This
includes models, views, and their components. This approach simplifies object lifecycle management and reduces the
likelihood of memory leaks due to improper disposal.

**Listeners**

Unless explicitly noted otherwise (e.g., for temporary listeners or those tied to shorter-lived objects), calls to
`link`, `addListener`, and similar event subscription methods do not require a corresponding `unlink`, `removeListener`,
or `unobserve` call. This is because the objects involved (both the observable and the listener) typically exist for the
lifetime of the simulation. When the simulation is closed, all objects are reclaimed by the browser.

**dispose**

Sim-specific classes for objects that live for the lifetime of the simulation are generally not intended to be disposed
of. They may explicitly prevent disposal by using `Disposable.assertNotDisposable()` or have a minimal (possibly empty)
`dispose` method. For typical `dispose` patterns, refer to the `dispose` methods in classes like `MotionModel.ts` and
`NetForceModel.ts` if more complex cleanup is needed for specific components, though this is less common for lifetime
objects.

### Coordinate Frames

The simulation uses the standard Scenery coordinate frame, where the origin (0,0) is at the top-left corner of the
screen, +x values increase to the right, and +y values increase downwards. No global transformations or custom
coordinate frames are applied at the root level of the simulation screens. All positions and transformations are
relative to this standard Scenery coordinate system.

## Model

The simulation is composed of four distinct screens: "Net Force", "Motion", "Friction", and "Acceleration". The latter
three screens ("Motion", "Friction", "Acceleration") share a common underlying model, `MotionModel.ts`, configured
differently for each screen, while the "Net Force" screen uses `NetForceModel.ts`.

### Net Force Screen (`NetForceModel.ts`)

The `NetForceModel.ts` simulates a tug-of-war scenario. The main components of this model are:

* **`Cart`**: Represents the wheeled cart that is being pulled.
* Key properties: `positionProperty` (Vector2Property), `velocityProperty` (NumberProperty).
* **`Puller`**: Represents the figures (people) that can pull the cart from either side. Each team can have multiple
  pullers.
* Key properties: `forceProperty` (NumberProperty, the force exerted by this puller), `knotProperty` (ObjectProperty,
  references the `Knot` it's attached to).
* **`Knot`**: Represents the attachment points on the rope where `Puller`s connect.
* Key properties: `positionProperty` (Vector2Property).

Other important model-level properties in `NetForceModel` include:

* `netForceProperty` (NumberProperty): The sum of forces from left and right pullers.
* `leftForceProperty` (NumberProperty): Total force from the left team.
* `rightForceProperty` (NumberProperty): Total force from the right team.
* `speedProperty` (NumberProperty): The speed of the cart.
* `isRunningProperty` (BooleanProperty): Controls whether the tug-of-war simulation is active (pullers are pulling).
* `hasStartedProperty` (BooleanProperty): Indicates if the "Go!" button has been pressed at least once.
* `stateProperty` (StringProperty): Represents the state of the game, e.g., 'experimenting' (ongoing), 'completed' (one
  side has won).

### Motion, Friction, and Acceleration Screens (`MotionModel.ts`)

These three screens are all instances of `MotionModel.ts`, which simulates an object or stack of objects being pushed on
a surface. The model is configured via constructor parameters to enable screen-specific behaviors.

The main components of this model are:

* **`Item`**: Represents the physical objects that can be stacked and pushed (e.g., Crate, Refrigerator, Person, Mystery
  Box).
* Key properties: `massProperty` (NumberProperty), `positionProperty` (Vector2Property), `inStackProperty` (
  BooleanProperty, true if part of the main stack being pushed), `userControlledProperty` (BooleanProperty, true if the
  user is dragging it).
* Human items (Girl, Man) are distinguished using `HumanTypeEnum.ts`.
* **Pusher**: This is an implicit concept within `MotionModel.ts`, representing the force applied by the user (or an
  automated mechanism in some contexts, though primarily user-driven here). The magnitude of this force is controlled by
  `appliedForceProperty` in `MotionModel.ts`.

Key model-level properties in `MotionModel` include:

* `appliedForceProperty` (NumberProperty): The force applied by the pusher.
* `frictionForceProperty` (NumberProperty): The opposing force of friction.
* `frictionCoefficientProperty` (NumberProperty): The coefficient of static/kinetic friction.
* `sumOfForcesProperty` (NumberProperty): Net force acting on the stack.
* `positionProperty` (NumberProperty): The horizontal position of the stack of items.
* `velocityProperty` (NumberProperty): The velocity of the stack.
* `accelerationProperty` (NumberProperty): The acceleration of the stack.
* `stackedItems` (ObservableArrayDef of `Item`): The items currently in the pushable stack.
* `isPlayingProperty` (BooleanProperty): True when the simulation is running (not paused).

Screen-specific behavior is controlled by constructor parameters passed to `MotionModel`:

* `skateboard: boolean`: If `true` (for the "Motion" screen), a skateboard is placed under the items, effectively
  minimizing friction unless explicitly set.
* `accelerometer: boolean`: If `true` (for the "Acceleration" screen), an accelerometer is displayed and its readings
  are updated.
* Friction is implicitly enabled for the "Friction" and "Acceleration" screens (by having a non-zero default
  `frictionCoefficientProperty`). For the "Motion" screen, friction is effectively disabled by defaulting
  `frictionCoefficientProperty` to a very low or zero value, especially when the skateboard is present.

### Class Hierarchies

The class hierarchies in this simulation are relatively flat.

```
// Simulation Models
NetForceModel
  Cart
  Puller
  Knot
MotionModel
  Item (various types like Crate, Fridge, Human (via HumanTypeEnum), MysteryBox)
  // Pusher is an implicit concept driven by MotionModel.appliedForceProperty

// Note: Human items (Girl, Man) are distinguished using HumanTypeEnum within the Item class structure.
```

* `Item.ts` is a central class for representing the physical objects in the "Motion", "Friction", and "Acceleration"
  screens. Different types of items are generally handled by properties within the `Item` class (e.g., mass, image)
  rather than a deep inheritance tree. Human figures are specifically typed using `HumanTypeEnum`.
* `Puller.ts` represents the figures in the "Net Force" screen.
* The main model classes, `NetForceModel.ts` and `MotionModel.ts`, manage collections of these entities and the overall
  physics simulation for their respective screens.

### Other Important Model Classes

* `MotionConstants.ts`: This file (located at `js/motion/MotionConstants.ts`) contains various numerical constants used
  in the physics calculations for `MotionModel.ts`. This includes default masses, force limits, physical world
  dimensions, and coefficients. Organizing these into a separate constants file helps in managing and adjusting the
  simulation's behavior.

## View

### General Structure

Each of the four simulation screens ("Net Force", "Motion", "Friction", "Acceleration") has a primary view class
responsible for its visual representation. The "Net Force" screen uses `NetForceScreenView.ts`. The "Motion", "
Friction", and "Acceleration" screens all share and reuse `MotionScreenView.ts`, configured with screen-specific
options.

### Net Force Screen (`NetForceScreenView.ts`)

Key visual components in the Net Force screen include:

* **`CartNode`**: The visual representation of the `Cart` model. It includes an integrated speedometer that displays the
  cart's current speed.
* **`PullerNode`**: Represents the `Puller` model elements (the people). Their images change to show them leaning when
  pulling and standing when idle. The color of the pullers' attire can be changed via
  `ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty` (cycling between blue/red teams and purple/orange
  teams).
* **`KnotHighlightNode`**: Provides a visual cue (highlight) on the rope's `Knot`s when a `PullerNode` is being dragged
  and is close enough to snap to an available knot.
* **`PullerToolboxNode`**: UI elements located on the left and right sides of the play area. These toolboxes house the
  `PullerNode`s when they are not attached to the rope.
* **`ReadoutArrow`**: Custom arrow nodes used to display the "Left Force", "Right Force", and "Sum of Forces" values
  above the cart and rope. These arrows are typically dotted when the simulation is paused and solid when running.
* **`GoPauseButton`**: A toggle button to start ("Go!") or pause the tug-of-war simulation.
* **`ReturnButton`**: A button to reset the cart to its starting position and return all pullers to their toolboxes.
* **`FlagNode`**: A visual indicator (flag) that appears on the side of the winning team when the tug-of-war is
  completed (one team pulls the cart to their side).
* **Static Elements**: The view also includes static background elements like the sky, ground, and grass, the image of
  the rope itself, and stoppers at each end of the cart's track.

### Motion, Friction, and Acceleration Screens (`MotionScreenView.ts`)

`MotionScreenView.ts` is a versatile view class used for the "Motion", "Friction", and "Acceleration" screens. Key
components include:

* **`ItemNode`**: The visual representation for `Item` model elements (e.g., crates, refrigerator, filing cabinet,
  people, mystery box, water bucket). It handles displaying different images based on the item's state (e.g., a person
  standing vs. sitting, or holding an object). Mass labels can be toggled on/off for each item.
* **`WaterBucketNode`**: A specialized version of `ItemNode` for the water bucket, which has unique visual properties or
  behaviors.
* **`PusherNode`**: The visual representation of the character that pushes the stack of items. The pusher's appearance
  changes to reflect the effort of pushing (e.g., straining at high forces) and can show the pusher falling over if the
  applied force is removed suddenly while items are in motion.
* **`SpeedometerNode`**: Displays the current speed of the stacked items.
* **`AccelerometerNode`**: Specific to the "Acceleration" screen, this node displays the current acceleration of the
  stacked items.
* **`AppliedForceControl`**: A custom slider-like UI component that allows the user to set the magnitude of the applied
  force by the pusher.
* **`ReadoutArrow`**: Similar to the Net Force screen, these are used to display "Applied Force", "Friction Force",
  and "Sum of Forces" above the items being pushed.
* **`MovingBackgroundNode`**: Creates a parallax scrolling effect for the background (e.g., trees, clouds) as the items
  and pusher move horizontally, enhancing the sense of motion.
* **`MotionControlPanel`**: A panel containing checkboxes and other controls that allow the user to toggle the
  visibility of force vectors, mass labels, speed, values, and other visual aids.
* **`StopwatchNode`**: A draggable stopwatch that users can use to time events in the simulation.
* **Static Elements**: Includes background elements like the sky and ground. The "Motion" screen specifically features a
  skateboard under the items. Item toolboxes are present on the left and/or right to hold available `ItemNode`s.

### Common View Elements

Several view components are reused or have common patterns across screens:

* **`ReadoutArrow.ts`**: This is a reusable Scenery node (`js/common/view/ReadoutArrow.ts`) designed to display force
  vectors with an attached numerical readout of their magnitude. It's used in both `NetForceScreenView.ts` and
  `MotionScreenView.ts` to visualize various forces.
* **Control Panels**: Each screen type has a dedicated control panel (e.g., `NetForceControlPanel.ts`,
  `MotionControlPanel.ts`) that houses screen-specific UI controls, typically checkboxes for toggling visual elements or
  options.
* **`ResetAllButton`**: A standard PhET button, present on all simulation screens, that resets the current screen to its
  initial state.

## PhET-iO

### General

The Forces and Motion: Basics simulation is instrumented for PhET-iO, allowing for rich interaction and data collection
when used in PhET-iO compatible environments. Standard PhET-iO instrumentation practices are followed. The PhET-iO
overrides file, `js/forces-and-motion-basics-phet-io-overrides.js`, is minimal and does not contain significant
customization, indicating that most PhET-iO elements use default configurations or are configured inline within their
respective classes. Many model properties and UI components are marked with `phetioFeatured: true` to expose them in the
PhET-iO Studio.

### IO Types

The simulation defines a few custom IO Types for PhET-iO, typically for complex model components:

* **`NetForceModelIO`**: Found in `NetForceModel.ts`, this IOType is defined as
  `new IOType( 'NetForceModelIO', { valueType: NetForceModel, ... } )`. It serves as the PhET-iO representation for the
  `NetForceModel` itself.
* **`KnotIO`**: Found in `Knot.ts`, this IOType is defined as `new IOType( 'KnotIO', { valueType: Knot, ... } )`. It is
  used for PhET-iO representations of `Knot` instances. While the grep output shows `ReferenceIO( IOType.ObjectIO )` in
  the search, the actual definition in `Knot.ts` creates a specific `KnotIO`.

For collections of PhET-iO elements:

* **`MotionModel.stackedItems`**: This `ObservableArray` of `Item` instances is instrumented using
  `ObservableArrayIO( ReferenceIO( IOType.ObjectIO ) )`. Each `Item` within the array is itself a `PhetioObject`
  instrumented with `ReferenceIO( IOType.ObjectIO )`. This allows PhET-iO to manage the dynamic list of items.

### Dynamic PhET-iO Elements

The simulation features dynamically created and destroyed PhET-iO elements, primarily in the context of the
`MotionModel`:

* **`MotionModel.stackedItems`**: The `Item` instances within this `ObservableArray` are dynamic. Users can drag new
  `Item`s from toolboxes into the stack, add them to the PhET-iO hierarchy, or remove them from the stack (e.g., by
  dragging them off, or by them falling), which also removes them from this instrumented collection. Each `Item` is a
  `PhetioObject` and its lifecycle is managed within the PhET-iO framework.

In contrast:

* **`NetForceModel.pullers`**: The `Puller` instances in the Net Force screen are created at startup (a fixed number for
  each side). While their state changes (e.g., `knotProperty` linking to different `Knot`s, or `isDraggingProperty`),
  the `Puller` `PhetioObject`s themselves are not dynamically created or destroyed during typical simulation interaction
  after initialization.
* **`NetForceModel.knots`**: Similar to pullers, `Knot` instances are created at startup and are not dynamically added
  or removed.

### PhetioObject Subclasses

Several key model classes extend `PhetioObject` to be part of the PhET-iO API:

* `NetForceModel` (in `js/netforce/model/NetForceModel.ts`)
* `Item` (in `js/motion/model/Item.ts`)
* `Puller` (in `js/netforce/model/Puller.ts`)
* `Knot` (in `js/netforce/model/Knot.ts`)

Other classes, like `Cart.ts` (used in `NetForceModel`) and `MotionModel.ts`, do not directly extend `PhetioObject`.
Instead, they are instrumented by creating PhET-iO elements for their instances or properties within their parent
PhET-iO contexts (e.g., `NetForceModel` instruments its `Cart` instance; each screen model instruments its `MotionModel`
instance). `MotionModel` itself has many of its properties instrumented, making its state accessible via PhET-iO.
