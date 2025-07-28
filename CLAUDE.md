# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Forces and Motion Basics - Development Guide

## Build Commands

- `grunt type-check`: Run TypeScript type checking
- `grunt lint --fix`: Run and auto-fix linting issues
- `grunt modulify --targets=strings`: Update string subsystems after modifying forces-and-motion-basics-strings_en.yaml

## Testing Commands

- `npm run test -- tests/keyboard-navigation.spec.js --reporter=line`: Run keyboard navigation tests without popup
- `npm run test -- tests/keyboard-navigation.spec.js --grep "test name" --reporter=line`: Run specific test

### Debug Console Output in Tests

To see debug console output when running tests:

1. **Enable debug flags in the URL**: The test navigation URL must include `debugAltInput` query parameter:
   ```
   http://localhost/forces-and-motion-basics/forces-and-motion-basics_en.html?brand=phet&ea&debugger&screens=1&logAriaLiveResponses&debugAltInput
   ```

2. **Use console.log in test files**: Debug output from `console.log()` statements in the test will appear in test output

3. **Debug output from sim code**: Console logs from the simulation code (e.g., `ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log(...)`) will only appear if:
   - The `debugAltInput` query parameter is present in the navigation URL
   - The logs are captured by Playwright's console listener in the test

4. **Example console capture in tests**:
   ```javascript
   // Capture console messages for debugging
   const messages = [];
   page.on( 'console', msg => {
     if ( msg.text().includes( '[DEBUG]' ) ) {
       messages.push( msg.text() );
     }
   } );
   ```

**Note**: Debug output may not appear in all reporter formats. Use `--reporter=dot` or `--reporter=line` for best results.

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

- **Source of Truth:** All new strings must be added to the `forces-and-motion-basics-strings_en.yaml` file. The
  `grunt modulify --targets=strings` command will then automatically update the
  `forces-and-motion-basics-strings_en.json` and `ForcesAndMotionBasicsStrings.ts` files.
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

Based on the InteractiveSlotsNode pattern from `../membrane-transport/`, we implemented a group keyboard navigation
system for the blue pullers. Key learnings:

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
3. **Keyboard Listener Enablement**: Use `enabledProperty: this.focusedProperty` to ensure listeners only work when
   focused
4. **Individual Item Management**: Remove individual focusability to prevent tab conflicts

#### Accessibility Features

- ARIA role="group" for semantic grouping
- Descriptive accessible names that update based on selection
- Proper keyboard interaction announcements (TODO: implement screen reader announcements)

This pattern can be reused for any UI where multiple related interactive elements should appear as a single tab stop
with internal navigation.

### Keyboard Interaction Implementation (Individual Focus Pattern)

**IMPORTANT LESSON LEARNED:** When implementing keyboard interactions for elements that should maintain individual
focus (not group focus), the keyboard listeners must be attached to individual elements, not to a parent group.

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

### Focus Management Race Conditions (CRITICAL PATTERN)

**Problem**: Property listeners can interfere with focus state during critical transitions, causing focus loss.

**Pattern**: When implementing reactive focus management systems, property changes during state transitions can trigger unwanted recomputations that interfere with the ongoing operation.

**Example**: In our case, when a puller was grabbed via keyboard:
1. `puller.grab()` sets `dragType = 'keyboard'` 
2. This triggers `modeProperty.set()` 
3. Which triggers `modeProperty.link()` listener
4. Which calls `recomputeAllFocusability()`
5. Which could change the puller's focus state before the drop operation completes

**Solution**: Add guard conditions to prevent interference during critical transitions:

```typescript
// Guard: Don't interfere with keyboard-grabbed pullers that still have focus
const keyboardGrabbedPuller = this.allPullers.find( puller => 
  puller.puller.isGrabbed() && 
  puller.puller.state.dragType === 'keyboard' && 
  puller.isFocused 
);

if ( keyboardGrabbedPuller ) {
  return; // Skip recomputation during grab-to-drop transition
}
```

**General Principle**: In reactive systems, always consider whether property listeners should be suppressed during specific state transitions.

### Debugging Complex Async Focus Issues

