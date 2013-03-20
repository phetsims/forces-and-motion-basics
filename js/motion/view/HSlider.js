define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var sliderKnob = require( 'tpl!../../../svg/handle_blue_top_grip_flat_gradient_3.svg' );

  //If value1 lies within (min1,max1), find value2 that lies proportionately between (min2,max2) 
  function linear( min1, max1, min2, max2, value1 ) {
    return (max2 - min2) / (max1 - min1) * (value1 - min1 ) + min2;
  }

  function HSlider( min, max, width, property, options ) {
    Node.call( this, options );

    //The track
    this.addChild( new Path( {shape: Shape.rect( 0, 0, width, 4 ), stroke: 'black', strokeWidth: 1, fill: 'gray'} ) );

    //Instantiate the template
    var knobSVGText = sliderKnob();

    //Append to the DOM
    $( 'body' ).append( $( knobSVGText ) );

    //Lookup the new item and append to the scenery
    var svgKnob = new DOM( $( 'body' ).find( '#Layer_1' ), {cursor: 'pointer'} );
    svgKnob.y = -svgKnob.height / 2;
    svgKnob.addInputListener( new SimpleDragHandler( {allowTouchSnag: true,
                                                       translate: function( options ) {
                                                         var x = Math.min( Math.max( options.position.x, 0 ), width ) + svgKnob.width / 2;
                                                         property.set( linear( 0, width, min, max, x ) );
                                                       },
                                                       end: function() { property.set( 0 ); }}
    ) );
    this.addChild( svgKnob );

    property.sync( function( model, value ) {
      svgKnob.x = linear( min, max, 0, width, value ) - svgKnob.width / 2;
    } );
  }

  Inheritance.inheritPrototype( HSlider, Node );

  return HSlider;
} );