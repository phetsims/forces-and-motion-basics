define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var PullerNode = require( "tugofwar/view/PullerNode" );
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
  var arrow = require( 'tugofwar/view/arrow' );
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var TugOfWarScenery = require( 'tugofwar/view/TugOfWarScenery' );
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function View( $images, model ) {
    var view = this;

    view.getImage = function( name ) {return $images.parent().find( 'img[src^="images/' + name + '"]' )[0];};

    view.model = model;
    view.controlPanel = new ControlPanel( model, view );
    view.scenery = new TugOfWarScenery( model, view );

    view.model.on( 'reset-all', function() {
      view.resetAll();
    } );

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animloop() {
      requestAnimFrame( animloop );
      view.updatePhysics();
      view.render();
    })();
  }

  View.prototype = {
    resize: function() {
      var width = $( window ).width();
      var height = $( window ).height() - 50;//leave room for the tab bar

      var scale = Math.min( width / 981, height / 644 );

      this.scene.resize( width, height );
      this.scene.setScale( scale );

      var skyHeight = (376) * scale;
      var groundHeight = height - skyHeight;

      //Clear raphael layers and rebuild
      $( "#background" ).empty();

      //Show the sky
      var paper = new Raphael( document.getElementById( "background" ), width - 5, height - 5 );
      var sky = paper.rect( 0, 0, width - 5, height - groundHeight );
      sky.attr( 'fill', '90-#cfecfc-#02ace4' );
      sky.attr( 'stroke', '#fff' );

      //Show the ground
      var ground = paper.rect( 0, height - groundHeight, width, groundHeight );
      ground.attr( 'fill', '#c59a5b' );
      ground.attr( 'stroke', '#fff' );

      var $tabIcons = $( '.tab-icons' );
      $tabIcons.css( {left: width / 2 - $tabIcons.width() / 2, bottom: 3} );
      $( '.icon-home' ).css( {left: width / 2 + $tabIcons.width() / 2, bottom: 3} );

      this.render();
    },
    updatePhysics: function() {
      if ( this.model.get( 'running' ) ) {
        var netForce = this.getNetForce();
        var newV = this.model.cart.get( 'v' ) + netForce / 20000;
        this.model.cart.set( {v: newV,
                               x: this.model.cart.get( 'x' ) + newV} );
      }
    },
    render: function() {
      this.scenery.scene.updateScene();
    },
    getNetForce: function() {
      return this.getLeftForce() + this.getRightForce();
    },

    getLeftForce: function() {
      var leftForce = 0;
      for ( var i = 0; i < this.scenery.knots.length; i++ ) {
        leftForce += this.scenery.knots[i].puller === undefined ? 0 : this.scenery.knots[i].type === blue ? -100 : 0;
      }
      return leftForce;
    },
    getRightForce: function() {
      var rightForce = 0;
      for ( var i = 0; i < this.scenery.knots.length; i++ ) {
        rightForce += this.scenery.knots[i].puller === undefined ? 0 : this.scenery.knots[i].type === red ? 100 : 0;
      }
      return rightForce;
    },

    updateForces: function() {
      this.scenery.updateForces();
    },
    resetAll: function() {
      this.scenery.hideKnots();
      this.scenery.updateForces();
    }
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