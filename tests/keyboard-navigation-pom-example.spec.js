// Copyright 2025, University of Colorado Boulder

/**
 * Example test using Page Object Model pattern
 * This demonstrates how to refactor tests to use the NetForcePage object
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

const { test, expect } = require( '@playwright/test' );
const { NetForcePage } = require( './page-objects/NetForcePage' );

const TEST_URL = 'http://localhost/forces-and-motion-basics/forces-and-motion-basics_en.html?brand=phet&ea&debugger&screens=1&logAriaLiveResponses';

test.describe( 'Net Force Page Object Model Example @pom', () => {

  let netForcePage;

  test.beforeEach( async ( { page } ) => {
    // Navigate to the sim
    await page.goto( TEST_URL );

    // Initialize page object
    netForcePage = new NetForcePage( page );

    // Wait for page to be ready
    await expect( netForcePage.pullers.blue.large.toolbox ).toBeVisible( { timeout: 10000 } );
    await page.waitForLoadState( 'networkidle' );
  } );

  test( 'simplified puller grab and drop using POM', async ( { page } ) => {
    await test.step( 'Focus first blue puller', async () => {
      await netForcePage.tabToFirstElement();
      await expect( netForcePage.pullers.blue.large.toolbox ).toBeFocused();
    } );

    await test.step( 'Perform grab and drop', async () => {
      await netForcePage.grabAndDrop( { verifyGrab: true, verifyDrop: false } );
    } );

    await test.step( 'Verify puller moved to rope', async () => {
      const isOnRope = await netForcePage.isPullerAt( 'blue', 'large', 'rope' );
      expect( isOnRope ).toBe( true );
    } );

    await test.step( 'Verify focus moved to next puller', async () => {
      await expect( netForcePage.pullers.blue.medium.toolbox ).toBeFocused();
    } );
  } );

  test( 'navigate between pullers using POM', async ( { page } ) => {
    await test.step( 'Focus first puller', async () => {
      await netForcePage.tabToFirstElement();
      await expect( netForcePage.pullers.blue.large.toolbox ).toBeFocused();
    } );

    await test.step( 'Navigate right', async () => {
      await netForcePage.navigatePuller( 'ArrowRight' );
      await expect( netForcePage.pullers.blue.medium.toolbox ).toBeFocused();
    } );

    await test.step( 'Navigate left', async () => {
      await netForcePage.navigatePuller( 'ArrowLeft' );
      await expect( netForcePage.pullers.blue.large.toolbox ).toBeFocused();
    } );
  } );

  test( 'reset simulation using POM', async ( { page } ) => {
    await test.step( 'Move puller to rope', async () => {
      await netForcePage.tabToFirstElement();
      await netForcePage.grabAndDrop( { verifyDrop: false } );

      const isOnRope = await netForcePage.isPullerAt( 'blue', 'large', 'rope' );
      expect( isOnRope ).toBe( true );
    } );

    await test.step( 'Reset simulation', async () => {
      await netForcePage.reset();

      // Wait for animation
      await page.waitForTimeout( 1000 );

      const isInToolbox = await netForcePage.isPullerAt( 'blue', 'large', 'toolbox' );
      expect( isInToolbox ).toBe( true );
    } );
  } );

  test( 'get visible pullers information', async ( { page } ) => {
    await test.step( 'Get initial puller state', async () => {
      const visiblePullers = await netForcePage.getVisiblePullers();

      // Should have all pullers in toolbox initially
      const toolboxPullers = visiblePullers.filter( p => p.location === 'toolbox' );
      expect( toolboxPullers.length ).toBeGreaterThan( 0 );

      const ropePullers = visiblePullers.filter( p => p.location === 'rope' );
      expect( ropePullers.length ).toBe( 0 );
    } );

    await test.step( 'Move a puller and check again', async () => {
      await netForcePage.tabToFirstElement();
      await netForcePage.grabAndDrop( { verifyDrop: false } );

      const visiblePullers = await netForcePage.getVisiblePullers();
      const ropePullers = visiblePullers.filter( p => p.location === 'rope' );
      expect( ropePullers.length ).toBe( 1 );
      expect( ropePullers[ 0 ] ).toMatchObject( {
        color: 'blue',
        size: 'large',
        location: 'rope'
      } );
    } );
  } );

} );