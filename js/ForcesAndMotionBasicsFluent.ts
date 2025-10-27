// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from forces-and-motion-basics-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import { TReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
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
addToMapIfDefined( 'keyboardHelpDialog_fromAnywhereInScreen', 'keyboardHelpDialog.fromAnywhereInScreenStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_startGame', 'keyboardHelpDialog.startGameStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_pauseGame', 'keyboardHelpDialog.pauseGameStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_returnCartToCenter', 'keyboardHelpDialog.returnCartToCenterStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_pullerNavigation', 'keyboardHelpDialog.pullerNavigationStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_selectPuller', 'keyboardHelpDialog.selectPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_grabPuller', 'keyboardHelpDialog.grabPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveGrabbedPuller', 'keyboardHelpDialog.moveGrabbedPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_dropPuller', 'keyboardHelpDialog.dropPullerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_objectNavigation', 'keyboardHelpDialog.objectNavigationStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_selectObject', 'keyboardHelpDialog.selectObjectStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_grabObject', 'keyboardHelpDialog.grabObjectStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveGrabbedObject', 'keyboardHelpDialog.moveGrabbedObjectStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_dropObject', 'keyboardHelpDialog.dropObjectStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_adjustAppliedForce', 'keyboardHelpDialog.adjustAppliedForceStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_zeroAppliedForce', 'keyboardHelpDialog.zeroAppliedForceStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_returnToToolbox', 'keyboardHelpDialog.returnToToolboxStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_cancelMovement', 'keyboardHelpDialog.cancelMovementStringProperty' );
addToMapIfDefined( 'a11y_navigable', 'a11y.navigableStringProperty' );
addToMapIfDefined( 'a11y_sortable', 'a11y.sortableStringProperty' );
addToMapIfDefined( 'a11y_valuesCheckbox_checkedResponse', 'a11y.valuesCheckbox.checkedResponseStringProperty' );
addToMapIfDefined( 'a11y_valuesCheckbox_uncheckedResponse', 'a11y.valuesCheckbox.uncheckedResponseStringProperty' );
addToMapIfDefined( 'a11y_valuesCheckbox_accessibleHelpTextForce', 'a11y.valuesCheckbox.accessibleHelpTextForceStringProperty' );
addToMapIfDefined( 'a11y_valuesCheckbox_accessibleHelpTextForceSpeed', 'a11y.valuesCheckbox.accessibleHelpTextForceSpeedStringProperty' );
addToMapIfDefined( 'a11y_valuesCheckbox_accessibleHelpTextForceSpeedAcceleration', 'a11y.valuesCheckbox.accessibleHelpTextForceSpeedAccelerationStringProperty' );
addToMapIfDefined( 'a11y_speedCheckbox_accessibleHelpText', 'a11y.speedCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_speedCheckbox_accessibleContextResponseUnchecked', 'a11y.speedCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_preferences_netForcePullerColorControl_accessibleHelpText', 'a11y.preferences.netForcePullerColorControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_fromAnywhereInSim_startGameDescription', 'a11y.keyboardHelpDialog.fromAnywhereInSim.startGameDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_fromAnywhereInSim_pauseGameDescription', 'a11y.keyboardHelpDialog.fromAnywhereInSim.pauseGameDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_fromAnywhereInSim_returnCartToCenterDescription', 'a11y.keyboardHelpDialog.fromAnywhereInSim.returnCartToCenterDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_selectPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.selectPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_grabPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.grabPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_moveGrabbedPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.moveGrabbedPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_dropPullerDescription', 'a11y.keyboardHelpDialog.pullerNavigation.dropPullerDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_returnToToolboxDescription', 'a11y.keyboardHelpDialog.pullerNavigation.returnToToolboxDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_pullerNavigation_cancelMovement', 'a11y.keyboardHelpDialog.pullerNavigation.cancelMovementStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_objectNavigation_selectObjectDescription', 'a11y.keyboardHelpDialog.objectNavigation.selectObjectDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_objectNavigation_grabObjectDescription', 'a11y.keyboardHelpDialog.objectNavigation.grabObjectDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_objectNavigation_moveGrabbedObjectDescription', 'a11y.keyboardHelpDialog.objectNavigation.moveGrabbedObjectDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_objectNavigation_dropObjectDescription', 'a11y.keyboardHelpDialog.objectNavigation.dropObjectDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_objectNavigation_returnToToolboxDescription', 'a11y.keyboardHelpDialog.objectNavigation.returnToToolboxDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_objectNavigation_cancelMovement', 'a11y.keyboardHelpDialog.objectNavigation.cancelMovementStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_adjustAppliedForce_zeroAppliedForceDescription', 'a11y.keyboardHelpDialog.adjustAppliedForce.zeroAppliedForceDescriptionStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_screenButtonsHelpText', 'a11y.netForceScreen.screenButtonsHelpTextStringProperty' );
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
addToMapIfDefined( 'a11y_netForceScreen_puller_accessibleRoleDescription', 'a11y.netForceScreen.puller.accessibleRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_puller_size', 'a11y.netForceScreen.puller.sizeStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_pullerGroup_accessibleRoleDescription', 'a11y.netForceScreen.pullerGroup.accessibleRoleDescriptionStringProperty' );
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
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleHelpText', 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleContextResponseUnchecked', 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_netForceScreen_playAreaControls_accessibleHeading', 'a11y.netForceScreen.playAreaControls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionScreenButtonsHelpText', 'a11y.motionScreen.motionScreenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_frictionScreenButtonsHelpText', 'a11y.motionScreen.frictionScreenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_accelerationScreenButtonsHelpText', 'a11y.motionScreen.accelerationScreenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_motionDescription', 'a11y.motionScreen.screenSummary.playArea.motionDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_frictionDescription', 'a11y.motionScreen.screenSummary.playArea.frictionDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_playArea_accelerationDescription', 'a11y.motionScreen.screenSummary.playArea.accelerationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_controlArea_motionDescription', 'a11y.motionScreen.screenSummary.controlArea.motionDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_controlArea_frictionDescription', 'a11y.motionScreen.screenSummary.controlArea.frictionDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_controlArea_accelerationDescription', 'a11y.motionScreen.screenSummary.controlArea.accelerationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_currentDetails_summary', 'a11y.motionScreen.screenSummary.currentDetails.summaryStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_screenSummary_interactionHint', 'a11y.motionScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_pauseButton_accessibleHelpText', 'a11y.motionScreen.pauseButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackMovement_stackMovingLeft', 'a11y.motionScreen.stackMovement.stackMovingLeftStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackMovement_stackMovingRight', 'a11y.motionScreen.stackMovement.stackMovingRightStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackMovement_stackStationary', 'a11y.motionScreen.stackMovement.stackStationaryStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackState_stationary', 'a11y.motionScreen.stackState.stationaryStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackState_movingRight', 'a11y.motionScreen.stackState.movingRightStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackState_movingLeft', 'a11y.motionScreen.stackState.movingLeftStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_objectAccessibleNameWithMass', 'a11y.motionScreen.objects.objectAccessibleNameWithMassStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_massUnknown', 'a11y.motionScreen.objects.massUnknownStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_fridge', 'a11y.motionScreen.objects.names.fridgeStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_crate1', 'a11y.motionScreen.objects.names.crate1StringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_crate2', 'a11y.motionScreen.objects.names.crate2StringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_girl', 'a11y.motionScreen.objects.names.girlStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_man', 'a11y.motionScreen.objects.names.manStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_trash', 'a11y.motionScreen.objects.names.trashStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_mystery', 'a11y.motionScreen.objects.names.mysteryStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objects_names_bucket', 'a11y.motionScreen.objects.names.bucketStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectToolbox_accessibleName', 'a11y.motionScreen.objectToolbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectToolbox_accessibleRoleDescription', 'a11y.motionScreen.objectToolbox.accessibleRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectToolbox_descriptionContent', 'a11y.motionScreen.objectToolbox.descriptionContentStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectStackGroup_onSkateboard_accessibleName', 'a11y.motionScreen.objectStackGroup.onSkateboard.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectStackGroup_onGround_accessibleName', 'a11y.motionScreen.objectStackGroup.onGround.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectStackGroup_accessibleRoleDescription', 'a11y.motionScreen.objectStackGroup.accessibleRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectStackGroup_descriptionContent', 'a11y.motionScreen.objectStackGroup.descriptionContentStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_overToolbox', 'a11y.motionScreen.objectResponses.overToolboxStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_overStack', 'a11y.motionScreen.objectResponses.overStackStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_overSkateboard', 'a11y.motionScreen.objectResponses.overSkateboardStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_overGround', 'a11y.motionScreen.objectResponses.overGroundStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_grabbed', 'a11y.motionScreen.objectResponses.grabbedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_droppedOnStack', 'a11y.motionScreen.objectResponses.droppedOnStackStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_droppedOnStackBottomObjectReturned', 'a11y.motionScreen.objectResponses.droppedOnStackBottomObjectReturnedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_droppedOnSkateboard', 'a11y.motionScreen.objectResponses.droppedOnSkateboardStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_droppedOnGround', 'a11y.motionScreen.objectResponses.droppedOnGroundStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_returnedToToolbox', 'a11y.motionScreen.objectResponses.returnedToToolboxStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_objectResponses_returnedToStack', 'a11y.motionScreen.objectResponses.returnedToStackStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_surface_skateboard', 'a11y.motionScreen.surface.skateboardStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_surface_ground', 'a11y.motionScreen.surface.groundStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackList_stackedOnSurface', 'a11y.motionScreen.stackList.stackedOnSurfaceStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_stackList_noObjectsOnSurface', 'a11y.motionScreen.stackList.noObjectsOnSurfaceStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_pusherResponses_fellDownAppliedForceZero', 'a11y.motionScreen.pusherResponses.fellDownAppliedForceZeroStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forceCheckbox_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forceCheckbox_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forceCheckbox_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_massesCheckbox_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_massesCheckbox_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_massesCheckbox_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_stopwatchCheckbox_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_stopwatchCheckbox_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_stopwatchCheckbox_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forcesCheckbox_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forcesCheckbox_accessibleContextResponseChecked', 'a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_forcesCheckbox_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_sumOfForcesCheckbox_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.sumOfForcesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_sumOfForcesCheckbox_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.sumOfForcesCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_accelerationCheckbox_accessibleHelpText', 'a11y.motionScreen.motionControlPanel.accelerationCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_motionControlPanel_accelerationCheckbox_accessibleContextResponseUnchecked', 'a11y.motionScreen.motionControlPanel.accelerationCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_playAreaControls_appliedForceControl_accessibleHeading', 'a11y.motionScreen.playAreaControls.appliedForceControl.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_playAreaControls_appliedForceControl_description', 'a11y.motionScreen.playAreaControls.appliedForceControl.descriptionStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_frictionSlider_accessibleHelpText', 'a11y.motionScreen.frictionSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_frictionSlider_contextResponse_smoother', 'a11y.motionScreen.frictionSlider.contextResponse.smootherStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_frictionSlider_contextResponse_rougher', 'a11y.motionScreen.frictionSlider.contextResponse.rougherStringProperty' );
addToMapIfDefined( 'a11y_motionScreen_frictionSlider_contextResponse_icy', 'a11y.motionScreen.frictionSlider.contextResponse.icyStringProperty' );
addToMapIfDefined( 'a11y_objectToolboxes_objectToolbox', 'a11y.objectToolboxes.objectToolboxStringProperty' );
addToMapIfDefined( 'a11y_objectToolboxes_skateboard', 'a11y.objectToolboxes.skateboardStringProperty' );
addToMapIfDefined( 'a11y_objectToolboxes_stack', 'a11y.objectToolboxes.stackStringProperty' );
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
addToMapIfDefined( 'a11y_forces_appliedForceArrow', 'a11y.forces.appliedForceArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_frictionForceArrow', 'a11y.forces.frictionForceArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_leftForceArrow', 'a11y.forces.leftForceArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_rightForceArrow', 'a11y.forces.rightForceArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_sumOfForcesArrow', 'a11y.forces.sumOfForcesArrowStringProperty' );
addToMapIfDefined( 'a11y_forces_sumOfForcesZero', 'a11y.forces.sumOfForcesZeroStringProperty' );
addToMapIfDefined( 'a11y_forces_quantitativeDescription', 'a11y.forces.quantitativeDescriptionStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_verySmall', 'a11y.forces.qualitativeDescriptions.verySmallStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_small', 'a11y.forces.qualitativeDescriptions.smallStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_medium', 'a11y.forces.qualitativeDescriptions.mediumStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_somewhatLarge', 'a11y.forces.qualitativeDescriptions.somewhatLargeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_large', 'a11y.forces.qualitativeDescriptions.largeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_veryLarge', 'a11y.forces.qualitativeDescriptions.veryLargeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_extremelyLarge', 'a11y.forces.qualitativeDescriptions.extremelyLargeStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_left', 'a11y.forces.qualitativeDescriptions.leftStringProperty' );
addToMapIfDefined( 'a11y_forces_qualitativeDescriptions_right', 'a11y.forces.qualitativeDescriptions.rightStringProperty' );
addToMapIfDefined( 'a11y_speed_heading', 'a11y.speed.headingStringProperty' );
addToMapIfDefined( 'a11y_speed_cartSpeed', 'a11y.speed.cartSpeedStringProperty' );
addToMapIfDefined( 'a11y_speed_cartSpeedWithAcceleration', 'a11y.speed.cartSpeedWithAccelerationStringProperty' );
addToMapIfDefined( 'a11y_speed_speedOnly', 'a11y.speed.speedOnlyStringProperty' );
addToMapIfDefined( 'a11y_speed_speedOnlyWithAcceleration', 'a11y.speed.speedOnlyWithAccelerationStringProperty' );
addToMapIfDefined( 'a11y_speed_speedWithValue', 'a11y.speed.speedWithValueStringProperty' );
addToMapIfDefined( 'a11y_speed_speedWithValueAndAcceleration', 'a11y.speed.speedWithValueAndAccelerationStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_stationary', 'a11y.speed.qualitativeDescriptions.stationaryStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_verySlow', 'a11y.speed.qualitativeDescriptions.verySlowStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_slow', 'a11y.speed.qualitativeDescriptions.slowStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_moderate', 'a11y.speed.qualitativeDescriptions.moderateStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_fast', 'a11y.speed.qualitativeDescriptions.fastStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_veryFast', 'a11y.speed.qualitativeDescriptions.veryFastStringProperty' );
addToMapIfDefined( 'a11y_speed_qualitativeDescriptions_extremelyFast', 'a11y.speed.qualitativeDescriptions.extremelyFastStringProperty' );
addToMapIfDefined( 'a11y_acceleration_heading', 'a11y.acceleration.headingStringProperty' );
addToMapIfDefined( 'a11y_acceleration_accelerationOnly', 'a11y.acceleration.accelerationOnlyStringProperty' );
addToMapIfDefined( 'a11y_acceleration_accelerationWithValue', 'a11y.acceleration.accelerationWithValueStringProperty' );
addToMapIfDefined( 'a11y_acceleration_accelerationWithDirection', 'a11y.acceleration.accelerationWithDirectionStringProperty' );
addToMapIfDefined( 'a11y_acceleration_accelerationWithDirectionAndValue', 'a11y.acceleration.accelerationWithDirectionAndValueStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_zero', 'a11y.acceleration.qualitativeDescriptions.zeroStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_verySmall', 'a11y.acceleration.qualitativeDescriptions.verySmallStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_small', 'a11y.acceleration.qualitativeDescriptions.smallStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_moderate', 'a11y.acceleration.qualitativeDescriptions.moderateStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_large', 'a11y.acceleration.qualitativeDescriptions.largeStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_veryLarge', 'a11y.acceleration.qualitativeDescriptions.veryLargeStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_extremelyLarge', 'a11y.acceleration.qualitativeDescriptions.extremelyLargeStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_left', 'a11y.acceleration.qualitativeDescriptions.leftStringProperty' );
addToMapIfDefined( 'a11y_acceleration_qualitativeDescriptions_right', 'a11y.acceleration.qualitativeDescriptions.rightStringProperty' );
addToMapIfDefined( 'a11y_acceleration_accelerationDescriptions_speedingUp', 'a11y.acceleration.accelerationDescriptions.speedingUpStringProperty' );
addToMapIfDefined( 'a11y_acceleration_accelerationDescriptions_slowingDown', 'a11y.acceleration.accelerationDescriptions.slowingDownStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value.replace('\n','\n ')}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const ForcesAndMotionBasicsFluent = {
  noneStringProperty: _.get( ForcesAndMotionBasicsStrings, 'noneStringProperty' ),
  forceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'forceStringProperty' ),
  valuesStringProperty: _.get( ForcesAndMotionBasicsStrings, 'valuesStringProperty' ),
  redWinsStringProperty: _.get( ForcesAndMotionBasicsStrings, 'redWinsStringProperty' ),
  frictionForceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'frictionForceStringProperty' ),
  pauseStringProperty: _.get( ForcesAndMotionBasicsStrings, 'pauseStringProperty' ),
  frictionStringProperty: _.get( ForcesAndMotionBasicsStrings, 'frictionStringProperty' ),
  "forces-and-motion-basics": {
    titleStringProperty: _.get( ForcesAndMotionBasicsStrings, 'forces-and-motion-basics.titleStringProperty' )
  },
  leftForceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'leftForceStringProperty' ),
  appliedForceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'appliedForceStringProperty' ),
  rightForceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'rightForceStringProperty' ),
  pattern: {
    "0massUnitsKilogramsStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0massUnitsKilogramsStringProperty' ),
    "0valueUnitsNewtonsStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0valueUnitsNewtonsStringProperty' ),
    "0name": {
      "1valueUnitsAccelerationStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0name.1valueUnitsAccelerationStringProperty' ),
      "1valueUnitsVelocityStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0name.1valueUnitsVelocityStringProperty' )
    },
    "0valueUnitsNStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0valueUnitsNStringProperty' )
  },
  accelerationStringProperty: _.get( ForcesAndMotionBasicsStrings, 'accelerationStringProperty' ),
  lotsStringProperty: _.get( ForcesAndMotionBasicsStrings, 'lotsStringProperty' ),
  forcesStringProperty: _.get( ForcesAndMotionBasicsStrings, 'forcesStringProperty' ),
  netForceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'netForceStringProperty' ),
  motionStringProperty: _.get( ForcesAndMotionBasicsStrings, 'motionStringProperty' ),
  goStringProperty: _.get( ForcesAndMotionBasicsStrings, 'goStringProperty' ),
  sumOfForcesEqualsZeroStringProperty: _.get( ForcesAndMotionBasicsStrings, 'sumOfForcesEqualsZeroStringProperty' ),
  blueWinsStringProperty: _.get( ForcesAndMotionBasicsStrings, 'blueWinsStringProperty' ),
  sumOfForcesStringProperty: _.get( ForcesAndMotionBasicsStrings, 'sumOfForcesStringProperty' ),
  speedStringProperty: _.get( ForcesAndMotionBasicsStrings, 'speedStringProperty' ),
  stopwatchStringProperty: _.get( ForcesAndMotionBasicsStrings, 'stopwatchStringProperty' ),
  returnStringProperty: _.get( ForcesAndMotionBasicsStrings, 'returnStringProperty' ),
  massesStringProperty: _.get( ForcesAndMotionBasicsStrings, 'massesStringProperty' ),
  unknownValueIndicatorStringProperty: _.get( ForcesAndMotionBasicsStrings, 'unknownValueIndicatorStringProperty' ),
  netForcePullerColorsStringProperty: _.get( ForcesAndMotionBasicsStrings, 'netForcePullerColorsStringProperty' ),
  blueAndRedStringProperty: _.get( ForcesAndMotionBasicsStrings, 'blueAndRedStringProperty' ),
  purpleAndOrangeStringProperty: _.get( ForcesAndMotionBasicsStrings, 'purpleAndOrangeStringProperty' ),
  purpleWinsStringProperty: _.get( ForcesAndMotionBasicsStrings, 'purpleWinsStringProperty' ),
  orangeWinsStringProperty: _.get( ForcesAndMotionBasicsStrings, 'orangeWinsStringProperty' ),
  _comment_0: new FluentComment( {"comment":"keyboard help dialog strings","associatedKey":"keyboardHelpDialog"} ),
  keyboardHelpDialog: {
    fromAnywhereInScreenStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.fromAnywhereInScreenStringProperty' ),
    startGameStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.startGameStringProperty' ),
    pauseGameStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.pauseGameStringProperty' ),
    returnCartToCenterStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.returnCartToCenterStringProperty' ),
    pullerNavigationStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.pullerNavigationStringProperty' ),
    selectPullerStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.selectPullerStringProperty' ),
    grabPullerStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.grabPullerStringProperty' ),
    moveGrabbedPullerStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.moveGrabbedPullerStringProperty' ),
    dropPullerStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.dropPullerStringProperty' ),
    objectNavigationStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.objectNavigationStringProperty' ),
    selectObjectStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.selectObjectStringProperty' ),
    grabObjectStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.grabObjectStringProperty' ),
    moveGrabbedObjectStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.moveGrabbedObjectStringProperty' ),
    dropObjectStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.dropObjectStringProperty' ),
    adjustAppliedForceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.adjustAppliedForceStringProperty' ),
    zeroAppliedForceStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.zeroAppliedForceStringProperty' ),
    returnToToolboxStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.returnToToolboxStringProperty' ),
    cancelMovementStringProperty: _.get( ForcesAndMotionBasicsStrings, 'keyboardHelpDialog.cancelMovementStringProperty' )
  },
  _comment_1: new FluentComment( {"comment":"accessibility strings","associatedKey":"a11y"} ),
  a11y: {
    navigableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_navigable', _.get( ForcesAndMotionBasicsStrings, 'a11y.navigableStringProperty' ) ),
    sortableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sortable', _.get( ForcesAndMotionBasicsStrings, 'a11y.sortableStringProperty' ) ),
    valuesCheckbox: {
      checkedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_valuesCheckbox_checkedResponse', _.get( ForcesAndMotionBasicsStrings, 'a11y.valuesCheckbox.checkedResponseStringProperty' ) ),
      uncheckedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_valuesCheckbox_uncheckedResponse', _.get( ForcesAndMotionBasicsStrings, 'a11y.valuesCheckbox.uncheckedResponseStringProperty' ) ),
      accessibleHelpTextForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_valuesCheckbox_accessibleHelpTextForce', _.get( ForcesAndMotionBasicsStrings, 'a11y.valuesCheckbox.accessibleHelpTextForceStringProperty' ) ),
      accessibleHelpTextForceSpeedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_valuesCheckbox_accessibleHelpTextForceSpeed', _.get( ForcesAndMotionBasicsStrings, 'a11y.valuesCheckbox.accessibleHelpTextForceSpeedStringProperty' ) ),
      accessibleHelpTextForceSpeedAccelerationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_valuesCheckbox_accessibleHelpTextForceSpeedAcceleration', _.get( ForcesAndMotionBasicsStrings, 'a11y.valuesCheckbox.accessibleHelpTextForceSpeedAccelerationStringProperty' ) )
    },
    speedCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speedCheckbox_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.speedCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speedCheckbox_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.speedCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    preferences: {
      netForcePullerColorControl: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_netForcePullerColorControl_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.preferences.netForcePullerColorControl.accessibleHelpTextStringProperty' ) )
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
        dropPullerDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_pullerNavigation_dropPullerDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.pullerNavigation.dropPullerDescriptionStringProperty' ) ),
        returnToToolboxDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_pullerNavigation_returnToToolboxDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.pullerNavigation.returnToToolboxDescriptionStringProperty' ) ),
        cancelMovementStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_pullerNavigation_cancelMovement', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.pullerNavigation.cancelMovementStringProperty' ) )
      },
      objectNavigation: {
        selectObjectDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_objectNavigation_selectObjectDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.objectNavigation.selectObjectDescriptionStringProperty' ) ),
        grabObjectDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_objectNavigation_grabObjectDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.objectNavigation.grabObjectDescriptionStringProperty' ) ),
        moveGrabbedObjectDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_objectNavigation_moveGrabbedObjectDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.objectNavigation.moveGrabbedObjectDescriptionStringProperty' ) ),
        dropObjectDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_objectNavigation_dropObjectDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.objectNavigation.dropObjectDescriptionStringProperty' ) ),
        returnToToolboxDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_objectNavigation_returnToToolboxDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.objectNavigation.returnToToolboxDescriptionStringProperty' ) ),
        cancelMovementStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_objectNavigation_cancelMovement', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.objectNavigation.cancelMovementStringProperty' ) )
      },
      adjustAppliedForce: {
        zeroAppliedForceDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_adjustAppliedForce_zeroAppliedForceDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.keyboardHelpDialog.adjustAppliedForce.zeroAppliedForceDescriptionStringProperty' ) )
      }
    },
    netForceScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_screenButtonsHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.screenButtonsHelpTextStringProperty' ) ),
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
        accessibleRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_puller_accessibleRoleDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.puller.accessibleRoleDescriptionStringProperty' ) ),
        size: new FluentPattern<{ size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_netForceScreen_puller_size', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.puller.sizeStringProperty' ), [{"name":"size","variants":["small","medium","large"]}] )
      },
      pullerGroup: {
        accessibleRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_pullerGroup_accessibleRoleDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.pullerGroup.accessibleRoleDescriptionStringProperty' ) )
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
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_netForceControlPanel_sumOfForces_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty' ) )
        }
      },
      playAreaControls: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netForceScreen_playAreaControls_accessibleHeading', _.get( ForcesAndMotionBasicsStrings, 'a11y.netForceScreen.playAreaControls.accessibleHeadingStringProperty' ) )
      }
    },
    motionScreen: {
      motionScreenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionScreenButtonsHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionScreenButtonsHelpTextStringProperty' ) ),
      frictionScreenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_frictionScreenButtonsHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.frictionScreenButtonsHelpTextStringProperty' ) ),
      accelerationScreenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_accelerationScreenButtonsHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.accelerationScreenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playArea: {
          motionDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_motionDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.motionDescriptionStringProperty' ) ),
          frictionDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_frictionDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.frictionDescriptionStringProperty' ) ),
          accelerationDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_playArea_accelerationDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.playArea.accelerationDescriptionStringProperty' ) )
        },
        controlArea: {
          motionDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_controlArea_motionDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.controlArea.motionDescriptionStringProperty' ) ),
          frictionDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_controlArea_frictionDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.controlArea.frictionDescriptionStringProperty' ) ),
          accelerationDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_controlArea_accelerationDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.controlArea.accelerationDescriptionStringProperty' ) )
        },
        currentDetails: {
          summary: new FluentPattern<{ count: 0 | 1 | number | 'other' | TReadOnlyProperty<0 | 1 | number | 'other'>, motionState: FluentVariable, surface: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_currentDetails_summary', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.currentDetails.summaryStringProperty' ), [{"name":"count","variants":[0,1,{"type":"number","value":"other"}]},{"name":"motionState"},{"name":"surface"}] )
        },
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_screenSummary_interactionHint', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.screenSummary.interactionHintStringProperty' ) )
      },
      pauseButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_pauseButton_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.pauseButton.accessibleHelpTextStringProperty' ) )
      },
      stackMovement: {
        stackMovingLeftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_stackMovement_stackMovingLeft', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackMovement.stackMovingLeftStringProperty' ) ),
        stackMovingRightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_stackMovement_stackMovingRight', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackMovement.stackMovingRightStringProperty' ) ),
        stackStationaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_stackMovement_stackStationary', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackMovement.stackStationaryStringProperty' ) )
      },
      stackState: {
        stationaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_stackState_stationary', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackState.stationaryStringProperty' ) ),
        movingRightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_stackState_movingRight', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackState.movingRightStringProperty' ) ),
        movingLeftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_stackState_movingLeft', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackState.movingLeftStringProperty' ) )
      },
      objects: {
        objectAccessibleNameWithMass: new FluentPattern<{ mass: FluentVariable, objectName: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_objectAccessibleNameWithMass', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.objectAccessibleNameWithMassStringProperty' ), [{"name":"mass"},{"name":"objectName"}] ),
        massUnknownStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_massUnknown', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.massUnknownStringProperty' ) ),
        names: {
          fridgeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_fridge', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.fridgeStringProperty' ) ),
          crate1StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_crate1', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.crate1StringProperty' ) ),
          crate2StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_crate2', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.crate2StringProperty' ) ),
          girlStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_girl', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.girlStringProperty' ) ),
          manStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_man', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.manStringProperty' ) ),
          trashStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_trash', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.trashStringProperty' ) ),
          mysteryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_mystery', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.mysteryStringProperty' ) ),
          bucketStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objects_names_bucket', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objects.names.bucketStringProperty' ) )
        }
      },
      objectToolbox: {
        _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectToolbox_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectToolbox.accessibleNameStringProperty' ) ),
        accessibleRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectToolbox_accessibleRoleDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectToolbox.accessibleRoleDescriptionStringProperty' ) ),
        descriptionContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectToolbox_descriptionContent', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectToolbox.descriptionContentStringProperty' ) )
      },
      objectStackGroup: {
        onSkateboard: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectStackGroup_onSkateboard_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectStackGroup.onSkateboard.accessibleNameStringProperty' ) )
        },
        onGround: {
          _comment_0: new FluentComment( {"comment":"Note that index may be the empty string. This string will always be trimmed() removing whitespace.","associatedKey":"accessibleName"} ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectStackGroup_onGround_accessibleName', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectStackGroup.onGround.accessibleNameStringProperty' ) )
        },
        accessibleRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectStackGroup_accessibleRoleDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectStackGroup.accessibleRoleDescriptionStringProperty' ) ),
        descriptionContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectStackGroup_descriptionContent', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectStackGroup.descriptionContentStringProperty' ) )
      },
      objectResponses: {
        overToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_overToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.overToolboxStringProperty' ) ),
        overStackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_overStack', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.overStackStringProperty' ) ),
        overSkateboardStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_overSkateboard', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.overSkateboardStringProperty' ) ),
        overGroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_overGround', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.overGroundStringProperty' ) ),
        grabbedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_grabbed', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.grabbedStringProperty' ) ),
        droppedOnStackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_droppedOnStack', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.droppedOnStackStringProperty' ) ),
        droppedOnStackBottomObjectReturnedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_droppedOnStackBottomObjectReturned', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.droppedOnStackBottomObjectReturnedStringProperty' ) ),
        droppedOnSkateboardStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_droppedOnSkateboard', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.droppedOnSkateboardStringProperty' ) ),
        droppedOnGroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_droppedOnGround', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.droppedOnGroundStringProperty' ) ),
        returnedToToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_returnedToToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.returnedToToolboxStringProperty' ) ),
        returnedToStackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_objectResponses_returnedToStack', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.objectResponses.returnedToStackStringProperty' ) )
      },
      surface: {
        skateboardStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_surface_skateboard', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.surface.skateboardStringProperty' ) ),
        groundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_surface_ground', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.surface.groundStringProperty' ) )
      },
      stackList: {
        stackedOnSurface: new FluentPattern<{ surface: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_motionScreen_stackList_stackedOnSurface', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackList.stackedOnSurfaceStringProperty' ), [{"name":"surface"}] ),
        noObjectsOnSurface: new FluentPattern<{ surface: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_motionScreen_stackList_noObjectsOnSurface', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.stackList.noObjectsOnSurfaceStringProperty' ), [{"name":"surface"}] )
      },
      pusherResponses: {
        fellDownAppliedForceZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_pusherResponses_fellDownAppliedForceZero', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.pusherResponses.fellDownAppliedForceZeroStringProperty' ) )
      },
      motionControlPanel: {
        forceCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forceCheckbox_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forceCheckbox_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forceCheckbox_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
        },
        massesCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_massesCheckbox_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_massesCheckbox_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_massesCheckbox_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
        },
        stopwatchCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_stopwatchCheckbox_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_stopwatchCheckbox_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_stopwatchCheckbox_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
        },
        forcesCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forcesCheckbox_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forcesCheckbox_accessibleContextResponseChecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_forcesCheckbox_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
        },
        sumOfForcesCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_sumOfForcesCheckbox_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.sumOfForcesCheckbox.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_sumOfForcesCheckbox_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.sumOfForcesCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
        },
        accelerationCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_accelerationCheckbox_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.accelerationCheckbox.accessibleHelpTextStringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_motionControlPanel_accelerationCheckbox_accessibleContextResponseUnchecked', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.motionControlPanel.accelerationCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
        }
      },
      playAreaControls: {
        appliedForceControl: {
          accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_playAreaControls_appliedForceControl_accessibleHeading', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.playAreaControls.appliedForceControl.accessibleHeadingStringProperty' ) ),
          descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_playAreaControls_appliedForceControl_description', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.playAreaControls.appliedForceControl.descriptionStringProperty' ) )
        }
      },
      frictionSlider: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_frictionSlider_accessibleHelpText', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.frictionSlider.accessibleHelpTextStringProperty' ) ),
        contextResponse: {
          smootherStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_frictionSlider_contextResponse_smoother', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.frictionSlider.contextResponse.smootherStringProperty' ) ),
          rougherStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_frictionSlider_contextResponse_rougher', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.frictionSlider.contextResponse.rougherStringProperty' ) ),
          icyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_motionScreen_frictionSlider_contextResponse_icy', _.get( ForcesAndMotionBasicsStrings, 'a11y.motionScreen.frictionSlider.contextResponse.icyStringProperty' ) )
        }
      }
    },
    objectToolboxes: {
      objectToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_objectToolboxes_objectToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.objectToolboxes.objectToolboxStringProperty' ) ),
      skateboardStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_objectToolboxes_skateboard', _.get( ForcesAndMotionBasicsStrings, 'a11y.objectToolboxes.skateboardStringProperty' ) ),
      stackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_objectToolboxes_stack', _.get( ForcesAndMotionBasicsStrings, 'a11y.objectToolboxes.stackStringProperty' ) )
    },
    pullers: {
      pullerInstructionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pullers_pullerInstruction', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.pullerInstructionStringProperty' ) ),
      overReturnToToolboxStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pullers_overReturnToToolbox', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.overReturnToToolboxStringProperty' ) ),
      overKnotDescription: new FluentPattern<{ number: 1 | 4 | number | 'other' | number | 'other' | TReadOnlyProperty<1 | 4 | number | 'other' | number | 'other'>, side: 'left' | 'right' | TReadOnlyProperty<'left' | 'right'> }>( fluentSupport.bundleProperty, 'a11y_pullers_overKnotDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.pullers.overKnotDescriptionStringProperty' ), [{"name":"number","variants":[1,4,{"type":"number","value":"other"},{"type":"number","value":"other"}]},{"name":"side","variants":["left","right"]}] ),
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
      appliedForceArrow: new FluentPattern<{ description: FluentVariable, direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_appliedForceArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.appliedForceArrowStringProperty' ), [{"name":"description"},{"name":"direction"}] ),
      frictionForceArrow: new FluentPattern<{ description: FluentVariable, direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_frictionForceArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.frictionForceArrowStringProperty' ), [{"name":"description"},{"name":"direction"}] ),
      leftForceArrow: new FluentPattern<{ description: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_leftForceArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.leftForceArrowStringProperty' ), [{"name":"description"}] ),
      rightForceArrow: new FluentPattern<{ description: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_rightForceArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.rightForceArrowStringProperty' ), [{"name":"description"}] ),
      sumOfForcesArrow: new FluentPattern<{ description: FluentVariable, direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_forces_sumOfForcesArrow', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.sumOfForcesArrowStringProperty' ), [{"name":"description"},{"name":"direction"}] ),
      sumOfForcesZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_sumOfForcesZero', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.sumOfForcesZeroStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Duplicated with the implementation in scenery-phet so it has the correct type signature (i.e., one numeric variable).","associatedKey":"quantitativeDescription"} ),
      quantitativeDescription: new FluentPattern<{ forceMagnitude: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_forces_quantitativeDescription', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.quantitativeDescriptionStringProperty' ), [{"name":"forceMagnitude","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
      qualitativeDescriptions: {
        verySmallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_verySmall', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.verySmallStringProperty' ) ),
        smallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_small', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.smallStringProperty' ) ),
        mediumStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_medium', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.mediumStringProperty' ) ),
        somewhatLargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_forces_qualitativeDescriptions_somewhatLarge', _.get( ForcesAndMotionBasicsStrings, 'a11y.forces.qualitativeDescriptions.somewhatLargeStringProperty' ) ),
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
      speedOnly: new FluentPattern<{ speedDescription: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_speed_speedOnly', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.speedOnlyStringProperty' ), [{"name":"speedDescription"}] ),
      speedOnlyWithAcceleration: new FluentPattern<{ accelerationDescription: FluentVariable, speedDescription: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_speed_speedOnlyWithAcceleration', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.speedOnlyWithAccelerationStringProperty' ), [{"name":"accelerationDescription"},{"name":"speedDescription"}] ),
      _comment_0: new FluentComment( {"comment":"Duplicated with the implementation in scenery-phet so it has the correct type signature (i.e., one numeric variable).","associatedKey":"speedWithValue"} ),
      speedWithValue: new FluentPattern<{ speedDescription: FluentVariable, speedMetersPerSecond: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_speed_speedWithValue', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.speedWithValueStringProperty' ), [{"name":"speedDescription"},{"name":"speedMetersPerSecond","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
      _comment_1: new FluentComment( {"comment":"Duplicated with the implementation in scenery-phet so it has the correct type signature (i.e., one numeric variable).","associatedKey":"speedWithValueAndAcceleration"} ),
      speedWithValueAndAcceleration: new FluentPattern<{ accelerationDescription: FluentVariable, speedDescription: FluentVariable, speedMetersPerSecond: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_speed_speedWithValueAndAcceleration', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.speedWithValueAndAccelerationStringProperty' ), [{"name":"accelerationDescription"},{"name":"speedDescription"},{"name":"speedMetersPerSecond","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
      qualitativeDescriptions: {
        stationaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_stationary', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.stationaryStringProperty' ) ),
        verySlowStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_verySlow', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.verySlowStringProperty' ) ),
        slowStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_slow', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.slowStringProperty' ) ),
        moderateStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_moderate', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.moderateStringProperty' ) ),
        fastStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_fast', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.fastStringProperty' ) ),
        veryFastStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_veryFast', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.veryFastStringProperty' ) ),
        extremelyFastStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speed_qualitativeDescriptions_extremelyFast', _.get( ForcesAndMotionBasicsStrings, 'a11y.speed.qualitativeDescriptions.extremelyFastStringProperty' ) )
      }
    },
    acceleration: {
      headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_heading', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.headingStringProperty' ) ),
      accelerationOnly: new FluentPattern<{ accelerationDescription: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_acceleration_accelerationOnly', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.accelerationOnlyStringProperty' ), [{"name":"accelerationDescription"}] ),
      _comment_0: new FluentComment( {"comment":"Duplicated with the implementation in scenery-phet so it has the correct type signature (i.e., one numeric variable).","associatedKey":"accelerationWithValue"} ),
      accelerationWithValue: new FluentPattern<{ accelerationDescription: FluentVariable, accelerationMetersPerSecondSquared: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_acceleration_accelerationWithValue', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.accelerationWithValueStringProperty' ), [{"name":"accelerationDescription"},{"name":"accelerationMetersPerSecondSquared","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
      accelerationWithDirection: new FluentPattern<{ accelerationDescription: FluentVariable, direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_acceleration_accelerationWithDirection', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.accelerationWithDirectionStringProperty' ), [{"name":"accelerationDescription"},{"name":"direction"}] ),
      _comment_1: new FluentComment( {"comment":"Duplicated with the implementation in scenery-phet so it has the correct type signature (i.e., one numeric variable).","associatedKey":"accelerationWithDirectionAndValue"} ),
      accelerationWithDirectionAndValue: new FluentPattern<{ accelerationDescription: FluentVariable, accelerationMetersPerSecondSquared: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_acceleration_accelerationWithDirectionAndValue', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.accelerationWithDirectionAndValueStringProperty' ), [{"name":"accelerationDescription"},{"name":"accelerationMetersPerSecondSquared","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"direction"}] ),
      qualitativeDescriptions: {
        zeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_zero', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.zeroStringProperty' ) ),
        verySmallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_verySmall', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.verySmallStringProperty' ) ),
        smallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_small', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.smallStringProperty' ) ),
        moderateStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_moderate', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.moderateStringProperty' ) ),
        largeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_large', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.largeStringProperty' ) ),
        veryLargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_veryLarge', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.veryLargeStringProperty' ) ),
        extremelyLargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_extremelyLarge', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.extremelyLargeStringProperty' ) ),
        leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_left', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.leftStringProperty' ) ),
        rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_qualitativeDescriptions_right', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.qualitativeDescriptions.rightStringProperty' ) )
      },
      accelerationDescriptions: {
        speedingUpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_accelerationDescriptions_speedingUp', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.accelerationDescriptions.speedingUpStringProperty' ) ),
        slowingDownStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_acceleration_accelerationDescriptions_slowingDown', _.get( ForcesAndMotionBasicsStrings, 'a11y.acceleration.accelerationDescriptions.slowingDownStringProperty' ) )
      }
    }
  }
};

export default ForcesAndMotionBasicsFluent;

forcesAndMotionBasics.register('ForcesAndMotionBasicsFluent', ForcesAndMotionBasicsFluent);
