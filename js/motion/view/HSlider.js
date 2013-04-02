define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var sliderKnob = require( 'tpl!../../../svg/handle_blue_top_grip_flat_gradient_3.svg' );
  var linear = require( 'DOT/Util' ).linear;

  function HSlider( min, max, width, property, options ) {
    Node.call( this, options );

    //TODO: turn these into parameters
    var numDivisions = 8; //e.g. divide the ruler into 1/8ths
    var numTicks = numDivisions + 1; //ticks on the end
    var isMajor = function( tickIndex ) { return tickIndex % 2 === 0; };
    var hasLabel = function( tickIndex ) { return tickIndex % 4 === 0; };

    for ( var i = 0; i < numTicks; i++ ) {
      var x1 = linear( 0, 0, 1, width, i / (numTicks - 1) );
      var tick = new Path( {shape: Shape.lineSegment( {x: x1, y: 0}, {x: x1, y: isMajor( i ) ? 30 : 15} ), stroke: 'black', lineWidth: 1} );

      this.addChild( tick );
      if ( hasLabel( i ) ) {
        var label = new Text( linear( 0, min, 1, max, i / (numTicks - 1) ).toFixed( 0 ), {centerX: tick.centerX, top: tick.bottom + 5, fontSize: '18px'} );
        this.addChild( label );
      }
    }

    //The track
    this.addChild( new Path( {shape: Shape.rect( 0, 0, width, 6 ), stroke: 'black', lineWidth: 1, fill: 'white'} ) );

    //Instantiate the template
    var knobSVGText = sliderKnob();

    //Append to the DOM
    $( 'body' ).append( $( knobSVGText ) );

    //Lookup the new item and append to the scenery
    var svgKnob = new DOM( $( 'body' ).find( '#Layer_1' ), {cursor: 'pointer'} );
    svgKnob.y = -svgKnob.height / 2;
    svgKnob.addInputListener( new SimpleDragHandler(
        {allowTouchSnag: true,
          translate: function( options ) {
            var x = Math.min( Math.max( options.position.x, -svgKnob.width / 2 ), width - svgKnob.width / 2 ) + svgKnob.width / 2;
            property.set( linear( 0, min, width, max, x ) );
          },
          end: function() { property.set( 0 ); }}
    ) );
    this.addChild( svgKnob );

    property.link( function( model, value ) { svgKnob.x = linear( min, 0, max, width, value ) - svgKnob.width / 2; } );
  }

  inherit( HSlider, Node );

  return HSlider;
} );