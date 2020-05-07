/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;