// Copyright 2024, University of Colorado Boulder

/**
 * HumanTypeEnum identifies the human object type and sets the holding, standing, or sitting image for the human.
 *
 * @author Luisa Vargas
 */

import MappedProperty from '../../../../axon/js/MappedProperty.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PreferencesModelSingleton from '../PreferencesModelSingleton.js';

class HumanTypeEnum extends EnumerationValue {

  static GIRL = new HumanTypeEnum( 'girl' );
  static MAN = new HumanTypeEnum( 'man' );

  static enumeration = new Enumeration( HumanTypeEnum );

  /**
   * @param {string} humanType
   */
  constructor( humanType ) {
    super();

    this.holdingImageProperty = new MappedProperty( PreferencesModelSingleton.localizationModel.regionAndCulturePortrayalProperty, {
      map: portrayal => {
        if ( humanType === 'girl' ) {
          return portrayal.girlHolding;
        }
        else {
          assert && assert( humanType === 'man', 'Human type must be girl, or man, but it is ', humanType );
          return portrayal.manHolding;
        }
      }
    } );

    this.standingImageProperty = new MappedProperty( PreferencesModelSingleton.localizationModel.regionAndCulturePortrayalProperty, {
      map: portrayal => {
        if ( humanType === 'girl' ) {
          return portrayal.girlStanding;
        }
        else {
          assert && assert( humanType === 'man', 'Human type must be girl, or man, but it is ', humanType );
          return portrayal.manStanding;
        }
      }
    } );

    this.sittingImageProperty = new MappedProperty( PreferencesModelSingleton.localizationModel.regionAndCulturePortrayalProperty, {
      map: portrayal => {
        if ( humanType === 'girl' ) {
          return portrayal.girlSitting;
        }
        else {
          assert && assert( humanType === 'man', 'Human type must be girl, or man, but it is ', humanType );
          return portrayal.manSitting;
        }
      }
    } );
  }
}

forcesAndMotionBasics.register( 'HumanTypeEnum', HumanTypeEnum );
export default HumanTypeEnum;