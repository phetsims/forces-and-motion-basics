//  Copyright 2002-2014, University of Colorado Boulder

/**
 * This file declared the publicly available API for Forces and Motion: Basics.  The goal is that these API elements:
 * 1. can be used to configure the simulation through query parameters, see QueryParameterAPI
 * 2. can be set/read/controlled while the simulation runs, see SimIFrameAPI
 * 3. indicate what values will appear in the arch data stream
 * 4. indicate what values will appear in state save/load
 *
 * This is being designed such that simulation implementation details can vary separately from the API.
 * Refactoring the simulation can be done safely (without breaking clients using this API), as long as this mapping
 * is updated accordingly.
 *
 * For discussion:
 * 1. Not all components will send messages, only the ones identified in this file????
 * 2. I am concerned that this kind of API will duplicate with a lot of the sim infrastrucure
 * 3. For a straightforward sim implementation--this would all be duplicated.
 * 4. Perhaps automatically generate this file from a sim run, and permit overrides for routes when refactoring *does* need to happen
 * 5. annotate things (like checkboxes) at their declaration site, and automatically generate this file? This may have a build step.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  return {

    // TODO: HomeScreen API should be centralized, perhaps in Joist?
    homeScreen: {},
    netForceScreen: {
      model: {
        route: 'netForceScreen.model',
        showSumOfForcesProperty: {
          type: 'property',
          description: '',

          // TODO: support axon style setters?  Could be done by setting the type of model as PropertySet and giving a list of property fields.
          route: 'netForceScreen.model.showSumOfForcesProperty'
        }
      },
      view: {
        route: 'netForceScreen.view',

        resetAllButton: {
          type: 'button',
          description: 'Orange button that appears in the bottom right of the sim.  Resets the entire screen.',

          // Route is relative to the screen.
          // TODO: provide an abbreviated syntax for routes that match API spec.  Only specify routes for things that 
          // TODO: don't match in the sim implementation.
          route: 'netForceScreen.view.controlPanel.resetAllButton'
        },
        sumOfForcesCheckbox: {
          type: 'checkbox',
          description: 'Checkbox in the control panel that shows the "sum of forces" arrow in the play area.',
          route: 'view.resetAllButton'
        },
        valuesCheckbox: {
          type: 'checkbox',
          description: 'Checkbox in the control panel that shows the "sum of forces" arrow in the play area.',
          route: 'view.resetAllButton'
        }
        // etc., etc.
      }
    },

    // TODO: More API elements.
    motionScreen: {},
    frictionScreen: {},
    accelerationScreen: {}
  };
} );