// Copyright 2014-2018, University of Colorado Boulder

/**
 * Toolbox for items in the Motion screen of Forces and Motion: Basics.  This is a simple background rectangle, but
 * modularized for accessibility since the toolbox needs to be outfitted with accessible drag and drop behavior for
 * each of the items in the toolbox.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * Constructor.
   *
   * @param {number} toolboxX
   * @param {number} toolboxY
   * @param {number} toolboxWidth
   * @param {number} toolboxHeight
   * @param {number} toolboxArcWidthX
   * @param {number} toolboxArcWidthY
   * @param {number} sideString - string description for which side the toolbox is on
   * @param {Object} toolboxOptions
   */
  function ItemToolboxNode( toolboxX, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidthX, toolboxArcWidthY, sideString, toolboxOptions ) {

    Rectangle.call( this, toolboxX, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidthX, toolboxArcWidthY,
      _.extend( {

        // a11y
        tagName: 'div',
        focusable: true,
        ariaLabel: toolboxOptions.descriptionContent
    }, toolboxOptions ) );
  }

  forcesAndMotionBasics.register( 'ItemToolboxNode', ItemToolboxNode );

  return inherit( Rectangle, ItemToolboxNode );
} );