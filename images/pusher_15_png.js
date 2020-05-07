/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;