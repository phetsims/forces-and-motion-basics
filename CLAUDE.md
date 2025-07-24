# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Forces and Motion Basics - Development Guide

## Build Commands

- `grunt type-check`: Run TypeScript type checking
- `grunt lint --fix`: Run and auto-fix linting issues
- `grunt modulify --targets=strings`: Update string subsystems after modifying forces-and-motion-basics-strings_en.yaml

## Environment

- This is developed as part of a monorepo. If you need details of any of the dependencies, you can follow the import
  paths for read-only, but search for the *.ts first.
- When getting the contents of a file, it probably has a *.ts suffix even though it is imported as *.js.
- Read ./doc/model.md and ./doc/implementation-notes.md when you need more context about the simulation.

## Project Structure

- `js/` - TypeScript source code (model/view architecture)
- `images/` - Image assets and generated TypeScript imports

## Code Style

- Use TypeScript with explicit typing for all properties and parameters
- Access modifiers (`public`, `private`) required for class members
- Class names: PascalCase, Files: kebab-case, Variables/Methods: camelCase
- Properties use PhET's Property system (NumberProperty, BooleanProperty)
- Boolean properties begin with verbs (`is`, `has`, `show`)
- Model classes should never import from view
- Use parameter destructuring for object configs
- Include JSDoc comments for all methods and classes
- Add tandem parameters for PhET-IO integration
- Use explicit file extensions in imports (.js)

## Internationalization (i18n)
- **Source of Truth:** All new strings must be added to the `forces-and-motion-basics-strings_en.yaml` file. The `grunt modulify --targets=strings` command will then automatically update the `forces-and-motion-basics-strings_en.json` and `ForcesAndMotionBasicsStrings.ts` files.
- A11y strings often need deeper nesting (component > subcomponent > feature > property)
- When adding new accessibility text, check existing patterns for proper nesting structure

By launching claude like so:

```
claude --add-dir ../graphing-quadratics --add-dir ../center-and-variability/ --add-dir ../beers-law-lab --add-dir ../vector-addition
```

I have added your ability to see to other simulations that we may need to refer to:

- ../graphing-quadratics/
- ../center-and-variability/
- ../beers-law-lab/
- ../vector-addition/
- ../membrane-transport/

## Keyboard Navigation Patterns

### Group Tab Stop Implementation

Based on the InteractiveSlotsNode pattern from `../membrane-transport/`, we implemented a group keyboard navigation system for the blue pullers. Key learnings:

#### Architecture Pattern
- **PullerGroupNode**: A container that manages keyboard navigation for groups of UI elements
- **Single Tab Stop**: The entire group appears as one focusable element in the tab order
- **Internal Navigation**: Arrow keys navigate between individual items within the group
- **Two-Phase Interaction**: Navigate with arrows, then activate with Space/Enter

#### Implementation Details

```typescript
// Group setup
const leftPullerGroup = new PullerGroupNode( model, { 
  side: 'left',
  focusable: true,
  ariaRole: 'group',
  accessibleName: 'Blue Team Pullers',
  descriptionContent: 'Use arrow keys to select a puller, then press Space or Enter to grab'
} );

// Individual elements are not directly focusable
pullerNode.focusable = false;
```

#### Focus Highlighting System
- **Group Highlight**: `GroupHighlightPath` surrounds entire group when focused
- **Selection Highlight**: Custom Path node shows currently selected item within group
- **Bounds Issues**: Must create highlights after children are added (bounds are infinite initially)

```typescript
// Proper highlight initialization
this.groupFocusHighlight = new GroupHighlightPath( Shape.rectangle( 0, 0, 1, 1 ) );

// Update after adding children
private updateGroupHighlight(): void {
  if ( this.pullerNodes.length > 0 && this.localBounds.isFinite() ) {
    this.groupFocusHighlight = new GroupHighlightPath( Shape.bounds( this.localBounds.dilated( 15 ) ) );
  }
}
```

#### Critical Implementation Notes
1. **Focus Highlight Types**: `focusHighlight` expects a Node (Path) or null, not a raw Shape
2. **Bounds Timing**: Cannot use `this.localBounds` in constructor before children are added
3. **Keyboard Listener Enablement**: Use `enabledProperty: this.focusedProperty` to ensure listeners only work when focused
4. **Individual Item Management**: Remove individual focusability to prevent tab conflicts

#### Accessibility Features
- ARIA role="group" for semantic grouping
- Descriptive accessible names that update based on selection
- Proper keyboard interaction announcements (TODO: implement screen reader announcements)

This pattern can be reused for any UI where multiple related interactive elements should appear as a single tab stop with internal navigation.

### Keyboard Interaction Implementation (Individual Focus Pattern)

**IMPORTANT LESSON LEARNED:** When implementing keyboard interactions for elements that should maintain individual focus (not group focus), the keyboard listeners must be attached to individual elements, not to a parent group.

