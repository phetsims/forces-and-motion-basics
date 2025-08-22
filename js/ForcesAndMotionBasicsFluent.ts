// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from forces-and-motion-basics-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import forcesAndMotionBasics from './forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from './ForcesAndMotionBasicsStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( ForcesAndMotionBasicsStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'none', 'noneStringProperty' );
addToMapIfDefined( 'force', 'forceStringProperty' );
addToMapIfDefined( 'values', 'valuesStringProperty' );
addToMapIfDefined( 'redWins', 'redWinsStringProperty' );
addToMapIfDefined( 'frictionForce', 'frictionForceStringProperty' );
addToMapIfDefined( 'pause', 'pauseStringProperty' );
addToMapIfDefined( 'friction', 'frictionStringProperty' );
addToMapIfDefined( 'forces_and_motion_basics_title', 'forces-and-motion-basics.titleStringProperty' );
addToMapIfDefined( 'leftForce', 'leftForceStringProperty' );
addToMapIfDefined( 'appliedForce', 'appliedForceStringProperty' );
addToMapIfDefined( 'rightForce', 'rightForceStringProperty' );
addToMapIfDefined( 'acceleration', 'accelerationStringProperty' );
addToMapIfDefined( 'lots', 'lotsStringProperty' );
addToMapIfDefined( 'forces', 'forcesStringProperty' );
addToMapIfDefined( 'netForce', 'netForceStringProperty' );
addToMapIfDefined( 'motion', 'motionStringProperty' );
addToMapIfDefined( 'go', 'goStringProperty' );
addToMapIfDefined( 'sumOfForcesEqualsZero', 'sumOfForcesEqualsZeroStringProperty' );
addToMapIfDefined( 'blueWins', 'blueWinsStringProperty' );
addToMapIfDefined( 'sumOfForces', 'sumOfForcesStringProperty' );
addToMapIfDefined( 'speed', 'speedStringProperty' );
addToMapIfDefined( 'stopwatch', 'stopwatchStringProperty' );
addToMapIfDefined( 'return', 'returnStringProperty' );
addToMapIfDefined( 'masses', 'massesStringProperty' );
addToMapIfDefined( 'unknownValueIndicator', 'unknownValueIndicatorStringProperty' );
addToMapIfDefined( 'netForcePullerColors', 'netForcePullerColorsStringProperty' );
addToMapIfDefined( 'blueAndRed', 'blueAndRedStringProperty' );
addToMapIfDefined( 'purpleAndOrange', 'purpleAndOrangeStringProperty' );
addToMapIfDefined( 'purpleWins', 'purpleWinsStringProperty' );
addToMapIfDefined( 'orangeWins', 'orangeWinsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_fromAnywhereInSim', 'keyboardHelpDialog.fromAnywhereInSimStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_startGame', 'keyboardHelpDialog.startGameStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_pauseGame', 'keyboardHelpDialog.pauseGameStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_returnCartToCenter', 'keyboardHelpDialog.returnCartToCenterStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_pullerNavigation', 'keyboardHelpDialog.pullerNavigationStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_selectPuller', 'keyboardHelpDialog.selectPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_grabPuller', 'keyboardHelpDialog.grabPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveGrabbedPuller', 'keyboardHelpDialog.moveGrabbedPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_dropPuller', 'keyboardHelpDialog.dropPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_itemNavigation', 'keyboardHelpDialog.itemNavigationStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_selectItem', 'keyboardHelpDialog.selectItemStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_grabItem', 'keyboardHelpDialog.grabItemStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveGrabbedItem', 'keyboardHelpDialog.moveGrabbedItemStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_dropItem', 'keyboardHelpDialog.dropItemStringProperty' );
addToMapIfDefined( 'a11y_preferences_netForcePullerColors_accessibleHelpText', 'a11y.preferences.netForcePullerColors.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_fromAnywhereInSim_startGameDescription', 'a11y.keyboardHelpDialog.fromAnywhereInSim.startGameDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_fromAnywhereInSim_pauseGameDescription', 'a11y.keyboardHelpDialog.fromAnywhereInSim.pauseGameDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_fromAnywhereInSim_returnCartToCenterDescription', 'a11y.keyboardHelpDialog.fromAnywhereInSim.returnCartToCenterDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_selectPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.selectPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_grabPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.grabPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_moveGrabbedPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.moveGrabbedPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_dropPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.dropPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_colorName', 'a11y.netForceScreen.colorNameStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_teamName', 'a11y.netForceScreen.teamNameStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_playArea_description', 'a11y.netForceScreen.screenSummary.playArea.descriptionStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_controlArea_description', 'a11y.netForceScreen.screenSummary.controlArea.descriptionStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_currentDetails_accessibleNameNotStarted', 'a11y.netForceScreen.screenSummary.currentDetails.accessibleNameNotStartedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_currentDetails_accessibleNameInProgress', 'a11y.netForceScreen.screenSummary.currentDetails.accessibleNameInProgressStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_currentDetails_accessibleNameCompleted', 'a11y.netForceScreen.screenSummary.currentDetails.accessibleNameCompletedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_currentDetails_noPullersAttached', 'a11y.netForceScreen.screenSummary.currentDetails.noPullersAttachedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_currentDetails_teamAttached', 'a11y.netForceScreen.screenSummary.currentDetails.teamAttachedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenSummary_interactionHint', 'a11y.netForceScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_puller_accessibleName', 'a11y.netForceScreen.puller.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_puller_size', 'a11y.netForceScreen.puller.sizeStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_pullerResponses_pullerAttachedToKnot', 'a11y.netForceScreen.pullerResponses.pullerAttachedToKnotStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_pullerResponses_pullerReturnedToToolbox', 'a11y.netForceScreen.pullerResponses.pullerReturnedToToolboxStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_pullerResponses_pullerInteractionCancelled', 'a11y.netForceScreen.pullerResponses.pullerInteractionCancelledStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_returnButton_cartReturnedToCenter', 'a11y.netForceScreen.returnButton.cartReturnedToCenterStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_returnButton_accessibleName', 'a11y.netForceScreen.returnButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_returnButton_accessibleHelpText', 'a11y.netForceScreen.returnButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_goPauseButton_accessibleHelpTextGo', 'a11y.netForceScreen.goPauseButton.accessibleHelpTextGoStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_goPauseButton_accessibleHelpTextPause', 'a11y.netForceScreen.goPauseButton.accessibleHelpTextPauseStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_goPauseButton_cartMovingLeft', 'a11y.netForceScreen.goPauseButton.cartMovingLeftStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_goPauseButton_cartMovingRight', 'a11y.netForceScreen.goPauseButton.cartMovingRightStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_goPauseButton_cartStationary', 'a11y.netForceScreen.goPauseButton.cartStationaryStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_goPauseButton_cartPaused', 'a11y.netForceScreen.goPauseButton.cartPausedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleName', 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleHelpText', 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleContextResponseChecked', 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleContextResponseUnchecked', 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_values_accessibleName', 'a11y.netForceScreen.netForceControlPanel.values.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_values_accessibleHelpText', 'a11y.netForceScreen.netForceControlPanel.values.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_values_accessibleContextResponseChecked', 'a11y.netForceScreen.netForceControlPanel.values.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_values_accessibleContextResponseUnchecked', 'a11y.netForceScreen.netForceControlPanel.values.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_speed_accessibleName', 'a11y.netForceScreen.netForceControlPanel.speed.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_speed_accessibleHelpText', 'a11y.netForceScreen.netForceControlPanel.speed.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_speed_accessibleContextResponseChecked', 'a11y.netForceScreen.netForceControlPanel.speed.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_speed_accessibleContextResponseUnchecked', 'a11y.netForceScreen.netForceControlPanel.speed.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_playAreaControls_accessibleHeading', 'a11y.netForceScreen.playAreaControls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_description', 'a11y.motionScreen.screenSummary.playArea.descriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_frictionDescription', 'a11y.motionScreen.screenSummary.playArea.frictionDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_accelerationDescription', 'a11y.motionScreen.screenSummary.playArea.accelerationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_objectToolbox_description', 'a11y.motionScreen.screenSummary.playArea.objectToolbox.descriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_appliedForceControl_description', 'a11y.motionScreen.screenSummary.playArea.appliedForceControl.descriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_controlArea_description', 'a11y.motionScreen.screenSummary.controlArea.descriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_noObjectsOnSkateboard', 'a11y.motionScreen.screenSummary.currentDetails.noObjectsOnSkateboardStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_noObjectsOnGround', 'a11y.motionScreen.screenSummary.currentDetails.noObjectsOnGroundStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_objectsOnSkateboard', 'a11y.motionScreen.screenSummary.currentDetails.objectsOnSkateboardStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_objectsOnGround', 'a11y.motionScreen.screenSummary.currentDetails.objectsOnGroundStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_motionState_stationary', 'a11y.motionScreen.screenSummary.currentDetails.motionState.stationaryStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_motionState_movingRight', 'a11y.motionScreen.screenSummary.currentDetails.motionState.movingRightStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_motionState_movingLeft', 'a11y.motionScreen.screenSummary.currentDetails.motionState.movingLeftStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_forceDescription_noForce', 'a11y.motionScreen.screenSummary.currentDetails.forceDescription.noForceStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_forceDescription_appliedForceRight', 'a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceRightStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_forceDescription_appliedForceLeft', 'a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceLeftStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_interactionHint_noObjects', 'a11y.motionScreen.screenSummary.interactionHint.noObjectsStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_interactionHint_noObjectsOnGround', 'a11y.motionScreen.screenSummary.interactionHint.noObjectsOnGroundStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_interactionHint_withObjects', 'a11y.motionScreen.screenSummary.interactionHint.withObjectsStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_itemAccessibleNameWithMass', 'a11y.motionScreen.items.itemAccessibleNameWithMassStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_massUnknown', 'a11y.motionScreen.items.massUnknownStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_names_fridge', 'a11y.motionScreen.items.names.fridgeStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_names_crate1', 'a11y.motionScreen.items.names.crate1StringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_names_crate2', 'a11y.motionScreen.items.names.crate2StringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_names_girl', 'a11y.motionScreen.items.names.girlStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_names_man', 'a11y.motionScreen.items.names.manStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_names_trash', 'a11y.motionScreen.items.names.trashStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_items_names_mystery', 'a11y.motionScreen.items.names.mysteryStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_itemToolbox_accessibleName', 'a11y.motionScreen.itemToolbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_itemToolbox_descriptionContent', 'a11y.motionScreen.itemToolbox.descriptionContentStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_itemStackGroup_accessibleName', 'a11y.motionScreen.itemStackGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_itemStackGroup_descriptionContent', 'a11y.motionScreen.itemStackGroup.descriptionContentStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_force_accessibleName', 'a11y.motionScreen.motionControlPanel.force.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_force_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.force.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_force_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.force.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_force_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.force.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_values_accessibleName', 'a11y.motionScreen.motionControlPanel.values.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_values_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.values.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_values_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.values.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_values_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.values.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_masses_accessibleName', 'a11y.motionScreen.motionControlPanel.masses.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_masses_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.masses.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_masses_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.masses.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_masses_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.masses.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_speed_accessibleName', 'a11y.motionScreen.motionControlPanel.speed.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_speed_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.speed.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_speed_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.speed.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_speed_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.speed.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleName', 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forces_accessibleName', 'a11y.motionScreen.motionControlPanel.forces.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forces_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.forces.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forces_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.forces.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forces_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.forces.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleName', 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_acceleration_accessibleName', 'a11y.motionScreen.motionControlPanel.acceleration.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_acceleration_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.acceleration.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_acceleration_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.acceleration.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_acceleration_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.acceleration.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_playAreaControls_accessibleHeading', 'a11y.motionScreen.playAreaControls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_objectToolboxes_leftObjectToolbox', 'a11y.objectToolboxes.leftObjectToolboxStringProperty' );
addToMapIfDefined( 'a11y_objectToolboxes_rightObjectToolbox', 'a11y.objectToolboxes.rightObjectToolboxStringProperty' );
addToMapIfDefined( 'a11y_objectToolboxes_objectToolbox', 'a11y.objectToolboxes.objectToolboxStringProperty' );
addToMapIfDefined( 'a11y_objectToolboxes_skateboard', 'a11y.objectToolboxes.skateboardStringProperty' );
addToMapIfDefined( 'a11y_pullers_pullerInstruction', 'a11y.pullers.pullerInstructionStringProperty' );
addToMapIfDefined( 'a11y_pullers_overReturnToToolbox', 'a11y.pullers.overReturnToToolboxStringProperty' );
addToMapIfDefined( 'a11y_pullers_overKnotDescription', 'a11y.pullers.overKnotDescriptionStringProperty' );
addToMapIfDefined( 'a11y_pullers_knotDescription', 'a11y.pullers.knotDescriptionStringProperty' );
addToMapIfDefined( 'a11y_pullers_leftSide', 'a11y.pullers.leftSideStringProperty' );
addToMapIfDefined( 'a11y_pullers_rightSide', 'a11y.pullers.rightSideStringProperty' );
addToMapIfDefined( 'a11y_tugOfWar_heading', 'a11y.tugOfWar.headingStringProperty' );
addToMapIfDefined( 'a11y_tugOfWar_noPullersOnRope', 'a11y.tugOfWar.noPullersOnRopeStringProperty' );
addToMapIfDefined( 'a11y_tugOfWar_knotOccupied', 'a11y.tugOfWar.knotOccupiedStringProperty' );
addToMapIfDefined( 'a11y_forces_heading', 'a11y.forces.headingStringProperty' );
addToMapIfDefined( 'a11y_forces_leftForceArrow', 'a11y.forces.leftForceArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_rightForceArrow', 'a11y.forces.rightForceArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_sumOfForcesArrow', 'a11y.forces.sumOfForcesArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_sumOfForcesZero', 'a11y.forces.sumOfForcesZeroStringProperty' );
addToMapIfDefined( 'a11y_forces_quantitativeDescription', 'a11y.forces.quantitativeDescriptionStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_small', 'a11y.forces.qualitativeDescriptions.smallStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_medium', 'a11y.forces.qualitativeDescriptions.mediumStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_mediumSmall', 'a11y.forces.qualitativeDescriptions.mediumSmallStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_mediumLarge', 'a11y.forces.qualitativeDescriptions.mediumLargeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_large', 'a11y.forces.qualitativeDescriptions.largeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_veryLarge', 'a11y.forces.qualitativeDescriptions.veryLargeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_extremelyLarge', 'a11y.forces.qualitativeDescriptions.extremelyLargeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_left', 'a11y.forces.qualitativeDescriptions.leftStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_right', 'a11y.forces.qualitativeDescriptions.rightStringProperty' );
addToMapIfDefined( 'a11y_speed_heading', 'a11y.speed.headingStringProperty' );
addToMapIfDefined( 'a11y_speed_cartSpeed', 'a11y.speed.cartSpeedStringProperty' );
addToMapIfDefined( 'a11y_speed_cartSpeedWithAcceleration', 'a11y.speed.cartSpeedWithAccelerationStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_stationary', 'a11y.speed.qualitativeDescriptions.stationaryStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_verySlow', 'a11y.speed.qualitativeDescriptions.verySlowStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_slow', 'a11y.speed.qualitativeDescriptions.slowStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_medium', 'a11y.speed.qualitativeDescriptions.mediumStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_fast', 'a11y.speed.qualitativeDescriptions.fastStringProperty' );
addToMapIfDefined( 'a11y_speed_accelerationDescriptions_speedingUp', 'a11y.speed.accelerationDescriptions.speedingUpStringProperty' );
addToMapIfDefined( 'a11y_speed_accelerationDescriptions_slowingDown', 'a11y.speed.accelerationDescriptions.slowingDownStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const ForcesAndMotionBasicsFluent = {
  noneStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'none', _.get( ForcesAndMotionBasicsStrings, 'noneStringProperty' ) ),
  forceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'force', _.get( ForcesAndMotionBasicsStrings, 'forceStringProperty' ) ),
  valuesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'values', _.get( ForcesAndMotionBasicsStrings, 'valuesStringProperty' ) ),
  redWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'redWins', _.get( ForcesAndMotionBasicsStrings, 'redWinsStringProperty' ) ),
  frictionForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'frictionForce', _.get( ForcesAndMotionBasicsStrings, 'frictionForceStringProperty' ) ),
  pauseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'pause', _.get( ForcesAndMotionBasicsStrings, 'pauseStringProperty' ) ),
  frictionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'friction', _.get( ForcesAndMotionBasicsStrings, 'frictionStringProperty' ) ),
  "forces-and-motion-basics": {
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'forces_and_motion_basics_title', _.get( ForcesAndMotionBasicsStrings, 'forces-and-motion-basics.titleStringProperty' ) )
  },
  leftForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'leftForce', _.get( ForcesAndMotionBasicsStrings, 'leftForceStringProperty' ) ),
  appliedForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'appliedForce', _.get( ForcesAndMotionBasicsStrings, 'appliedForceStringProperty' ) ),
  rightForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'rightForce', _.get( ForcesAndMotionBasicsStrings, 'rightForceStringProperty' ) ),
  pattern: {
    "0massUnitsKilogramsStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0massUnitsKilogramsStringProperty' ),
    "0valueUnitsNewtonsStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0valueUnitsNewtonsStringProperty' ),
    "0name": {
      "1valueUnitsAccelerationStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0name.1valueUnitsAccelerationStringProperty' ),
      "1valueUnitsVelocityStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0name.1valueUnitsVelocityStringProperty' )
    },
    "0valueUnitsNStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0valueUnitsNStringProperty' )
  },
  accelerationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'acceleration', _.get( ForcesAndMotionBasicsStrings, 'accelerationStringProperty' ) ),
  lotsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'lots', _.get( ForcesAndMotionBasicsStrings, 'lotsStringProperty' ) ),
  forcesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'forces', _.get( ForcesAndMotionBasicsStrings, 'forcesStringProperty' ) ),
  netForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'netForce', _.get( ForcesAndMotionBasicsStrings, 'netForceStringProperty' ) ),
  motionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'motion', _.get( ForcesAndMotionBasicsStrings, 'motionStringProperty' ) ),
  goStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'go', _.get( ForcesAndMotionBasicsStrings, 'goStringProperty' ) ),
  sumOfForcesEqualsZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumOfForcesEqualsZero', _.get( ForcesAndMotionBasicsStrings, 'sumOfForcesEqualsZeroStringProperty' ) ),
  blueWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'blueWins', _.get( ForcesAndMotionBasicsStrings, 'blueWinsStringProperty' ) ),
  sumOfForcesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumOfForces', _.get( ForcesAndMotionBasicsStrings, 'sumOfForcesStringProperty' ) ),
  speedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'speed', _.get( ForcesAndMotionBasicsStrings, 'speedStringProperty' ) ),
  stopwatchStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'stopwatch', _.get( ForcesAndMotionBasicsStrings, 'stopwatchStringProperty' ) ),
  returnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'return', _.get( ForcesAndMotionBasicsStrings, 'returnStringProperty' ) ),
  massesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'masses', _.get( ForcesAndMotionBasicsStrings, 'massesStringProperty' ) ),
  unknownValueIndicatorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'unknownValueIndicator', _.get( ForcesAndMotionBasicsStrings, 'unknownValueIndicatorStringProperty' ) ),
  netForcePullerColorsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'netForcePullerColors', _.get( ForcesAndMotionBasicsStrings, 'netForcePullerColorsStringProperty' ) ),
  blueAndRedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'blueAndRed', _.get( ForcesAndMotionBasicsStrings, 'blueAndRedStringProperty' ) ),
  purpleAndOrangeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'purpleAndOrange', _.get( ForcesAndMotionBasicsStrings, 'purpleAndOrangeStringProperty' ) ),
  purpleWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'purpleWins', _.get( ForcesAndMotionBasicsStrings, 'purpleWinsStringProperty' ) ),
  orangeWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'orangeWins', _.get( ForcesAndMotionBasicsStrings, 'orangeWinsStringProperty' ) ),
  _comment_0: new FluentComment( {"comment":"keyboard help dialog strings","associatedKey":"keyboardHelpDialog"} ),
  keyboardHelpDialog: {
    fromAnywhereInSimStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_fromAnywhereInSim', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.fromAnywhereInSimStringProperty' ) ),
    startGameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_startGame', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.startGameStringProperty' ) ),
    pauseGameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_pauseGame', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.pauseGameStringProperty' ) ),
    returnCartToCenterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_returnCartToCenter', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.returnCartToCenterStringProperty' ) ),
    pullerNavigationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_pullerNavigation', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.pullerNavigationStringProperty' ) ),
    selectPullerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_selectPuller', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.selectPullerStringProperty' ) ),
    grabPullerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_grabPuller', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.grabPullerStringProperty' ) ),
    moveGrabbedPullerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_moveGrabbedPuller', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.moveGrabbedPullerStringProperty' ) ),
    dropPullerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_dropPuller', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.dropPullerStringProperty' ) ),
    itemNavigationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_itemNavigation', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.itemNavigationStringProperty' ) ),
    selectItemStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_selectItem', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.selectItemStringProperty' ) ),
    grabItemStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_grabItem', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.grabItemStringProperty' ) ),
    moveGrabbedItemStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_moveGrabbedItem', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.moveGrabbedItemStringProperty' ) ),
    dropItemStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_dropItem', _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.dropItemStringProperty' ) )
  },
  _comment_1: new FluentComment( {"comment":"accessibility strings","associatedKey":"a11y"} ),
  a11y: {
    preferences: {
      netForcePullerColors: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_netForcePullerColors_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.preferences.netForcePullerColors.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_0: new FluentComment( {"comment":"keyboard help dialog strings","associatedKey":"keyboardHelpDialog"} ),
    keyboardHelpDialog: {
      fromAnywhereInSim: {
        startGameDescription: new FluentPattern<{ altOrOptionKey: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_fromAnywhereInSim_startGameDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.fromAnywhereInSim.startGameDescriptionStringProperty' ), [{"name":"altOrOptionKey"}] ),
        pauseGameDescription: new FluentPattern<{ altOrOptionKey: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_fromAnywhereInSim_pauseGameDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.fromAnywhereInSim.pauseGameDescriptionStringProperty' ), [{"name":"altOrOptionKey"}] ),
        returnCartToCenterDescription: new FluentPattern<{ altOrOptionKey: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_fromAnywhereInSim_returnCartToCenterDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.fromAnywhereInSim.returnCartToCenterDescriptionStringProperty' ), [{"name":"altOrOptionKey"}] )
      },
      pullerNavigation: {
        selectPullerDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_pullerNavigation_selectPullerDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.pullerNavigation.selectPullerDescriptionStringProperty' ) ),
        grabPullerDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_pullerNavigation_grabPullerDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.pullerNavigation.grabPullerDescriptionStringProperty' ) ),
        moveGrabbedPullerDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_pullerNavigation_moveGrabbedPullerDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.pullerNavigation.moveGrabbedPullerDescriptionStringProperty' ) ),
        dropPullerDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_pullerNavigation_dropPullerDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.pullerNavigation.dropPullerDescriptionStringProperty' ) )
      }
    },
    netForceScreen: {
      colorName: new FluentPattern<{ color: 'blue' | 'red' | 'purple' | 'orange' | TReadOnlyProperty<'blue' | 'red' | 'purple' | 'orange'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_colorName', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.colorNameStringProperty' ), [{"name":"color","variants":["blue","red","purple","orange"]}] ),
      teamName: new FluentPattern<{ color: 'blue' | 'red' | 'purple' | 'orange' | TReadOnlyProperty<'blue' | 'red' | 'purple' | 'orange'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_teamName', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.teamNameStringProperty' ), [{"name":"color","variants":["blue","red","purple","orange"]}] ),
      screenSummary: {
        playArea: {
          description: new FluentPattern<{ leftColor: FluentVariable, leftTeamName: FluentVariable, rightColor: FluentVariable, rightTeamName: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_playArea_description', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.playArea.descriptionStringProperty' ), [{"name":"leftColor"},{"name":"leftTeamName"},{"name":"rightColor"},{"name":"rightTeamName"}] )
        },
        controlArea: {
          descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_controlArea_description', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.controlArea.descriptionStringProperty' ) )
        },
        currentDetails: {
          accessibleNameNotStartedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_currentDetails_accessibleNameNotStarted', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.currentDetails.accessibleNameNotStartedStringProperty' ) ),
          accessibleNameInProgressStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_currentDetails_accessibleNameInProgress', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.currentDetails.accessibleNameInProgressStringProperty' ) ),
          accessibleNameCompletedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_currentDetails_accessibleNameCompleted', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.currentDetails.accessibleNameCompletedStringProperty' ) ),
          noPullersAttachedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_currentDetails_noPullersAttached', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.currentDetails.noPullersAttachedStringProperty' ) ),
          teamAttached: new FluentPattern<{ color: 'blue' | 'red' | 'purple' | 'orange' | TReadOnlyProperty<'blue' | 'red' | 'purple' | 'orange'>, count: 0 | number | 'one' | number | 'other' | TReadOnlyProperty<0 | number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_currentDetails_teamAttached', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.currentDetails.teamAttachedStringProperty' ), [{"name":"color","variants":["blue","red","purple","orange"]},{"name":"count","variants":[0,{"type":"number","value":"one"},{"type":"number","value":"other"}]}] )
        },
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenSummary_interactionHint', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenSummary.interactionHintStringProperty' ) )
      },
      puller: {
        _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
        accessibleName: new FluentPattern<{ color: 'blue' | 'red' | 'purple' | 'orange' | TReadOnlyProperty<'blue' | 'red' | 'purple' | 'orange'>, index: FluentVariable, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_puller_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.puller.accessibleNameStringProperty' ), [{"name":"color","variants":["blue","red","purple","orange"]},{"name":"index"},{"name":"size","variants":["small","medium","large"]}] ),
        size: new FluentPattern<{ size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_puller_size', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.puller.sizeStringProperty' ), [{"name":"size","variants":["small","medium","large"]}] )
      },
      pullerResponses: {
        pullerAttachedToKnot: new FluentPattern<{ color: 'blue' | 'red' | 'purple' | 'orange' | TReadOnlyProperty<'blue' | 'red' | 'purple' | 'orange'>, index: FluentVariable, knotDescription: FluentVariable, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_pullerResponses_pullerAttachedToKnot', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.pullerResponses.pullerAttachedToKnotStringProperty' ), [{"name":"color","variants":["blue","red","purple","orange"]},{"name":"index"},{"name":"knotDescription"},{"name":"size","variants":["small","medium","large"]}] ),
        pullerReturnedToToolbox: new FluentPattern<{ color: 'blue' | 'red' | 'purple' | 'orange' | TReadOnlyProperty<'blue' | 'red' | 'purple' | 'orange'>, index: FluentVariable, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_pullerResponses_pullerReturnedToToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.pullerResponses.pullerReturnedToToolboxStringProperty' ), [{"name":"color","variants":["blue","red","purple","orange"]},{"name":"index"},{"name":"size","variants":["small","medium","large"]}] ),
        pullerInteractionCancelled: new FluentPattern<{ color: 'blue' | 'red' | 'purple' | 'orange' | TReadOnlyProperty<'blue' | 'red' | 'purple' | 'orange'>, index: FluentVariable, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_pullerResponses_pullerInteractionCancelled', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.pullerResponses.pullerInteractionCancelledStringProperty' ), [{"name":"color","variants":["blue","red","purple","orange"]},{"name":"index"},{"name":"size","variants":["small","medium","large"]}] )
      },
      returnButton: {
        cartReturnedToCenterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_returnButton_cartReturnedToCenter', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.returnButton.cartReturnedToCenterStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_returnButton_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.returnButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_returnButton_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.returnButton.accessibleHelpTextStringProperty' ) )
      },
      goPauseButton: {
        accessibleHelpTextGoStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_goPauseButton_accessibleHelpTextGo', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.goPauseButton.accessibleHelpTextGoStringProperty' ) ),
        accessibleHelpTextPauseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_goPauseButton_accessibleHelpTextPause', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.goPauseButton.accessibleHelpTextPauseStringProperty' ) ),
        cartMovingLeftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_goPauseButton_cartMovingLeft', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.goPauseButton.cartMovingLeftStringProperty' ) ),
        cartMovingRightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_goPauseButton_cartMovingRight', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.goPauseButton.cartMovingRightStringProperty' ) ),
        cartStationaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_goPauseButton_cartStationary', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.goPauseButton.cartStationaryStringProperty' ) ),
        cartPausedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_goPauseButton_cartPaused', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.goPauseButton.cartPausedStringProperty' ) )
      },
      netForceControlPanel: {
        sumOfForces: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty' ) )
        },
        values: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_values_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.values.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_values_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.values.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_values_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.values.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_values_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.values.accessibleContextResponseUncheckedStringProperty' ) )
        },
        speed: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_speed_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.speed.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_speed_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.speed.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_speed_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.speed.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_speed_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.speed.accessibleContextResponseUncheckedStringProperty' ) )
        }
      },
      playAreaControls: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_playAreaControls_accessibleHeading', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.playAreaControls.accessibleHeadingStringProperty' ) )
      }
    },
    motionScreen: {
      screenSummary: {
        playArea: {
          descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_description', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.descriptionStringProperty' ) ),
          frictionDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_frictionDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.frictionDescriptionStringProperty' ) ),
          accelerationDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_accelerationDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.accelerationDescriptionStringProperty' ) ),
          objectToolbox: {
            descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_objectToolbox_description', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.objectToolbox.descriptionStringProperty' ) )
          },
          appliedForceControl: {
            descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_appliedForceControl_description', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.appliedForceControl.descriptionStringProperty' ) )
          }
        },
        controlArea: {
          descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_controlArea_description', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.controlArea.descriptionStringProperty' ) )
        },
        currentDetails: {
          noObjectsOnSkateboardStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_noObjectsOnSkateboard', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.noObjectsOnSkateboardStringProperty' ) ),
          noObjectsOnGroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_noObjectsOnGround', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.noObjectsOnGroundStringProperty' ) ),
          objectsOnSkateboard: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_objectsOnSkateboard', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.objectsOnSkateboardStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
          objectsOnGround: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_objectsOnGround', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.objectsOnGroundStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
          motionState: {
            stationaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_motionState_stationary', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.motionState.stationaryStringProperty' ) ),
            movingRightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_motionState_movingRight', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.motionState.movingRightStringProperty' ) ),
            movingLeftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_motionState_movingLeft', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.motionState.movingLeftStringProperty' ) )
          },
          forceDescription: {
            noForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_forceDescription_noForce', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.forceDescription.noForceStringProperty' ) ),
            appliedForceRightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_forceDescription_appliedForceRight', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceRightStringProperty' ) ),
            appliedForceLeftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_forceDescription_appliedForceLeft', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceLeftStringProperty' ) )
          }
        },
        interactionHint: {
          noObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_interactionHint_noObjects', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.interactionHint.noObjectsStringProperty' ) ),
          noObjectsOnGroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_interactionHint_noObjectsOnGround', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.interactionHint.noObjectsOnGroundStringProperty' ) ),
          withObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_interactionHint_withObjects', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.interactionHint.withObjectsStringProperty' ) )
        }
      },
      items: {
        itemAccessibleNameWithMass: new FluentPattern<{ itemName: FluentVariable, mass: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_motionScreen_items_itemAccessibleNameWithMass', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.itemAccessibleNameWithMassStringProperty' ), [{"name":"itemName"},{"name":"mass"}] ),
        massUnknownStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_massUnknown', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.massUnknownStringProperty' ) ),
        names: {
          fridgeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_names_fridge', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.names.fridgeStringProperty' ) ),
          crate1StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_names_crate1', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.names.crate1StringProperty' ) ),
          crate2StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_names_crate2', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.names.crate2StringProperty' ) ),
          girlStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_names_girl', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.names.girlStringProperty' ) ),
          manStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_names_man', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.names.manStringProperty' ) ),
          trashStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_names_trash', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.names.trashStringProperty' ) ),
          mysteryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_items_names_mystery', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.items.names.mysteryStringProperty' ) )
        }
      },
      itemToolbox: {
        _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_itemToolbox_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.itemToolbox.accessibleNameStringProperty' ) ),
        descriptionContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_itemToolbox_descriptionContent', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.itemToolbox.descriptionContentStringProperty' ) )
      },
      itemStackGroup: {
        _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_itemStackGroup_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.itemStackGroup.accessibleNameStringProperty' ) ),
        descriptionContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_itemStackGroup_descriptionContent', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.itemStackGroup.descriptionContentStringProperty' ) )
      },
      motionControlPanel: {
        force: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_force_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.force.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_force_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.force.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_force_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.force.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_force_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.force.accessibleContextResponseUncheckedStringProperty' ) )
        },
        values: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_values_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.values.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_values_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.values.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_values_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.values.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_values_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.values.accessibleContextResponseUncheckedStringProperty' ) )
        },
        masses: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_masses_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.masses.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_masses_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.masses.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_masses_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.masses.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_masses_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.masses.accessibleContextResponseUncheckedStringProperty' ) )
        },
        speed: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_speed_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.speed.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_speed_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.speed.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_speed_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.speed.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_speed_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.speed.accessibleContextResponseUncheckedStringProperty' ) )
        },
        stopwatch: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_stopwatch_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.stopwatch.accessibleContextResponseUncheckedStringProperty' ) )
        },
        forces: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forces_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forces.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forces_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forces.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forces_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forces.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forces_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forces.accessibleContextResponseUncheckedStringProperty' ) )
        },
        sumOfForces: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_sumOfForces_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty' ) )
        },
        acceleration: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_acceleration_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.acceleration.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_acceleration_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.acceleration.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_acceleration_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.acceleration.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_acceleration_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.acceleration.accessibleContextResponseUncheckedStringProperty' ) )
        }
      },
      playAreaControls: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_playAreaControls_accessibleHeading', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.playAreaControls.accessibleHeadingStringProperty' ) )
      }
    },
    objectToolboxes: {
      leftObjectToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_objectToolboxes_leftObjectToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.objectToolboxes.leftObjectToolboxStringProperty' ) ),
      rightObjectToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_objectToolboxes_rightObjectToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.objectToolboxes.rightObjectToolboxStringProperty' ) ),
      objectToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_objectToolboxes_objectToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.objectToolboxes.objectToolboxStringProperty' ) ),
      skateboardStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_objectToolboxes_skateboard', _.get( ForcesAndMotionBasicsStrings, 'a11y.objectToolboxes.skateboardStringProperty' ) )
    },
    pullers: {
      pullerInstructionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pullers_pullerInstruction', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.pullerInstructionStringProperty' ) ),
      overReturnToToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pullers_overReturnToToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.overReturnToToolboxStringProperty' ) ),
      overKnotDescription: new FluentPattern<{ number: FluentVariable, side: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_pullers_overKnotDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.overKnotDescriptionStringProperty' ), [{"name":"number"},{"name":"side"}] ),
      knotDescription: new FluentPattern<{ number: FluentVariable, side: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_pullers_knotDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.knotDescriptionStringProperty' ), [{"name":"number"},{"name":"side"}] ),
      leftSideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pullers_leftSide', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.leftSideStringProperty' ) ),
      rightSideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pullers_rightSide', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.rightSideStringProperty' ) )
    },
    tugOfWar: {
      headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tugOfWar_heading', _.get( ForcesAndMotionBasicsStrings, 'a11y.tugOfWar.headingStringProperty' ) ),
      noPullersOnRopeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tugOfWar_noPullersOnRope', _.get( ForcesAndMotionBasicsStrings, 'a11y.tugOfWar.noPullersOnRopeStringProperty' ) ),
      knotOccupied: new FluentPattern<{ number: FluentVariable, pullerName: FluentVariable, side: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tugOfWar_knotOccupied', _.get( ForcesAndMotionBasicsStrings, 'a11y.tugOfWar.knotOccupiedStringProperty' ), [{"name":"number"},{"name":"pullerName"},{"name":"side"}] )
    },
    forces: {
      headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_heading', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.headingStringProperty' ) ),
      leftForceArrow: new FluentPattern<{ description: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_leftForceArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.leftForceArrowStringProperty' ), [{"name":"description"}] ),
      rightForceArrow: new FluentPattern<{ description: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_rightForceArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.rightForceArrowStringProperty' ), [{"name":"description"}] ),
      sumOfForcesArrow: new FluentPattern<{ description: FluentVariable, direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_sumOfForcesArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.sumOfForcesArrowStringProperty' ), [{"name":"description"},{"name":"direction"}] ),
      sumOfForcesZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_sumOfForcesZero', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.sumOfForcesZeroStringProperty' ) ),
      quantitativeDescription: new FluentPattern<{ forceMagnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_quantitativeDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.quantitativeDescriptionStringProperty' ), [{"name":"forceMagnitude"}] ),
      qualitativeDescriptions: {
        smallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_small', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.smallStringProperty' ) ),
        mediumStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_medium', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.mediumStringProperty' ) ),
        mediumSmallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_mediumSmall', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.mediumSmallStringProperty' ) ),
        mediumLargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_mediumLarge', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.mediumLargeStringProperty' ) ),
        largeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_large', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.largeStringProperty' ) ),
        veryLargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_veryLarge', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.veryLargeStringProperty' ) ),
        extremelyLargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_extremelyLarge', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.extremelyLargeStringProperty' ) ),
        leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_left', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.leftStringProperty' ) ),
        rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_right', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.rightStringProperty' ) )
      }
    },
    speed: {
      headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_heading', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.headingStringProperty' ) ),
      cartSpeed: new FluentPattern<{ speedDescription: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_speed_cartSpeed', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.cartSpeedStringProperty' ), [{"name":"speedDescription"}] ),
      cartSpeedWithAcceleration: new FluentPattern<{ accelerationDescription: FluentVariable, speedDescription: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_speed_cartSpeedWithAcceleration', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.cartSpeedWithAccelerationStringProperty' ), [{"name":"accelerationDescription"},{"name":"speedDescription"}] ),
      qualitativeDescriptions: {
        stationaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_stationary', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.stationaryStringProperty' ) ),
        verySlowStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_verySlow', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.verySlowStringProperty' ) ),
        slowStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_slow', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.slowStringProperty' ) ),
        mediumStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_medium', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.mediumStringProperty' ) ),
        fastStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_fast', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.fastStringProperty' ) )
      },
      accelerationDescriptions: {
        speedingUpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_accelerationDescriptions_speedingUp', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.accelerationDescriptions.speedingUpStringProperty' ) ),
        slowingDownStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_accelerationDescriptions_slowingDown', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.accelerationDescriptions.slowingDownStringProperty' ) )
      }
    }
  }
};

export default ForcesAndMotionBasicsFluent;

forcesAndMotionBasics.register('ForcesAndMotionBasicsFluent', ForcesAndMotionBasicsFluent);
