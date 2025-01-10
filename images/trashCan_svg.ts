/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="93.1" height="172" viewBox="0 0 93.1 172"><defs><linearGradient id="linear-gradient" x1="4.8" x2="89.1" y1="6.5" y2="6.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".8" stop-color="#626366"/><stop offset="1" stop-color="#bbbdbf"/></linearGradient><linearGradient id="linear-gradient-2" x1="16.1" x2="33.1" y1="92.5" y2="92.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#626366"/><stop offset=".7" stop-color="#bbbdbf"/><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#bbbdbf"/></linearGradient><style>.cls-2,.cls-4,.cls-6,.cls-8{stroke-width:0}.cls-2{fill:#9c9ea1}.cls-4{fill:#959595}.cls-9{fill:none;stroke:#000}.cls-6{fill:#bfbebe}.cls-8{fill:#adadad}</style></defs><path d="M90.2 20.3v-.2S77.4 9.5 55.4 6.9V1.4c0-.5-.4-.9-.9-.9H40.6c-.5 0-.9.4-.9.9v5.1C16.9 8.2 5 19.9 3.9 21.1c-1.6-.1-2.5-.2-2.5-.2-.3 2.7-.9 5.4-1 8.1 1.6.3 3.3.7 4.9.9.3 5.7.6 11.5.9 17.2.3 4.9.5 9.8.8 14.7 1.2 21.3 2.3 42.7 3.5 64 .5 9.1 1 18.1 1.5 27.2.2 3.2.2 15.3 1.2 16.6.4.6 3.3 1 7.7 1.3 1.6.1 3.4.2 5.3.3 1.5 0 3.2 0 4.9.1 2.2 0 4.6 0 7 .1h19.3c2.4 0 4.7 0 6.9-.1 2.9 0 5.5-.2 7.7-.2 4.2-.2 6.9-.4 7.2-.6.5-.5.8-2.9 1-4s.1-2.3.2-3.3c.5-7.4.9-14.9 1.3-22.3 1.3-21.6 2.6-43.1 3.9-64.7.9-15.1 1.8-30.3 2.7-45.4v-.9c1.3-.2 2.6-.5 4-.7 0-2.6 0-6.4.1-9-.2 0-1 0-2.4.2Z" class="cls-8"/><path d="M79.9 44.3c-3.3 0-3.5 2.6-3.5 2.6l-2.5 63.4 2.3-78.7c1-.1 2-.2 3-.4v-2.4c.1 0 .4-7.4.4-7.4-2.3.2-4.9.4-7.7.6h-1.2l-.6 6.7-.3 3.4c-.8 0-1.5.1-2.2.2l-.3 13.3-2.8 120.6v5c2.8 0 5.4-.2 7.6-.2l.2-6.3h3.2l5.7-119.4.2-.8c-.4-.1-.9-.2-1.5-.2m-13.4 122 3.7-120.7c1.9.6 2.1 2.4 2.1 2.4l-4.1 118.3z" style="stroke-width:0;fill:#8b8a8a"/><path d="M90.2 20.3v-.2S77.4 9.5 55.4 6.9v.3c0 .5-.4.9-.9.9h-3c7.4 3.4 15.2 8.4 20.5 14 2.8-.2 5.4-.4 7.7-.6l-.3 7.4v2.4c-1.1.1-2.2.3-3.2.4l-2.3 78.7L76.4 47s.2-2.5 3.5-2.6c.6 0 1.1 0 1.5.2 1.9.6 2.1 2.4 2.1 2.4l-6.2 117.8h-5l-.2 6.3c4.2-.2 6.9-.4 7.2-.6.5-.5.8-2.9 1-4s.1-2.3.2-3.3c.5-7.4.9-14.9 1.3-22.3 1.3-21.6 2.6-43.1 3.9-64.7.9-15.1 1.8-30.3 2.7-45.4v-.9c1.3-.2 2.6-.5 4-.7 0-2.6 0-6.4.1-9-.2 0-1 0-2.4.2Z" class="cls-4"/><path d="m65.3 48-2.6 118.3h1.9l2.8-120.6c-1.8.6-2 2.3-2 2.3ZM54.6.5h-3.9c-.2 1.9-.3 3.9-.5 5.9 1.8 0 3.6.3 5.3.5V1.4c0-.5-.4-.9-.9-.9" class="cls-4"/><path d="M47.4 6.3h-1.6c.3 0 .6-.2.9-.3z" class="cls-2"/><path d="M45.6 6.2h.2c-.5.2-1.1.3-1.7.5v-.5z" style="fill:url(#linear-gradient);stroke-width:0"/><path d="M50.2 6.4c.2-1.9.3-3.9.5-5.9h-7c.1 1.9.3 3.8.4 5.8-1.5 0-2.9 0-4.3.2v.7c0 .5.4.9.9.9h13.9c.5 0 .9-.4.9-.9v-.3c-1.7-.2-3.5-.4-5.3-.5" class="cls-2"/><path d="m30.2 138.5-2.9-92c.2.5.3.9.3.9z" style="stroke-width:0;fill:url(#linear-gradient-2)"/><path d="m81.4 44.5-.2.8-5.7 119.4h1.9l6.2-117.8s-.2-1.8-2.1-2.4Zm-11.1 1.1-3.7 120.7h1.7L72.4 48s-.2-1.8-2.1-2.4" class="cls-8"/><path d="M67.6 32.4c.8 0 1.5-.1 2.2-.2l.3-3.4.6-6.7h1.2c-5.3-5.6-13-10.5-20.5-14H40.6c-7.4 3-14.5 7.8-18.6 14.2 1.7 0 3.4.2 5.1.3l-.2 6.3v3.3h-.2v.2l.5 14.2c.2.5.3.9.3.9l2.6 91.1.9 28.7v4.1c2.4 0 4.7 0 7.2.1h19.3c2.4 0 4.7 0 6.9-.1v-5h-1.7l2.6-118.3s.2-1.7 2-2.3l.3-13.3ZM38.2 167.1 36.7 46.5c1.5.7 1.7 2.2 1.7 2.2L40 167.1zm11.4.4h-2l-.4-121.3c2.6.3 2.9 2.6 2.9 2.6zm9.8-1.3v.9h-1.9l1.7-120.8c2.4.4 2.7 2.5 2.7 2.5l-2.6 117.4Z" class="cls-8"/><path d="M24 44.8c-1.3 0-2.1.5-2.6.9-.8.7-.8 1.6-.8 1.6l3.6 87.8 1.2 30.7v.2h3.5l-4-121.3H24Zm-6.6 76.6c-1.7-25.6-2.8-51.3-3.2-77h-.9C10 44.4 9.8 47 9.8 47L17 165.2h3.6c-.6-8.1-1.2-16.3-1.8-24.4-.5-6.4-.9-12.9-1.4-19.3Z" class="cls-8"/><path d="M25.4 166.2v-.2c-1.5-9.8-1.3-20.7-1.3-30.7l-3.6-87.9s0-.9.8-1.6c-.1-4.6-.2-9.2-.3-13.9-.8 0-1.5-.1-2.2-.2v-9.6c-3-.2-5.8-.4-8.2-.5q-.45 3.75-.3 7.2c0 .7.1 1.3.2 1.9 1.2.2 2.4.3 3.6.5s0 .2 0 .2c0 4.3 0 8.7.2 13 .4 25.7 1.5 51.4 3.2 77 .4 6.4.9 12.9 1.4 19.3.6 8.1 1.2 16.3 1.8 24.4.1 1.9.3 3.8.4 5.7 1.6.1 3.4.2 5.3.3-.4-1.6-.7-3.3-1-5Z" style="stroke-width:0;fill:#cececd"/><path d="m59.3 46.3-1.7 120.8h1.8v-.9L62 48.8s-.3-2.1-2.7-2.5m-12.1-.1.4 121.3h2l.5-118.7s-.3-2.3-2.9-2.6M43.7.5h-3c-.5 0-.9.4-.9.9v5.1c1.4-.1 2.8-.2 4.3-.2-.1-1.9-.3-3.8-.4-5.8M3.9 21.1c-1.6-.1-2.5-.2-2.5-.2-.3 2.7-.9 5.4-1 8.1 1.6.3 3.3.7 4.9.9.3 5.7.6 11.5.9 17.2.3 4.9.5 9.8.8 14.7 1.2 21.3 2.3 42.7 3.5 64 .5 9.1 1 18.1 1.5 27.2.2 3.2.2 15.3 1.2 16.6.4.6 3.3 1 7.7 1.3-.1-1.9-.3-3.8-.4-5.7h-3.6L9.7 47s.2-2.5 3.5-2.6h.9c0-4.3-.1-8.7-.2-13v-.2c-1.2-.1-2.4-.3-3.6-.5 0-.6-.1-1.3-.2-1.9-.2-2.4 0-4.8.3-7.1 2.4 0 5.2.2 8.2.4v9.6c.7 0 1.5.1 2.2.2 0 4.7.2 9.3.3 13.9.5-.5 1.3-.9 2.6-.9h.9l4 121.3h-3.5c.3 1.7.6 3.4 1 5 1.5 0 3.2 0 4.9.1v-4.1c-.1 0-1-28.7-1-28.7l-2.9-92-.5-14.2v-.2h.2v-3.3l.2-6.3c-1.7 0-3.4-.2-5.1-.3C26 15.8 33.1 11 40.5 8c-.5 0-.9-.4-.9-.9v-.7C16.9 8.2 5 19.9 3.9 21.1" class="cls-6"/><path d="m36.7 46.5 1.5 120.6H40L38.4 48.7s-.2-1.5-1.7-2.2M25.3 166l-1.2-30.7c0 9.9-.2 20.8 1.2 30.7" class="cls-6"/><path d="M39.8 6.5V1.4c0-.5.4-.9.9-.9h13.9c.5 0 .9.4.9.9v5.4m33 23v.9c-.9 15.1-1.8 30.3-2.7 45.4-1.3 21.6-2.6 43.1-3.9 64.7-.5 7.4-.9 14.9-1.3 22.3 0 1.1 0 2.3-.2 3.3-.2 1.1-.5 3.4-1 4-.2.2-2.9.4-7.2.6-2.2 0-4.8.2-7.7.2-2.2 0-4.5 0-6.9.1-6.2 0-12.9.1-19.3 0-2.4 0-4.8 0-7-.1-1.7 0-3.3 0-4.9-.1-1.9 0-3.7-.2-5.3-.3-4.4-.3-7.2-.7-7.7-1.3-1-1.3-1-13.4-1.2-16.6-.5-9.1-1-18.1-1.5-27.2-1.2-21.3-2.3-42.7-3.5-64-.3-4.9-.5-9.8-.8-14.7-.3-5.7-.6-11.5-.9-17.2" class="cls-9"/><path d="M3.9 21.1C5 20 16.8 8.2 39.7 6.5c1.4-.1 2.8-.2 4.3-.2h6.1c1.8 0 3.6.3 5.3.5C77.4 9.4 90.1 20 90.1 20" class="cls-9"/><path d="M37.2 8.4c-8.5 1.8-14.3 4.3-22.3 8.5m27.8-7.7c-6.9 3-8.6 3.9-15.7 9.1M52.2 9c6.1 2.8 6.1 2.7 12.2 8.1M47.1 9.3c-1.9 2.1-3.2 4.9-5 9.9M60 9c8.5 1.8 14.2 4.7 20 8.6m8.5 12.2c1.3-.2 2.6-.5 4-.7 0-2.6 0-6.4.1-9-.2 0-1 0-2.4.2-2.2.2-5.8.7-10.5 1.1-2.3.2-4.9.4-7.7.6h-1.2c-6.6.5-14.3.9-22.9.9H42c-4.7 0-9.8-.3-14.8-.5-1.7 0-3.4-.2-5.1-.3-1.2 0-2.3-.1-3.4-.2-3-.2-5.8-.4-8.2-.5-2.8-.2-5-.3-6.6-.5-1.6-.1-2.5-.2-2.5-.2-.3 2.7-.9 5.4-1 8.1 1.6.3 3.3.7 4.9.9s3.3.5 5 .8c1.2.2 2.4.3 3.6.5 1.5.2 3.1.4 4.7.5.7 0 1.5.1 2.2.2 1.9.2 3.8.3 5.8.4 6.4.4 13.3.5 20.8.5s13.7 0 19.9-.5c.8 0 1.5-.1 2.2-.2 2.1-.2 4.3-.4 6.4-.6 1-.1 2-.2 3-.4 2.9-.4 5.9-.9 9.2-1.4ZM36.7 46.5c1.5.7 1.7 2.2 1.7 2.2L40 167.1h-5.6l-3-118.4s.2-2.5 3.5-2.6c.8 0 1.4.1 1.9.4Zm10.5-.3c2.6.3 2.9 2.6 2.9 2.6l-.5 118.7H44L43 48.8s.2-2.5 3.5-2.6zm12.2 120v.9h-5.6l1.1-118.3s.2-2.5 3.5-2.6h.9c2.4.4 2.7 2.5 2.7 2.5l-2.6 117.4ZM70.3 45.6c1.9.6 2.1 2.4 2.1 2.4l-4.1 118.3h-5.6L65.3 48s.2-1.7 2-2.3c.4-.2.9-.2 1.5-.2s1.1 0 1.5.2Zm-46.2 89.6-3.6-87.8s0-.9.8-1.6c.5-.5 1.3-.9 2.6-.9h.9c1.4.2 2.1 1 2.5 1.7.2.5.3.9.3.9l2.6 91.1.8 27.6h-5.6v-.2l-1.3-30.7m-9.9-90.9c2.4.4 2.7 2.5 2.7 2.5l5.7 118.2H17L9.8 46.9s.2-2.5 3.5-2.6h.9Z" class="cls-9"/><path d="M24.1 135.2c0 10-.2 20.9 1.2 30.7v.2m52.2-1.4h-5.6l4.7-117.8s.2-2.5 3.5-2.6c3.3 0 3.6 2.6 3.6 2.6z" class="cls-9"/></svg>')}`;
export default image;