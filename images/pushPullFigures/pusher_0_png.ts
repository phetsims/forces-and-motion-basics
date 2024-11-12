/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;