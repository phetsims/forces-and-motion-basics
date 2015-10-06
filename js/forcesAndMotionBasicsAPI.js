// Copyright 2002-2014, University of Colorado Boulder

/**
 * This file declared the publicly available API for Forces and Motion: Basics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  //TODO: This is very sloppy regarding Property vs non Property & naming
  return {
    'netForceScreen': {
      'model': {
        'route': 'netForceScreen.model',
        'started': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.startedProperty' },
        'running': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.runningProperty' },
        'numberPullersAttached': {
          'type': 'AXON/Property',
          'route': 'netForceScreen.model.numberPullersAttachedProperty'
        },
        'state': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.stateProperty' },
        'time': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.timeProperty' },
        'netForce': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.netForceProperty' },
        'leftForce': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.leftForceProperty' },
        'rightForce': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.rightForceProperty' },
        'showSumOfForces': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.showSumOfForcesProperty' },
        'showValues': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.showValuesProperty' },
        'volumeOn': { 'type': 'AXON/Property', 'route': 'netForceScreen.model.volumeOnProperty' }
      },
      'view': {
        'route': 'netForceScreen.view',
        'particles': {
          type: 'Array',
          elementType: 'particle'
        },
        'sumOfForcesCheckBox': {
          'type': 'checkbox',
          'route': 'netForceScreen.view.controlPanel.verticalCheckBoxGroup.children[0]'
        },
        'resetAllButton': {
          'type': 'button',
          'description': 'Orange button that appears in the bottom right of the sim.  Resets the entire screen.',
          'route': 'netForceScreen.view.controlPanel.resetAllButton'
        }
      }
    }
  };
} );