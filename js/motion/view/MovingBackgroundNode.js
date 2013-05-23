/**
 * This class shows all of the moving background, including the mountains, clouds and brick tile on the ground.
 */
define( function( require ) {
  "use strict";
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Pattern = require( 'SCENERY/util/Pattern' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );

  function MovingBackgroundNode( model, layoutCenterX ) {
    var movingBackgroundNode = this;
    this.model = model;
    Node.call( this );

    var modWidth = 120 * 15;
    var L = modWidth / 2;
    var addBackgroundSprite = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y} );
      movingBackgroundNode.addChild( sprite );
      var centering = layoutCenterX - sprite.width / 2;
      model.link( 'position', function( position ) {
        var a = -position / distanceScale + offset;
        var n, z;

        //A function that maps values as such:
        //0=>0
        //1=>1
        //-1 => -1
        //L+a => -L+a
        //-L-a => L-a
        if ( a < -L ) {
          //put 'a' between -L and +L by adding an integral number of 2L
          //How many 2L to add to put a back above -L?
          //2L*n+ a >= -L
          //2L*n >= -L - a
          //n >= -(L+a)/2L
          n = Math.ceil( -(L + a) / 2 / L );
          z = n * 2 * L + a;
          sprite.x = z + centering;
        }
        else if ( a < L ) {
          sprite.x = a + centering;
        }
        else {
          //Put 'a' between -L and +L by subtracting an integral number of 2L
          //a - 2*L*n <= L
          //-2L*n <= L - a
          //n >= (L-a)/2L
          n = Math.floor( (L + a) / 2 / L );
          z = a - 2 * L * n;
          sprite.x = z + centering;
        }
      } );
    };

    var mountainY = 311;
    addBackgroundSprite( L / 2, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( L, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( -L / 3, 'mountains.png', 10, mountainY, 1 );

    addBackgroundSprite( 100, 'cloud1.png', 5, 10, 1 );
    addBackgroundSprite( 600, 'cloud1.png', 5, -30, 1 );
    addBackgroundSprite( 1200, 'cloud1.png', 5, 5, 0.9 );

    //We tested that Pattern has superior performance to a large cached image
    var tile = imageLoader.getImage( 'brick-tile.png' );
    var ground = new Rectangle( 0, mountainY + 50, tile.width * 12, tile.height, {fill: new Pattern( tile )} );
    var mod = ground.width / 12;
    var offset = layoutCenterX - ground.width / 2;
    model.link( 'position', function( position ) { ground.x = -position % mod + offset; } );
    this.addChild( ground );
  }

  inherit( MovingBackgroundNode, Node );

  return MovingBackgroundNode;
} );