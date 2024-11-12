/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;