define( function( require ) {
  "use strict";

  return {

    //The scale mapping between model units (meters) and stage coordinates, How much to translate model coordinates into view pixels for translating the background ground
    positionScale: 40,

    maxFriction: 0.5,

    maxSpeed: 20
  };
} );