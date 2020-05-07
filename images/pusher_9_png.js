/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;