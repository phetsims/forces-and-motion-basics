define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../../nls/forces-and-motion-basics-strings" );
  var PullerNode = require( "view/PullerNode" );
  var Shape = require( 'SCENERY/Shape' );
  var LayerType = require( 'SCENERY/layers/LayerType' );
  var Scene = require( 'SCENERY/Scene' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Property = require( 'PHETCOMMON/model/property/Property' );
  var arrow = require( 'view/arrow' );
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function View( $images ) {
    var view = this;

    function getImage( name ) {
      return $images.parent().find( 'img[src^="images/' + name + '"]' )[0];
    }

    function getPullerImage( puller, leaning ) {
      var type = puller.get( "type" );
      var size = puller.get( "size" );
      var sizeString = size == large ? "_lrg_" :
                       size == medium ? "_" :
                       "_small_";
      var colorString = type.toUpperCase();
      return getImage( "pull_figure" + sizeString + colorString + "_" + (leaning ? 3 : 0) );
    }

    var Puller = Backbone.Model.extend( { defaults: { }, initialize: function() {
      this.initAttributes = this.toJSON();//For resetting
    } } );
    var Pullers = Backbone.Collection.extend( { model: Puller } );
    var Cart = Backbone.Model.extend( {defaults: {x: 0, v: 0}} );
    var Model = Backbone.Model.extend(
        {
          defaults: {
            showSumOfForces: true,
            running: false,
            volumeOn: false
          },
          initialize: function() {
            this.cart = new Cart();
            this.pullers = new Pullers( [ new Puller( {x: 260, y: 500, dragOffsetX: 20, type: blue, size: small } ),
                                          new Puller( {x: 198, y: 500, dragOffsetX: 20, type: blue, size: small } ),
                                          new Puller( {x: 132, y: 446, dragOffsetX: 50, type: blue, size: medium} ),
                                          new Puller( {x: 38, y: 407, dragOffsetX: 80, type: blue, size: large  } ),
                                          new Puller( {x: 624, y: 500, dragOffsetX: 10, type: red, size: small } ),
                                          new Puller( {x: 684, y: 500, dragOffsetX: 10, type: red, size: small } ),
                                          new Puller( {x: 756, y: 446, dragOffsetX: 20, type: red, size: medium } ),
                                          new Puller( {x: 838, y: 407, dragOffsetX: 30, type: red, size: large  } )
                                        ] );
          }
        } );
    view.model = new Model();

    var handleClick = function() { view.model.set( {'showSumOfForces': !view.model.get( 'showSumOfForces' )} ); };
    var $checkBox = $( '.sum-of-forces-checkbox' );
    $checkBox.bind( "touchstart", handleClick );
    $checkBox.bind( "click", handleClick );

    this.model.bind( 'change:showSumOfForces', function( model, showSumOfForces ) {
      var $icon = $( '.sum-of-forces-checkbox i' );
      $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
      $icon.addClass( showSumOfForces ? "icon-check" : "icon-check-empty" );
    } );

    var resetAll = function() {
      view.model.set( view.model.defaults ); //do not clear, which could remove children set in initialize
      view.model.cart.set( view.model.cart.defaults );
      view.model.pullers.each( function( puller ) {
        puller.set( puller.initAttributes );
        if ( puller.node.knot ) {
          delete puller.node.knot.puller;
        }
        delete puller.node.knot;
      } );
      hideKnots();
      view.updateForces();
    };
    var $resetAllButton = $( '.reset-all-button' );
    $resetAllButton.bind( 'touchstart', resetAll );
    $resetAllButton.bind( 'click', resetAll );

    var $volumeButton = $( '.volume-button' );
    var volumeButtonEvent = function() { view.model.set( 'volumeOn', !view.model.get( 'volumeOn' ) ); };//This pattern looks like it could be factored out.
    view.model.on( 'change:volumeOn', function( m, volumeOn ) {
      $volumeButton.find( 'i' ).removeClass( 'icon-volume-up' ).removeClass( 'icon-volume-off' ).addClass( volumeOn ? 'icon-volume-up' : 'icon-volume-off' );
    } );
    view.model.trigger( 'change:volumeOn' );
    $volumeButton.bind( 'touchstart', volumeButtonEvent );
    $volumeButton.bind( 'click', volumeButtonEvent );

    $( '.sum-of-forces-checkbox i' ).removeClass( "icon-check-empty" ).addClass( "icon-check" );

    this.scene = new Scene( $( "#scene" ), {width: 200, height: 200, allowDevicePixelRatioScaling: true} );
    this.scene.addChild( new Image( getImage( 'grass' ), {x: 13, y: 368} ) );
    this.sumArrow = new Path( {shape: new Shape(), fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.model.on( 'change:showSumOfForces', function( m, showSumOfForces ) { view.sumArrow.visible = showSumOfForces; } );
    this.leftArrow = new Path( {shape: new Shape(), fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {shape: new Shape(), fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.scene.addChild( this.leftArrow );
    this.scene.addChild( this.rightArrow );
    this.scene.addChild( this.sumArrow );

    view.ropeNode = new Image( getImage( 'rope' ), {x: 51, y: 263 } );

    var blueKnots = [10.0, 90.0, 170.0, 250.0];
    var ropeImageWidth = 880;//TODO: How to dynamically get width of rope image?  When I do ropeImage.width, I get different values based on browser/scale.
    var redKnots = _.map( blueKnots, function( v ) {return ropeImageWidth - v;} );
    var knots = [];
    var knotWidth = 30;
    var dx = 14;
    var dy = 10;
    for ( var i = 0; i < blueKnots.length; i++ ) {
      var knot = new Path( {shape: Shape.circle( blueKnots[i] + view.ropeNode.x - knotWidth / 2 + dx, view.ropeNode.y + dy, knotWidth ), stroke: '#FFFF00', lineWidth: 4, visible: false} );
      this.scene.addChild( knot );
      knot.type = blue;
      knots.push( knot );
    }
    for ( var i = 0; i < redKnots.length; i++ ) {
      var knot = new Path( {shape: Shape.circle( redKnots[i] + view.ropeNode.x - knotWidth / 2 + dx, view.ropeNode.y + dy, knotWidth ), stroke: '#FFFF00', lineWidth: 4, visible: false} );
      this.scene.addChild( knot );
      knot.type = red;
      knots.push( knot );
    }

    this.scene.addChild( view.ropeNode );
    this.cartNode = new Image( getImage( 'cart' ), {x: 399, y: 221} );

    this.model.cart.bind( 'change:x', function( m, x ) {
      view.cartNode.x = x + 399;
      view.ropeNode.x = x + 51;
      _.each( knots, function( knot ) {
        knot.x = x;
      } );
    } );

    this.scene.addChild( this.cartNode );

    var goButtonImage = new Image( getImage( 'go_up' ), {x: 420, y: 386, cursor: 'pointer'} );
    goButtonImage.addInputListener(
        {
          over: function( event ) {
            goButtonImage.image = getImage( 'go_hover' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
          },
          out: function( event ) {
            goButtonImage.image = getImage( 'go_up' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
          },
          down: function( event ) {
            goButtonImage.image = getImage( 'go_pressed' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
            view.model.set( {running: !view.model.get( "running" )} );
          },
          up: function( event ) {
            goButtonImage.image = getImage( 'go_hover' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
          }
        } );
    var goButtonText = new Text( Strings.go, {fontSize: '34px', backend: 'svg'} );
    goButtonText.x = goButtonImage.width / 2 - goButtonText.width / 2 - 5;
    goButtonText.y = goButtonImage.height / 2 + 7;
    goButtonImage.addChild( goButtonText );

    view.model.on( "change:running", function( m, running ) {
      goButtonText.text = running ? Strings.pause : Strings.go;
      goButtonText.x = goButtonImage.width / 2 - goButtonText.width / 2 - 5;
      goButtonText.y = goButtonImage.height / 2 + 7;
    } );
    this.scene.addChild( goButtonImage );

    //Get the closest knot that is grabbable and within range
    function getTargetKnot( pullerNode ) {
      var rightType = _.filter( knots, function( knot ) {
        return knot.type == pullerNode.puller.get( "type" );
      } );
      var filtered = _.filter( rightType, function( knot ) {return knot.puller === undefined;} );
      if ( filtered.length == 0 ) {
        return null;
      }
      var distance = function( knot ) {
        var dx2 = Math.pow( pullerNode.centerX - knot.centerX, 2 );
        var dy2 = Math.pow( pullerNode.centerY - knot.centerY, 2 );
        return Math.sqrt( dx2 + dy2 );
      };
      var closestAvailable = _.min( filtered, distance );
      return distance( closestAvailable ) < 200 ? closestAvailable : null;
    }

    function hideKnots() {
      _.each( knots, function( knot ) {knot.visible = false} );
    }

    function highlightClosestKnot( pullerNode ) {
      hideKnots();
      var closestKnot = getTargetKnot( pullerNode );

      //TODO: why is this sometimes undefined
      if ( closestKnot === undefined || closestKnot == null ) {
      }
      else {
        closestKnot.visible = true;
      }
    }

    View.prototype.getNetForce = function() {
      return this.getLeftForce() + this.getRightForce();
    };

    View.prototype.getLeftForce = function() {
      var leftForce = 0;
      for ( var i = 0; i < knots.length; i++ ) {
        leftForce += knots[i].puller === undefined ? 0 : knots[i].type == blue ? -100 : 0;
      }
      return leftForce;
    };
    View.prototype.getRightForce = function() {
      var rightForce = 0;
      for ( var i = 0; i < knots.length; i++ ) {
        rightForce += knots[i].puller === undefined ? 0 : knots[i].type == red ? 100 : 0;
      }
      return rightForce;
    };

    var arrowTailX = view.cartNode.centerX;
    View.prototype.updateForces = function() {
      var x = arrowTailX;
      var tailWidth = 25;
      var headWidth = 50;
      var headHeight = 40;
      view.leftArrow.shape = arrow( x, 100, x + this.getLeftForce(), 100, tailWidth, headWidth, headHeight );
      view.rightArrow.shape = arrow( x, 100, x + this.getRightForce(), 100, tailWidth, headWidth, headHeight );
      view.sumArrow.shape = arrow( x, 40, x + this.getNetForce(), 40, tailWidth, headWidth, headHeight );
    };

    //Add toolbox backgrounds for the pullers
    view.scene.addChild( new Path( {shape: Shape.roundRect( 25, 400, 300, 250, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    view.scene.addChild( new Path( {shape: Shape.roundRect( 623, 400, 300, 250, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

    view.model.pullers.each( function( puller ) {
      puller.on( 'change:x change:y', function( puller ) {
        highlightClosestKnot( puller.node );
        view.updateForces();
      } );
      view.scene.addChild( new PullerNode( puller, view.model, getPullerImage( puller, false ), getPullerImage( puller, true ), {
        end: function( event ) {

          _.each( knots, function( knot ) {knot.visible = false} );
          var pullerNode = event.trail.lastNode();
          var closestKnot = getTargetKnot( pullerNode );
          closestKnot.puller = pullerNode;
          pullerNode.knot = closestKnot;
          pullerNode.x = pullerNode.puller.type == red ? closestKnot.centerX : closestKnot.centerX - pullerNode.width;
          pullerNode.y = closestKnot.centerY - pullerNode.height + 100;
          view.updateForces();
        }
      } ) );
    } );

    this.scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    this.scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    //Fit to the window and render the initial scene
    $( window ).resize( function() { view.resize(); } );
    this.resize();

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animloop() {
      requestAnimFrame( animloop );
      view.updatePhysics();
      view.render();
    })();
  }

  View.prototype.resize = function() {
    var width = $( window ).width();
    var height = $( window ).height();

    var scale = Math.min( width / 981, height / 644 );

    this.scene.resize( width, height );
    this.scene.setScale( scale );

    var skyHeight = (376) * scale;
    var groundHeight = height - skyHeight;

    //Clear raphael layers and rebuild
    $( "#background" ).empty();

    //Show the sky
    var paper = Raphael( document.getElementById( "background" ), width - 5, height - 5 );
    var sky = paper.rect( 0, 0, width - 5, height - groundHeight );
    sky.attr( 'fill', '90-#cfecfc-#02ace4' );
    sky.attr( 'stroke', '#fff' );

    //Show the ground
    var ground = paper.rect( 0, height - groundHeight, width, groundHeight );
    ground.attr( 'fill', '#c59a5b' );
    ground.attr( 'stroke', '#fff' );

    this.render();
  };

  View.prototype.updatePhysics = function() {
    if ( this.model.get( 'running' ) ) {
      var netForce = this.getNetForce();
      var newV = this.model.cart.get( 'v' ) + netForce / 20000;
      this.model.cart.set( {v: newV,
                             x: this.model.cart.get( 'x' ) + newV} );
    }
  };

  View.prototype.render = function() {
    this.scene.updateScene();
  };

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function( callback ) {
             window.setTimeout( callback, 1000 / 60 );
           };
  })();

  return View;
} );