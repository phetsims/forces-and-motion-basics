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

    this.focusRectangle = new Rectangle( 0, 0, this.width, this.height, 10, 10, {stroke: 'black', lineWidth: 3, visible: false} );
    this.addChild( this.focusRectangle );

    //Add accessibility peer
    this.peer = new DOM( $( '<input type="button">' ), { interactive: true} );
    var $elm = $( this.peer.element );
    $elm.click( function() {puller.y = 100;} );
    $elm.focusin( function() { pullerNode.focusRectangle.visible = true;} );
    $elm.focusout( function() { pullerNode.focusRectangle.visible = false;} );
  }

  inherit( PullerNode, Image );

  return PullerNode;
} );