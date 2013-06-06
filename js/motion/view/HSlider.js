define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var linear = require( 'DOT/Util' ).linear;
  var imageLoader = require( 'imageLoader' );

  function HSlider( min, max, width, property, speedValueProperty, options ) {
    var slider = this;
    this.options = _.extend( {zeroOnRelease: false}, options || {} );

    speedValueProperty.link( function( speedValue ) {
      if ( speedValue !== 'WITHIN_ALLOWED_RANGE' ) {
        dragHandler.endDrag();//drop the mouse
      }
    } );
    this.min = min;
    this.max = max;
    this.sliderWidth = width;
    this.trackHeight = 6;

    this.options.renderer = 'svg';
    Node.call( this, this.options );

    this.ticksLayer = new Node();
    this.addChild( this.ticksLayer );

    //The track
    this.addChild( new Rectangle( 0, 0, width, this.trackHeight, {stroke: 'black', lineWidth: 1, fill: 'white'} ) );

    //Lookup the new item and append to the scenery
    var svgKnob = new Image( imageLoader.getImage( 'handle_blue_top_grip_flat_gradient_3.svg' ), {cursor: 'pointer'} );
    svgKnob.y = -svgKnob.height / 2;
    var dragHandler = new SimpleDragHandler( {
        allowTouchSnag: true,
        translate: function( options ) {
          var x = Math.min( Math.max( options.position.x, -svgKnob.width / 2 ), width - svgKnob.width / 2 ) + svgKnob.width / 2;
          property.value = linear( 0, min, width, max, x );
        },
        end: function() {
          if ( slider.options.zeroOnRelease ) {
            property.value = 0;
          }
        }}
    );
    svgKnob.addInputListener( dragHandler );
    this.addChild( svgKnob );

    property.link( function( value ) { svgKnob.x = linear( min, 0, max, width, value ) - svgKnob.width / 2; } );
  }

  inherit( Node, HSlider, {
    addNormalTicks: function() {
      //TODO: turn these into parameters
      var numDivisions = 8; //e.g. divide the ruler into 1/8ths
      var numTicks = numDivisions + 1; //ticks on the end
      var isMajor = function( tickIndex ) { return tickIndex % 2 === 0; };
      var hasLabel = function( tickIndex ) { return tickIndex % 4 === 0; };

      for ( var i = 0; i < numTicks; i++ ) {
        var x1 = linear( this.min, 0, this.max, this.sliderWidth, i / (numTicks - 1) * (this.max - this.min) + this.min );
        var tick = new Path( {shape: Shape.lineSegment( new Vector2( x1, 0 ), new Vector2( x1, isMajor( i ) ? 30 : 15 ) ), stroke: 'black', lineWidth: 1} );

        this.ticksLayer.addChild( tick );
        if ( hasLabel( i ) ) {
          var label = new Text( linear( 0, this.min, 1, this.max, i / (numTicks - 1) ).toFixed( 0 ), {centerX: tick.centerX, top: tick.bottom + 5, fontSize: '18px'} );
          this.ticksLayer.addChild( label );
        }
      }
      return this;
    },

    //Add the tick for the specified value, so that the node will be centered on the location specified and just at the edge of the track.
    addTick: function( value, tickAndLabelNode ) {
      tickAndLabelNode.centerX = linear( 0, 0, 1, this.sliderWidth, value );
      tickAndLabelNode.top = this.trackHeight + 1;
      this.ticksLayer.addChild( tickAndLabelNode );
      return this;
    }
  } );

  return HSlider;
} );