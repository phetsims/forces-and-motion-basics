define( function( require ) {
  "use strict";

  var Fort = require( 'FORT/Fort' );

  var Person = Fort.Model.extend( {
    init: function( name, ssn, age, weight, height, happy ) {
      this.set( {name: name, age: age, weight: weight, height: height, happy: happy} );
      this.ssn = ssn;
    },
    //lodash extend doesn't support es5
    getBMI: function() {
      return this.weight / this.height / this.height;
    }, nextYear: function() {
      this.age = this.age + 1;
    }} );

  return Person;
} );