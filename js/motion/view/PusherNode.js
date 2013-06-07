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
  var Layout = require( 'Layout' );

  function PusherNode( model ) {
    var pusherNode = this;
    var scale = 0.85;
    Node.call( this, {cursor: 'pointer', scale: scale} );
    var imageNode = new Image( imageLoader.getImage( 'pusher_straight_on.png' ) );
    this.addChild( imageNode );
    model.multilink( ['appliedForce', 'position', 'speed', 'pusherPosition'], function( appliedForce, position, speed, pusherPosition ) {

      //Flag to keep track of whether the pusher has fallen while pushing the crate left; in that case the image must be shifted because it is scaled by (-1,1)
      var fallingLeft = false;

      var index = Math.min( 14, Math.round( Math.abs( (appliedForce / 100 * 14) ) ) );
      var maxSpeedExceeded = speed >= 20;
      if ( !maxSpeedExceeded ) {
        imageNode.image = imageLoader.getImage( appliedForce === 0 ? 'pusher_straight_on.png' : ('pusher_' + index + '.png') );
      }
      else {
        imageNode.image = imageLoader.getImage( 'pusher_fall_down.png' );
        if ( pusherNode.lastAppliedForce > 0 ) {
          imageNode.setMatrix( Matrix3.scaling( -1, 1 ) );
        }
        else {
          imageNode.setMatrix( Matrix3.scaling( 1, 1 ) );
          fallingLeft = true;
        }
      }

      var delta = model.stack.length > 0 ? (model.stack[0].view.width / 2 - model.stack[0].pusherInset) : 100;
      if ( appliedForce > 0 && !maxSpeedExceeded ) {

        //Workaround for buggy setScale, see dot#2
        imageNode.setMatrix( Matrix3.scaling( 1, 1 ) );

        pusherNode.x = Layout.width / 2 - imageNode.width * scale - delta;
        model.pusherPosition = -delta + position - imageNode.width;
      }
      else if ( appliedForce < 0 && !maxSpeedExceeded ) {

        //Workaround for buggy setScale, see dot#2
        imageNode.setMatrix( Matrix3.scaling( -1, 1 ) );
        pusherNode.x = Layout.width / 2 + imageNode.width * scale + delta;
        model.pusherPosition = delta + position;
      }
      else {
        pusherNode.x = Layout.width / 2 + imageNode.width * scale - position + pusherPosition + (fallingLeft ? -imageNode.width : 0);
      }

      //Keep the feet on the ground
      pusherNode.y = 362 - pusherNode.height;

      //Track the direction of the last nonzero applied force for showing the fallen pusher
      if ( appliedForce !== 0 ) {
        pusherNode.lastAppliedForce = appliedForce;
      }
    } );

    this.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,
      translate: function( options ) {
        var newAppliedForce = model.appliedForce + options.delta.x / 3.0;
        model.appliedForce = Math.max( -100, Math.min( 100, newAppliedForce ) );
      },

      start: function() {},
      end: function() { model.appliedForce = 0; }
    } ) );
  }

  inherit( Node, PusherNode );

  return PusherNode;
} );