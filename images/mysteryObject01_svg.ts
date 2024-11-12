/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="118" height="137" viewBox="0 0 118 137"><defs><style>.cls-1,.cls-3{fill:#ec1c24;stroke:#231f20}.cls-3{fill:#7b1c24}</style></defs><path d="M3.6 22.9h110.7v113.6H3.6zM.5.9h117v22H.5z" style="stroke:#231f20;fill:#c9da2a"/><path d="M51.5.5h16.4v136H51.5z" class="cls-1"/><path d="M2.6 65.4H116V80H2.6z" class="cls-1"/><path d="m86.6 95-9.5-1.8-3.5 9.2L60.5 78h17.3z" class="cls-1"/><path d="M88.1 70.9c2.2-3.5 4-9.4 3.4-13.4-.3-1.9-1.4-3.4-2.8-4.6-1.7-1.4-3.4-.9-5.2-1.5 2.5-.4 4.6-2.1 7-2.9 3-1 5.7-1.3 8.6-.3 5 1.7 6.6 7.8 6.4 12.6-.2 4.7-4 12.6-9.4 15.8-5.3 3.2-30.6 2.9-31.1.1.2 0 19.4-.2 23-5.9Z" class="cls-3"/><path d="M68.6 72.5c4.7.4 9.7-5.9 12.2-9.1 4.7-5.8 9.4-10.9 16.5-13.3 3.9-1.3 5.3 1.2 5.4.7.1-.4-3.9-2.8-4.8-2.9-1.9-.1-11.3-1.8-13.8-1.4-4.3.8-6.8 7.1-7.8 10.6-.9 2.9-.6 3.4-2.4 5.8-.9 1.3-1.8 3.3-2.4 3.9-1 .8-2.8 5.6-2.8 5.6Zm-1.5 6.3H49.6l2.9-13.5 16.9.1z" class="cls-1"/><path d="M52.8 70.1c.2-4.5-2.7-9.5-5.4-12.9-1-1.3-2.4-3.2-3.8-4-1.9-1.1-3.6.5-5.2 1.7s-2.9 2.6-4.2 4.3c-.9 1.2-3.2 4.3-3 5.7.2 1.3 4.1 3.1 5.4 3.7 2.1 1 4.1 1.6 6.2 2.4 3 1.2 5 3 7.5 4.7z" class="cls-3"/><path d="m26.6 94.4 9.5-1.8 3.5 9.2 13.6-22.5-16-3.1z" class="cls-1"/><path d="M41.5 52.2c-3-3-16.3-2.4-20.2-.5-5.9 3-9.5 9.8-9 16.1.7 8.1 2.7 9.6 9.9 9.6 6.4 0 12.6.9 19.1.9 2.5 0 4.9-.2 7.3-.3v-.7c-2.1-1.3-4.4-1.2-6.9-1.6-2.8-.4-5.6-1.1-8.4-1.4-8.7-.8-6.7-6.5-2.7-10.6 5.2-5.4 4.1-4.4 10.9-11.5Z" class="cls-1"/></svg>')}`;
export default image;