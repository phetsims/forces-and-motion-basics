define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;
  var sync = WatchJS.sync;

  function MotionControlPanel( $tab, motionModel, imageLoader ) {
    var state = motionModel.state;
    var toggle = function() { state.showForce = !state.showForce; };
    var $checkBox = $tab.find( '.show-force-checkbox' );
    $checkBox.bind( "touchstart", toggle );
    $checkBox.bind( "click", toggle );

    sync( state, 'showForce', function() {
      var $icon = $checkBox.find( 'i' );
      $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
      $icon.addClass( state.showForce ? "icon-check" : "icon-check-empty" );
    } );
  }

  return MotionControlPanel;
} );