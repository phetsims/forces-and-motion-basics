// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Input = require( 'SCENERY/input/Input' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );

  /**
   * Create a PullerNode for the specified puller
   *
   * @param {Puller} puller
   * @param {NetForceModel} model
   * @param {Image} image image of the puller standing upright
   * @param {Image} pullImage image of the puller exerting a force
   * @param {KnotFocusRegion} knotRegionNode
   * @param {PullerToolboxNode} pullerToolboxNode
   * @param {object} options
   * @constructor
   */
  function PullerNode( puller, model, image, pullImage, knotRegionNode, pullerToolboxNode, options ) {
    this.puller = puller;
    var pullerNode = this;
    this.puller.node = this;//Wire up so node can be looked up by model element.
    this.standImage = image; // @private
    this.pullImage = pullImage; // @private
    this.accessiblePullerId = 'puller-' + puller.type + '-' + puller.x;
    var x = puller.position.x;
    var y = puller.position.y;

    Image.call( this, this.standImage, {
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86,
      focusable: puller.focusable,
      textDescription: puller.textDescription
    } );

    puller.focusableProperty.link( function( focusable ) {
      pullerNode.focusable = focusable;
    } );
    puller.textDescriptionProperty.link( function( textDescription ) {
      pullerNode.textDescription = textDescription;
    } );

    //model.on( 'reset-all', pullerNode.updateLocation );
    model.on( 'reset-all', function() {
      pullerNode.updateLocation( puller, model );
    } );

    model.startedProperty.link( function() {
      pullerNode.updateLocation( puller, model );
    } );
    puller.positionProperty.link( function() {
      pullerNode.updateLocation( puller, model );
    } );

    puller.hoverKnotProperty.link( function( hoverKnot ) {
      if ( hoverKnot ) {
        var pullingOffset = puller.standOffsetX;
        var blueOffset = pullerNode.puller.type === 'blue' ? -60 + 10 + pullerNode.width / 2 : -pullerNode.width / 2;
        pullerNode.setTranslation( hoverKnot.x + pullingOffset + blueOffset, hoverKnot.y - pullerNode.height + 90 - 120 );
      }
    } );

    model.startedProperty.link( function() {
      pullerNode.updateImage( puller, model );
    } );
    model.runningProperty.link( function() {
      pullerNode.updateImage( puller, model );
    } );

    pullerNode.addInputListener( new SimpleDragHandler(
      {
        allowTouchSnag: true,
        start: function() {
          var knot = puller.knot;
          puller.disconnect();
          puller.dragging = true;
          pullerNode.moveToFront(); // TODO: breaks pooling of AccessibleInstance, usnure about dispose function.
          puller.trigger( 'dragged' );
          pullerNode.updateImage( puller, model );

          //Hack around the puller position, which seems to be broken for blue pullers for unknown reasons
          if ( knot && puller.type === 'blue' ) {
            puller.position = puller.position.plusXY(
              puller.size === 'small' ? -50 :
              puller.size === 'medium' ? -30 :
              -40,
              puller.size === 'small' ? -30 :
              puller.size === 'medium' ? -90 :
              -140 );
          }
          pullerNode.updateLocation( puller, model );
        },
        end: function() {
          pullerNode.updateLocation( puller, model );
          puller.dragging = false;
          puller.trigger( 'dropped' );
          pullerNode.updateImage( puller, model );
        },
        translate: function( event ) {
          pullerNode.puller.position = event.position;
        }
      } ) );

    this.addInputListener( {
      keydown: function( event, trail ) {
        var keyCode = event.domEvent.keyCode;
        var focusContext = null;
        if ( keyCode === Input.KEY_ENTER || keyCode === Input.KEY_SPACE ) {
          if ( puller.knot ) {
            puller.disconnect();
            puller.positionProperty.reset();
            model.numberPullersAttached = model.countAttachedPullers();
            pullerNode.updateImage( puller, model );
            pullerNode.updateLocation( puller, model );
          }
          else {
            var knot = model.getClosestOpenKnotFromCart( puller );
            puller.setValues( { position: new Vector2( knot.x, knot.y ) } );
            model.numberPullersAttached = model.countAttachedPullers();
            puller.dragging = false;
            puller.trigger( 'dropped' );
            pullerNode.updateImage( puller, model );
            pullerNode.updateLocation( puller, model );
          }
        }
        else if ( keyCode === Input.KEY_LEFT_ARROW || keyCode === Input.KEY_RIGHT_ARROW ) {

          // Move to an adjacent open knot.
          var delta = (keyCode === Input.KEY_LEFT_ARROW) ? -1 : +1;

          if ( puller.knot !== null ) {
            model.movePullerToAdjacentOpenKnot( puller, delta );
          }
        }
        else if ( keyCode === Input.KEY_ESCAPE ) {
          focusContext = Input.focusContexts[ Input.focusContexts.length - 1 ];
          Input.popFocusContext( focusContext );

          model.pullers.forEach( function( puller ) {
            puller.focusable = false;
          } );
        }
        else if ( keyCode === Input.KEY_TAB ) {

          // This tremendous hack is necessary because elements get a tab event when they *receive* focus
          // for the first time.  When that bug in Input.js is fixed, then this will be buggy.
          // The desired behavior is for the focus to leave the group after tabbing through all pullers.
          if ( puller.size === 'small' && !puller.other ) {
            var shiftPressed = Input.pressedKeys.indexOf( Input.KEY_SHIFT ) >= 0;
            if ( !shiftPressed ) {
              focusContext = Input.focusContexts[ Input.focusContexts.length - 1 ];
              Input.popFocusContext( focusContext );

              model.pullers.forEach( function( puller ) {
                puller.focusable = false;
              } );

              Input.moveFocus( +1 );
            }
          }
        }
      }
    } );

    // outfit for accessibility
    this.setAccessibleContent( {
      createPeer: function( accessibleInstance ) {

        /* will look like:
         * <div id="bluePuller1" aria-dropeffect="none" aria-labelledby="bluePuller1_label"
         *  aria-grabbed="false class="Puller">
         * </div >
         */
        var domElement = document.createElement( 'div' );
        domElement.tabIndex = '-1';
        domElement.setAttribute( 'aria-grabbed', 'false' );
        domElement.draggable = true;
        domElement.className = 'Puller';

        /*
         * The following is a latest iteration of drag and drop behavior for the pullers in the net force screen of
         * Forces and Motion: Basics.  The behavior is defined in the excel spreadsheet which prototypes this design:
         *
         * https://docs.google.com/spreadsheets/d/1r_z3t0sTP2NtgfAPuFdNJat6fxVZ8ian2SWoqd-fxfw/edit#gid=0
         */
        domElement.addEventListener( 'keydown', function( event ) {

          // experimenting with restricting choice control to arrow keys.  Come back to this line and discuss with others.
          event.preventDefault();

          var knot = puller.knot;

          if ( pullerNode.grabbed ) {

            // if the puller is already grabbed, 'escape' should exit move mode and place the puller at its previous
            // location.
            if ( event.keyCode === Input.KEY_ESCAPE ) {
              //make sure that the puller is not draggable.
              pullerNode.grabbed = false;
              domElement.setAttribute( 'aria-grabbed', 'false' );
              pullerNode.updateImage( puller, model );
              pullerNode.updateLocation( puller, model );
            }
            else if ( event.keyCode === Input.KEY_LEFT_ARROW || event.keyCode === Input.KEY_RIGHT_ARROW ) {
              knot = puller.knot;

              // if the puller is knotted and grabbed, use arrow keys to update its knot.
              if ( pullerNode.grabbed ) {
                if ( puller.knot ) {
                  var moveLeft = event.keyCode === Input.KEY_LEFT_ARROW;
                  if ( moveLeft ) {
                    knot = model.movePullerToAdjacentOpenKnot( puller, -1 );
                  }
                  else {
                    knot = model.movePullerToAdjacentOpenKnot( puller, 1 );
                  }

                  if ( knot ) {
                    puller.setValues( { position: new Vector2( knot.x, knot.y ) } );
                    model.numberPullersAttached = model.countAttachedPullers();
                    puller.dragging = false;
                    puller.trigger( 'dropped' );
                    pullerNode.updateImage( puller, model );
                    pullerNode.updateLocation( puller, model );
                  }
                }
              }
            }
          }

          // if the puller is not grabbed, grab it for drag and drop
          else if ( !pullerNode.grabbed ) {
            if ( event.keyCode === Input.KEY_ENTER || event.keyCode === Input.KEY_SPACE ) {
              // the puller is already on a rope on the knot.  Place it right back in the toolbox.
              // TODO: This behavior is a placeholder, I am not sure how this should behave.
              if ( pullerNode.puller.knot !== null ) {
                pullerNode.puller.knot = null;

                var grabbedPuller = pullerNode.puller;
                grabbedPuller.reset();
                model.numberPullersAttached = model.countAttachedPullers();
                grabbedPuller.dragging = false;
                //grabbedPuller.trigger( 'dropped' );
                pullerNode.updateImage( grabbedPuller, model );
                pullerNode.updateLocation( grabbedPuller, model );
              }
              else {
                // notify AT that the puller is in a 'grabbed' state
                domElement.setAttribute( 'aria-grabbed', 'true' );
                pullerNode.grabbed = true;
                pullerNode.puller.draggingProperty.set( true );

                // enter 'move mode' by exiting this group, and entering the group of knots
                pullerToolboxNode.exitGroup( domElement.parentElement );

                var knotRegionType = puller.type === 'red' ? 'rightFocusRegion' : 'leftFocusRegion';
                var knotRegionElement = document.getElementById( knotRegionType );
                knotRegionNode.enterGroup( knotRegionElement );
              }
            }
          }
          domElement.addEventListener( 'blur', function( event ) {
            domElement.setAttribute( 'aria-grabbed', 'false' );
          } );
        } );

        var accessiblePeer = new AccessiblePeer( accessibleInstance, domElement );
        domElement.id = pullerNode.accessiblePullerId;

        return accessiblePeer;
      }
    } );

    this.mutate( options );
  }

  return inherit( Image, PullerNode, {

    updateImage: function( puller, model ) {
      var knotted = puller.knot;
      var pulling = model.started && knotted;
      this.image = pulling ? this.pullImage : this.standImage;

      //Reshape the focus rect when image changes
      //This was copied from updateLocation above to solve https://github.com/phetsims/forces-and-motion-basics/issues/55
      if ( knotted ) {
        var pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
        var blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
        this.setTranslation( puller.knot.x + pullingOffset + blueOffset, puller.knot.y - this.height + 90 );
      }
      else {
        this.setTranslation( puller.position );
      }
    },

    updateLocation: function( puller, model ) {
      var knotted = puller.knot;
      var pulling = model.started && knotted;
      if ( knotted ) {
        var pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
        var blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
        this.setTranslation( puller.knot.x + pullingOffset + blueOffset, puller.knot.y - this.height + 90 );
      }
      else {
        this.setTranslation( puller.position );
      }
    },

    dispose: function() {
      // TODO
    }
  } );
} );