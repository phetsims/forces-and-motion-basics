// Copyright 2025, University of Colorado Boulder

/**
 * Test helper functions for Playwright tests
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

const { expect } = require( '@playwright/test' );

/**
 * Wait for an ARIA live region announcement containing specific text
 * @param {Page} page - Playwright page object
 * @param {string} expectedText - Text to wait for in ARIA announcement
 * @param {Object} [options] - Options object
 * @param {number} options.timeout - Timeout in milliseconds (default: 3000)
 * @param {string} options.ariaLiveSelector - Selector for ARIA live region (default: '[aria-live]')
 * @returns {Promise<void>}
 */
async function waitForAriaAnnouncement( page, expectedText, options = {} ) {
  const timeout = options.timeout || 3000;
  const selector = options.ariaLiveSelector || '[aria-live]';

  try {
    // For PhET's multiple ARIA live regions, we need to check if ANY contain the text
    await expect.poll( async () => {
      const ariaRegions = await page.locator( selector ).all();
      for ( const region of ariaRegions ) {
        const text = await region.textContent();
        if ( text && text.includes( expectedText ) ) {
          return true;
        }
      }
      return false;
    }, {
      timeout: timeout,
      message: `No ARIA live region contains "${expectedText}"`
    } ).toBeTruthy();
  }
  catch( error ) {
    // Provide helpful debugging information
    const allAnnouncements = await page.evaluate( sel => {
      // eslint-disable-next-line no-undef
      return Array.from( document.querySelectorAll( `${sel}, [aria-live="polite"], [aria-live="assertive"]` ) )
        .map( el => ( {
          role: el.getAttribute( 'aria-live' ) || 'region',
          text: el.textContent?.trim() || '',
          id: el.id,
          class: el.className
        } ) );
    }, selector );

    throw new Error(
      `ARIA announcement "${expectedText}" not found within ${timeout}ms.\n` +
      `All ARIA regions: ${JSON.stringify( allAnnouncements, null, 2 )}`
    );
  }
}

/**
 * Wait for focus to move to a specific element
 * @param {Page} page - Playwright page object
 * @param {Locator} locator - Element that should receive focus
 * @param {Object} [options] - Options object
 * @param {number} options.timeout - Timeout in milliseconds (default: 3000)
 * @returns {Promise<void>}
 */
async function waitForFocus( page, locator, options = {} ) {
  const timeout = options.timeout || 3000;

  await expect( locator ).toBeFocused( { timeout: timeout } );
}

/**
 * Get information about the currently focused element
 * @param {Page} page - Playwright page object
 * @returns {Promise<Object>} Object containing focus information
 */
async function getFocusedElementInfo( page ) {
  return page.evaluate( () => {
    // eslint-disable-next-line no-undef
    const activeElement = document.activeElement;
    if ( !activeElement ) {
      return {
        name: 'No active element',
        role: null,
        tagName: null,
        accessibleName: null
      };
    }

    return {
      name: activeElement.getAttribute( 'aria-label' ) || activeElement.textContent || 'Unnamed element',
      role: activeElement.getAttribute( 'role' ),
      tagName: activeElement.tagName.toLowerCase(),
      accessibleName: activeElement.getAttribute( 'aria-label' ),
      id: activeElement.id,
      classList: Array.from( activeElement.classList )
    };
  } );
}

/**
 * Tab through elements and collect focus order
 * @param {Page} page - Playwright page object
 * @param {number} maxTabs - Maximum number of tabs (default: 20)
 * @param {Function} stopCondition - Optional function to determine when to stop tabbing
 * @returns {Promise<Array>} Array of focused element information
 */
