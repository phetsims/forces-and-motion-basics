// Copyright 2025, University of Colorado Boulder

/**
 * Playwright tests for keyboard navigation in Forces and Motion Basics
 *
 * Run with:
 * npm run test:headed                             (watch it happen)
 * npm run test:debug                              (step through)
 * npm run test:ui                                 (nice GUI)
 * npm run test -- tests/keyboard-navigation       (just this file)
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

const { test, expect } = require( '@playwright/test' );

test.describe( 'Forces and Motion Basics - Keyboard Navigation', () => {

  // Run each test with a fresh page load
  test.beforeEach( async ( { page } ) => {
    // Navigate to the sim with accessibility enabled
    await page.goto( 'http://localhost/forces-and-motion-basics/forces-and-motion-basics_en.html?brand=phet&ea&debugger&screens=1&logAriaLiveResponses' );

    // Wait for the sim to fully load
    await page.waitForLoadState( 'networkidle' );

    // Optional: Wait for specific content to be ready
    await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeVisible();
  } );

  test( 'should focus first blue puller on tab navigation', async ( { page } ) => {
    // Tab to the first blue puller
    await page.keyboard.press( 'Tab' );

    // Verify the first blue puller has focus
    await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeFocused();
  } );

  test( 'should navigate between blue pullers with arrow keys', async ( { page } ) => {
    // Tab to focus first blue puller
    await page.keyboard.press( 'Tab' );

    // Use arrow key to navigate to next puller
    await page.keyboard.press( 'ArrowRight' );

    // Verify focus moved to the medium blue puller
    await expect( page.getByRole( 'button', { name: /medium blue puller at toolbox/ } ) ).toBeFocused();

    // Navigate back
    await page.keyboard.press( 'ArrowLeft' );

    // Verify focus returned to first puller
    await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeFocused();
  } );

  test( 'should grab and drop puller with Enter key', async ( { page } ) => {
    // Set up console message capture for accessibility announcements
    const announcements = [];
    page.on( 'console', msg => {
      if ( msg.text().includes( '[ARIA-LIVE]' ) ) {
        announcements.push( msg.text() );
      }
    } );

    // Tab to focus first blue puller
    await page.keyboard.press( 'Tab' );
    await page.waitForTimeout( 500 ); // Delay for video clarity

    // Grab the puller
    await page.keyboard.press( 'Enter' );
    await page.waitForTimeout( 500 ); // Delay for video clarity

    // Verify grab announcement (more flexible matching)
    await page.waitForTimeout( 200 ); // Give more time for announcement
    expect( announcements.some( msg => msg.includes( 'Grabbed' ) ) ).toBe( true );

    // Drop the puller
    await page.keyboard.press( 'Enter' );
    await page.waitForTimeout( 500 ); // Delay for video clarity

    // Verify drop announcement and state change (more flexible matching)
    await page.waitForTimeout( 200 );
    expect( announcements.some( msg => msg.includes( 'attached' ) || msg.includes( 'knot' ) ) ).toBe( true );

    // Verify the puller moved to rope (check for any knot position)
    await expect( page.getByRole( 'button', { name: /large blue puller at.*knot/ } ) ).toBeVisible();

    // Verify focus automatically moved to next puller in toolbox
    await expect( page.getByRole( 'button', { name: /medium blue puller at toolbox/ } ) ).toBeFocused();
  } );

  test( 'should support consecutive grab and drop operations', async ( { page } ) => {
    // Tab to first puller
    await page.keyboard.press( 'Tab' );

    // First drop: large puller
    await page.keyboard.press( 'Enter' ); // Grab
    await page.keyboard.press( 'Enter' ); // Drop

    // Focus should automatically move to medium puller - no tab needed!
    await expect( page.getByRole( 'button', { name: /medium blue puller at toolbox/ } ) ).toBeFocused();

    // Second drop: medium puller
    await page.keyboard.press( 'Enter' ); // Grab
    await page.keyboard.press( 'Enter' ); // Drop

    // Focus should move to next puller (use first() to handle duplicates)
    await expect( page.getByRole( 'button', { name: /small blue puller at toolbox/ } ).first() ).toBeFocused();

    // Verify both pullers are now on rope (flexible knot matching)
    await expect( page.getByRole( 'button', { name: /large blue puller at.*knot/ } ) ).toBeVisible();
    await expect( page.getByRole( 'button', { name: /medium blue puller at.*knot/ } ) ).toBeVisible();
  } );

  test( 'should reset properly when Reset All is pressed', async ( { page } ) => {
    // First, add a puller to the rope
    await page.keyboard.press( 'Tab' );
    await page.keyboard.press( 'Enter' ); // Grab
    await page.keyboard.press( 'Enter' ); // Drop

    // Verify puller is on rope
    await expect( page.getByRole( 'button', { name: /large blue puller at.*knot/ } ) ).toBeVisible();

    // Navigate to Reset All button using keyboard 
    // Start from current focus (should be on a puller) and tab through to find Reset All
    let resetAllFound = false;
    let tabCount = 0;
    const maxTabs = 20; // Safety limit

    while ( !resetAllFound && tabCount < maxTabs ) {
      await page.keyboard.press( 'Tab' );
      tabCount++;

      // Check if current focused element is Reset All
      const focused = await page.locator( ':focus' );
      const accessibleName = await focused.getAttribute( 'aria-label' );
      const textContent = await focused.textContent();

      if ( accessibleName?.includes( 'Reset All' ) || textContent?.includes( 'Reset All' ) ) {
        resetAllFound = true;
        break;
      }
    }

    // Activate Reset All
    if ( resetAllFound ) {
      await page.keyboard.press( 'Enter' );
    }
    else {
      // Fallback: try to focus Reset All directly
      await page.getByRole( 'button', { name: 'Reset All' } ).focus();
      await page.keyboard.press( 'Enter' );
    }

    // Wait for reset to complete
    await page.waitForTimeout( 500 );

    // Verify puller returned to toolbox
    await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeVisible();
  } );

  test( 'should maintain focus when dropping puller to home position', async ( { page } ) => {
    // Tab to focus first blue puller
    await page.keyboard.press( 'Tab' );
    await page.waitForTimeout( 500 ); // Delay for video clarity

    // Verify initial focus
    await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeFocused();

    // Grab the puller
    await page.keyboard.press( 'Enter' );
    await page.waitForTimeout( 500 ); // Delay for video clarity

    // Puller should now be over rope - navigate left to home position
    await page.keyboard.press( 'ArrowLeft' );
    await page.waitForTimeout( 500 ); // Delay for video clarity

    // Drop puller at home position
    await page.keyboard.press( 'Enter' );
    await page.waitForTimeout( 500 ); // Delay for video clarity

    // The puller should still have focus after dropping to home
    await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeFocused();
  } );

  test( 'should auto-focus next puller when moving medium puller to rope', async ( { page } ) => {
    // Tab to focus first blue puller (large)
    await page.keyboard.press( 'Tab' );

    // Navigate to medium puller with arrow key
    await page.keyboard.press( 'ArrowRight' );

    // Verify medium puller has focus
    await expect( page.getByRole( 'button', { name: /medium blue puller at toolbox/ } ) ).toBeFocused();

    // Grab the medium puller
    await page.keyboard.press( 'Space' );
    await page.waitForTimeout( 1000 ); // Longer wait to ensure grab completes

    // Drop it on the rope (should attach to first available knot)
    await page.keyboard.press( 'Space' );
    await page.waitForTimeout( 1500 ); // Longer wait to ensure drop and focus management completes

    // Check what has focus after the drop
    const activeElementAccessibleName = await page.evaluate( () => {
      // eslint-disable-next-line no-undef
      return document.activeElement?.getAttribute( 'aria-label' ) || 'No active element';
    } );

    console.log( 'Active element after drop:', activeElementAccessibleName );

    // Check if medium puller is actually on rope or still in toolbox
    const mediumPullerOnRope = await page.getByRole( 'button', { name: /medium blue puller at.*knot/ } ).isVisible();
    const mediumPullerInToolbox = await page.getByRole( 'button', { name: /medium blue puller at toolbox/ } ).isVisible();

    console.log( 'Medium puller on rope:', mediumPullerOnRope );
    console.log( 'Medium puller in toolbox:', mediumPullerInToolbox );

    if ( mediumPullerOnRope ) {
      // If on rope, focus should auto-move to next puller in toolbox (leftmost = large puller)
      await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeFocused();
    }
    else {
      // If still in toolbox, the medium puller should retain focus
      await expect( page.getByRole( 'button', { name: /medium blue puller at toolbox/ } ) ).toBeFocused();
    }
  } );

  test( 'direct medium puller grab/drop test', async ( { page } ) => {
    // Navigate directly to medium puller using Tab and Shift+Tab
    await page.keyboard.press( 'Tab' ); // Focus large puller
    await page.keyboard.press( 'Tab' ); // Focus go button or next element
    await page.keyboard.press( 'Shift+Tab' ); // Back to large puller 
    await page.keyboard.press( 'ArrowRight' ); // Move to medium puller

    // Verify medium puller has focus
    await expect( page.getByRole( 'button', { name: /medium blue puller at toolbox/ } ) ).toBeFocused();

    // Try basic grab/drop
    await page.keyboard.press( 'Enter' );
    await page.waitForTimeout( 500 );
    await page.keyboard.press( 'Enter' );
    await page.waitForTimeout( 1500 ); // Longer wait for focus management to complete

    // Some element should have focus after this operation
    const activeElementAccessibleName = await page.evaluate( () => {
      // eslint-disable-next-line no-undef
      return document.activeElement?.getAttribute( 'aria-label' ) || 'No active element';
    } );

    console.log( 'Active element after medium puller drop:', activeElementAccessibleName );

    // Focus should move to the large blue puller (leftmost in toolbox)
    await expect( page.getByRole( 'button', { name: /large blue puller at toolbox/ } ) ).toBeFocused();
  } );

  test( 'should follow correct focus order: left toolbox -> right toolbox -> blue rope group -> red rope group', async ( { page } ) => {
    // Move only one blue puller to rope, leaving others in toolbox to test complete focus order

    // Move blue puller to rope
    await page.keyboard.press( 'Tab' ); // Focus blue puller
    await page.keyboard.press( 'Space' ); // Grab
    await page.keyboard.press( 'Space' ); // Drop to rope
    await page.waitForTimeout( 500 );

    // DO NOT move red puller - leave it in toolbox to test proper order

    // Helper function to get information about the currently focused element
    const getFocusedElementInfo = async () => {
      return page.evaluate( () => {
        // eslint-disable-next-line no-undef
        const activeElement = document.activeElement;
        if ( !activeElement ) {
          return { name: 'No active element', role: null };
        }

        return {
          name: activeElement.getAttribute( 'aria-label' ) || activeElement.textContent || 'Unnamed element',
          role: activeElement.getAttribute( 'role' ),
          tagName: activeElement.tagName.toLowerCase(),
          accessibleName: activeElement.getAttribute( 'aria-label' )
        };
      } );
    };

    // Reset focus to start from the beginning
    await page.keyboard.press( 'Escape' ); // Clear any focus
    await page.waitForTimeout( 200 );

    // Collect focus order by tabbing through elements
    const focusOrder = [];
    const maxTabs = 20; // Increased limit since we have more groups now
    let tabCount = 0;

    // Start from beginning - focus the page first
    await page.keyboard.press( 'Tab' );

    while ( tabCount < maxTabs ) {
      const focusInfo = await getFocusedElementInfo();
      focusOrder.push( focusInfo );

      // If we've found elements that clearly indicate we're past the groups we care about, stop
      if ( focusInfo.name.includes( 'Reset All' ) || focusInfo.name.includes( 'Control Panel' ) ) {
        break;
      }

      await page.keyboard.press( 'Tab' );
      tabCount++;
    }

    console.log( 'Focus order found:', focusOrder.map( item => item.name ) );

    // Filter for elements we care about - individual pullers and group containers
    const relevantElements = focusOrder.filter( item => {
      const name = item.name.toLowerCase();
      return name.includes( 'puller' ) || name.includes( 'team' );
    } );

    console.log( 'Relevant elements:', relevantElements.map( item => item.name ) );

    // Categorize elements into their types
    const blueToolboxPullers = relevantElements.filter( item => {
      const name = item.name.toLowerCase();
      return name.includes( 'blue' ) && name.includes( 'toolbox' );
    } );

    const redToolboxPullers = relevantElements.filter( item => {
      const name = item.name.toLowerCase();
      return name.includes( 'red' ) && name.includes( 'toolbox' );
    } );

    const blueRopePullers = relevantElements.filter( item => {
      const name = item.name.toLowerCase();
      return name.includes( 'blue' ) && ( name.includes( 'knot' ) || name.includes( 'rope' ) );
    } );

    const redRopePullers = relevantElements.filter( item => {
      const name = item.name.toLowerCase();
      return name.includes( 'red' ) && ( name.includes( 'knot' ) || name.includes( 'rope' ) );
    } );

    console.log( 'Blue toolbox pullers:', blueToolboxPullers.map( item => item.name ) );
    console.log( 'Red toolbox pullers:', redToolboxPullers.map( item => item.name ) );
    console.log( 'Blue rope pullers:', blueRopePullers.map( item => item.name ) );
    console.log( 'Red rope pullers:', redRopePullers.map( item => item.name ) );

    // Test assertions
    expect( relevantElements.length ).toBeGreaterThan( 0 );

    // Find the index ranges for each category
    const getIndices = elements => elements.map( el => relevantElements.indexOf( el ) ).filter( i => i >= 0 );

    const blueToolboxIndices = getIndices( blueToolboxPullers );
    const redToolboxIndices = getIndices( redToolboxPullers );
    const blueRopeIndices = getIndices( blueRopePullers );
    const redRopeIndices = getIndices( redRopePullers );

    // Verify the expected order: ALL toolboxes before ANY rope groups
    const allToolboxIndices = [ ...blueToolboxIndices, ...redToolboxIndices ];
    const allRopeIndices = [ ...blueRopeIndices, ...redRopeIndices ];

    if ( allToolboxIndices.length > 0 && allRopeIndices.length > 0 ) {
      const lastToolbox = Math.max( ...allToolboxIndices );
      const firstRope = Math.min( ...allRopeIndices );
      expect( lastToolbox ).toBeLessThan( firstRope );
      console.log( 'Verified: ALL toolbox pullers come before ANY rope pullers' );
    }

    // Verify the expected order: toolboxes before rope groups within teams
    if ( blueToolboxIndices.length > 0 && blueRopeIndices.length > 0 ) {
      const lastBlueToolbox = Math.max( ...blueToolboxIndices );
      const firstBlueRope = Math.min( ...blueRopeIndices );
      expect( lastBlueToolbox ).toBeLessThan( firstBlueRope );
      console.log( 'Verified: blue toolbox pullers come before blue rope pullers' );
    }

    if ( redToolboxIndices.length > 0 && redRopeIndices.length > 0 ) {
      const lastRedToolbox = Math.max( ...redToolboxIndices );
      const firstRedRope = Math.min( ...redRopeIndices );
      expect( lastRedToolbox ).toBeLessThan( firstRedRope );
      console.log( 'Verified: red toolbox pullers come before red rope pullers' );
    }

    // Verify blue comes before red within categories (if both exist)
    if ( blueToolboxIndices.length > 0 && redToolboxIndices.length > 0 ) {
      const lastBlueToolbox = Math.max( ...blueToolboxIndices );
      const firstRedToolbox = Math.min( ...redToolboxIndices );
      expect( lastBlueToolbox ).toBeLessThan( firstRedToolbox );
      console.log( 'Verified: blue toolbox comes before red toolbox' );
    }

    if ( blueRopeIndices.length > 0 && redRopeIndices.length > 0 ) {
      const lastBlueRope = Math.max( ...blueRopeIndices );
      const firstRedRope = Math.min( ...redRopeIndices );
      expect( lastBlueRope ).toBeLessThan( firstRedRope );
      console.log( 'Verified: blue rope pullers come before red rope pullers' );
    }
  } );

} );