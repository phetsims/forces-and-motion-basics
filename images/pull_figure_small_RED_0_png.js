/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;