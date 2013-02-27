define( function ( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Inheritance = require( 'PHETCOMMON/model/Inheritance' );
  var watch = require( 'view/watch' );

  //dragOffsetX: How far to translate to the side if pulling with the pull image
  function PullerNode( image, pullImage, type, x, y, model, options, dragOffsetX ) {

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer'} );

    var pullerNode = this;
    this.initY = y;

    watch( model.cart, "x", function () {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      var pulling = model.running && knotted;
      if ( pulling && knotted ) {
        var x = model.cart.x;
        pullerNode.x = x + pullerNode.knot.centerX + (pulling ? -dragOffsetX : 0);
      }
    } );

    watch( model, "running", function ( running ) {
      var knotted = (typeof pullerNode.knot !== 'undefined');
      var pulling = model.running && knotted;
      pullerNode.image = pulling ? pullImage : image;
      if ( pulling || knotted ) {
        pullerNode.y = pullerNode.knot.centerY - pullerNode.height + 100;
      }
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
          }
        } ) );
    pullerNode.type = type;
  }

  Inheritance.inheritPrototype( PullerNode, Image );

  return PullerNode;
} );