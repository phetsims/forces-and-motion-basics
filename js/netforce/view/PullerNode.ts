// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HighlightFromNode from '../../../../scenery/js/accessibility/HighlightFromNode.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image, { ImageOptions } from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller from '../model/Puller.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';
import PullerKeyboardSupport from './PullerKeyboardSupport.js';

type SelfOptions = EmptySelfOptions;
type PullerNodeOptions = ImageOptions & SelfOptions;

export default class PullerNode extends InteractiveHighlighting( Image ) {
  public standImage: ImageableImage;
  private readonly dragListener: SoundDragListener;
  private keyboardListener: KeyboardListener<OneKeyStroke[]> | null = null;
  private readonly model: NetForceModel;
  // private readonly focusManager: PullerFocusManager;

  // Note: Redundant state tracking removed - now using puller.state object

  /**
   * Create a PullerNode for the specified puller
   *
   * @param puller
   * @param model
   * @param image image of the puller standing upright
   * @param pullImage image of the puller exerting a force
   * @param [providedOptions]
   */
  public constructor(
    public readonly puller: Puller,
    model: NetForceModel,
    image: ImageableImage,
    public pullImage: ImageableImage,
    providedOptions?: PullerNodeOptions ) {

    const x = puller.positionProperty.get().x;
    const y = puller.positionProperty.get().y;

    const options = optionize<PullerNodeOptions, SelfOptions, ImageOptions>()( {
      phetioInputEnabledPropertyInstrumented: true,
      phetioFeatured: true,
      visiblePropertyOptions: { phetioFeatured: true },
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86,
      tagName: 'button',
      accessibleName: new DerivedProperty( [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ], pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ?
                             ( puller.type === 'blue' ? 'purple' : 'orange' ) :
                             puller.type;
        return `${puller.size} ${displayColor} puller`;
      } )
    }, providedOptions );

    super( image, options );

    // this.puller.node = this; //Wire up so node can be looked up by model element.
    this.standImage = image;
    this.model = model;
    // this.focusManager = focusManager;