async function collectFocusOrder( page, maxTabs = 20, stopCondition = null ) {
  const focusOrder = [];
  let tabCount = 0;

  while ( tabCount < maxTabs ) {
    const focusInfo = await getFocusedElementInfo( page );
    focusOrder.push( focusInfo );

    // Check stop condition if provided
    if ( stopCondition && stopCondition( focusInfo ) ) {
      break;
    }

    // Default stop conditions
    if ( focusInfo.name.includes( 'Reset All' ) ||
         focusInfo.name.includes( 'Control Panel' ) ) {
      break;
    }

    await page.keyboard.press( 'Tab' );
    tabCount++;
  }

  return focusOrder;
}

/**
 * Setup console message capture for ARIA announcements
 * @param {Page} page - Playwright page object
 * @returns {Array} Array that will be populated with announcements
 */
function setupAriaAnnouncementCapture( page ) {
  const announcements = [];

  page.on( 'console', msg => {
    const text = msg.text();
    if ( text.includes( '[ARIA-LIVE]' ) ) {
      announcements.push( {
        text: text,
        timestamp: Date.now(),
        type: msg.type()
      } );
    }
  } );

  return announcements;
}

/**
 * Wait for element to be stable (not moving/animating)
 * @param {Locator} locator - Element to wait for
 * @param {Object} [options] - Options object
 * @param {number} options.timeout - Overall timeout (default: 5000)
 * @param {number} options.stableTime - Time element must be stable (default: 500)
 * @returns {Promise<void>}
 */
async function waitForElementStable( locator, options = {} ) {
  const timeout = options.timeout || 5000;
  const stableTime = options.stableTime || 500;

  await expect( locator ).toBeVisible( { timeout: timeout } );

  // Wait for bounding box to be stable
  await expect.poll( async () => {
    const box1 = await locator.boundingBox();
    await new Promise( resolve => setTimeout( resolve, stableTime ) );
    const box2 = await locator.boundingBox();

    if ( !box1 || !box2 ) {
      return false;
    }

    return box1.x === box2.x &&
           box1.y === box2.y &&
           box1.width === box2.width &&
           box1.height === box2.height;
  }, {
    timeout: timeout,
    message: 'Element did not stabilize within timeout'
  } ).toBeTruthy();
}

/**
 * Press key and wait for expected result
 * @param {Page} page - Playwright page object
 * @param {string} key - Key to press
 * @param {Function} expectation - Async function containing expectations
 * @param {Object} [options] - Options object
 * @returns {Promise<void>}
 */
async function pressKeyAndExpect( page, key, expectation, options = {} ) {
  await page.keyboard.press( key );

  if ( options.delay ) {
    // Only use delay when explicitly needed (e.g., for visual clarity in headed mode)
    await page.waitForTimeout( options.delay );
  }

  await expectation();
}

/**
 * Verify puller location
 * @param {Page} page - Playwright page object
 * @param {Object} pullerInfo - Information about the puller
 * @param {string} pullerInfo.size - Size of puller (large, medium, small)
 * @param {string} pullerInfo.color - Color of puller (blue, red)
 * @param {string} expectedLocation - Expected location (toolbox, knot)
 * @returns {Promise<boolean>}
 */
async function verifyPullerLocation( page, pullerInfo, expectedLocation ) {
  const { size, color } = pullerInfo;

  if ( expectedLocation === 'toolbox' ) {
    const locator = page.getByRole( 'button', {
      name: new RegExp( `${size} ${color} puller at toolbox` )
    } );
    return locator.isVisible();
  }
  else if ( expectedLocation === 'knot' ) {
    const locator = page.getByRole( 'button', {
      name: new RegExp( `${size} ${color} puller at.*knot` )
    } );
    return locator.isVisible();
  }

  return false;
}

module.exports = {
  waitForAriaAnnouncement: waitForAriaAnnouncement,
  waitForFocus: waitForFocus,
  getFocusedElementInfo: getFocusedElementInfo,
  collectFocusOrder: collectFocusOrder,
  setupAriaAnnouncementCapture: setupAriaAnnouncementCapture,
  waitForElementStable: waitForElementStable,
  pressKeyAndExpect: pressKeyAndExpect,
  verifyPullerLocation: verifyPullerLocation
};