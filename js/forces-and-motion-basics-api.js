// TODO: Not all components will send messages, only the ones identified in this file????
// Currently there are many internal property messages, etc.
// SR: I am concerned that this kind of API will duplicate with a lot of the sim infrastrucure
// SR: For a straightforward sim implementation--this would all be duplicated.
// SR: Perhaps automatically generate this file from a sim run, and permit overrides for routes when refactoring *does* need to happen

window.FORCES_AND_MOTION_BASICS_API = {

  // TODO: This should be centralized, perhaps in Joist?

  // TODO: annotate things (like checkboxes) at their declaration site, and automatically generate this file?
  // TODO: this may have a build step
  homeScreen: {},
  netForceScreen: {
    view: {
      resetAllButton: {
        type: 'button',
        description: 'Orange button that appears in the bottom right of the sim.  Resets the entire screen.',

        // Route is relative to the screen.
        route: 'view.resetAllButton'
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
    }
  },
  motionScreen: {},
  frictionScreen: {},
  accelerationScreen: {}
};