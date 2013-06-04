define( function( require ) {
  "use strict";

  var PersonA = require( 'PersonA' );
  var PersonB = require( 'PersonB' );
  var PersonC = require( 'PersonC' );
  var PersonE = require( 'PersonE' );

  return function() {
    //Property based implementation, get values with model.property.value
    var alice = new PersonA( 'alice', 123456, 31, 150, 80, true );
    alice.age.link( function( age ) {console.log( "current age is " + age );} );
    alice.nextYear();
    console.log( "her name is ", alice.name.value, ' and her weight to height ratio is', alice.weight.value / alice.height.value );
    console.log( 'bmi', alice.bmi.value );
    alice.weight.value = alice.weight.value + 1;
    alice.height.value = alice.height.value + 1;
    alice.reset();

    //Fort-based implementation, get values with model.property
    var bobby = new PersonB( 'bobby', 123456, 31, 150, 80, true );
    bobby.link( 'age', function( age ) {console.log( "current age is " + age );} );
    bobby.nextYear();
    console.log( "his name is ", bobby.name, ' and his weight to height ratio is', bobby.weight / bobby.height );
    console.log( 'bmi', bobby.getBMI() );
    bobby.set( {weight: bobby.weight + 1, height: bobby.height + 1} );
    bobby.reset();

    var clara = new PersonC( 'clara', 123456, 31, 150, 80, true );
    clara.age.link( function( age ) {console.log( 'current age is ', age );} );
    clara.nextYear();
    console.log( "her name is ", clara.name.value, ' and her weight to height ratio is', clara.weight.value / clara.height.value );
    console.log( 'bmi', clara.bmi.value );
    clara.set( {weight: clara.weight.value + 1, height: clara.height.value + 1} );
    clara.reset();

    //Use PropertySetValues for access
    var david = new PersonC( 'david', 123456, 31, 150, 80, true );
    david.age.link( function( age ) {console.log( 'current age is ', age );} );
    david.nextYear();
    var d = david.values;
    console.log( "his name is ", d.name, ' and his weight to height ratio is', d.weight / d.height );
    console.log( 'bmi', david.bmi.value );
    david.set( {weight: d.weight + 1, height: d.height + 1} );
    david.reset();

    //Possible alternative, uses ageProperty for link, age for value
    //Not implemented yet so this part won't run
    var ethan = new PersonE( 'ethan', 123456, 31, 150, 80, true );
    ethan.ageProperty.link( function( age ) {console.log( 'current age is ', age );} );
    ethan.nextYear();
    console.log( "his name is ", d.name, ' and his weight to height ratio is', d.weight / d.height );
    console.log( 'bmi', ethan.bmi );//When adding derived properties, could create ES5 getter for the value, and *property for the property
    ethan.set( {weight: ethan.weight + 1, height: ethan.height + 1} );
    ethan.reset();
    ethan.height = 1;
    ethan.weight = 100;
    ethan.bmiProperty.link( function( bmi ) {console.log( "ethan's bmi: " + bmi );} );
    ethan.weight = 100;
    ethan.weight = 101; //Check against duplicate notifications
    ethan.weight = 101;
    ethan.weight = 102;
    ethan.reset();
  }
} );