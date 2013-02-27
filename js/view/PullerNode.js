define( function ( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Inheritance = require( 'PHETCOMMON/model/Inheritance' );
  var watch = require( 'view/watch' );
  var red = "red";
  var blue = "blue";

  //dragOffsetX: How far to translate to the side if pulling with the pull image
  function PullerNode( image, pullImage, type, x, y, model, options, dragOffsetX ) {

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer'} );

    var pullerNode = this;
    this.initY = y;
    this.initX = x;

    function updateLocation() {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      var pulling = model.running && knotted;
      if ( knotted ) {
        pullerNode.x = model.cart.x + pullerNode.knot.centerX + (pulling ? -dragOffsetX : 0) + (pullerNode.type == blue ? -60 : 0);
        pullerNode.y = pullerNode.knot.centerY - pullerNode.height + 100;
      }
    }

    watch( model.cart, "x", function ( x ) {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      if ( knotted ) {
        updateLocation();
      }
    } );

    watch( model, "running", function ( running ) {
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
    pullerNode.type = type;
  }

  Inheritance.inheritPrototype( PullerNode, Image );

  return PullerNode;
} );