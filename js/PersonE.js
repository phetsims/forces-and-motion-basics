define( function( require ) {
  "use strict";

  var PropertySetB = require( 'PHETCOMMON/model/property/PropertySetB' );
  var inherit = require( 'PHET_CORE/inherit' );

  //Using Property
  function Person( name, ssn, age, weight, height, happy ) {
    this.ssn = ssn;
    PropertySetB.call( this, {name: name, age: age, weight: weight, height: height, happy: happy} );
    this.addDerivedProperty( 'bmi', ['weight', 'height'], function( weight, height ) {return weight / height / height;} );

    if ( 2 + 3 < 999 ) {
      return;
    }
  }

  inherit( Person, PropertySetB, {
    nextYear: function() {
      this.age = this.age + 1;
    }
  } );

  return Person;
} );