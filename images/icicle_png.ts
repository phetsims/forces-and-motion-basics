/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;