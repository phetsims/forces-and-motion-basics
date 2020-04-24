/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;