**Key Technique**: Use targeted console.log with stack traces to identify exactly when and why focus is lost:

```typescript
// Add focus tracking during development
if ( ForcesAndMotionBasicsQueryParameters.debugAltInput ) {
  this.focusedProperty.link( focused => {
    if ( !focused && this.puller.isGrabbed() && this.puller.state.dragType === 'keyboard' ) {
      console.log( 'FOCUS LOST during keyboard grab for:', this.puller.size, this.puller.type );
      console.log( 'Stack trace:', new Error().stack );
    }
  } );
}
```

**MCP Playwright for Real-Time Debugging**: Use MCP Playwright browser tools to see console output in real-time during interactions, which is more effective than automated test console capture for complex timing issues.

**Manual vs Automated Test Differences**: Manual testing may work while automated tests fail due to timing differences. Always test both scenarios and add appropriate `waitForTimeout()` calls in tests to account for async operations.

**Test Expectation Validation**: When tests fail, verify that the test expectations match the actual correct behavior. Sometimes the test encodes incorrect assumptions about the expected behavior.

### Advanced Keyboard Navigation Implementation (PHASE II Lessons)

**CRITICAL LESSON: Property Timing and State Management**

The most challenging aspect was managing the complex state transitions during keyboard interactions. Key insights:

#### 1. **Keyboard Listener Conflicts**

**Problem**: Having separate navigation and selection listeners on the same keys caused conflicts - only one would "
win".

**Solution**: Unified keyboard listener with mode-based routing:

```typescript
fire: ( event, keysPressed ) => {
  const isGrabbed = puller.userControlledProperty.get();
  
  if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' ) {
    if ( isGrabbed ) {
      // GRABBED MODE: Navigate between knots
    } else {
      // NORMAL MODE: Navigate between pullers
    }
  }
}
```

#### 2. **Property Setting Order is CRITICAL**

**Problem**: Setting `userControlledProperty = true` AFTER `puller.disconnect()` caused immediate transfers and focus
loss.

**Solution**: Always set user control state BEFORE disconnecting:

```typescript
// WRONG - causes premature transfer
puller.disconnect();  // Sets knotProperty = null, triggers transfer
puller.userControlledProperty.set( true );

// CORRECT - prevents transfer during grab
puller.userControlledProperty.set( true );  // Prevents transfer
puller.disconnect();  // Now safe to disconnect
```

#### 3. **Parent-Child Relationship Management**

**Problem**: During knot cycling, pullers could be transferred from rope→rope or toolbox→toolbox, causing "Parent
already contains child" errors.

**Solution**: Check parent containment before transfers:

```typescript
if ( toolboxGroup.hasChild( pullerNode ) && !ropeGroup.hasChild( pullerNode ) ) {
  // Only transfer if puller is in source and not in target
  toolboxGroup.removePullerNode( pullerNode );
  ropeGroup.addPullerNode( pullerNode );
}
```

#### 4. **Dynamic Group Management**

**Key insight**: Pullers need to transfer between groups while maintaining their keyboard listeners and focus state.

**Implementation Pattern**:

- Replace keyboard listeners when transferring between groups
- Each group type (toolbox vs rope) has different navigation behavior
- Preserve focus during transfers when possible

#### 5. **Multi-Group Architecture**

**Lesson**: Separate groups by logical function AND team:

- `leftPullerGroup` (blue toolbox) + `leftRopePullerGroup` (blue on rope)
- `rightPullerGroup` (red toolbox) + `rightRopePullerGroup` (red on rope)

**Benefits**:

- Clear accessibility descriptions for each group
- Proper tab order reflecting game structure
- Team-based navigation separation

#### 6. **Debugging Complex Async Interactions**

**Essential technique**: Strategic console.log placement at state transition points:

```typescript
console.log( 'BEFORE disconnect - userControlled:', puller.userControlledProperty.get() );
puller.userControlledProperty.set( true );
console.log( 'Set userControlled = true' );
puller.disconnect();
console.log( 'AFTER disconnect - knotProperty:', puller.knotProperty.get() );
```

#### 7. **HOME Waypoint Pattern**

**Implementation**: Add `null` to waypoints array to represent "return to toolbox":

