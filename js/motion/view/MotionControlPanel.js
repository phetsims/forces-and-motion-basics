define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;

  function MotionControlPanel( $tab, motionModel, imageLoader ) {
    var state = motionModel.state;
    var toggle = function() { state.showForce = !state.showForce; };
    var $checkBox = $tab.find( '.show-force-checkbox' );
    $checkBox.bind( "touchstart", toggle );
    $checkBox.bind( "click", toggle );

    var update = function() {
      var $icon = $checkBox.find( 'i' );
      $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
      $icon.addClass( state.showForce ? "icon-check" : "icon-check-empty" );
    };
    watch( state, 'showForce', update );
    update();
  }

  return MotionControlPanel;
} );