/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;