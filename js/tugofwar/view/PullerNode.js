define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var red = "red";
  var blue = "blue";

  //dragOffsetX: How far to translate to the side if pulling with the pull image
  function PullerNode( puller, model, image, pullImage ) {
    this.puller = puller;
    var pullerNode = this;
    this.puller.node = this;//Wire up so node can be looked up by model element.
    var x = puller.x.value;
    var y = puller.y.value;

    var scale = 0.86;
    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer', scale: scale} );

    function updateLocation() {
      var knotted = puller.knot.value;
      var pulling = model.running && knotted;
      if ( knotted ) {
        pullerNode.setTranslation( puller.knot.value.x + (pulling ? -puller.dragOffsetX : 0) + (pullerNode.puller.type === blue ? -60 : 0),
                                   puller.knot.y - pullerNode.height + 100
        );
      }
      else {
        pullerNode.setTranslation( puller.x.value, puller.y.value );
      }
    }

    puller.x.link( updateLocation );
    puller.y.link( updateLocation );
    //TODO: Handle knot-moved event

    var updateImage = function( m, running ) {
      var knotted = puller.knot.value;
      var pulling = running && knotted;
      pullerNode.image = pulling ? pullImage : image;

      //Reshape the focus rect when image changes
      updateLocation();
    };
    model.on( 'change:running', updateImage );

    pullerNode.addInputListener( new SimpleDragHandler(
        {
          allowTouchSnag: true,
          start: function() {
            puller.disconnect();
            puller.dragging.value = true;

            //TODO: Commented out moveToFront while it is causing flickering on the ipad
//            pullerNode.moveToFront();
          },
          end: function( event ) {
            updateLocation();
            puller.dragging.value = false;
            updateImage( pullerNode.model, model.running );
          },
          translate: function( event ) {
            //TODO: join into one setter to improve speed, by using vector2?
            pullerNode.puller.x.value = event.position.x;
            pullerNode.puller.y.value = event.position.y;
          }
        } ) );

    //Add accessibility peer
    this.addPeer( '<input type="button">', {click: function() {
      if ( puller.knot ) {
        puller.disconnect();
        puller.set( {x: puller.initX, y: puller.initY} );
        model.numberPullersAttached = model.countAttachedPullers();
      }
      else {
        puller.disconnect();
        var knot = model.getClosestOpenKnot( puller );
        puller.set( {x: knot.x, y: knot.y, knot: knot} );
        model.numberPullersAttached = model.countAttachedPullers();
      }
    }} );
  }

  inherit( PullerNode, Image );

  return PullerNode;
} );
