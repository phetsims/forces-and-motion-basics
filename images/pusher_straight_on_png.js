/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;