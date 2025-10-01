// Copyright 2025, University of Colorado Boulder

/**
 * PullerNodeDragListener handles dragging PullerNodes between the toolbox and rope knots.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import PullerMode from '../model/PullerMode.js';
import PullerNode from './PullerNode.js';

export default class PullerNodeDragListener extends SoundDragListener {

  public constructor( pullerNode: PullerNode, tandem: Tandem ) {
    const puller = pullerNode.puller;
    const model = puller.model;

    super( {
      tandem: tandem,
      allowTouchSnag: true,
      positionProperty: puller.positionProperty,
      start: () => {
        puller.modeProperty.value = PullerMode.pointerGrabbed();

        // Bring the puller in front for visibility while dragging
        pullerNode.moveToFront();
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

          // Add accessible response
        const knot = puller.modeProperty.value.getKnot( puller.model );
        if ( knot ) {
          const knotDescription = pullerNode.getKnotDescription( knot );
          pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerAttachedToKnot.format( {
            size: puller.size,
            color: puller.colorProperty,
            knotDescription: knotDescription,
            index: puller.descriptionIndex
          } ) );
        }
        else {
          pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
            size: puller.size,
            color: puller.colorProperty,
            index: puller.descriptionIndex
          } ) );
        }
      }
    } );
  }
}

forcesAndMotionBasics.register( 'PullerNodeDragListener', PullerNodeDragListener );
