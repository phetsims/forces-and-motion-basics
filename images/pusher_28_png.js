/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;