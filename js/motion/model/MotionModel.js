define( function( require ) {
  "use strict";
  function MotionModel() {}

  MotionModel.prototype = {

    //TODO: These methods held over from backbone prototype, needs to be deleted
    on: function() {},
    trigger: function() {},
    step: function() {}
  };
  return MotionModel;
} );