/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;