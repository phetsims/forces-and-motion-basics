define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var PullerNode = require( "tugofwar/view/PullerNode" );
  var Shape = require( 'KITE/Shape' );
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
    this.view = view;
    var controlPanel = this;

    var handleShowSumOfForcesClick = function() { model.showSumOfForces = !model.showSumOfForces; };
    var $checkBox = $( '.sum-of-forces-checkbox' );
    $checkBox.bind( "click", handleShowSumOfForcesClick );

    this.model.link( 'showSumOfForces', function( model, showSumOfForces ) {
      var $icon = $( '.sum-of-forces-checkbox i' );
      $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
      $icon.addClass( showSumOfForces ? "icon-check" : "icon-check-empty" );
    } );

    var handleShowValuesClick = function() { model.showValues = !model.showValues; };
    var $checkBox2 = $( '.show-values-checkbox' );
    $checkBox2.bind( "click", handleShowValuesClick );

    this.model.link( 'showValues', function( model, showValues ) {
      var $icon = $( '.show-values-checkbox i' );
      $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
      $icon.addClass( showValues ? "icon-check" : "icon-check-empty" );
    } );

    var $resetAllButton = $( '.reset-all-button' );
    $resetAllButton.bind( 'click', model.resetAll.bind( model ) );

    var $volumeButton = $( '.volume-button' );
    var volumeButtonEvent = function() { view.model.volumeOn = !view.model.volumeOn; };//This pattern looks like it could be factored out.
    model.link( 'volumeOn', function( m, volumeOn ) {
      $volumeButton.find( 'i' ).removeClass( 'icon-volume-up' ).removeClass( 'icon-volume-off' ).addClass( volumeOn ? 'icon-volume-up' : 'icon-volume-off' );
    } );
    $volumeButton.bind( 'click', volumeButtonEvent );
  }

  return ControlPanel;
} );