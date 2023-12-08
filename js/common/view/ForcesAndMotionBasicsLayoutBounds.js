// Copyright 2014-2020, University of Colorado Boulder

/**
 * The Bounds2 instance to be used for layout in all of the Forces and Motion: Basics screens.
 *
 * The aspect ratio that this sim was coded for differs by 7% than the one we eventually decided upon.
 * aspect ratio of this screen: 981/604=1.62
 * aspect ratio for default: 768/504=1.52
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

// A PhET wide decision was made to not update custom layout bounds even if they do not match the
// default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
// any phet-io instrumention. https://github.com/phetsims/phet-io/issues/1939
const ForcesAndMotionBasicsLayoutBounds = new Bounds2( 0, 0, 981, 604 );

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsLayoutBounds', ForcesAndMotionBasicsLayoutBounds );

export default ForcesAndMotionBasicsLayoutBounds;