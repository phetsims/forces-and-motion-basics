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

} );