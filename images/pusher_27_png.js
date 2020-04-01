/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
