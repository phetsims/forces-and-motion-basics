define( function( require ) {
  "use strict";

  function MotionControlPanel( $tab, model, imageLoader ) {

    function wireUpCheckBox( model, attribute, selector ) {
      var toggle = function() { model[attribute] = !model[attribute]; };
      var $checkBox = $tab.find( selector );
      $checkBox.bind( "touchstart", toggle );
      $checkBox.bind( "click", toggle );

      model.sync( attribute, function( m, value ) {
        var $icon = $checkBox.find( 'i' );
        $icon.removeClass( "icon-check-empty" ).removeClass( "icon-check" );
        $icon.addClass( model[attribute] ? "icon-check" : "icon-check-empty" );
      } );
    }

    wireUpCheckBox( model, 'showForce', '.show-force-checkbox' );
    wireUpCheckBox( model, 'showValues', '.show-values-checkbox' );
    wireUpCheckBox( model, 'showMasses', '.show-masses-checkbox' );
    wireUpCheckBox( model, 'showSpeed', '.show-speed-checkbox' );
  }

  return MotionControlPanel;
} );