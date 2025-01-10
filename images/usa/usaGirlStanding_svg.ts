/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="USA" width="65" height="196" viewBox="0 0 65 196"><defs><style>.cls-1{fill:#b32b33}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke-width:0}.cls-2{fill:#dfbfa4}.cls-3{fill:#010101}.cls-8,.cls-9{fill:none;stroke:#000;stroke-width:.6px}.cls-8{stroke-linecap:round;stroke-linejoin:round}.cls-9{stroke-miterlimit:10}.cls-4{fill:#636566}.cls-5{fill:#967447}.cls-6{fill:#fcd10f}</style></defs><path d="M64.4 188.5c-1.6 4-8.7 6.4-12.5 4.7v-.2c-.3-3.1-.8-5.8 1.4-8.7.2-.2.4-.5.6-.7 1.7-1.7 4.6-3.1 5.9-3.2 3 1.7 5.9 4.2 4.8 7.7 0 .1 0 .2-.1.3Z" class="cls-1"/><path d="M64.4 188.5c.9 1.3 0 2.9-1 4-4.2 4.4-11.9 5-15.8-.2-1.6-2.1-2.6-3.9-4.9-5.3-2.8-1.7-3.3-1.7-3.3-5.1h.2c.3 1.1.7 1.9 2.2 3 1.9 1.4 3.5 2.3 5 4 1.5 1.6 3 3.4 5 4.3 3.8 1.7 10.9-.7 12.5-4.7Z" class="cls-1"/><path d="M48 92.2c-.3-1.2-.8-2.9-1-4.1-.4-1.8-.5-4.3-1-5.7 2.5-1 6.3-2.2 8.2-4.2.2-.2.4-.4.6-.5.8 4.5 3.1 10.8 3 14.2 0 4.1-6 8.6-9.8 10.1-.6.3-.5.3-1.3.5h-.2c-.4-2.7-1-6-1.4-8.4 1.2-.9 2-1.4 2.8-1.8Z" class="cls-2"/><path d="M41.8 22.2c-3.1-.2-6.8-.2-10.8.2-.9-3.2-2.1-7.2-.7-10.1-1.6 3-2.7 6.3-2.7 9.9-5.5.2-12.1 0-17.9 1.7-1.1.3-2.2.7-3.2 1.2-1.9.9-3.6 2-5 3.5C3.7 20 6 11 13.7 5.9 16.5 4 21.1.4 24.7 0c4.5-.4 3.8 3.8 10.6 1.2 7.1-.1 10.1 3.3 11.8 4.8 4.2 3.9 9.4 16.3 10.4 25.3 1.2 11-2.7 15.2-6.4 24.3-4.5-1.1-7.7-1.6-12.6-2.8 1-1.4 1.9-2.9 2.6-4.4 3.5-7.5 3.7-16.5.8-25.6v-.6Z" class="cls-5"/><path d="M41.8 70.4s-.1-1.7-.1-2.3c0-1.1.4-2.2.7-3.3.8-2.4 2-3.9 4-5.4l.5-.8c4.2 2.2 4.8 6 5.9 7.5 1.5 2.1 4 8.6 4 8.6.1 1.9-.8 2.1-2 2.9-.2.1-.4.3-.6.5-1.9 1.9-5.7 3.2-8.2 4.2l-.6-.9c-1.8-2.9-2-7.7-3.6-10.1v-1Z" class="cls-6"/><path d="M52.2 176.6c1.1.9 2.5 1.4 3.9 2 1.1.5 2.4 1.1 3.8 1.9-1.3 0-4.2 1.5-5.9 3.2h-.1c0-.2-1.8-1.9-2.7-2.8-.6-.6-2.5-2.3-4.2-3.5-.8-1.7-.1-6.3 2.7-6.1 4.4.3 3.2 4 2.7 5.2Z" class="cls-1"/><path d="M46.9 177.4c1.7 1.2 3.6 2.9 4.2 3.5.9.8 2.8 2.5 2.7 2.6h.1c-.2.4-.4.6-.6.8-2.1 2.8-1.6 5.6-1.3 8.7v.2h-.1c-2-.9-3.5-2.6-5-4.3s-3.1-2.6-5-4c-1.4-1.1-1.9-1.9-2.2-3-.1-.6-.2-1.3-.4-2.2-.3-1.8-1.9-5.6.8-6.3h.4c0 .7 0 1.4-.1 2.1 1.2 1 2.8.5 4 .7.3 0 .7.2 1.2.5.4.2.8.5 1.2.8Z" class="cls-1"/><path d="M45.7 109.9c0-.1 0-.3-.1-.4h1.2c.7 2.3 1.6 5.6 1.6 5.6 2 5.5.9 5.4 5.7 18.2-.3.3-.8.6-1.4 1-1.2-1.8-3.9-12.8-5.9-20.3-.1-.6-.3-1.1-.4-1.6-.2-.9-.5-1.7-.7-2.4Z" class="cls-4"/><path d="M50.6 153c.4 5.7-1.7 7.7-1 18.3-4.2-.6-4.7 3.2-3.9 5.2-.5-.2-.9-.4-1.2-.4-1.2-.2-2.8.3-4-.7 0-.7 0-1.4.1-2.1 0-2.7 0-4.8-.5-7.5-1-5.4-3.7-10.8-3.9-16.3-.1-2.4.7-4.6.5-7-.1-2.4-1.2-3.1-1.8-5.4 3.8.6 7 .9 11 0 .6-.1 1.6-.5 2.7-.9.2 3-.3 5.8 0 8.4.4 2.4 1.9 5.8 2.1 8.4Z" class="cls-2"/><path d="M14.7 137.1c-1.7-.6-3.3-1.3-4.6-2.1 1.4-5.7 2.7-8.8 3.4-13.2.1-.9.3-1.8.5-2.8 2.1-1.1 4.8-3.2 4.1-5.8l-.6-1.1c.2-.6.4-1.3.3-2 .9.2 1.8.5 2.7.6h.4c.2 1.4-.3 3.2 1.8 2.6 0-.8-.1-1.7-.3-2.5 1.3.1 2.7.2 4 .3h3.9c1.7 0 3.3-.3 4.8-.6.3.3.6 1 .6 2 .3 0 1.2 0 1.5-.1.3-.7.2-1.5-.3-2.1q2.4-.6 4.2-1.2c.2.5.6 1.1.8 1.7.4 0 2.9-.8 3.5-1.1 0 .1 0 .3.1.4-.8.5-3.9 1.5-4.9 1.7 0 .6.3.7.4.8v.2c-.7 0-1.3-.2-1.7-.4-.1.4 0 1.4 0 1.8 1.3 0 6.8 1 7.3 0 2 7.5 4.8 18.5 5.9 20.3-1.2.7-2.8 1.4-4.2 1.9-1.1.4-2.1.8-2.7.9-4 1-7.2.6-11 0l-1.8-.3c0 .4-.4-3.4-1-7.4-.4-2.6-1-5.2-1.6-7-.1-.3-.2-.6-.3-.8-.1-.1-.3-.3-.6-.5-.8 2.9-1.9 16.3-2 17.1-4.8.9-9.1.2-12.8-1Z" class="cls-4"/><path d="M49.6 171.3c-2.8-.2-3.5 4.4-2.7 6.1-.4-.3-.9-.6-1.2-.8-.8-2.1-.3-5.9 3.9-5.3" class="cls-1"/><path d="M45.2 94c.3 2.5.9 5.7 1.4 8.5.2 1.4.4 2.7.5 3.6-.3.2-.7.5-1.3.9-.3.2-.6.3-.9.5-1 .5-2.2 1-3.7 1.5-1.2.4-2.7.8-4.2 1.2-.6.1-1.2.3-1.9.4q-2.25.45-4.8.6h-3.9c-1.3 0-2.7-.1-4-.3-.5 0-1 0-1.5-.2h-.4c-.9-.1-1.8-.4-2.7-.7-.5-.2-1-.3-1.4-.4-.3 0-.5-.1-.7-.2-.4 0-.8-.1-1.2-.2 0-2.2-.1-4.3-.2-6.5 0-3.1-.2-6.2-.2-9.3v-6c0-2 0-4.6-.1-7-5.2-1.6-4.2-1-6.7-3.9-.1-.1-.2-.3-.3-.4 1.1-2.9 3-11.9 5.8-14.6 1.8-1.7 3.1-4.5 11.3-4.3-2.8 3.7 0 7.8 2.1 9.2 4.5 3.3 11-.2 12.7-4.1.3-.8.9-3.4.6-5.1 3.3 0 5.7.6 7.5 1.5l-.5.8c-2 1.5-3.2 3-4 5.4-.3 1-.7 2.2-.7 3.3 0 .6 0 2.3.1 2.3v1c1.6 2.4 1.7 7.2 3.5 10.1v3.1c-.2 2.4-.4 4.8-.3 7.3 0 .6.1 1.3.2 2.2Z" class="cls-6"/><path d="M46.8 109.4h-1.1l-.1.1q-.45-1.35-.6-2.1c.3-.2.6-.3.9-.5h.4s.3 1.1.7 2.4Zm-.5 3c.1.5.3 1.1.4 1.6-.5 1-6 .2-7.3 0-.1-.4-.1-1.4 0-1.8.4.2 1 .3 1.7.4 1.7.2 3.8.1 5.2-.3Z" class="cls-4"/><path d="M46.3 112.4c-1.4.5-3.5.6-5.2.4v-.2c-.1-.1-.4-.2-.4-.8 1-.2 4.1-1.3 4.9-1.7.2.7.4 1.5.7 2.4Z" class="cls-4"/><path d="M38.4 52.8c5 1.3 8.1 1.7 12.6 2.8-.6 0-9.6-.6-13.7-1.8 0-.8-.1-1.6-.1-2.6 1.2-.8 2.4-1.8 3.7-2.8-.7 1.5-1.6 3-2.6 4.4Z" class="cls-5"/><path d="M44.9 107.5q.3.6.6 2.1c-.6.3-3.1 1.1-3.5 1.1-.2-.6-.6-1.2-.8-1.7 1.5-.5 2.7-1 3.7-1.5" class="cls-4"/><path d="M19.4 45c1.1 2 2.2 3.1 4.8 3.4 1.5.2 4.6-.1 6.2-1.1 1.5-.9 2.1-1.3 3.9-3.9-.8.8-10.4 3.1-14.8 1.5Zm17.8 6.3c-5.2 3.7-8.8 4.6-11.9 3.9-1.6-.4-3-1.1-4.5-2.2-1.4-1-2.9-2.3-4.5-3.7-3-2.6-4.1-4.8-5-8.7-.9-4.1 0-7.7 0-7.7-.7-3.1-1.6-6-1.7-9 5.7-1.7 12.4-1.6 17.9-1.7 0-3.7 1.2-6.9 2.7-9.9-1.4 2.9-.2 6.9.7 10.1 4-.4 7.7-.3 10.8-.2v.6c2.8 9.1 2.6 18.2-.9 25.6-1.3 1.1-2.5 2-3.7 2.8Zm-1.7-19.4c0-1.4-.6-2.4-1.3-2.4s-1.3 1.1-1.3 2.4.6 2.5 1.3 2.5 1.3-1.1 1.3-2.5m-18-.3c0-1.2-.5-2.1-1.1-2.1s-1.1 1-1.1 2.1.5 2.1 1.1 2.1 1.1-1 1.1-2.1" class="cls-2"/><path d="M39.4 57.2c.3 1.8-.2 4.3-.6 5.1-1.7 3.9-8.2 7.4-12.7 4.1-2-1.5-4.9-5.5-2.1-9.2.3-.4.7-.9 1.2-1.3-.1 4.1 2.4 8.8 6.7 6.8 2.5-1.2 5.4-2.9 5.7-4.8 0-.3.1-.5 0-.8 0-.5-.1-1.1-.2-1.7 1.2-.2 1.7.6 1.9 1.7Z" class="cls-6"/><path d="M37.6 57.9c-.6 1.8-3.3 3.4-5.6 4.5-4.4 2.1-7-3-6.7-7.1 3.1.6 6.7-.3 11.9-4 0 1 0 1.8.1 2.6 0 .6 0 1.1.1 1.6 0 .6.1 1.1.2 1.7v.8Z" class="cls-2"/><path d="M37 110.2c.4.6.6 1.4.3 2.1-.3.1-1.2.2-1.5.1 0-1-.3-1.7-.6-1.8.6-.2 1.3-.4 1.9-.5Z" class="cls-4"/><path d="M34.2 29.4c.7 0 1.3 1.1 1.3 2.4s-.6 2.5-1.3 2.5-1.3-1.1-1.3-2.5.6-2.4 1.3-2.4" class="cls-3"/><path d="M34.2 43.5c-1.8 2.6-2.4 2.9-3.9 3.9s-4.6 1.3-6.2 1.1c-2.5-.3-3.7-1.4-4.8-3.3 4.4 1.5 13.9-.8 14.8-1.6Z" style="stroke-width:0;fill:#fff"/><path d="M29.1 137.4c-.1-2.1 1-13.2 1.3-15 .6 1.7 1.2 4.4 1.6 7h-.1c0 2.6-.2 5.5-.3 7.7-.8.3-1.7.6-2.5.8v-.4Z" class="cls-4"/><path d="M28.7 137.8c-.4 0-.8.2-1.2.2 0-.7 1.1-14.2 2-17.1.3.2.5.3.6.5s.2.5.3.8c-.3 1.9-1.4 12.9-1.3 15.1v.4s-.2 0-.3.1Z" class="cls-4"/><path d="M27.5 138.1c.4 0 .8-.2 1.2-.2.4 1.7-.9 4.2-1.4 6 3.7 3.7 1.5 10.2.3 14.6-1.4 5.1-3.4 9-3.6 14v1.4c-.3 1.3-2.8 1.1-4.1.6h-.2c.9-1.6.5-3.1-1.2-3.9-.9-.5-2.1-.5-3.1-.4.2-2.8-.7-12-1-14.6-.4-3.6-1.2-7.3 1.3-11.8-.4-1.7-1-5.1-.9-6.8 3.6 1.2 8 1.9 12.8 1Z" class="cls-2"/><path d="M25.9 183.7c-1.1 1.7-3.8 2-5.3 2.9-1.8 1-3.5 2.3-5.4 3.3.9-.6-1.2-6.6-2.3-7.7l-.6-.4c2.1-2.1 4.2-3.5 5.9-5.2.5-.5 1-1.1 1.4-1.7l.1-.2h.2c1.2.4 3.7.6 4.1-.6v-1.4c2.3.7 1.1 2.6 1.2 4.3 0 1.8 1.6 4.5 1 6.3 0 .2-.2.4-.3.6Z" class="cls-1"/><path d="M.7 190h.2c5.1 3.7 8.4 3 13.8.1l.6-.3c1.8-1 3.5-2.3 5.4-3.3 1.6-.9 4.3-1.2 5.3-2.9.1.4.1.8 0 1.3-.5 2.4-3.9 3-5.8 4-2.7 1.5-5.8 4-8.7 5.2-3.7 1.6-13.3-.6-10.9-4.1z" class="cls-1"/><path d="M22.4 110.9c.2.8.3 1.7.3 2.5-2.1.6-1.6-1.3-1.8-2.6.5 0 1 .1 1.5.2Z" class="cls-4"/><path d="M20.8 53v.2c-4.5 1.3-12.7 2.2-16.9 0 2.6-4.1 5.3-21.5 2.6-27.7v-.2c.9-.5 2-.9 3.1-1.2.1 2.9 1 5.8 1.7 9 0 0-.9 3.5 0 7.7.9 3.8 2 6.1 5 8.7s3.1 2.7 4.5 3.7Z" class="cls-5"/><path d="M15.4 170.2c1-.2 2.2 0 3.1.4 1.7.8 2.1 2.3 1.2 3.9 0 0 0 .2-.1.2-.4.6-.9 1.2-1.4 1.7 2-3.1 1.7-6.6-4.9-5.1.3-.5 1.1-.9 2.2-1.1Z" class="cls-1"/><path d="M13.2 171.3c6.7-1.4 7 2 4.9 5.1-1.6 1.7-3.7 3.1-5.9 5.2-1.3-.8-4.5-2.4-7.4-1 .6-.4 1.2-.7 2-1.1 2.9-1.3 7-3.1 6.2-7.9 0-.1 0-.3.1-.4Z" class="cls-1"/><path d="M18.1 113.1c.7 2.6-2 4.7-4.1 5.8.2-.9.4-1.8.5-2.7 1.4-.6 2.7-1.9 3.5-3.1Z" class="cls-4"/><path d="m17.5 112.1.6 1.1c-.8 1.2-2.1 2.5-3.5 3.1.5-2.3.9-4.6 1.1-6.8.2 0 .5.1.7.2.3.6.3 1.6.3 2.5h.8Z" class="cls-4"/><path d="M17.9 110q0 1.2-.3 2.1h-.8c0-.9 0-1.9-.3-2.5.5.1 1 .3 1.4.4" class="cls-4"/><path d="M16.4 29.5c.6 0 1.1 1 1.1 2.1s-.5 2.1-1.1 2.1-1.1-1-1.1-2.1.5-2.1 1.1-2.1" class="cls-3"/><path d="M15.2 189.8c-.2.1-.4.3-.6.4-5.5 2.9-8.7 3.6-13.8-.2H.6c-.4-2.8.2-6.7 4.2-9.3 2.9-1.4 6.1.2 7.4 1 .3.2.5.4.6.4 1.2 1.1 3.2 7.2 2.3 7.7Z" class="cls-1"/><path d="M14 93.4c0 3.1.1 6.2.2 9.3-4.6-1.9-8.8-4.1-8.2-9.5.2-1.9.7-12.6 1.1-16.7 2.5 2.9 1.5 2.3 6.7 3.9 0 2.4.1 4.8.1 7v6Z" class="cls-2"/><path d="M35.2 1.2C28.4 3.8 29.1-.4 24.7 0c-3.5.4-8.1 4-11 5.8C6 11 3.7 20 1.4 28.7c1.5-1.5 3.2-2.7 5-3.5 1-.5 2.1-.9 3.2-1.2 5.7-1.7 12.4-1.6 17.9-1.7 0-3.7 1.2-6.9 2.7-9.9-1.4 2.9-.2 6.9.7 10.1 4-.4 7.7-.3 10.8-.2 1.7 0 3.2.2 4.5.3-.6-6-2.3-12.1-7.4-15.6" class="cls-9"/><path d="M20.7 53.1c-4.4 1.3-12.6 2.2-16.8 0C6.5 49 9.2 31.6 6.5 25.4M51 55.7c3.7-9.1 7.6-13.3 6.4-24.3-1-9-6.2-21.4-10.4-25.3-1.7-1.6-4.7-5-11.8-4.8" class="cls-9"/><path d="M41.8 22.8c2.8 9.1 2.6 18.2-.8 25.6-.7 1.5-1.6 3-2.6 4.4 5 1.3 8.1 1.7 12.6 2.8" class="cls-9"/><path d="M9.7 24c.1 2.9 1 5.8 1.7 9 0 0-.9 3.5 0 7.7.9 3.8 2 6.1 5 8.7s3.1 2.7 4.5 3.7c1.5 1 2.9 1.8 4.5 2.2 3.1.7 6.7-.2 11.9-3.9 1.2-.8 2.4-1.8 3.7-2.8M14.7 27c.8-1.8 2.3-1.6 3.1-.6m15.3.1c1.5-1.5 3.5-.7 3.8.4" class="cls-9"/><path d="M25.3 55.3c-.3 4.1 2.2 9.2 6.7 7.1 2.3-1.1 5-2.7 5.6-4.5 0-.3.1-.5 0-.8 0-.5-.1-1.1-.2-1.7 0-.5-.1-1-.1-1.6 0-.8-.1-1.6-.1-2.6M51 55.7" class="cls-9"/><path d="M37.2 53.8h.1c4 1.2 13.1 1.7 13.7 1.8m-33.5-24c0 1.2-.5 2.1-1.1 2.1s-1.1-1-1.1-2.1.5-2.1 1.1-2.1 1.1 1 1.1 2.1Zm18 .3c0 1.4-.6 2.5-1.3 2.5s-1.3-1.1-1.3-2.5.6-2.4 1.3-2.4 1.3 1.1 1.3 2.4ZM22.7 37c0 .9-.7 1.2-1.6 1 0 .7.4 3 1.5 3.4m-3.5 3.5c.1 0 .2 0 .3.1 4.4 1.5 13.9-.7 14.8-1.5-1.8 2.6-2.4 2.9-3.9 3.9s-4.6 1.3-6.2 1.1c-2.5-.3-3.7-1.4-4.8-3.3" class="cls-9"/><path d="M25.2 55.6v.3c-.1 4.1 2.4 8.8 6.7 6.8 2.5-1.2 5.4-2.9 5.7-4.8v-.4" class="cls-8"/><path d="M25.2 55.9s0 0 0 0c-.5.4-.9.8-1.2 1.3-2.8 3.7 0 7.7 2.1 9.2 4.5 3.3 11-.2 12.7-4.1.3-.8.9-3.4.6-5.1-.2-1.1-.8-1.9-1.9-1.7h-.2" class="cls-8"/><path d="M24 57.2c-8.2-.2-9.6 2.7-11.3 4.3C9.9 64.2 8 73.2 6.9 76.1c.1.1.2.3.3.4 2.5 2.9 1.5 2.3 6.7 3.9q0 0 0 0m25.4-23.2h.1c3.3 0 5.7.6 7.5 1.5 4.2 2.2 4.8 6 5.9 7.5 1.5 2.1 4 8.6 4 8.6.1 1.9-.8 2.1-2 2.9-.2.1-.4.3-.6.5-1.9 1.9-5.7 3.2-8.2 4.2l-.6-.9c-1.8-2.9-2-7.7-3.6-10.1" class="cls-8"/><path d="M14.6 68.4c-.8 3.6-.8 7.8-.7 11.9 0 2.4.1 4.8.1 7v6c0 3.1.1 6.2.2 9.3 0 2.2.1 4.3.2 6.5.4 0 .8 0 1.2.2.2 0 .5.1.7.2.5.1 1 .3 1.4.4.9.3 1.8.6 2.7.7h.4c.5 0 1 .1 1.5.2 1.3.1 2.7.2 4 .3h3.9c1.7 0 3.3-.3 4.8-.6.6-.1 1.3-.2 1.9-.4q2.4-.45 4.2-1.2c1.5-.5 2.7-1 3.7-1.5s.6-.3.9-.5c.6-.3 1-.6 1.3-.9l.4-.4" class="cls-8"/><path d="M45.4 80.9v3.7c-.2 2.4-.4 4.8-.3 7.3 0 .6.1 1.3.2 2.2.3 2.5.9 5.7 1.4 8.5.2 1.4.4 2.7.5 3.6v.6m-.8-47.3c-2 1.5-3.2 3-4 5.4-.3 1-.7 2.2-.7 3.3 0 .6 0 2.3.1 2.3s0 0 0-.1M17.4 58.1c-.7 1.7-2.6 7.5-2.3 8.7m-7.8 8.6c0 .3 0 .6-.1 1.1-.4 4.1-.9 14.8-1.1 16.7-.6 5.4 3.6 7.6 8.2 9.5.2 0 .4.2.6.2" class="cls-8"/><path d="M10.7 91.4c1.7.3 2.2 1.1 3.3 2l.2.2M46 82.4c.5 1.5.7 4 1 5.7.3 1.2.7 2.9 1 4.1v.2m6.9-14.6c.8 4.5 3.1 10.7 3 14.1 0 4.1-6 8.6-9.8 10.1-.6.3-.5.3-1.3.5" class="cls-8"/><path d="M45.2 94.1s0 0 0 0c1.2-.9 2-1.4 2.8-1.8 1.3-.6 2.4-.7 4.6-.7m-36.9 17.5v.3c-.2 2.2-.6 4.6-1.1 6.8-.2.9-.4 1.8-.5 2.7-.2 1-.4 1.9-.5 2.8-.7 4.5-2.1 7.5-3.4 13.2 1.3.8 2.9 1.5 4.6 2.1 3.6 1.2 8 1.9 12.8 1 .4 0 .8-.2 1.2-.2.1 0 .3 0 .4-.1.8-.2 1.6-.5 2.5-.8 0-2.2.3-5.1.3-7.7" class="cls-8"/><path d="M30 121.5c.1.2.2.5.3.8.6 1.7 1.2 4.4 1.6 7 .7 4 1 7.8 1 7.4l1.8.3c3.8.7 7 1.1 11 0 .6-.1 1.6-.5 2.7-.9 1.4-.6 3-1.3 4.2-1.9.6-.3 1.1-.7 1.4-1-4.8-12.8-3.7-12.7-5.7-18.2 0 0-.9-3.3-1.6-5.7-.4-1.3-.7-2.4-.7-2.4m-21.1 11.3c1.2 1.1 3.4 2.1 4.5 2.8.3.2.5.3.6.5" class="cls-8"/><path d="M35.2 116.4c-.7 1-1.8 2.1-2.7 3-.8.8-2 2.4-2.1 2.1M26.3 111v.2c.3.7.6 2.7.9 3.7s1.3 2.5 1.1 2.4m2-6.3v.1c-.1.9-.2 1.9 0 2.7m4.9-3.1c.3.2.6.8.6 1.8.3 0 1.2 0 1.5-.1.3-.7.2-1.5-.3-2.1m-16.1.4s0 0 0 0c.2 1.4-.3 3.2 1.8 2.6 0-.8-.1-1.7-.3-2.5v-.3m-6-1s0 0 0 0c.3.6.3 1.6.3 2.5h.8c.2-.6.4-1.3.3-2m23.3-1.2v.2c.2.5.6 1.1.8 1.7.4 0 2.9-.8 3.5-1.1h.1m-31.2 6.8c.1 0 .2 0 .3-.1 1.4-.6 2.7-1.9 3.5-3.1.7 2.6-2 4.7-4.1 5.8 0 0-.1 0-.2.1m32.5-6.7c-1.4.5-3.5.6-5.2.3-.7 0-1.2-.2-1.7-.4-.1.4 0 1.4 0 1.8 1.3 0 6.8 1 7.3 0v-.2" class="cls-8"/><path d="M45.7 109.9c-.8.5-3.9 1.5-4.9 1.7 0 .6.3.7.4.8m-11.7 8.5v.1c-.8 2.9-1.9 16.3-2 17.1q0 0 0 0m2.8-15.8c-.3 1.9-1.4 12.9-1.3 15v-.7" class="cls-8"/><path d="M44.9 107.3v.1q.3.6.6 2.1c0 .1 0 .3.1.4.2.7.4 1.5.7 2.4.1.5.3 1.1.4 1.6 2 7.5 4.8 18.5 5.9 20.3l.2.2M14.7 137s0 0 0 0c0 1.7.5 5.1.9 6.8-2.4 4.5-1.7 8.2-1.3 11.8.3 2.6 1.2 11.8 1 14.6v.2m13.4-32.7s0 0 0 0c.4 1.7-.9 4.2-1.4 6 3.7 3.7 1.5 10.2.3 14.6-1.4 5.1-3.4 9-3.6 14v1.9m10.8-37.1c.6 2.3 1.7 3 1.8 5.4.1 2.3-.6 4.6-.5 7 .2 5.5 2.9 10.9 3.9 16.3.5 2.7.6 4.8.5 7.5 0 .7 0 1.3-.1 2.1h0m8.1-39.4v.2c.2 3-.3 5.8 0 8.4.4 2.4 1.9 5.8 2.1 8.4.4 5.7-1.7 7.7-1 18.3" class="cls-8"/><path d="M13.1 171.8c0-.1 0-.3.1-.4.3-.5 1.1-.9 2.2-1.1 1-.2 2.2 0 3.1.4 1.7.8 2.1 2.3 1.2 3.9 0 0 0 .2-.1.2-.4.6-.9 1.2-1.4 1.7-1.6 1.7-3.7 3.1-5.9 5.2" class="cls-8"/><path d="M.7 190.1v-.1h0c-.4-2.8.2-6.7 4.2-9.3.6-.4 1.2-.7 2-1.1 2.9-1.3 7-3.1 6.2-7.9v-.2m6.8 3c1.2.4 3.7.6 4.1-.6" class="cls-8"/><path d="M4.8 180.7s0 0 0 0c2.9-1.4 6.1.2 7.4 1 .3.2.5.4.6.4 1.2 1.1 3.2 7.2 2.3 7.7q0 0 0 0" class="cls-8"/><path d="M.8 190c5.1 3.8 8.4 3 13.8.2l.6-.3h0c1.8-1 3.5-2.3 5.4-3.3 1.6-.9 4.3-1.2 5.3-2.9l.3-.6c.6-1.8-1-4.5-1-6.3 0-1.7 1.2-3.6-1.2-4.3q0 0 0 0m15.9 2.3c.2.2.3.4.5.6 1.2 1 2.8.5 4 .7.3 0 .7.2 1.2.5.4.2.8.5 1.2.8 1.7 1.2 3.6 2.9 4.2 3.5.9.8 2.8 2.5 2.7 2.6m-1.4-7c.5-1.2 1.7-4.9-2.7-5.2-2.8-.2-3.5 4.4-2.7 6.1q0 0 0 0" class="cls-8"/><path d="M40.2 173.3c-2.7.7-1.2 4.5-.8 6.3.2.9.3 1.6.4 2.2.3 1.1.7 2 2.2 3 1.9 1.4 3.5 2.3 5 4 1.5 1.6 3 3.4 5 4.3q0 0 0 0c3.8 1.7 10.9-.7 12.5-4.7 0-.1 0-.2.1-.3 1.1-3.5-1.7-6-4.8-7.7-1.3-.8-2.7-1.4-3.8-1.9-1.3-.6-2.7-1.2-3.9-2 0 0-.1 0-.2-.1M.5 190c-2.3 3.5 7.2 5.7 10.9 4.1 2.9-1.2 5.9-3.7 8.7-5.2 1.9-1 5.3-1.6 5.8-4v-1.3c0-.1 0-.2-.1-.3" class="cls-8"/><path d="M39.5 181.9c0 3.4.5 3.4 3.3 5.1 2.3 1.4 3.3 3.2 4.9 5.3 3.9 5.2 11.6 4.6 15.8.2 1-1.1 1.8-2.7 1-4 0 0-.1-.2-.2-.2" class="cls-8"/><path d="M52 193c-.3-3.1-.8-5.8 1.3-8.7.2-.2.4-.5.6-.7 1.7-1.7 4.6-3.1 5.9-3.2h0m-14.1-3.9c-.8-2-.3-5.8 3.9-5.2m-36.5.1h.1c6.7-1.4 7 2 4.9 5.1" class="cls-8"/></svg>')}`;
export default image;