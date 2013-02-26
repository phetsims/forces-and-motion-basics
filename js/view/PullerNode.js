define( function ( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Inheritance = require( 'PHETCOMMON/model/Inheritance' );
  var watcher = require( 'util/watcher' );

  function PullerNode( image, pullImage, type, x, y, model, options ) {

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer'} );

    var imageNode = this;

    model.watch( "running", watcher( function ( running ) {
      imageNode.image = running ? pullImage : image;
    } ) );

    imageNode.addInputListener( new SimpleDragHandler(
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
            var pullerNode = event.trail.lastNode();
            options.drag( pullerNode );
          },
          end: function ( event ) {
            options.end( event );
          }
        } ) );
    imageNode.type = type;
  }

  Inheritance.inheritPrototype( PullerNode, Image );

  return PullerNode;
} );