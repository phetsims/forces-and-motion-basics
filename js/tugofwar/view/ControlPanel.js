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
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function ControlPanel( model, view ) {
    this.model = model;

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
      view.hideKnots();
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

  }

  return ControlPanel;
} );