/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const mipmaps = [
  {
    "width": 91,
    "height": 126,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 46,
    "height": 63,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 23,
    "height": 32,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 12,
    "height": 16,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAklEQVR4AewaftIAAAJxSURBVF3ByU8TUQAH4N97M8O0pdLSAsWwSmU1igFJjeBCokajF/8D49WLiR68GBPCQQ8eFA/Gg0ENamI8aEJcUMEIRA3BHhRBuwASlloQmE776My8Z0mqafw+gqzg01tjmp4ypyI/r7Xtqu8KR6O+pfmQypKrMS748m+NXe++O3qfIkuWJeZ02CKKIumMMf/89LibG5oDRFRTQlpd+WpXJwAJWadPHW1x2NXOokJXWXz513YLilxUXAa3pxyWxZFmusvpL56VkNVYW8UaairOcs7Ll2JLQV9peUVDbS3hREZJsQ/xpSihBAsUWXeeDb9dXU/M2lV1i6LkVXncBYRtpLG12AsuODIEF4CErFgshhOHAosW53v91ZXluh4nSSJgWTKioQkktDiLLqxdlpDjUf/Q1yZ/5YBExb5m/5CvpmiEKAiCYC7+LUT7rvZ96JHwn4GR8djJjoheVMgOu5xUddgslHgt2+TM/KX+9+thGTl6r1w42LqjrjvJ2Gen4/aIzvhxp12CRAk50OZsAfBKRo6ddTVnnPn2drtdDaTSTWGv6zv+KiiQPMigyGFTlUbOOZEoVWZizfV6imATISD5eSQPGRRZgUAAkiRVaXoqOTWzKHoHo+ThYA24EBAC/1BkcX1lm0RpISFk9PHwRByE4mPUg3fBUmxipjCRQfcAIID3WHXlDQEhT02Gh1IbxgsIIQCCByMVCIbcIpEUBjLk8/XNrxOWGfCEV/K/nOshhmnu/sRTF9v3dxyRFaUUhOLmc7/15uXcE2TQVdPwCYF4wjRn1tLG9KpproVCP8KapnUZ6fQX0zAijLF7s3OhMWT8AdY4Gi9CBAhsAAAAAElFTkSuQmCC"
  },
  {
    "width": 6,
    "height": 8,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAAklEQVR4AewaftIAAADOSURBVGNkAIKz66Yd+P3n98fLF465f/785vPv338nMzEAATs7659fP39oKKnqsGloW4mwsjD5MjEAwecv3w7w8PCICwoJMgoKCjEwMTH+YmYAgrlrdhzycdD/b6yyzkGA++KfUxcZypgZgODEqklRMpKSBdzsF/7wcf/ml5b5spWJAQj4eLhcf/z6o3L0irokA8N/RkFuZm4WBgYGrm9fv2kfufpo5+WnrJ58XFL/ZcQe/maco6J9k5uZRezr37+dh+3MIhkZGAT27jxkBQAaw0jSiMBZ4QAAAABJRU5ErkJggg=="
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