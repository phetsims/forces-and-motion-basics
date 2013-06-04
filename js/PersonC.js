define( function( require ) {
  "use strict";

  var PropertySet = require( 'PHETCOMMON/model/property/PropertySet' );
  var DerivedProperty = require( 'PHETCOMMON/model/property/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );

  //Using Property
  function Person( name, ssn, age, weight, height, happy ) {
    this.ssn = ssn;
    PropertySet.call( this, {name: name, age: age, weight: weight, height: height, happy: happy} );
    this.bmi = new DerivedProperty( this.weight, this.height, function( weight, height ) {return weight / height / height;} );
  }

  inherit( Person, PropertySet, {
    nextYear: function() {
      this.age.value = this.age.value + 1;
    }
  } );

  return Person;
} );