```typescript
const waypoints = [ ...availableKnots, null ]; // null = home position
```

**Position Management**: Use `puller.positionProperty.reset()` to return to original coordinates.

#### 8. **Focus Management During Transfers**

**Key insight**: Focus can be lost when nodes are reparented. Minimize transfers and preserve focus state when possible.

**Solution**: Only transfer on actual state changes, not during interaction phases.

#### 9. **Focus Restoration Bug Pattern**

**CRITICAL LESSON**: When using `focusedProperty.lazyLink` to manage focusability across groups, you MUST handle BOTH
focus gain AND focus loss.

**The Problem**: `focusedProperty.lazyLink` listeners commonly only handle `focused = true` case:

```typescript
pullerNode.focusedProperty.lazyLink( focused => {
  if ( focused ) {
    // Make other items non-focusable
    this.items.forEach( item => {
      if ( item !== focusedItem ) {
        item.focusable = false;
      }
    } );
  }
  // BUG: No else clause means items stay non-focusable forever!
} );
```

**The Fix**: Always add focus restoration in the `else` clause:

```typescript
pullerNode.focusedProperty.lazyLink( focused => {
  if ( focused ) {
    // Make other items non-focusable when this gets focus
    this.items.forEach( item => {
      if ( item !== focusedItem ) {
        item.focusable = false;
      }
    } );
  }
  else {
    // CRITICAL: Restore focusability when this loses focus
    this.items.forEach( item => {
      // Add conditions as needed (e.g., only toolbox items)
      if ( item.shouldBeFocusable() ) {
        item.focusable = true;
      }
    } );
  }
} );
```

**Bug Symptoms**:

- Tab navigation skips entire groups
- Shift+Tab doesn't work in reverse direction
- Elements become permanently unfocusable after first interaction
- Focus jumps to unexpected UI elements (menus, buttons)
- Focus lost completely during grab/drop operations (see Focus Management Race Conditions section above)

**When This Occurs**:

- Multi-group keyboard navigation systems
- Dynamic focus management during item transfers
- Any time you set `focusable = false` based on focus state
- Reactive systems with multiple property listeners affecting focus (see Focus Management Race Conditions section above)

**Testing Strategy**: Always test complete tab cycles in BOTH directions (Tab AND Shift+Tab) after implementing focus
management.

### Patterns for Future Complex Keyboard Navigation

1. **Unified Listener Pattern**: One listener per element with mode-based routing
2. **State-First Property Setting**: Set control state before making model changes
3. **Parent Containment Checks**: Always verify parent relationships before transfers
4. **Strategic Debugging**: Log at every critical state transition point
5. **Group Architecture**: Design groups around logical user navigation paths
6. **Property Timing**: Order of property changes can prevent race conditions
7. **Focus Restoration**: ALWAYS handle both focus gain AND loss in focusedProperty listeners

## Testing with MCP and Playwright

### Accessibility Testing with Playwright

When testing accessibility features like ARIA live regions, keyboard navigation, or screen reader announcements, use the
Playwright MCP tool:

1. **Launch with Query Parameters**: Include debugging parameters for accessibility testing:
   ```
   
   # Test Just the 1st screen, with debugging info on 
   http://localhost/forces-and-motion-basics/forces-and-motion-basics_en.html?brand=phet&ea&debugger&screens=1&logAriaLiveResponses&debugAltInput
   ```
  - `ea`: Enables accessibility features
  - `logAriaLiveResponses`: Logs ARIA live region announcements to console

2. **Testing Keyboard Navigation**:
   ```typescript
   // Navigate to the page
   mcp__playwright__browser_navigate({ url: "..." })
   
   // Press Tab to focus elements
   mcp__playwright__browser_press_key({ key: "Tab" })
   
   // Press Space/Enter to activate
   mcp__playwright__browser_press_key({ key: "Space" })
   ```

3. **Monitoring ARIA Live Announcements**:
  - Check console messages after interactions
  - Look for `[ARIA-LIVE]` prefixed messages
  - Example: `[LOG] [ARIA-LIVE] polite: "Grabbed"`

