// Copyright 2025, University of Colorado Boulder

/**
 * PusherNodeDragListener handles dragging the pusher to apply force to the stack.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionModel from '../model/MotionModel.js';
import PusherNode from './PusherNode.js';

export default class PusherNodeDragListener extends SoundDragListener {

  public constructor( pusherNode: PusherNode, model: MotionModel, tandem: Tandem ) {
    super( {
      tandem: tandem,
      allowTouchSnag: true,
      enabledProperty: model.pusherInteractionsEnabledProperty,
      drag: ( _event: SceneryEvent, listener: DragListener ) => {
        if ( pusherNode.isInteractive() ) {
          const newAppliedForce = model.appliedForceProperty.value + listener.modelDelta.x;
          const clampedAppliedForce = Math.max( -500, Math.min( 500, newAppliedForce ) );

          // the new force should be rounded so that applied force is not
          // more precise than friction force, see https://github.com/phetsims/forces-and-motion-basics/issues/197
          const roundedForce = roundSymmetric( clampedAppliedForce );

          // Only apply a force if the pusher is not fallen, see #48
          if ( !model.fallenProperty.value ) {
            model.appliedForceProperty.value = roundedForce;
          }
        }
      },

      start: () => {
        if ( pusherNode.isInteractive() ) {

          // if the user interacts with the pusher, resume model 'playing' so that the sim does not seem broken
          if ( !model.isPlayingProperty.value ) {
            model.isPlayingProperty.value = true;
          }
        }
      },

      end: () => {
        if ( pusherNode.isInteractive() ) {

          // if the model is paused, the applied force should remain the same
          if ( model.isPlayingProperty.value ) {
            model.appliedForceProperty.value = 0;
          }
        }
      }
    } );
  }
}

forcesAndMotionBasics.register( 'PusherNodeDragListener', PusherNodeDragListener );
