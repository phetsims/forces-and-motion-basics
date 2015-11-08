// Copyright 2013-2015, University of Colorado Boulder

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
  var Input = require( 'SCENERY/input/Input' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var knotWidth = 20;

  // a map to get the accessible description for the knot highlightNode, based on its initial x position
  var accessibleDescriptionMap = {
    62: 'fourth knot, farthest from the cart',
    142: 'third knot',
    222: 'second knot',
    302: 'first knot, closest to the cart',
    680: 'first knot, closest to the cart',
    760: 'second knot',
    840: 'third knot',
    920: 'fourth knot, farthest from the cart'
  };

  function KnotHighlightNode( knot, pullerNodes, focusRegionNode, pullerToolboxNode, model ) {

    var thisNode = this;
    Path.call( this, Shape.circle( 0, 0, knotWidth ), {
      stroke: '#FFFF00',
      lineWidth: 4,
      visible: false,
      x: knot.x,
      y: knot.y
    } );
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
        var domElement = document.createElement( 'li' );
        domElement.tabIndex = '-1';
        domElement.id = knot.acessibleKnotId;
        var knotAccessibleDescription = 'Place puller on ' + accessibleDescriptionMap[ knot.initX ] + '?';
        domElement.setAttribute( 'aria-label', knotAccessibleDescription );

        //var knotDescription = document.createElement( 'p' );
        //knotDescription.innerText = 'Some knot description';
        //knotDescription.id = knot.type + '-knot-description-' + trail.uniqueId;
        //domElement.setAttribute( 'aria-describedby', knotDescription.id );
        domElement.className = knot.type + 'Knot';

        // handle various keyboard interaction
        domElement.addEventListener( 'keydown', function( event ) {

          // get the puller that is currently being dragged
          var grabbedPullerNode = null;
          pullerNodes.forEach( function( pullerNode ) {
            if ( pullerNode.grabbed ) {
              grabbedPullerNode = pullerNode;
            }
          } );
          assert && assert( grabbedPullerNode, 'In "move" mode there must a grabbed puller.' );

          // if the user hits 'enter' or 'spacebar', move the puller to the selected not.
          var nextKnot;
          if ( event.keyCode === Input.KEY_ENTER || event.keyCode === Input.KEY_SPACE ) {

            // move the puller to the selected knot.
            thisNode.movePullerToSelectedKnot( grabbedPullerNode, knot, model );
            // move the puller back to the original knot - resolves unknown bug with blue pullers where the puller
            // is placed one knot too far to the right.
            model.movePullerToKnot( grabbedPullerNode.puller, knot );

            // update the label for the puller
            var actionElement = document.getElementById( 'netForceActionElement' );
            var innerText = grabbedPullerNode.accessibleDescription + 'placed on ' + accessibleDescriptionMap[ knot.initX ];
            actionElement.innerText = innerText;
            var pullerElement = document.getElementById( grabbedPullerNode.accessiblePullerId );

            // make sure that the puller is no longer grabbed.
            grabbedPullerNode.grabbed = false;

            // exit the group of knots
            var knotRegionType = grabbedPullerNode.puller.type === 'red' ? 'rightFocusRegion' : 'leftFocusRegion';
            var knotRegionElement = document.getElementById( knotRegionType );
            focusRegionNode.exitGroup( knotRegionElement );

            // null string for the puller toolbox description since the one on sim load no longer applies.
            // TODO: null is temporary solution, what should it be in the long run?
            var toolBoxElement = document.getElementById( pullerToolboxNode.accessibleId );

            // enter back into the group of pullers
            pullerToolboxNode.enterGroup( event, toolBoxElement );

            // set focus back to the puller that was grabbed
            pullerElement.focus();
          }

          // select the next available knot to the right
          else if ( event.keyCode === Input.KEY_RIGHT_ARROW ) {
            nextKnot = model.getNextOpenKnotInDirection( knot, grabbedPullerNode.puller, +1 );
          }
          // select the next available knot to the left
          else if ( event.keyCode === Input.KEY_LEFT_ARROW ) {
            nextKnot = model.getNextOpenKnotInDirection( knot, grabbedPullerNode.puller, -1 );
          }
          // if there is an available knot, place the puller there
          if ( nextKnot ) {
            document.getElementById( nextKnot.acessibleKnotId ).focus();
          }
        } );
        return new AccessiblePeer( accessibleInstance, domElement );
      }
    };
  }

  return inherit( Path, KnotHighlightNode, {

    /**
     * Move the puller that is being dragged to the knot that is currently being focused.
     *
     * @param {Puller} pullerNode
     * @param {Knot} knot
     * @param {NetForceModel} model
     */
    movePullerToSelectedKnot: function( pullerNode, knot, model ) {
      var grabbedPuller = pullerNode.puller;
      grabbedPuller.setValues( { position: new Vector2( knot.x, knot.y ) } );
      model.numberPullersAttached = model.countAttachedPullers();
      grabbedPuller.dragging = false;
      grabbedPuller.trigger( 'dropped' );
      pullerNode.updateImage( grabbedPuller, model );
      pullerNode.updateLocation( grabbedPuller, model );
    }
  } );
} );