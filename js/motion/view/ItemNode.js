// Copyright 2013-2022, University of Colorado Boulder

/**
 * Shows the draggable node for any of the items in the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Image, Node, Rectangle, SimpleDragHandler, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';

const pattern0MassUnitsKilogramsString = ForcesAndMotionBasicsStrings.pattern[ '0massUnitsKilograms' ];

//Workaround for https://github.com/phetsims/scenery/issues/108
const IDENTITY = Matrix3.scaling( 1, 1 );

class ItemNode extends Node {

  /**
   * Constructor for ItemNode
   * @param {MotionModel} model the entire model for the containing screen
   * @param {MotionScreenView} motionView the entire view for the containing screen
   * @param {Item} item the corresponding to this ItemNode
   * @param {Image} normalImage the scenery.Image to show for this node
   * @param {Image} sittingImage optional image for when the person is sitting down
   * @param {Image} holdingImage optional image for when the person is holding an object
   * @param {Property} showMassesProperty property for whether the mass value should be shown
   * @param {Rectangle} itemToolbox - The toolbox that contains this item
   */
  constructor( model, motionView, item, normalImage, sittingImage, holdingImage, showMassesProperty, itemToolbox, tandem ) {

    super( {
      cursor: 'pointer',
      scale: item.imageScaleProperty.get(),

      tandem: tandem
    } );

    this.item = item;

    this.uniqueId = this.id; // use node to generate a specific id to quickly find this element in the parallel DOM.

    // translate this node to the item's position
    this.translate( item.positionProperty.get() );

    //Create the node for the main graphic
    const normalImageNode = new Image( normalImage, { tandem: tandem.createTandem( 'normalImageNode' ) } );
    this.normalImageNode = normalImageNode;

    // keep track of the sitting image to track its width for the pusher
    // @public (read-only)
    this.sittingImage = new Image( sittingImage, { tandem: tandem.createTandem( 'sittingImageNode' ) } );

    //When the model changes, update the image position as well as which image is shown
    const updateImage = () => {
      // var centerX = normalImageNode.centerX;
      if ( ( typeof holdingImage !== 'undefined' ) && ( item.armsUp() && item.onBoardProperty.get() ) ) {
        normalImageNode.image = holdingImage;
      }
      else if ( item.onBoardProperty.get() && typeof sittingImage !== 'undefined' ) {
        normalImageNode.image = sittingImage;
      }
      else {
        normalImageNode.image = normalImage;
      }
      if ( this.labelNode ) {
        this.updateLabelPosition();
      }
    };

    // Make sure the arms are updated (even if nothing else changed)
    // TODO: It is possible that this can be removed once these issues are closed, see
    // https://github.com/phetsims/forces-and-motion-basics/issues/240
    // https://github.com/phetsims/axon/issues/135
    Tandem.PHET_IO_ENABLED && phet.phetio.phetioEngine.phetioStateEngine.stateSetEmitter.addListener( updateImage );

    for ( let i = 0; i < model.items.length; i++ ) {
      model.items[ i ].draggingProperty.link( updateImage );
    }

    model.stack.lengthProperty.link( updateImage );

    //When the user drags the object, start
    const moveToStack = () => {
      item.onBoardProperty.set( true );
      const imageWidth = item.getCurrentScale() * normalImageNode.width;
      item.animateTo( motionView.layoutBounds.width / 2 - imageWidth / 2 + item.centeringOffset, motionView.topOfStack - this.height, 'stack' );
      model.stack.add( item );
      if ( model.stack.length > 3 ) {
        model.spliceStackBottom();
      }
    };

    // called on end drag, update direction of girl or man to match current applied force and velocity of model
    const updatePersonDirection = person => {

      // default direction is to the left
      let direction = 'left';

      // if girl or man is alread on the stack, direction should match person that is already on the stack
      let personInStack;
      for ( let i = 0; i < model.stack.length; i++ ) {
        const itemInStack = model.stack.get( i );

        if ( itemInStack === person ) {
          // skip the person that is currently being dragged
          continue;
        }
        if ( itemInStack.name === 'girl' || itemInStack.name === 'man' ) {
          personInStack = itemInStack;
        }
      }
      if ( personInStack ) {
        direction = personInStack.directionProperty.get();
      }
      else if ( person.context.appliedForceProperty.get() !== 0 ) {
        // if there is an applied force on the stack, direction should match applied force
        if ( person.context.appliedForceProperty.get() > 0 ) {
          direction = 'right';
        }
        else {
          direction = 'left';
        }
      }
      else {
        // if there is no applied force, check velocity for direction
        if ( person.context.velocityProperty.get() > 0 ) {
          direction = 'right';
        }
      }
      person.directionProperty.set( direction );
    };

    const dragHandler = new SimpleDragHandler( {
      tandem: tandem.createTandem( 'dragHandler' ),
      translate: options => {
        item.positionProperty.set( options.position );
      },

      //When picking up an object, remove it from the stack.
      start: () => {

        //Move it to front (z-order)
        this.moveToFront();

        // move the parent toolbox to the front so that items of one toolbox are not in front of another
        // itemToolbox is in a container so it should not occlude other items in the screen view
        itemToolbox.moveToFront();

        item.draggingProperty.set( true );
        const index = model.stack.indexOf( item );
        if ( index >= 0 ) {
          model.spliceStack( index );
        }
        item.onBoardProperty.set( false );

        //Don't allow the user to translate the object while it is animating
        item.cancelAnimation();
      },

      //End the drag
      end: () => {
        item.draggingProperty.set( false );
        //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
        if ( item.positionProperty.get().y < 350 ) {
          moveToStack();

          // if item is man or girl, rotate depending on the current model velocity and applied force
          if ( item.name === 'man' || item.name === 'girl' ) {
            updatePersonDirection( item );
          }
        }
        else {
          // send the item home and make sure that the label is centered
          item.animateHome();
          this.labelNode.centerX = normalImageNode.centerX;
        }
      }
    } );
    this.addInputListener( dragHandler );

    // if the item is being dragged, cancel the drag on reset
    model.resetAllEmitter.addListener( () => {
      // cancel the drag and reset item
      if ( item.draggingProperty.get() ) {
        dragHandler.interrupt();
        item.reset();
      }
    } );

    //Label for the mass (if it is shown)
    const massLabel = new Text( item.mystery ? '?' : StringUtils.format( pattern0MassUnitsKilogramsString, item.mass ), {
      font: new PhetFont( {
        size: 15,
        weight: 'bold'
      } ),
      maxWidth: normalImageNode.width / 1.5,
      tandem: tandem.createTandem( 'massLabel' )
    } );
    const roundedRadius = 10;
    const roundRect = new Rectangle( 0, 0, massLabel.width + roundedRadius, massLabel.height + roundedRadius, roundedRadius, roundedRadius, {
      fill: 'white',
      stroke: 'gray'
    } ).mutate( { centerX: massLabel.centerX, centerY: massLabel.centerY } );

    // the label needs to be scaled back up after the image was scaled down
    // normalize the maximum width to then restrict the labels for i18n
    const labelNode = new Node( {
      children: [ roundRect, massLabel ],
      scale: 1.0 / item.imageScaleProperty.get(),
      tandem: tandem.createTandem( 'labelNode' )
    } );
    this.labelNode = labelNode;

    //Update the position of the item
    item.positionProperty.link( position => { this.setTranslation( position ); } );

    // When the object is scaled or change direction, update the image part
    Multilink.multilink( [ item.interactionScaleProperty, item.directionProperty ], ( interactionScale, direction ) => {
      const scale = item.imageScaleProperty.get() * interactionScale;
      this.setScaleMagnitude( scale );

      // make sure that labels remain the same size
      labelNode.setScaleMagnitude( 1 / scale );

      normalImageNode.setMatrix( IDENTITY );
      if ( direction === 'right' ) {

        // store the center so that it can be reapplied after change in scale
        const centerX = normalImageNode.centerX;

        normalImageNode.scale( -1, 1 );

        // reapply the center
        normalImageNode.centerX = centerX;
      }

      // when scale or direction change, make sure that the label is still centered
      this.updateLabelPosition();
    } );
    item.onBoardProperty.link( updateImage );

    this.addChild( normalImageNode );
    this.addChild( labelNode );

    showMassesProperty.link( showMasses => { labelNode.visible = showMasses; } );
  }


  /**
   * Set the label position relative to the bottom of the image.
   * @private
   */
  updateLabelPosition() {
    this.labelNode.bottom = this.normalImageNode.height - 5;
    this.labelNode.centerX = this.normalImageNode.centerX;
  }

  /**
   * Get the width of this item node, modified by the current scale factor.  If the item
   * is using its sitting representation, use that to get the scaled width
   *
   * @returns {number}
   * @public
   */
  getScaledWidth() {

    // if the item has a sitting image, use that image for the width
    let scaledWidth;
    if ( this.sittingImage ) {
      scaledWidth = this.sittingImage.width * this.item.getCurrentScale();
    }
    else {
      scaledWidth = this.normalImageNode.width * this.item.getCurrentScale();
    }
    return scaledWidth;
  }
}

forcesAndMotionBasics.register( 'ItemNode', ItemNode );

export default ItemNode;
