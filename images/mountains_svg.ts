/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="321.8" height="66.3" viewBox="0 0 321.8 66.3"><defs><style>.cls-1,.cls-2{fill:#fff;stroke:#231f20}.cls-2{fill:#9a9d85}</style></defs><path d="m166.4 50 55.3 15.8h99.8c-40.3-20.9-83.2-45.7-95.2-57.7s-9.8-9.1-21.8 3.6-23.4 29.1-38 38.3Z" class="cls-2"/><path d="M202.3 14c7.5 1.7 7.3 1.6 9.4 3.5 2.2 1.9 5.5 6 7 1.9 1.4-4.1 2.9-5.5 5.8-4.3s6.6 3.4 10.4.4c-2.7-2.2-7-5.6-8.7-7.3-12-12-9.8-9.1-21.8 3.6-.5.5-1.5 1.7-2 2.3Z" class="cls-1"/><path d="m193.4 44-36.6 21.8H.1c22.7-5.9 91.4-28 106.6-45.7 15.2-17.6 15.5-24.8 25.3-15 7.3 7.3 35.7 28.2 61.4 38.9Z" class="cls-2"/><path d="M149.7 19c-5.8-3.1-21.2-6.2-25.4-2-4.1 4.1-15.9 8.7-20.2 6.3.9-1 1.7-1.8 2.5-2.8 15.2-17.6 15.5-24.8 25.3-15s10.3 8.6 17.7 13.6Z" class="cls-1"/><path d="M243 65.8H124.3C141.6 52.2 160 30 164.5 24.2c6.6-8.7 10-5.7 16 1.4 5.5 6.5 36.1 32.7 62.5 40.2Z" class="cls-2"/><path d="M201 43.2c-9.7-6.8-6.7-5.1-12.2-1.8s-4.9 5.1-14.6-1.4c-9.8-6.5-15.6-4.7-22-1 6-6.6 10.5-12.2 12.4-14.8 6.6-8.7 10-5.7 16 1.4 2.5 3 10.3 10.1 20.5 17.6Z" class="cls-1"/></svg>')}`;
export default image;