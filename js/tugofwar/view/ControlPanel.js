define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var PullerNode = require( "tugofwar/view/PullerNode" );
  var Shape = require( 'SCENERY/shapes/Shape' );
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

    var handleShowSumOfForcesClick = function() { view.model.set( {'showSumOfForces': !view.model.get( 'showSumOfForces' )} ); };
    var $checkBox = $( '.sum-of-forces-checkbox' );
    $checkBox.bind( "touchstart", handleShowSumOfForcesClick );
    $checkBox.bind( "click", handleShowSumOfForcesClick );

    var updateSumForcesCheckBox = function( model, showSumOfForces ) {
      var $icon = $( '.sum-of-forces-checkbox i' );
      $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
      $icon.addClass( showSumOfForces ? "icon-check" : "icon-check-empty" );
    };
    this.model.on( 'change:showSumOfForces', updateSumForcesCheckBox );
    updateSumForcesCheckBox( model, model.get( 'showSumOfForces' ) );

    var handleShowValuesClick = function() { view.model.set( 'showValues', !view.model.get( 'showValues' ) ); };
    var $checkBox2 = $( '.show-values-checkbox' );
    $checkBox2.bind( "touchstart", handleShowValuesClick );
    $checkBox2.bind( "click", handleShowValuesClick );

    var updateShowValuesCheckBox = function( model, showValues ) {
      var $icon = $( '.show-values-checkbox i' );
      $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
      $icon.addClass( showValues ? "icon-check" : "icon-check-empty" );
    };
    this.model.on( 'change:showValues', updateShowValuesCheckBox );
    updateShowValuesCheckBox( model, model.get( 'showValues' ) );

    var $resetAllButton = $( '.reset-all-button' );
    $resetAllButton.bind( 'touchstart', model.resetAll.bind( model ) );
    $resetAllButton.bind( 'click', model.resetAll.bind( model ) );

    var $volumeButton = $( '.volume-button' );
    var volumeButtonEvent = function() { view.model.set( 'volumeOn', !view.model.get( 'volumeOn' ) ); };//This pattern looks like it could be factored out.
    model.on( 'change:volumeOn', function( m, volumeOn ) {
      $volumeButton.find( 'i' ).removeClass( 'icon-volume-up' ).removeClass( 'icon-volume-off' ).addClass( volumeOn ? 'icon-volume-up' : 'icon-volume-off' );
    } );
    model.trigger( 'change:volumeOn' );
    $volumeButton.bind( 'touchstart', volumeButtonEvent );
    $volumeButton.bind( 'click', volumeButtonEvent );
  }

  return ControlPanel;
} );