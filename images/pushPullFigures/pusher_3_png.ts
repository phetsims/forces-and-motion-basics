/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;