define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var red = "red";
  var blue = "blue";

  //dragOffsetX: How far to translate to the side if pulling with the pull image
  function PullerNode( puller, model, image, pullImage ) {
    this.puller = puller;
    var pullerNode = this;
    this.puller.node = this;//Wire up so node can be looked up by model element.
    var x = puller.x;
    var y = puller.y;

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer', renderer: 'svg', rendererOptions: {cssTransform: true}} );

    function updateLocation() {
      var knotted = puller.has( 'knot' );
      var pulling = model.running && knotted;
      if ( knotted ) {
        pullerNode.x = puller.knot.x + (pulling ? -puller.dragOffsetX : 0) + (pullerNode.puller.type === blue ? -60 : 0);
        pullerNode.y = puller.knot.y - pullerNode.height + 100;
      }
      else {
        pullerNode.x = puller.x;
        pullerNode.y = puller.y;
      }
    }

    puller.on( 'change:y change:x knot-moved', function( m, y ) {
      updateLocation();
    } );

    var updateImage = function( m, running ) {
      var knotted = puller.has( 'knot' );
      var pulling = running && knotted;
      pullerNode.image = pulling ? pullImage : image;
      updateLocation();
    };
    model.on( 'change:running', updateImage );

    pullerNode.addInputListener( new SimpleDragHandler(
        {
          allowTouchSnag: true,
          start: function() {
            puller.disconnect();
            puller.dragging = true;

            //Comment out moveToFront while it is causing flickering on the ipad
//            pullerNode.moveToFront();
          },
          end: function( event ) {
            updateLocation();
            puller.set( 'dragging', false );
            updateImage( pullerNode.model, model.running );
          }, translate: function( event ) { pullerNode.puller.set( {x: event.position.x, y: event.position.y} ); }
        } ) );
  }

  Inheritance.inheritPrototype( PullerNode, Image );

  return PullerNode;
} );