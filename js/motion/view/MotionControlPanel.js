define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;
  var sync = WatchJS.sync;

  function MotionControlPanel( $tab, motionModel, imageLoader ) {
    var state = motionModel.state;

    function wireUpCheckBox( state, attribute, selector ) {
      var toggle = function() { state[attribute] = !state[attribute]; };
      var $checkBox = $tab.find( selector );
      $checkBox.bind( "touchstart", toggle );
      $checkBox.bind( "click", toggle );

      sync( state, attribute, function() {
        var $icon = $checkBox.find( 'i' );
        $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
        $icon.addClass( state[attribute] ? "icon-check" : "icon-check-empty" );
      } );
    }

    wireUpCheckBox( state, 'showForce', '.show-force-checkbox' );
    wireUpCheckBox( state, 'showValues', '.show-values-checkbox' );
    wireUpCheckBox( state, 'showMasses', '.show-masses-checkbox' );
    wireUpCheckBox( state, 'showSpeed', '.show-speed-checkbox' );
  }

  return MotionControlPanel;
} );