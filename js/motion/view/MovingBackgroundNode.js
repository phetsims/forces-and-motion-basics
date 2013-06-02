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
  var linear = require( 'DOT/Util' ).linear;

  function MovingBackgroundNode( model, layoutCenterX ) {
    var movingBackgroundNode = this;
    this.model = model;
    Node.call( this );

    var modWidth = 120 * 15;
    var L = modWidth / 2;
    var addBackgroundNode = function( offset, node, distanceScale ) {
      movingBackgroundNode.addChild( node );
      var centering = layoutCenterX - node.width / 2;
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
          node.x = z + centering;
        }
        else if ( a < L ) {
          node.x = a + centering;
        }
        else {
          //Put 'a' between -L and +L by subtracting an integral number of 2L
          //a - 2*L*n <= L
          //-2L*n <= L - a
          //n >= (L-a)/2L
          n = Math.floor( (L + a) / 2 / L );
          z = a - 2 * L * n;
          node.x = z + centering;
        }
      } );
    };
    var addBackgroundImage = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y} );
      addBackgroundNode( offset, sprite, distanceScale );
    };

    var mountainY = 311;
    addBackgroundImage( L / 2, 'mountains.png', 10, mountainY, 1 );
    addBackgroundImage( L, 'mountains.png', 10, mountainY, 1 );
    addBackgroundImage( -L / 3, 'mountains.png', 10, mountainY, 1 );

    addBackgroundImage( 100, 'cloud1.png', 5, 10, 1 );
    addBackgroundImage( 600, 'cloud1.png', 5, -30, 1 );
    addBackgroundImage( 1200, 'cloud1.png', 5, 5, 0.9 );

    //We tested that Pattern has superior performance to a large cached image
    var tile = imageLoader.getImage( 'brick-tile.png' );
    var ground = new Rectangle( 0, mountainY + 50, tile.width * 12, tile.height, {fill: new Pattern( tile )} );
    var mod = ground.width / 12;
    var offset = layoutCenterX - ground.width / 2;
    model.link( 'position', function( position ) { ground.x = -position % mod + offset; } );
    this.addChild( ground );

    //Add the gravel and ice
    if ( !model.skateboard && false ) {

      movingBackgroundNode.lastNumSpecks = 0;
      var gravelParent = new Node( {y: mountainY + 45} );
      this.addChild( gravelParent );
      addBackgroundNode( 0, gravelParent, 1 );

      var updateGravelImage = function() {
        var maxFriction = 2;
        var width = 800;
        var height = 5;
        var numSpecks = linear( maxFriction * 0.1, 0, maxFriction, 500 * 1.15, model.friction );
        numSpecks = numSpecks < 0 ? 0 : numSpecks;

        //Save computation, esp. for older machines
        if ( numSpecks == movingBackgroundNode.lastNumSpecks ) {return;}

        var node = new Node();
        for ( var i = 0; i < numSpecks / 2; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (width + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'black'} ) );
        }

        for ( i = 0; i < numSpecks / 2; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (width + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'gray'} ) );
        }

        for ( i = 0; i < numSpecks / 10; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (width + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'white'} ) );
        }
        node.toImage( function( image ) {
          gravelParent.children = [new Image( image )];
        } );
//        gravelParent.children = [node];
//        movingBackgroundNode.addChild( node );
        movingBackgroundNode.lastNumSpecks = numSpecks;
      };
      model.link( 'friction', updateGravelImage );
    }
  }

  inherit( MovingBackgroundNode, Node );

  return MovingBackgroundNode;
} );