4. **Visual Verification**:
  - Take screenshots to verify visual state matches accessibility state
  - Use `mcp__playwright__browser_take_screenshot()` to capture current state
  - Compare visual highlights with focus state

5. **Console Message Monitoring**:
  - Use `mcp__playwright__browser_console_messages()` to see all console output
  - Useful for debugging keyboard listener firing and state changes
  - PhET sims log extensively when debugging is enabled

### Key Testing Patterns

1. **Accessibility Announcement Testing**:
  - Add `this.addAccessibleResponse( 'Message' )` in code
  - Test with `logAriaLiveResponses` query parameter
  - Verify announcements appear in console as `[ARIA-LIVE]` messages

2. **Focus Management Testing**:
  - Tab through all interactive elements
  - Verify focus order matches visual layout
  - Check that focus indicators are visible
  - Test both forward (Tab) and backward (Shift+Tab) navigation

3. **Keyboard Interaction Testing**:
  - Test all keyboard shortcuts (Space, Enter, Arrow keys)
  - Verify keyboard interactions match mouse interactions
  - Check for proper mode switching (e.g., grabbed vs normal state)

### Common Pitfalls

1. **Page Load Timing**: Wait for initial console messages to settle before testing
2. **Focus State**: The page snapshot from Playwright shows which element has `[active]` state
3. **Console Noise**: PhET sims log many state changes; filter for relevant messages
4. **Query Parameters**: Don't forget `ea` to enable accessibility features

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

## Core Description Implementation (Accessibility)

### Lessons Learned and Gotchas

#### Finding the Implementation Pattern

- **Use existing exemplars**: Look at `../membrane-transport/js/common/view/MembraneTransportScreenSummaryContent.ts`
  for the pattern, not documentation
- **The pattern isn't obvious**: You need to create a separate ScreenSummaryContent class and pass it to the ScreenView
  constructor - this isn't documented well in quickstart guides

#### Checkbox Context Responses Are Hidden

- **Non-obvious feature**: `VerticalCheckboxGroup` checkboxes support `accessibleContextResponseChecked` and
  `accessibleContextResponseUnchecked` options
- **Just pass strings**: Don't overthink it - simple strings work fine for these responses
- **Must be in options object**: These go in the `options` property of each checkbox item, not at the top level

#### Component Options Retrofitting Is Tricky

- **Existing components don't accept options**: Many PhET components (like `PullerToolboxNode`) were written without
  optionize pattern
- **Full retrofit required**: Need to import optionize, add type definitions, and restructure constructor
- **Type definition pattern**:
  ```typescript
  type SelfOptions = EmptySelfOptions;
  type ComponentOptions = ParentOptions & SelfOptions;
  ```
- **The optionize call is verbose**: The generic type parameters are required and confusing until you see the pattern

#### Testing Accessibility Is Non-Intuitive

- **URL parameters matter**: Must include `?ea&logAriaLiveResponses` or you won't see anything
- **Playwright shows structure, not behavior**: The snapshot shows the ARIA tree but not the announcements
- **Console is where announcements appear**: Look for `[ARIA-LIVE]` prefixed messages in console, not in the DOM
- **Wait for page load**: The accessibility tree isn't ready immediately after navigation

#### StringProperty vs String Confusion

- **Screen summary expects StringProperty**: But most other accessibility options accept plain strings
- **Inconsistent patterns**: Some places use StringProperty, others use raw strings - no clear rule
- **Start simple**: Use plain strings first, convert to StringProperty only if you need reactivity

#### VerticalCheckboxGroup Option Structure Is Weird

```typescript
// This structure is not intuitive - options go in a nested object
{
  createNode: () => new Text(...),
  property: model.someProperty,
  tandemName: 'checkboxName',
  options: {  // ← This nesting is easy to miss
    accessibleName: 'Name',
    accessibleContextResponseChecked: 'Response'
  }
}
```

#### Accessibility Tree Hierarchy Is Strict

- **Headings matter**: `accessibleHeading` creates actual heading levels, not just labels
- **Order matters**: The order things are added to scene graph affects reading order
- **Groups need proper ARIA**: The existing group implementations already handle this, but custom groups need
  `ariaRole: 'group'`
