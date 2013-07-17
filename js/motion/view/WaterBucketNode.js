// Copyright 2002-2013, University of Colorado Boulder

/**
 * This scenery.Node shows the interactive water bucket.  The user can drag it from the toolbox to the play area, and the water sloshes based on the acceleration.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var linear = require( 'DOT/Util' ).linear;

  //REVIEW @param doc
  function WaterBucketNode( model, motionTabView, item, image, imageSitting, imageHolding, showMassesProperty ) {
    this.item = item;
    ItemNode.call( this, model, motionTabView, item, image, imageSitting, imageHolding, showMassesProperty );
    var water = new Path( {shape: Shape.lineSegment( new Vector2( 0, 0 ), new Vector2( 0, 18 ) ), stroke: 'black', fill: 'rgb(9, 125, 159)', lineWidth: 1} );
    this.addChild( water );
    water.moveToBack();

    //Keep track of the history to show a momentum-based "sloshing" effect
    var history = [];

    //When the model steps in time, update the water shape
    model.timeProperty.link( function() {
      var acceleration = model.acceleration;
      history.push( acceleration );
      while ( history.length > 7 ) {
        history.shift();//remove front item
      }
      //Metrics based on original image size of 98 pixels wide.
      var padX = 4.5;
      var padY = 9;
      var s = image.width / 98.0;

      var leftLineX = function( x ) {return linear( 0, 1, ( 1 + padX ) * s, ( 10 + padX ) * s, x );};
      var leftLineY = function( x ) {return linear( 0, 1, ( 9 - padY ) * s, ( 102 - padY ) * s, x );};

      var rightLineX = function( x ) {return linear( 1, 0, ( 87 - padX ) * s, ( 96 - padX ) * s, x );};
      var rightLineY = function( x ) {return linear( 1, 0, ( 102 - padY ) * s, ( 9 - padY ) * s, x );};

      var min = 0.5; //Water level when acceleration = 0
      var sum = 0.0;
      history.forEach( function( item ) { sum = sum + item; } );
      var composite = sum / history.length;

      var delta = model.isInStack( item ) ? -composite / 50 : 0;
      var path = new Shape();
      path.moveTo( leftLineX( min + delta ), leftLineY( min + delta ) );
      path.lineTo( leftLineX( 1 ), leftLineY( 1 ) );
      path.lineTo( rightLineX( 1 ), rightLineY( 1 ) );
      path.lineTo( rightLineX( min - delta ), rightLineY( min - delta ) );
      path.close();

      water.shape = path;
    } );
  }

  return inherit( ItemNode, WaterBucketNode );
} );