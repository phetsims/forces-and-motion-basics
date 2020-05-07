/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;