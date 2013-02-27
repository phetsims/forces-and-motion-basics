define( function ( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Inheritance = require( 'PHETCOMMON/model/Inheritance' );
  var red = "red";
  var blue = "blue";

  //dragOffsetX: How far to translate to the side if pulling with the pull image
  function PullerNode( puller, model, image, pullImage, options ) {
    this.puller = puller;
    var x = puller.get( 'x' );
    var y = puller.get( 'y' );

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer'} );

    var pullerNode = this;

    function updateLocation() {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      var pulling = model.running && knotted;
      if ( knotted ) {
        pullerNode.x = model.cart.get( 'x' ) + pullerNode.knot.centerX + (pulling ? -puller.get( "dragOffsetX" ) : 0) + (pullerNode.puller.get( 'type' ) == blue ? -60 : 0);
        pullerNode.y = pullerNode.knot.centerY - pullerNode.height + 100;
      }
    }

    model.cart.on( 'change:x', function ( m, x ) {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      if ( knotted ) {
        updateLocation();
      }
    } );

    model.on( 'change:running', function ( m, running ) {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      var pulling = running && knotted;
      pullerNode.image = pulling ? pullImage : image;
      updateLocation();
    } );

    pullerNode.addInputListener( new SimpleDragHandler(
        {
          allowTouchSnag: true,
          start: function ( finger, trail, event ) {//TODO: remove first 2 args
            var pullerNode = event.trail.lastNode();
            if ( pullerNode.knot ) {
              delete pullerNode.knot.puller;
            }
            delete pullerNode.knot;
          },
          drag: function ( finger, trail, event ) {//TODO: remove first 2 args
            options.drag( finger, trail, event );
          },
          end: function ( event ) {
            options.end( event );
            updateLocation();
          }
        } ) );
  }

  Inheritance.inheritPrototype( PullerNode, Image );

  return PullerNode;
} );