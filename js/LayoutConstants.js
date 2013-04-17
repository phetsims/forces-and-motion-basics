//Main class that represents one simulation, including the tabs, home screen, play area, etc.
define( function( require ) {
  "use strict";

  var simHeight = 644;
  var navBarHeight = 40;
  var tabWidth = 981;

  return {
    //The width of the stage
    WIDTH: tabWidth,

    //The height of the entire stage including the space for the tab navigation bar
    HEIGHT: simHeight,

    //The height of the stage available for the simulation tab content, does not include the tab navigation bar
    TAB_HEIGHT: simHeight - navBarHeight,

    TAB_WIDTH: tabWidth,

    NAV_BAR_HEIGHT: navBarHeight};
} );