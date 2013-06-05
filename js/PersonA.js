define( function( require ) {
  "use strict";

  var Property = require( 'PHETCOMMON/model/property/Property' );
  var DerivedProperty = require( 'PHETCOMMON/model/property/DerivedProperty' );

  //Using Property
  function Person( name, ssn, age, weight, height, happy ) {
    this.ssn = ssn;
    this.name = new Property( name );
    this.age = new Property( age );
    this.weight = new Property( weight );
    this.height = new Property( height );
    this.happy = new Property( happy );
    this.bmi = new DerivedProperty( [this.weight, this.height], function( weight, height ) {return weight / height / height;} );
  }

  Person.prototype = {
    nextYear: function() {
      this.age.value = this.age.value + 1;
    },
    reset: function() {
      this.name.reset();
      this.age.reset();
      this.weight.reset();
      this.height.reset();
      this.happy.reset();
      //bmi is derived and doesn't need to be computed
    }
  };

  return Person;
} );