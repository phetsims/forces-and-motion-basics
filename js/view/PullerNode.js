define( function ( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Inheritance = require( 'PHETCOMMON/model/Inheritance' );
  var watch = require( 'view/watch' );

  function PullerNode( image, pullImage, type, x, y, model, options ) {

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer'} );

    var pullerNode = this;
    this.initY = y;

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