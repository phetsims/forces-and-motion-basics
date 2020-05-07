/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;