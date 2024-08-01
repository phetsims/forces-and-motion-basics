/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="460" height="211.3" viewBox="0 0 460 211.3"><path d="M460 108.9c0-30.9-38.5-56.6-89.3-62.1-8.7-15.3-28.1-25.9-50.6-25.9s-31.7 5.8-41.9 15.1c-1.3 0-2.7-.1-4-.1-3.5 0-7 .3-10.3.8C257.2 15.8 222.4 0 180.5 0S95.9 19.7 95.9 44s.3 4.6 1 6.8c-3.2-.3-6.5-.5-9.9-.5-48 0-87 31-87 69.2s39 69.2 87.1 69.2 31.8-3.6 44.9-9.9c18.7 19.5 51.9 32.5 89.7 32.5s69.3-12.3 88.3-31c3.9.2 7.8.4 11.8.4 24.9 0 47.9-4.6 66.3-12.4 41.9-8.9 71.8-32.1 71.8-59.3Z" style="stroke-width:0;fill:#f4fafb"/><path d="M100.1 62.7c-10.1-3.2-15.6-2-18.7-1.9-29 1.1-69.8 27.9-69.8 63.5s2.1 16.6 5.8 24c-.1-1.5-.2-3-.2-4.6 0-40.4 38.7-73.1 86.4-73.1s6.6.2 9.8.5c0 0 0-4.3-13.3-8.4m86-43.8c25.8 0 48.9 5.9 64.7 15.3-10.6-14.6-37.7-25-69.5-25S109 25.5 107.1 45.9c13.2-15.9 43.6-27 79-27" style="stroke-width:0;fill:#fff"/></svg>')}`;
export default image;