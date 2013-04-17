define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );
  var Layout = require( 'SCENERY_PHET/Layout' );

  function PusherNode( model, motionTab ) {
    var pusherNode = this;
    Node.call( this, {cursor: 'pointer'} );
    var imageNode = new Image( imageLoader.getImage( 'pusher_straight_on.png' ) );
    this.addChild( imageNode );
    model.link( 'appliedForce', function( appliedForce ) {
      var index = Math.round( Math.abs( (appliedForce / 100 * 14) ) );
      if ( index > 14 ) {
        index = 14;
      }
      imageNode.image = imageLoader.getImage( appliedForce === 0 ? 'pusher_straight_on.png' : ('pusher_' + index + '.png') );
      console.log( model.stack.length );
      var delta = model.stack.length > 0 ? motionTab.getItemNode( model.stack[0] ).width / 2 : 100;
      if ( appliedForce > 0 ) {

        //Workaround for buggy setScale, see dot#2
        imageNode.setMatrix( Matrix3.scaling( 1, 1 ) );

        pusherNode.x = Layout.width / 2 - imageNode.width - delta;
      }
      else {

        //Workaround for buggy setScale, see dot#2
        imageNode.setMatrix( Matrix3.scaling( -1, 1 ) );
        pusherNode.x = Layout.width / 2 + imageNode.width + delta;
      }
      pusherNode.y = 362 - pusherNode.height;
    } );

    this.addInputListener( new SimpleDragHandler(
        {
          allowTouchSnag: true,
          translate: function( options ) {
            var newAppliedForce = model.appliedForce + options.delta.x / 3.0;
            model.appliedForce = Math.max( -100, Math.min( 100, newAppliedForce ) );
          },

          start: function() {
          },
          end: function() {
            model.appliedForce = 0;
          }
        } ) );
  }

  inherit( PusherNode, Node );

  return PusherNode;
} );