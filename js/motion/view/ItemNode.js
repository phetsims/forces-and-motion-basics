// Copyright 2013-2015, University of Colorado Boulder

/**
 * Shows the draggable node for any of the items in the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var TandemImage = require( 'TANDEM/scenery/nodes/TandemImage' );
  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TandemText = require( 'TANDEM/scenery/nodes/TandemText' );
  var TandemSimpleDragHandler = require( 'TANDEM/scenery/input/TandemSimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var Input = require( 'SCENERY/input/Input' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // strings
  var pattern0MassUnitsKilogramsString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0massUnitsKilograms' );

  //Workaround for https://github.com/phetsims/scenery/issues/108
  var IDENTITY = Matrix3.scaling( 1, 1 );

  /**
   * Constructor for ItemNode
   * @param {MotionModel} model the entire model for the containing screen
   * @param {MotionScreenView} motionView the entire view for the containing screen
   * @param {Item} item the corresponding to this ItemNode
   * @param {Image} normalImage the scenery.Image to show for this node
   * @param {Image} sittingImage optional image for when the person is sitting down
   * @param {Image} holdingImage optional image for when the person is holding an object
   * @param {Property} showMassesProperty property for whether the mass value should be shown
   * @param {ItemToolboxNode} itemToolbox - The toolbox that contains this item
   * @constructor
   */
  function ItemNode( model, motionView, item, normalImage, sittingImage, holdingImage, showMassesProperty, itemToolbox, accessibleDescription, tandem ) {

    var self = this;
    this.item = item;
    TandemNode.call( this, {
      cursor: 'pointer',
      scale: item.imageScale,
      tandem: tandem
    } );
    this.uniqueId = this.id; // use node to generate a specific id to quickly find this element in the parallel DOM.

    // translate this node to the item's position
    this.translate( item.position );

    //Create the node for the main graphic
    var normalImageNode = new TandemImage( normalImage, { tandem: tandem.createTandem( 'normalImageNode' ) } );
    this.normalImageNode = normalImageNode;

    // keep track of the sitting image to track its width for the pusher
    // @public (read-only)
    this.sittingImage = new TandemImage( sittingImage, { tandem: tandem.createTandem( 'sittingImageNode' ) } );

    //When the model changes, update the image location as well as which image is shown
    var updateImage = function() {
      // var centerX = normalImageNode.centerX;
      if ( (typeof holdingImage !== 'undefined') && (item.armsUp() && item.onBoard) ) {
        normalImageNode.image = holdingImage;
      }
      else if ( item.onBoard && typeof sittingImage !== 'undefined' ) {
        normalImageNode.image = sittingImage;
      }
      else {
        normalImageNode.image = normalImage;
      }
      if ( self.labelNode ) {
        self.labelNode.bottom = normalImageNode.height - 2;
        self.labelNode.centerX = normalImageNode.centerX;
      }
    };

    for ( var i = 0; i < model.items.length; i++ ) {
      model.items[ i ].draggingProperty.link( updateImage );
    }

    model.stack.lengthProperty.link( updateImage );

    //When the user drags the object, start
    var moveToStack = function() {
      item.onBoard = true;
      var imageWidth = item.getCurrentScale() * normalImageNode.width;
      item.animateTo( motionView.layoutBounds.width / 2 - imageWidth / 2 + item.centeringOffset, motionView.topOfStack - self.height, 'stack' );
      model.stack.add( item );
      if ( model.stack.length > 3 ) {
        model.spliceStackBottom();
      }
    };

    // called on end drag, update direction of girl or man to match current applied force and velocity of model
    var updatePersonDirection = function( person ) {

      // default direction is to the left
      var direction = 'left';

      // if girl or man is alread on the stack, direction should match person that is already on the stack
      var personInStack;
      for ( var i = 0; i < model.stack.length; i++ ) {
        var itemInStack = model.stack.get( i );

        if ( itemInStack === person ) {
          // skip the person that is currently being dragged
          continue;
        }
        if ( itemInStack.name === 'girl' || itemInStack.name === 'man' ) {
          personInStack = itemInStack;
        }
      }
      if ( personInStack ) {
        direction = personInStack.direction;
      }
      else if ( person.context.appliedForce !== 0 ) {
        // if there is an applied force on the stack, direction should match applied force
        if ( person.context.appliedForce > 0 ) {
          direction = 'right';
        }
        else {
          direction = 'left';
        }
      }
      else {
        // if there is no applied force, check velocity for direction
        if ( person.context.velocity > 0 ) {
          direction = 'right';
        }
      }
      person.direction = direction;
    };

    var dragHandler = new TandemSimpleDragHandler( {
      tandem: tandem.createTandem( 'dragHandler' ),
      translate: function( options ) {
        item.position = options.position;//es5 setter
      },

      //When picking up an object, remove it from the stack.
      start: function() {

        //Move it to front (z-order)
        self.moveToFront();

        // move the parent toolbox to the front so that items of one toolbox are not in front of another
        // itemToolBox is in a container so it should not occlude other items in the screen view
        itemToolbox.moveToFront();

        item.dragging = true;
        var index = model.stack.indexOf( item );
        if ( index >= 0 ) {
          model.spliceStack( index );
        }
        item.onBoard = false;

        //Don't allow the user to translate the object while it is animating
        item.cancelAnimation();
      },

      //End the drag
      end: function() {
        item.dragging = false;
        //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
        if ( item.position.y < 350 ) {
          moveToStack();

          // if item is man or girl, rotate depending on the current model velocity and applied force
          if ( item.name === 'man' || item.name === 'girl' ) {
            updatePersonDirection( item );
          }
        }
        else {
          // send the item home and make sure that the label is centered
          item.animateHome();
          self.labelNode.centerX = normalImageNode.centerX;
        }
      }
    } );
    this.addInputListener( dragHandler );

    // if the item is being dragged, cancel the drag on reset
    model.on( 'reset-all', function() {
      // cancel the drag and reset item
      if ( item.dragging ) {
        dragHandler.endDrag();
        item.reset();
      }
    } );

    //Label for the mass (if it is shown)
    var massLabel = new TandemText( item.mystery ? '?' : StringUtils.format( pattern0MassUnitsKilogramsString, item.mass ), {
      font: new PhetFont( {
        size: 15,
        weight: 'bold'
      } ),
      maxWidth: normalImageNode.width / 1.5,
      tandem: tandem.createTandem( 'massLabel' )
    } );
    var roundedRadius = 10;
    var roundRect = new Rectangle( 0, 0, massLabel.width + roundedRadius, massLabel.height + roundedRadius, roundedRadius, roundedRadius, {
      fill: 'white',
      stroke: 'gray'
    } ).mutate( { centerX: massLabel.centerX, centerY: massLabel.centerY } );

    // the label needs to be scaled back up after the image was scaled down
    // normalize the maximum width to then restrict the labels for i18n
    var labelNode = new TandemNode( {
      children: [ roundRect, massLabel ],
      scale: 1.0 / item.imageScale,
      tandem: tandem.createTandem( 'labelNode' )
    } );
    this.labelNode = labelNode;

    //Update the position of the item
    item.positionProperty.link( function( position ) { self.setTranslation( position ); } );

    //When the object is scaled or change direction, update the image part
    item.multilink( [ 'interactionScale', 'direction' ], function( interactionScale, direction ) {
      var scale = item.imageScale * interactionScale;
      self.setScaleMagnitude( scale );

      normalImageNode.setMatrix( IDENTITY );
      if ( direction === 'right' ) {

        // store the center so that it can be reapplied after change in scale
        var centerX = normalImageNode.centerX;

        normalImageNode.scale( -1, 1 );

        // reapply the center
        normalImageNode.centerX = centerX;
      }
    } );
    item.onBoardProperty.link( updateImage );

    self.addChild( normalImageNode );
    self.addChild( labelNode );

    showMassesProperty.link( function( showMasses ) { labelNode.visible = showMasses; } );

    // outfit for accessibility
    this.setAccessibleContent( {
      createPeer: function( accessibleInstance ) {

        /* will look like:
         * <div id="motionItem1" aria-label="bluePuller1_label" aria-grabbed="false" class="Item"></div >
         */
        var domElement = document.createElement( 'img' );

        domElement.setAttribute( 'alt', accessibleDescription );
        domElement.tabIndex = '-1';
        domElement.draggable = true;
        domElement.className = 'ItemNode';
        domElement.id = self.uniqueId;

        /*
         * The following is a latest iteration of drag and drop behavior for the pullers in the net force screen of
         * Forces and Motion: Basics.  The behavior is defined in the excel spreadsheet which prototypes this design:
         *
         * https://docs.google.com/spreadsheets/d/1r_z3t0sTP2NtgfAPuFdNJat6fxVZ8ian2SWoqd-fxfw/edit#gid=0
         */
        domElement.addEventListener( 'keydown', function( event ) {

          // experimenting with restricting choice control to arrow keys.  Come back to this line and discuss with others.
          event.preventDefault();

          // on tab, exit the group and focus the next element.
          if ( event.keyCode === Input.KEY_TAB ) {
            itemToolbox.exitGroup( document.getElementById( itemToolbox.uniqueId ) );
          }

          // if the puller is not grabbed, grab it for drag and drop
          if ( !item.dragging ) {
            if ( event.keyCode === Input.KEY_ENTER || event.keyCode === Input.KEY_SPACE ) {

              // remove the item from the stack if it is already there
              var index = model.stack.indexOf( item );
              if ( index >= 0 ) {
                model.spliceStack( index );
              }

              // the item is already on the skateboard.  Place it right back in the toolbox.
              // TODO: This behavior is a placeholder, I am not sure how this should behave.
              if ( item.position.y < 350 ) {
                item.onBoard = false;
                item.animateHome();
              }
              // the item is in the toolbox
              else {
                // notify AT that the item is in a 'grabbed' state
                domElement.setAttribute( 'aria-grabbed', 'true' );

                // update the live description for the net force screen
                var actionElement = document.getElementById( 'motionActionElement' );
                var actionString = 'Selected ' + accessibleDescription;
                actionElement.innerText = actionString;

                // move the item onto the skateboard
                moveToStack();

                item.onBoard = true;

                domElement.setAttribute( 'aria-grabbed', 'false' );
              }
            }
          }
        } );

        return new AccessiblePeer( accessibleInstance, domElement );

      }
    } );

  }

  forcesAndMotionBasics.register( 'ItemNode', ItemNode );

  return inherit( TandemNode, ItemNode, {

    /**
     * Get the width of this item node, modified by the current scale factor.  If the item
     * is using its sitting representation, use that to get the scaled width
     *
     * @return {number}
     */
    getScaledWidth: function() {

      // if the item has a sitting image, use that image for the width
      var scaledWidth;
      if ( this.sittingImage ) {
        scaledWidth = this.sittingImage.width * this.item.getCurrentScale();
      }
      else {
        scaledWidth = this.normalImageNode.width * this.item.getCurrentScale();
      }
      return scaledWidth;
    }
  } );
} );
