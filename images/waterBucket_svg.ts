/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="135.34" height="137.35" viewBox="0 0 135.34 137.35"><defs><style>.cls-3{stroke-linecap:round;stroke-linejoin:round;stroke:#231f20}.cls-7{opacity:.2;fill:#000}.cls-10,.cls-7,.cls-9{stroke-width:0}.cls-3{fill:none}.cls-11,.cls-9{opacity:.5}.cls-10,.cls-9{fill:#fff}.cls-10{opacity:.25}</style></defs><path d="m125.21 24.44-.11-.02c-11.69 2.25-35.46 4.94-57.66 4.94-30.66 0-56.2-3.58-62.83-6.78l11.31 114.26H119.4l11.31-114.29c-1.22.64-3.06 1.3-5.51 1.89Z" class="cls-11" style="stroke:#000;fill:#b7b7b7"/><path d="m125.21 24.44-.11-.02c-4.72.91-6.42.63-14.18 1.48-.15.02-.32.03-.47.05-.15 6.99-5.22 94.08-14.17 110.9h23.12l11.31-114.29c-1.22.64-3.06 1.3-5.51 1.89Z" class="cls-7"/><path d="m13.34 25.08 10.78 111.77h8.78L22.27 26.56c-3.36-.47-6.35-.97-8.93-1.49Z" class="cls-9"/><path d="m4.62 22.58 11.31 114.26h8.2L13.34 25.08c-4.01-.81-7.01-1.66-8.73-2.49Z" class="cls-10"/><path d="m125.21 24.44-.11-.02c-11.69 2.25-35.46 4.94-57.66 4.94-30.66 0-56.2-3.58-62.83-6.78l11.31 114.26H119.4l11.31-114.29c-1.22.64-3.06 1.3-5.51 1.89Z" style="stroke:#000;fill:none"/><path d="M4.82 21.8.7 10.12v2.81c.69 28.24 8.94 81.17 64.15 84.52 16.97 1.03 33.53-5.07 44.57-13.58 16.97-13.08 24.17-34.5 25.06-65.44.02-.76.45-7.56-.18-7.96l-3.92 11.22c-.85 27.27-8.97 47.84-24.3 59.65-10.13 7.81-24.77 11.61-40.48 11.28-20.04-.42-38-13.19-44.7-22.68C11.81 57.05 5.19 36.96 4.82 21.8" style="fill:#939292;stroke-linecap:round;stroke-linejoin:round;stroke:#000"/><g class="cls-11"><path d="m134.84 5.09-2.42 15.83v-.14c0 1.04-2.51 2.42-7.2 3.55l-.11-.02c-11.69 2.25-35.46 4.94-57.66 4.94-35.72 0-64.53-4.87-64.53-8.32L.5 5.1h134.33Z" style="stroke-linecap:round;stroke-linejoin:round;fill:#b7b7b7;stroke:#231f20"/><path d="M134.7 5.21c0 2.6-28.91 7.47-65.97 7.47S.5 7.8.5 5.21 30.54.5 67.6.5s67.1 2.11 67.1 4.71" style="stroke-linecap:round;stroke-linejoin:round;stroke:#231f20;fill:#838383"/></g><path d="m132.11 6.01 2.48-.29-1.25 8.78-1.25 6.27s-.68.85-1.25 1.25c-.6.43-2.1.83-3.8 1.5-1.17.48-2.7.96-4.55 1.37h-.11c-2.22.41-4.89.83-7.88 1.27.43-5.32.82-10.61 1.28-15.93 10.23-1.43 16.35-3.09 16.35-4.24Z" class="cls-7"/><path d="M21.17 26.42c-1.93-.29-3.72-.57-5.34-.89-1.45-.25-2.79-.54-3.98-.83-.4-5.8.77-14.02 1-15.58 2.56.41 5.52.86 8.78 1.27-.48 4.01-1.14 11.02-.34 15.17l-.11.86Z" class="cls-9"/><path d="M12.84 9.12c-.23 1.56-1.39 9.78-1 15.58-1.93-.45-3.5-.89-4.72-1.37-1.79-.64-3.86-1.47-3.86-2.07L1.59 12 .6 5.73c.09.92 5.42 2.25 12.25 3.39Z" class="cls-10"/><path d="M134.84 5.09h-.18s.04.08.04.12c0 2.6-28.91 7.47-65.97 7.47S1.2 7.91.53 5.29l2.39 15.64c0 3.45 28.8 8.31 64.52 8.31 22.2 0 45.97-2.69 57.66-4.94l.11.02c4.69-1.13 7.21-2.5 7.21-3.55v.14l2.41-15.83ZM.54 5.1H.5v.07s.03-.05.04-.07" class="cls-3"/><path d="m126.86 24.29-1.05.26c-2.22.41-4.16.83-7.14 1.27-1.62.22-3.33.45-5.15.67-12.71 1.56-29.6 2.9-45.69 2.9-17.46 0-33.26-1.12-45-2.61-1.36-.19-2.67-.35-3.89-.54-1.93-.29-3.72-.57-5.34-.89-1.45-.25-2.79-.54-3.98-.83-1.93-.45-3.5-.89-4.72-1.37l-.03.1c.06 2.45.28 5.03.68 7.71 2.81.7 5.88 1.31 9.15 1.88 2.84.48 5.86.92 8.98 1.34 25.33 3.22 59.28 3.25 89.47-.61 6.03-.76 10.72-1.75 16.35-2.84.26-2.45.45-4.88.53-7.5-1.17.48-1.32.65-3.17 1.06" style="fill:#000;stroke-width:0;opacity:.15"/><path d="M134.77 5.21c0 2.6-28.91 7.47-65.97 7.47S.57 7.8.57 5.21 30.61.5 67.67.5s67.1 2.11 67.1 4.71" class="cls-3"/></svg>')}`;
export default image;