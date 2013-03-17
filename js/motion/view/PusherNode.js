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
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;

  function ItemNode( model, view, imageLoader ) {
    var itemNode = this;
    Node.call( this, {x: model.pusherX, y: 350, cursor: 'pointer'} );
    var imageNode = new Image( imageLoader.getImage( 'pusher_straight_on.png' ) );
    var updatePosition = function( a, b, appliedForce ) {
      var index = Math.round( Math.abs( (appliedForce / 100 * 14) ) );
      if ( index > 14 ) {
        index = 14;
      }
      imageNode.image = imageLoader.getImage( appliedForce == 0 ? 'pusher_straight_on.png' : ('pusher_' + index + '.png') );
      if ( appliedForce > 0 ) {

        //Workaround for buggy setScale, see dot#2
        imageNode.setMatrix( Matrix3.scaling( 1, 1 ) );

        itemNode.x = 200;
      }
      else {

        //Workaround for buggy setScale, see dot#2
        imageNode.setMatrix( Matrix3.scaling( -1, 1 ) );
        itemNode.x = 700;
      }
      itemNode.y = 350 - itemNode.height + 30;
    };
    this.addChild( imageNode );
    watch( model, 'appliedForce', updatePosition );
    updatePosition( 0, 0, model.appliedForce );

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

  Inheritance.inheritPrototype( ItemNode, Node );

  return ItemNode;
} );