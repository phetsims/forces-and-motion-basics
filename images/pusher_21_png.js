/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;