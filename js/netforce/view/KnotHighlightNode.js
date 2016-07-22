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
  var TandemPath = require( 'TANDEM/scenery/nodes/TandemPath' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var Input = require( 'SCENERY/input/Input' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // constants
  var knotWidth = 20;

  // strings
  var fourthKnotDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/fourthKnot.description' );
  var thirdKnotDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/thirdKnot.description' );
  var secondKnotDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/secondKnot.description' );
  var firstKnotDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/firstKnot.description' );

  // a map to get the accessible description for the knot highlightNode, based on its initial x position
  var accessibleDescriptionMap = {
    62: fourthKnotDescriptionString,
    142: thirdKnotDescriptionString,
    222: secondKnotDescriptionString,
    302: firstKnotDescriptionString,
    680: firstKnotDescriptionString,
    760: secondKnotDescriptionString,
    840: thirdKnotDescriptionString,
    920: fourthKnotDescriptionString
  };

  /**
   * Constructor
   * @param {Knot} knot
   * @param {Array<PullerNode>} pullerNodes
   * @param {KnotFocusRegion} focusRegionNode
   * @param {pullerToolboxNode} pullerToolboxNode
   * @param {NetForceModel} model
   * @constructor
   */
  function KnotHighlightNode( knot, pullerNodes, focusRegionNode, pullerToolboxNode, model, tandem ) {

    var thisNode = this;
    TandemPath.call( this, Shape.circle( 0, 0, knotWidth ), {
      stroke: '#FFFF00',
      lineWidth: 4,
      visible: false,
      x: knot.x,
      y: knot.y,
      tandem: tandem
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
        var domElement = document.createElement( 'div' );
        domElement.tabIndex = '-1';
        domElement.id = knot.acessibleKnotId;
        var knotAccessibleDescription = 'Place puller on ' + accessibleDescriptionMap[ knot.initX ] + '?';
        domElement.setAttribute( 'aria-label', knotAccessibleDescription );

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

            // update the label for the puller by changing its alt description.  The description is exactly what would
            // be read off in the actionElement, and since the puller receives focus after being placed on the knot,
            // the live action element does not need to be updated.
            var innerText = grabbedPullerNode.accessibleDescription + 'placed on ' + accessibleDescriptionMap[ knot.initX ];
            var pullerElement = document.getElementById( grabbedPullerNode.accessiblePullerId );
            pullerElement.setAttribute( 'alt', innerText );

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

  forcesAndMotionBasics.register( 'KnotHighlightNode', KnotHighlightNode );

  return inherit( TandemPath, KnotHighlightNode, {

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
      grabbedPuller.trigger0( 'dropped' );
      pullerNode.updateImage( grabbedPuller, model );
      pullerNode.updateLocation( grabbedPuller, model );
    }
  } );
} );