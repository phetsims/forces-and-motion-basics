/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const mipmaps = [
  {
    "width": 83,
    "height": 280,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 42,
    "height": 140,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 21,
    "height": 70,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 11,
    "height": 35,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAjCAYAAABCU/B9AAAAAklEQVR4AewaftIAAAOxSURBVG3BT2gcVRzA8e/7vTc7O9nd7Ca1NWljmpRoIbW1FoO2qL0oXsRDaSkUQVBBsRcVxIP45yJUELHgyR48CkW9KHgQPVhE8RJJVWpiE0jTZjdNNvt/u7sz7zlpRimLn48iMTE1dUF73mkFgYNNZ+2VeqX63s1S8QcSQmx8cvIdk0o9LyI5pbURJTu1MY/lCoUPuIMhZjzv4TNHD0ohO0Cj3WEoN8Di6k2+np0/BIwARWJCLOyFy5nAxzrH7rvy1JptBnwfJZIC7ichxG61mpf2Pf60zR04ykLVMv3USbL3PsC+wkAIzJHQxJrN5uWDQ+b16spieiTjsba0gGmWudXuXP1tfvEcCUMiG/iL6VTqQRGF0Q6UhN/OXvmcOwiJqyulj3ph1I4iSxhFYalcO1+8vvIud9DEBsePnf1zM/3SzCMzmW5tfWBwz36ZW7Mj11pDp00w3O3Wrs8R035h8tH00PhnYlKTjVp9YCJXoNiOuPjjX0NKe/eIlz7u4OewVV42wY6JM0p0zjnL5eUKl5cr3KaELaK9HUFh/JVb6wuXRLR/H9aCs/SzYZctSvuHiQlKdiKCc45+Nupedc6BUiPEBMg5GzWVUh36KZl1NqwCg0BeAMG5G4Cjj3K2hrMrCiVAIEAHnOV/OKUC5ywOQqAmzkWrKNkLKPoopKDEjIFdA1oSdZu/vPrsk2mN8+lzZGrXnv2juYztdX8iJm+fPTk/dXe2p3H025Exh954+ZR58cTMJWKK2GsvnJhNZ4PDNze71JtdfE+Ty3gM533a9Vbpwwtf7AasIabTXiebSZPNpKk32zaXCSSMIsIwoqfs94AlJsRWSxtf9sKQKLKEvbBOzGiNFuH8p1+dIyHEbhTXNz1j0FowRtfDMGKL5xmOzUw/REKIrRY3LAnPM63I2pDE9P6J3SSEWL3ebJNQSlnnXItEKpUqkBBi10vlsnOOhAO6JALfK5AQtpWiyLLFWtvD0SbhnAtICNsa1ln+5ZzrkfBSnkdC2NZwjtuccxZFk4QolSZh6OMczlobkuj1ooCEsG1QKcU2h4g0SIjwHzM8PHxkbGzsrSiy4IG1zlkbdgh8ttQb7RwwAhT19PT0d77vHy9X6mQCj1qtMWc8s2G0HFxYKvH73+tjo6Ojz2Wz2WUTRdFepRRrG43OtRt//Nputz9ZWlr6ZmpqKpXP558xxnha651a6yd0Pp9f11pvVKvV9xcWFt6sVCrzxMrl8sVsNrtLa32g0+msdjqdj/8BV6yYkph7OO8AAAAASUVORK5CYII="
  },
  {
    "width": 6,
    "height": 18,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAASCAYAAAB4i6/FAAAAAklEQVR4AewaftIAAAF+SURBVA3Bv2sTYRgH8O/7vO8laSRqLrEYmhM71CINSEAcFIM/BicRXHV1d3V19q9QECydnSwUi6I2BXWoF0tqERM8jyi9JL1crzyPz+djgsXF24VS6YUxxhfmT/0w7EA5a+2VR7cuNzxn0f3+81o/DJcA7NJ0PH5dDpZzr9bEQnBuBmAIRXEUfeFor2eTSGrueA3AFMpWL9x5xsVqZ973y6vdUSOba9Zmo/66M8befRdG/vteDBGeJ1t4AOAJwZjTEGEoYR6ISB1AkcB8AGMYyhiTQHgMoEA32+dzAyGo6pyr+GU3AzCmG+1m2Fny6FIDuLpcaj5+2PkG5Xb3trfaF0/dz/PjnCx54c7mcyj60N35TEQQYOI5h3h0cAhFP/aHiYhATaDOnvEXoCj+mwyYBcJyCOUV3EkoApAIBCySQpGhE1DUarXuQQBmTqFm2VEJygZB8HYyTVPPmdVB9G/la+/P9Uqlsm/r9frvX8P46ZuNj6/SIxMSUTHLspf/AZYuooBa8xR4AAAAAElFTkSuQmCC"
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = asyncLoader.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;