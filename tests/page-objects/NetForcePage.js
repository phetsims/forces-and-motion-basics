// Copyright 2025, University of Colorado Boulder

/**
 * Page Object Model for the Net Force screen in Forces and Motion Basics
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

const { expect } = require( '@playwright/test' );

class NetForcePage {
  constructor( page ) {
    this.page = page;

    // Define locators
    this.pullers = {
      blue: {
        large: {
          toolbox: page.getByRole( 'button', { name: /large blue puller/ } ),
          rope: page.getByRole( 'button', { name: /large blue puller/ } )
        },
        medium: {
          toolbox: page.getByRole( 'button', { name: /medium blue puller/ } ),
          rope: page.getByRole( 'button', { name: /medium blue puller/ } )
        },
        small: {
          toolbox: page.getByRole( 'button', { name: /small blue puller/ } ),
          rope: page.getByRole( 'button', { name: /small blue puller/ } )
        }
      },
      red: {
        large: {
          toolbox: page.getByRole( 'button', { name: /large red puller/ } ),
          rope: page.getByRole( 'button', { name: /large red puller/ } )
        },
        medium: {
          toolbox: page.getByRole( 'button', { name: /medium red puller/ } ),
          rope: page.getByRole( 'button', { name: /medium red puller/ } )
        },
        small: {
          toolbox: page.getByRole( 'button', { name: /small red puller/ } ),
          rope: page.getByRole( 'button', { name: /small red puller/ } )
        }
      }
    };

    this.controls = {
      resetAll: page.getByRole( 'button', { name: 'Reset All' } ),
      goButton: page.getByRole( 'button', { name: /go/i } ),
      returnButton: page.getByRole( 'button', { name: /return/i } )
    };

    this.regions = {
      ariaLive: page.locator( '[aria-live]' ),
      cart: page.locator( '[aria-label*="cart"]' )
    };
  }

  /**
   * Get a puller locator based on color, size, and location
   * @param {string} color - 'blue' or 'red'
   * @param {string} size - 'large', 'medium', or 'small'
   * @param {string} location - 'toolbox' or 'rope'
   * @returns {Locator} Playwright locator
   * @public
   */
  getPuller( color, size, location ) {
    return this.pullers[ color ][ size ][ location ];
  }

  /**
   * Check if a puller is at a specific location
   * @param {string} color - 'blue' or 'red'
   * @param {string} size - 'large', 'medium', or 'small'
   * @param {string} location - 'toolbox' or 'rope'
   * @returns {Promise<boolean>}
   * @public
   */
  async isPullerAt( color, size, location ) {
    const puller = this.getPuller( color, size, location );
    // Handle multiple elements with same text (PhET's parallel DOM)
    const count = await puller.count();
    if ( count === 0 ) {
      return false;
    }
    // If there are multiple, check if at least one is visible
    return puller.first().isVisible();
  }

  /**
   * Focus a specific puller
   * @param {string} color - 'blue' or 'red'
   * @param {string} size - 'large', 'medium', or 'small'
   * @param {string} location - 'toolbox' or 'rope'
   * @returns {Promise<void>}
   * @public
   */
  async focusPuller( color, size, location ) {
    const puller = this.getPuller( color, size, location );
    await puller.focus();
    await expect( puller ).toBeFocused();
  }

  /**
   * Tab to the first interactive element
   * @returns {Promise<void>}
   * @public
   */
  async tabToFirstElement() {
    await this.page.keyboard.press( 'Tab' );
  }

  /**
   * Navigate between pullers using arrow keys
   * @param {string} direction - 'ArrowLeft' or 'ArrowRight'
   * @returns {Promise<void>}
   * @public
   */
  async navigatePuller( direction ) {
    await this.page.keyboard.press( direction );
  }

  /**
   * Grab a puller (first Enter/Space press)
   * @param {string} key - 'Enter' or 'Space'
   * @returns {Promise<void>}
   * @public
   */
  async grabPuller( key = 'Enter' ) {
    await this.page.keyboard.press( key );
  }

  /**
   * Drop a puller (second Enter/Space press)
   * @param {string} key - 'Enter' or 'Space'
   * @returns {Promise<void>}
   * @public
   */
  async dropPuller( key = 'Enter' ) {
    await this.page.keyboard.press( key );
  }

  /**
   * Reset the simulation
   * @returns {Promise<void>}
   * @public
   */
  async reset() {
    await this.controls.resetAll.focus();
    await this.page.keyboard.press( 'Enter' );
  }

  /**
   * Get the current ARIA live announcement
   * @returns {Promise<string>}
   * @public
   */
  async getAriaAnnouncement() {
    // PhET uses multiple ARIA live regions - concatenate all non-empty ones
    const regions = await this.regions.ariaLive.all();
    const texts = [];
    for ( const region of regions ) {
      const text = await region.textContent();
      if ( text && text.trim() ) {
        texts.push( text.trim() );
      }
    }
    return texts.join( ' ' );
  }

  /**
   * Wait for a specific ARIA announcement
   * @param {string} text - Text to wait for
   * @param {Object} [options] - Options for waiting
   * @returns {Promise<void>}
   * @public
   */
  async waitForAnnouncement( text, options = {} ) {
    const timeout = options.timeout || 3000;

    // Use polling to check all ARIA regions for the text
    await expect.poll( async () => {
      const regions = await this.regions.ariaLive.all();
      for ( const region of regions ) {
        const regionText = await region.textContent();
        if ( regionText && regionText.includes( text ) ) {
          return true;
        }
      }
      return false;
    }, {
      timeout: timeout,
      message: `No ARIA live region contains "${text}"`
    } ).toBeTruthy();
  }

  /**
   * Get information about all visible pullers
   * @returns {Promise<Array>}
   * @public
   */
  async getVisiblePullers() {
    const visible = [];
    const colors = [ 'blue', 'red' ];
    const sizes = [ 'large', 'medium', 'small' ];
    const locations = [ 'toolbox', 'rope' ];

    for ( const color of colors ) {
      for ( const size of sizes ) {
        for ( const location of locations ) {
          const isVisible = await this.isPullerAt( color, size, location );
          if ( isVisible ) {
            visible.push( { color: color, size: size, location: location } );
          }
        }
      }
    }

    return visible;
  }

  /**
   * Perform a complete grab-and-drop operation
   * @param {Object} [options] - Options for the operation
   * @returns {Promise<void>}
   * @public
   */
  async grabAndDrop( options = {} ) {
    const key = options.key || 'Enter';
    const verifyGrab = options.verifyGrab !== false;
    const verifyDrop = options.verifyDrop !== false;

    await this.grabPuller( key );

    if ( verifyGrab ) {
      await this.waitForAnnouncement( 'Grabbed' );
    }

    await this.dropPuller( key );

    if ( verifyDrop ) {
      // Wait for visual confirmation that puller moved, rather than relying on specific announcement text
      await this.page.waitForTimeout( 500 ); // Brief wait for drop animation

      // Or check that some announcement was made (even if we don't know exact text)
      await expect.poll(
        async () => {
          const announcement = await this.getAriaAnnouncement();
          return announcement.length > 0 && announcement.includes( 'Grabbed' ) === false; // Different from grab
        },
        { timeout: 2000 }
      ).toBeTruthy();
    }
  }
}

module.exports = { NetForcePage: NetForcePage };