#### The Problem
Initial implementation attempted to:
1. Add keyboard listeners to the `PullerGroupNode` parent
2. Use group-level properties like `this.selectedIndex` to determine which puller to operate on
3. Handle events at the group level while individual pullers had focus

This didn't work because:
- Individual pullers were focused, not the group
- Group-level keyboard listeners weren't receiving events from focused children
- The interaction model was mismatched (group handling vs individual focus)

#### The Solution
**Factory Pattern for Individual Listeners:**
```typescript
// Create a factory function that generates unique listeners for each puller
this.createSelectListener = ( targetPullerNode: PullerNode ) => {
  return new KeyboardListener( {
    keys: [ 'enter', 'space' ],
    fire: () => {
      // Operate directly on the targetPullerNode passed to this listener
      const puller = targetPullerNode.puller;
      // ... keyboard interaction logic
    }
  } );
};

// Attach individual listeners to each puller
pullerNode.addInputListener( this.createSelectListener( pullerNode ) );
```

#### Key Implementation Details
1. **Individual Listeners**: Each puller gets its own unique KeyboardListener instance
2. **Closure Capture**: The factory function captures the specific `targetPullerNode` in the closure
3. **Direct Operation**: Each listener operates directly on its associated puller, not on group state
4. **Focus Model Match**: Matches the focus model (individual pullers are focusable)

#### Drag/Drop Keyboard Interaction Pattern
For implementing keyboard equivalents of drag/drop interactions:

1. **Two-Phase Interaction**:
   - First Enter/Space: "Grab" - set `puller.userControlledProperty = true` (shows yellow highlight circles)
   - Second Enter/Space: "Drop" - emit `puller.droppedEmitter` (uses existing model logic)

2. **Reuse Existing Model Logic**: 
   - Don't reimplement drop logic - reuse `puller.droppedEmitter.emit()`
   - The model already handles target selection via `getTargetKnot()` and `getClosestOpenKnot()`
   - Yellow circles are controlled by `knot.isHighlightedProperty` automatically

3. **Visual Feedback Integration**:
   - `puller.userControlledProperty = true` triggers the same highlighting system used for mouse drag
   - `puller.disconnect()` and `updateImage()` maintain visual consistency
   - `moveToFront()` ensures proper z-ordering during interaction

#### Common Pitfalls to Avoid
- **Don't mix group and individual focus models** - pick one and implement consistently
- **Don't reimplement existing model logic** - reuse emitters and property changes that already work
- **Don't forget method visibility** - may need to make `private` methods `public` for cross-class access
- **Import required dependencies** - keyboard interactions may need Vector2, shapes, etc.

## Architecture Overview

### Simulation Structure
This simulation consists of 4 screens with distinct but related physics models:

1. **Net Force Screen** (`js/netforce/`) - Tug-of-war with cart and pullers
   - Model: `NetForceModel.ts` with `Cart`, `Puller`, `Knot` classes
   - Key concept: Force summation and equilibrium

2. **Motion Screen** (`js/motion/`) - Frictionless pushing of objects
   - Model: Shared `MotionModel.ts` (skateboard mode)
   - Objects on skateboard with minimal friction

3. **Friction Screen** (`js/motion/`) - Pushing with adjustable friction
   - Model: Shared `MotionModel.ts` (friction enabled)
   - Explores static vs kinetic friction

4. **Acceleration Screen** (`js/motion/`) - Focus on F=ma relationship
   - Model: Shared `MotionModel.ts` (with accelerometer)
   - Includes water bucket that spills to show acceleration

### Model-View Architecture Pattern
- **Models** (`model/` directories): Handle physics calculations, state management
- **Views** (`view/` directories): Handle visual representation and user interaction
- **Screens**: Top-level coordination between model and view
- Models never import from views (strict separation)

### Key PhET Framework Dependencies
- **joist/**: Simulation framework, screens, home screen
- **scenery/**: Scene graph for UI rendering
- **axon/**: Property system for reactive programming (NumberProperty, BooleanProperty)
- **sun/**: UI components (buttons, sliders, checkboxes)
- **scenery-phet/**: PhET-specific UI components
- **tandem/**: PhET-IO instrumentation for data collection

### Common PhET Patterns
- **Properties**: Use Property classes instead of raw values for reactive updates
- **Dispose pattern**: Most sim objects live for full simulation lifetime
- **PhET-IO**: Extensive instrumentation for educational data collection
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Internationalization**: All user-facing strings externalized to YAML

### Physics Implementation Notes
- **Units**: Forces in Newtons, masses in kg, accelerations in m/s²
- **Time stepping**: Uses simple Euler integration (position += velocity * dt)
- **Simplifications**: 1D motion only, g = 10 m/s² for easier calculations
- **Friction model**: Static friction = kinetic friction, kinetic = 0.75 * static
