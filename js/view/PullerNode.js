define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var red = "red";
  var blue = "blue";

  //dragOffsetX: How far to translate to the side if pulling with the pull image
  function PullerNode( puller, model, image, pullImage, options ) {
    this.puller = puller;
    var pullerNode = this;
    this.puller.node = this;//Wire up so node can be looked up by model element.
    var x = puller.get( 'x' );
    var y = puller.get( 'y' );

    puller.on( 'change:x', function( m, x ) { pullerNode.x = x;} );
    puller.on( 'change:y', function( m, y ) { pullerNode.y = y;} );

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer'} );

    function updateLocation() {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      var pulling = model.running && knotted;
      if ( knotted ) {
        pullerNode.x = pullerNode.knot.centerX + (pulling ? -puller.get( "dragOffsetX" ) : 0) + (pullerNode.puller.get( 'type' ) == blue ? -60 : 0);
        pullerNode.y = pullerNode.knot.centerY - pullerNode.height + 100;
      }
    }

    model.cart.on( 'change:x', function( m, x ) {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      if ( knotted ) {
        updateLocation();
      }
    } );

    var updateImage = function( m, running ) {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      var pulling = running && knotted;
      pullerNode.image = pulling ? pullImage : image;
      updateLocation();
    };
    model.on( 'change:running', updateImage );

    pullerNode.addInputListener( new SimpleDragHandler(
        {
          allowTouchSnag: true,
          start: function() {
            if ( pullerNode.knot ) {
              delete pullerNode.knot.puller;
            }
            delete pullerNode.knot;
          },
          end: function( event ) {
            options.end( event );
            updateLocation();
            updateImage( pullerNode.model, model.get( 'running' ) );
          },
          translate: function( event ) {
            pullerNode.puller.set( {x: event.position.x, y: event.position.y} );
          }
        } ) );
  }

  Inheritance.inheritPrototype( PullerNode, Image );

  return PullerNode;
} );