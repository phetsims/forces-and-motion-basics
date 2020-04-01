/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
