// Copyright 2024, University of Colorado Boulder

/**
 * The MassPlayerPortrayal defines what is needed for each portrayal in Forces and Motion: Basics.
 *
 * @author Luisa Vargas
 *
 */

import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

export default class MassPlayerPortrayal extends RegionAndCulturePortrayal {

  /**
   * @param label { LocalizedStringProperty }
   * @param girlHolding { HTMLImageElement }
   * @param girlSitting { HTMLImageElement }
   * @param girlStanding { HTMLImageElement }
   * @param manHolding { HTMLImageElement }
   * @param manSitting { HTMLImageElement }
   * @param manStanding { HTMLImageElement }
   * @param screenIcon { HTMLImageElement }
   * @param queryParameterValue { string }
   */
  constructor( label,
               girlHolding, girlSitting, girlStanding,
               manHolding, manSitting, manStanding,
               screenIcon, queryParameterValue ) {

    super( label, queryParameterValue, {} );

    this.girlHolding = girlHolding;
    this.girlSitting = girlSitting;
    this.girlStanding = girlStanding;
    this.manHolding = manHolding;
    this.manStanding = manStanding;
    this.manSitting = manSitting;
    this.screenIcon = screenIcon;
  }
}

forcesAndMotionBasics.register( 'MassPlayerPortrayal', MassPlayerPortrayal );