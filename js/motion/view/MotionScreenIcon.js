// Copyright 2024, University of Colorado Boulder

/**
 * MotionScreenIcon places all the screenIcons of different region and culture representations into a single Node.
 * Each icon's visibility is controlled by the regionAndCulturePortrayalProperty.
 *
 * @author Luisa Vargas
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import { Node, Image } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PreferencesModelSingleton from '../PreferencesModelSingleton.js';

export default class MotionScreenIcon extends ScreenIcon {

  /**
   * @param { Array<MassPlayerPortrayal> } portrayals
   * @param options
   * @param { Tandem } tandem
   */
  constructor( portrayals, options, tandem ) {

    const motionScreenImages = portrayals.map( massPlayerPortrayal => {
      return new Image( massPlayerPortrayal.screenIcon, {
        visibleProperty: new DerivedProperty( [ PreferencesModelSingleton.localizationModel.regionAndCulturePortrayalProperty ], portrayal => {
          return portrayal === massPlayerPortrayal;
        } ),
        tandem: tandem.createTandem( 'icon' )
      } );
    } );

    const screenIconNode = new Node( {
      children: motionScreenImages
    } );
    super( screenIconNode, options );
  }
}

forcesAndMotionBasics.register( 'MotionScreenIcon', MotionScreenIcon );