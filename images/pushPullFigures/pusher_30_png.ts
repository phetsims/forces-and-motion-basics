/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;