// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the highlight graphic for a knot.  The knots are always visible as part of the image, but when the visible flag is set,
 * the highlight is shown.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );

  // constants
  var knotWidth = 20;

  function KnotHighlightNode( knot ) {
    Path.call( this, Shape.circle( 0, 0, knotWidth ), { stroke: '#FFFF00', lineWidth: 4, visible: false, x: knot.x, y: knot.y } );
    knot.visibleProperty.linkAttribute( this, 'visible' );
    knot.xProperty.linkAttribute( this, 'x' );

    this.accessibleContent = {
      createPeer: function( accessibleInstance ) {
        /*
         * We want the Parallel DOM element to look like:
         * <div tabindex="-1" aria-describedby="description-id" class="blueKnot">
         *  <p> "Some description of the knot" </p>
         * </div>
         */
        var trail = accessibleInstance.trail;

        var domElement = document.createElement( 'div' );
        domElement.tabIndex = '-1';

        var knotDescription = document.createElement( 'p' );
        knotDescription.innerText = 'Some knot description';
        knotDescription.id = knot.type + '-knot-description-' + trail.uniqueId;
        domElement.setAttribute( 'aria-describedby', knotDescription.id );
        domElement.className = knot.type + 'Knot';

        domElement.appendChild( knotDescription );

        return new AccessiblePeer( accessibleInstance, domElement );

      }
    };
  }

  return inherit( Path, KnotHighlightNode );
} );