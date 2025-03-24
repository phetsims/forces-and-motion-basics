// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the draggable node for any of the items in the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';
import MotionScreenView from './MotionScreenView.js';

//Workaround for https://github.com/phetsims/scenery/issues/108
const IDENTITY = Matrix3.scaling( 1, 1 );

export default class ItemNode extends Node {
  private readonly uniqueId: number;
  private readonly labelNode: Node;
  private readonly normalImageNode: Image;
  public readonly sittingImageNode: Image;

  /**
   * Constructor for ItemNode
   * @param model the entire model for the containing screen
   * @param motionView the entire view for the containing screen
   * @param item the corresponding to this ItemNode
   * @param normalImageProperty property for the phet.scenery.Image to show for this node
   * @param sittingImageProperty property fot optional sitting image for when the person is sitting down
   * @param holdingImageProperty property for optional holding image for when the person is holding an object
   * @param showMassesProperty property for whether the mass value should be shown
   * @param itemToolbox - The toolbox that contains this item
   * @param tandem
   */
  public constructor( model: MotionModel, motionView: MotionScreenView,
                      private readonly item: Item,
                      normalImageProperty: TReadOnlyProperty<ImageableImage>,
                      sittingImageProperty: TReadOnlyProperty<ImageableImage>,
                      holdingImageProperty: TReadOnlyProperty<ImageableImage>,
                      showMassesProperty: TReadOnlyProperty<boolean>, itemToolbox: Rectangle, tandem: Tandem ) {

    super( {
      cursor: 'pointer',
      scale: item.imageScale,
      tandem: tandem,
      phetioFeatured: true,
      phetioInputEnabledPropertyInstrumented: true
    } );

    this.uniqueId = this.id; // use node to generate a specific id to quickly find this element in the parallel DOM.

    // translate this node to the item's position
    this.translate( item.positionProperty.get() );

    // Create the node for the main graphic
    const normalImageNode = new Image( normalImageProperty );
    this.normalImageNode = normalImageNode;

    // keep track of the sitting image to track its width for the pusher
    this.sittingImageNode = new Image( sittingImageProperty );

    //When the model changes, update the image position as well as which image is shown
    const updateImage = () => {
      // var centerX = normalImageNode.centerX;
      if ( ( typeof holdingImageProperty.value !== 'undefined' ) && ( item.armsUp() && item.inStackProperty.get() ) ) {
        normalImageNode.imageProperty = holdingImageProperty;
      }
      else if ( item.inStackProperty.get() && typeof sittingImageProperty.value !== 'undefined' ) {
        normalImageNode.imageProperty = sittingImageProperty;
      }
      else {
        normalImageNode.imageProperty = normalImageProperty;
      }
      if ( this.labelNode ) {
        this.updateLabelPosition();
      }
    };

    // Make sure the arms are updated (even if nothing else changed)
    // TODO: It is possible that this can be removed once these issues are closed, see https://github.com/phetsims/forces-and-motion-basics/issues/319
    // https://github.com/phetsims/forces-and-motion-basics/issues/240
    // https://github.com/phetsims/axon/issues/135
    phetioStateSetEmitter.addListener( updateImage );

    for ( let i = 0; i < model.items.length; i++ ) {
      model.items[ i ].userControlledProperty.link( updateImage );
    }

    model.stackedItems.lengthProperty.link( updateImage );

    //When the user drags the object, start
    const moveToStack = () => {
      item.inStackProperty.set( true );
      const imageWidth = item.getCurrentScale() * normalImageNode.width;
      item.animateTo( motionView.layoutBounds.width / 2 - imageWidth / 2, motionView.topOfStack - this.height, 'stack' );
      model.stackedItems.add( item );
      if ( model.stackedItems.length > 3 ) {
        model.spliceStackBottom();
      }
    };

    // called on end drag, update direction of girl or man to match current applied force and velocity of model
    const updatePersonDirection = ( person: Item ) => {

      // default direction is to the left
      let direction: 'left' | 'right' = 'left';

      // if girl or man is alread on the stack, direction should match person that is already on the stack
      let personInStack;
      for ( let i = 0; i < model.stackedItems.length; i++ ) {
        const itemInStack = model.stackedItems.get( i );

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

    const dragListener = new SoundDragListener( {
      tandem: tandem.createTandem( 'dragListener' ),
      positionProperty: item.positionProperty,

      //When picking up an object, remove it from the stack.
      start: () => {

        //Move it to front (z-order)
        this.moveToFront();

        // move the parent toolbox to the front so that items of one toolbox are not in front of another
        // itemToolbox is in a container so it should not occlude other items in the screen view
        itemToolbox.moveToFront();

        item.userControlledProperty.set( true );
        const index = model.stackedItems.indexOf( item );
        if ( index >= 0 ) {
          model.spliceStack( index );
        }
        item.inStackProperty.set( false );

        // Don't allow the user to translate the object while it is animating
        item.cancelAnimation();
      },

      // End the drag
      end: () => {
        item.userControlledProperty.set( false );
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
    this.addInputListener( dragListener );

    // if the item is being dragged, cancel the drag on reset
    model.resetAllEmitter.addListener( () => {
      // cancel the drag and reset item
      if ( item.userControlledProperty.get() ) {
        dragListener.interrupt();
        item.reset();
      }
    } );

    //Label for the mass (if it is shown)
    const unknownValueIndicatorStringProperty = ForcesAndMotionBasicsStrings.unknownValueIndicatorStringProperty;
    const pattern0MassUnitsKilogramsStringProperty = new PatternStringProperty(
      ForcesAndMotionBasicsStrings.pattern[ '0massUnitsKilogramsStringProperty' ], { mass: item.massProperty }, { formatNames: [ 'mass' ] } );

    // Denominator empirically determined to prevent most labels from overlapping. The second value was empirically
    // determined to prevent the label from overlapping on larger images.
    const maxWidth = Math.min( normalImageNode.width / 1.7, 70 );
    const massLabelText = new Text( item.mystery ? unknownValueIndicatorStringProperty : pattern0MassUnitsKilogramsStringProperty, {
      font: new PhetFont( {
        size: 15,
        weight: 'bold'
      } ),
      maxWidth: maxWidth // Denominator empirically determined to prevent labels from overlapping.
    } );
    const roundedRadius = 10;

    const massLabelBackground = new BackgroundNode( massLabelText, {
      rectangleOptions: {
        cornerRadius: roundedRadius,
        opacity: 1,
        fill: 'white',
        stroke: 'gray'
      },
      xMargin: roundedRadius / 2
    } );

    // the label needs to be scaled back up after the image was scaled down
    // normalize the maximum width to then restrict the labels for i18n
    const labelText = new Node( {
      children: [ massLabelBackground ],
      scale: 1.0 / item.imageScale
    } );
    this.labelNode = labelText;

    // Ensure the massLabelText is centered in the roundRect and fits within the roundRect with dynamic locale
    ManualConstraint.create( this, [ labelText, this.normalImageNode ], () => {
      this.updateLabelPosition();
    } );

    //Update the position of the item
    item.positionProperty.link( position => { this.setTranslation( position ); } );

    // When the object is scaled or change direction, update the image part
    Multilink.multilink( [ item.interactionScaleProperty, item.directionProperty ], ( interactionScale, direction ) => {
      const scale = item.imageScale * interactionScale;
      this.setScaleMagnitude( scale );

      // make sure that labels remain the same size
      labelText.setScaleMagnitude( 1 / scale );

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
    item.inStackProperty.link( updateImage );

    this.addChild( normalImageNode );
    this.addChild( labelText );

    showMassesProperty.link( showMasses => { labelText.visible = showMasses; } );

    this.addLinkedElement( item );

    // When hiding the item via the PhET-iO API (e.g. in PhET-iO Studio or PhET Studio), remove from the stack and move back to the toolbox, invisibly
    this.visibleProperty.link( visible => {
      if ( !visible ) {
        model.spliceStack( model.stackedItems.indexOf( item ) );
        item.reset();
      }
    } );
  }


  /**
   * Set the label position relative to the bottom of the image.
   */
  private updateLabelPosition(): void {
    this.labelNode.bottom = this.normalImageNode.height - 5;
    this.labelNode.centerX = this.normalImageNode.centerX;
  }

  /**
   * Get the width of this item node, modified by the current scale factor.  If the item
   * is using its sitting representation, use that to get the scaled width
   */
  public getScaledWidth(): number {

    // if the item has a sitting image, use that image for the width
    let scaledWidth;
    if ( this.sittingImageNode ) {
      scaledWidth = this.sittingImageNode.width * this.item.getCurrentScale();
    }
    else {
      scaledWidth = this.normalImageNode.width * this.item.getCurrentScale();
    }
    return scaledWidth;
  }
}

forcesAndMotionBasics.register( 'ItemNode', ItemNode );