    model.hasStartedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    puller.positionProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    model.hasStartedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.isRunningProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.stateProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    this.dragListener = new SoundDragListener( {
        tandem: options.tandem?.createTandem( 'dragListener' ),
        allowTouchSnag: true,
        positionProperty: puller.positionProperty,
        start: event => {

          // check to see if a puller is knotted - if it is, store the knot
          const knot = puller.knotProperty.get();

          puller.modeProperty.set( 'pointerGrabbed' );

          // disconnect the puller from the knot and update the image
          puller.disconnect();
          this.updateImage( puller, model );

          // fire updates
          // puller.userControlledProperty.set( true );
          this.moveToFront();
          puller.userControlledEmitter.emit();

          // if the puller was knotted, update the image position so that it is centered on the knot it was previously
          // grabbing
          if ( knot ) {
            this.updatePositionKnotted( puller, model, knot );
          }
        },
        end: () => {
          // Determine drop location using the model's existing getTargetKnot method
          const dropKnot = model.getTargetKnot( puller );
          
          if ( dropKnot ) {
            puller.dropAtKnot( dropKnot );
          }
 else {
            puller.dropAtHome();
          }
          
          // Update visuals
          this.updatePosition( puller, model );
          this.updateImage( puller, model );
          
          // Emit dropped event
          puller.droppedEmitter.emit( 'mouse' );

          // Add accessible response
          if ( puller.knotProperty.get() ) {
            const knotDescription = this.getKnotDescription( puller.knotProperty.get()! );
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller attached to ${knotDescription}.` );
          }
 else {
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
          }
        }
      }
    );
    this.addInputListener( this.dragListener );

    model.resetAllEmitter.addListener( () => {
      this.updatePosition( puller, model );

      // cancel the drag
      if ( puller.userControlledProperty.get() ) {
        this.dragListener.interrupt();

        puller.reset();
      }
    } );

    this.addLinkedElement( this.puller, {
      tandemName: 'puller'
    } );

    // When hiding the puller via the PhET-iO API (e.g. in PhET-iO Studio or PhET Studio), detach from the knot and move back to the toolbox, invisibly
    this.visibleProperty.link( visible => {
      if ( !visible ) {
        puller.reset();
      }
    } );

    const highlightFromNode = new HighlightFromNode( this );
    this.focusHighlight = highlightFromNode;

    puller.modeProperty.link( mode => {
      if ( mode.startsWith( 'keyboardGrabbed' ) ) {
        highlightFromNode.setDashed( true );
      }
      else {
        highlightFromNode.setDashed( false );
      }
    } );

    // Create a single listener that combines all hotkey data
    this.keyboardListener = new KeyboardListener( {
      keyStringProperties: [
        ...NetForceHotkeyData.pullerNode.navigation.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.grabOrDrop.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.cancelInteraction.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.returnToToolbox.keyStringProperties
      ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => this.handleKeyboardInput( keysPressed )
    } );
    this.addInputListener( this.keyboardListener );

    this.focusedProperty.lazyLink( focused => {
      if ( !focused && puller.isGrabbed() ) {
        // Handle focus blur during keyboard grab - drop the puller
        const result = PullerKeyboardSupport.handleKeyboardInput( this, this.model, 'enter' );
        
        if ( result.handled ) {
          if ( result.shouldUpdatePosition ) {
            this.updatePosition( this.puller, this.model );
          }
          if ( result.shouldUpdateImage ) {
            this.updateImage( this.puller, this.model );
          }
        }
      }
    } );
  }

  /**
   * Update the position of the puller immediately after it has been clicked on after being removed from a knot
   * position.  Sets the translation of the puller relative to its previous knot position.  This knot position is
   * lost in updatePosition because the puller has already been disconnected from the knot by the time those functions
   * are called.
   *
   * @param puller
   * @param model
   * @param knot - the last knot that the puller was holding on to
   */
  public updatePositionKnotted( puller: Puller, model: NetForceModel, knot: Knot ): void {
    const blueOffset = this.puller.type === 'blue' ? -40 : 0;
    puller.positionProperty.set( new Vector2( knot.positionProperty.get() + blueOffset, knot.y - this.height + 90 ) );
  }

  /**
   * Update the image puller image depending on whether the puller is knotted and pulling
   */
  public updateImage( puller: Puller, model: NetForceModel ): void {
    const knotted = puller.knotProperty.get();
    const pulling = model.hasStartedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    this.image = pulling ? this.pullImage : this.standImage;
  }

  /**
   * Update the position of a puller depending on its current mode.
   */
  public updatePosition( puller: Puller, model: NetForceModel ): void {
    const currentMode = puller.modeProperty.get();
    const knotted = puller.knotProperty.get();
    const pulling = model.hasStartedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    
    if ( currentMode.startsWith( 'keyboardGrabbedOver' ) && currentMode !== 'keyboardGrabbedOverHome' ) {
      // Position over the target knot for keyboard navigation
      const targetKnot = this.getKnotFromKeyboardMode( currentMode, model );
      if ( targetKnot ) {
        this.updatePositionKnotted( puller, model, targetKnot );
      }
    }
    else if ( knotted ) {
      // Normal attached position
      const pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
      const blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
      this.setTranslation( puller.knotProperty.get()!.positionProperty.get() + pullingOffset + blueOffset, puller.knotProperty.get()!.y - this.height + 90 );
    }
    else {
      // Home position (toolbox or pointerGrabbed)
      this.setTranslation( puller.positionProperty.get() );
    }
  }

  /**
   * Get knot from keyboard grabbed mode string
   */
  private getKnotFromKeyboardMode( mode: string, model: NetForceModel ): Knot | null {
    // Extract knot info from mode (e.g., 'keyboardGrabbedOverLeftKnot1' -> left, index 0)
    const match = mode.match( /keyboardGrabbedOver(Left|Right)Knot(\d+)/i );
    if ( !match ) {return null;}
    
    const isLeft = match[ 1 ].toLowerCase() === 'left';
    const knotIndex = parseInt( match[ 2 ], 10 ) - 1; // Convert 1-based to 0-based
    
    const filteredKnots = model.knots.filter( knot =>
      knot.type === ( isLeft ? 'blue' : 'red' )
    );
    
    return filteredKnots[ knotIndex ] || null;
  }

  /**
   * Get a human-readable description of a knot's position
   * @param knot - The knot to describe
   * @returns A string like "left knot 1" or "right knot 3"
   */
  public getKnotDescription( knot: Knot ): string {
    // Find the index of this knot among knots of the same type
    const sameTypeKnots = this.model.knots.filter( k => k.type === knot.type );
    const index = sameTypeKnots.indexOf( knot );
    const side = knot.type === 'blue' ? 'left' : 'right';
    return `${side} knot ${index + 1}`;
  }

  /**
   * Handle keyboard input using the centralized PullerKeyboardSupport
   */
  private handleKeyboardInput( keysPressed: string ): void {
    const result = PullerKeyboardSupport.handleKeyboardInput( this, this.model, keysPressed );
    
    if ( result.handled ) {
      // Update position if needed
      if ( result.shouldUpdatePosition ) {
        this.updatePosition( this.puller, this.model );
      }
      
      // Update image if needed
      if ( result.shouldUpdateImage ) {
        this.updateImage( this.puller, this.model );
      }
      
      // Handle focus if needed
      if ( result.shouldFocus ) {
        this.focusable = true;
        this.focus();
        this.moveToFront();
        this.puller.userControlledEmitter.emit();
      }
      
      // Add accessibility response if provided
      if ( result.accessibilityResponse ) {
        this.addAccessibleResponse( result.accessibilityResponse );
      }
    }
  }


  /**
   * Reset the puller node to its initial state
   */
  public reset(): void {
    // Update visual state based on reset model
    this.updateImage( this.puller, this.model );
    this.updatePosition( this.puller, this.model );

    // Ensure focusable state is correct (pullers in toolbox should be focusable)
    if ( this.puller.knotProperty.get() === null ) {
      this.focusable = true;
    }
  }
}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );