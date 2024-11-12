/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Africa" width="88" height="126" viewBox="0 0 88 126"><defs><style>.cls-11,.cls-2,.cls-5,.cls-6,.cls-7,.cls-8,.cls-9{stroke-width:0}.cls-2{fill:#010101}.cls-12{stroke-linejoin:round}.cls-12,.cls-13{fill:none;stroke:#000;stroke-linecap:round;stroke-width:.6px}.cls-5{fill:#332a21}.cls-6{fill:#e1a739}.cls-13{stroke-miterlimit:10}.cls-7{fill:#af877b}.cls-8{fill:#d9d8d7}.cls-9{fill:#ea80ac}.cls-11{fill:#ffd06a}</style></defs><path d="M71.1 46.6c-.2 0-.3.1-.5.2-1.9.8-3.5 1.5-5 2-2.7-1.3-5.7-2.8-8.6-3.9-1.1-.4-2.2-.8-3.2-1.1-.2.2-.4.4-.6.7l-.2-.2c-1.8-1.4-3.3-2.6-4.5-3.5-1.1-3-1.3-6.3-1.2-9.5 0-3.2-.1-5.7-.2-6.6v-4c.7-6.6 3.5-13.4 14.1-10.2 4.5-1.2 18.4-2.4 19.4 17.8 1-1 2.8-.7 3.7.4s1.1 2.7.7 4.1c-.2.8-.5 1.6-1.1 2.1-.4.3-.8.5-1.2.7-1 .3-2.1.1-3.1 0-.4 1.8-.9 3.2-1.5 4.5-2 4.3-5 5.8-6.8 6.6-.1 0-.2.1-.4.2Zm-16.5-7.3c.8 1.9 1.7 3 4 3.6 1.4.4 4.3.5 5.8-.2 1.5-.6 2.1-.9 4.1-2.9-.9.6-10 1.4-13.8-.5Zm15.2-12c.2-1.6-.3-2.9-1-3-.8-.1-1.6 1.1-1.8 2.6s.3 2.9 1 3c.8.1 1.6-1.1 1.8-2.6m-16-2.3c.2-1.3-.2-2.5-.8-2.6-.6 0-1.3.9-1.5 2.3s.2 2.5.8 2.6c.6 0 1.3-.9 1.5-2.3" class="cls-7"/><path d="M83.5 9.5c3.2 5.9 3.9 10.2 1 19.1-.9-1.1-2.7-1.4-3.7-.4-1-20.2-14.9-19-19.4-17.8-.4-4.1 3.8-9.2 6.8-9.6 6.8.8 12.1 2.7 15.4 8.7Zm-.6 26c-1.1 1.8-3.1 3-4.6 4.5q.9-1.8 1.5-4.5c1 .2 2.2.3 3.1 0" class="cls-5"/><path d="M78.3 39.9c1.3 5.9 7.1 25.9 1.5 30.4.2-6.9-.4-13.5-2.9-16.6-2-2.5-2.8-3-3.9-3.8 0-.2.2-.4.2-.6.1-2-.6-2.7-1.7-2.9 1.7-.7 4.7-2.3 6.8-6.6Z" class="cls-5"/><path d="M55.1 63.6c-1.1-.8-2.3-1.7-3.5-2.6-1.5-1.2-3-2.3-4.1-3.3 1.7-5.2 5.2-9.5 9.6-12.8 2.9 1.1 5.9 2.7 8.6 3.9.6.3 1.3.6 1.9.9s1.1.5 1.7.7c.7.3 2.9 1.2 3.8-.4 1.1.8 1.9 1.3 3.9 3.8 2.5 3.1 3.1 9.6 2.9 16.6 0 1.4-.1 2.8-.2 4.2-8.3 3.4-17.1 3.7-27-.2h-.2c-.4-3-.8-6.1-.9-9 .6.5 1.8.5 2.5.6s.5-1.5 1.1-2.3Z" class="cls-11"/><path d="M79.5 74.5c0 1.2-.2 2.5-.4 3.7-8.1 3.4-17.3 3.3-26.2-.5h-.2c-.1-1.1-.3-2.2-.5-3.4h.2c9.9 4 18.7 3.6 27 .2Z" class="cls-6"/><path d="M54.1 83.6c-.3-.4-.7-.9-1-1.3q0-1.95-.3-4.5h.2c8.9 3.8 18.1 3.8 26.2.4q-.3 2.4-.6 4.5c-1.8 11.9.8 27.3.5 28.2-.5 6.3-2.2 11.6-8.6 13.8-5.8 2-15 .8-19-4.2-3.5-3.2-11.4-13-13.1-17.5.3-1.6.8-3.1 1.4-4.5 3.3-7.9 9.9-12.1 14.3-15Z" class="cls-11"/><path d="M71.5 46.5c1.1.2 1.8.9 1.7 2.9 0 .3-.1.5-.2.6-.8 1.6-3 .7-3.8.4-.5-.2-1.1-.4-1.7-.7 2.3-.4 3.9-.4 3.6-3.1.1 0 .2 0 .4-.2Z" class="cls-9"/><path d="M71.1 46.6c.4 2.7-1.3 2.7-3.6 3.1-.6-.3-1.2-.6-1.9-.9 1.5-.5 3.1-1.2 5-2 .1 0 .3-.1.5-.2" class="cls-7"/><path d="M68.7 24.3c.8.1 1.3 1.5 1 3-.2 1.6-1 2.7-1.8 2.6s-1.3-1.5-1-3c.2-1.6 1-2.7 1.8-2.6" class="cls-2"/><path d="M68.1.7c-2.9.5-7.2 5.6-6.8 9.7C50.7 7.2 47.9 14 47.2 20.6v2.9c-.4-.3-.8-.3-1.3 0 .5-10.5 2.3-16.2 6.9-19.6 1.1-.8 2.3-1.4 3.6-2 .6-.3 1.4-.5 2.1-.7 2.4-.6 5.3-.9 7.7-.6.6 0 1.2.1 1.8.2Z" class="cls-5"/><path d="M68.4 39.8c-2 2.1-2.6 2.3-4.1 2.9-1.5.7-4.4.6-5.8.2-2.3-.6-3.2-1.7-4-3.6 3.9 1.9 12.9 1.1 13.8.5Z" style="stroke-width:0;fill:#fff"/><path d="M47.8 5.1c-.1.4-.3.8-.5 1.2-2.2-.9-4.4-1.4-6.7-1 0-.3.1-.6.2-.9.5-2.2.5-3.6 3.2-3.7 5.5-.4 13.6-.8 14.7.6-.8.2-1.5.4-2.1.7-1.4.6-2.6 1.2-3.6 2-2 .3-3.8.6-5.1 1.2Z" class="cls-7"/><path d="M46.6 56.8c-.4-.4-.7-.7-.9-1-.2-.2-.2-.6 0-1.1.1-.5.4-1 .7-1.6 1.3-2.3 4-5.5 6.9-8.7.2-.2.4-.5.6-.7 1.1.3 2.1.6 3.2 1.1-4.4 3.2-7.9 7.6-9.6 12.7-.3-.3-.6-.6-.9-.8Z" class="cls-6"/><path d="M55.1 63.6c-.6.8-.4 2.4-1.1 2.3s-2-.2-2.5-.6v-1.6q0-1.5.3-2.7c1.2.9 2.4 1.8 3.5 2.6Z" class="cls-9"/><path d="M52.9 22.4c.6 0 1 1.3.8 2.6-.2 1.4-.9 2.4-1.5 2.3-.6 0-1-1.3-.8-2.6s.9-2.4 1.5-2.3" class="cls-2"/><path d="M39.5 33.5c3.7 3 3.3 2.8 9 7.3 1.2.9 2.7 2.1 4.5 3.5l.2.2c-3 3.1-5.7 6.4-6.9 8.7-5.8-5-11.4-9.3-15.6-15.4-.6-2.3 0-5.7 1.3-9.6 2.5-7.8 7.3-17.3 8.6-23 2.3-.4 4.5.2 6.7 1-2.3 6.4-6.4 22.1-7.8 27.3" class="cls-9"/><path d="M37.8 93.2c-.7 3.5-6.5 11.1-6.7 17.8-1.1.3-4.2 3.2-9.5 1h-.3c.5-2.3.5-3.7 0-4.4 2.4-8.1 2.9-14 5.2-25.4.5-2.3 2.1-12.7 5.2-14.2 4.5-2.2 7.1-1.7 9.6-.5 1.2.9 6.2 7.5 11.8 14.9.3.4.7.9 1 1.3-4.4 2.8-11 7.1-14.3 15-.8-1.8-1.5-3.5-1.9-5.3Z" style="stroke-width:0;fill:#55ab80"/><path d="M51.6 61q-.15 1.2-.3 2.7h-.1c-1.3-1.2-3.8-2.8-5.4-4.6.2-.8.3-1.7.7-2.3.3.3.6.5.9.8 1.1 1 2.6 2.2 4.1 3.3Z" style="fill:#ffd234;stroke-width:0"/><path d="M47.3 24.7c0 .9.2 3.4.2 6.6-.8-.1-3.6-1.2-3.1-4.3.3-2.1 1-3.2 1.7-3.6.5-.2.9-.2 1.3 0v1.1Z" class="cls-7"/><path d="M45 54.5c-1.1-.8-3.1-3.1-5-4.7-2.9-2.4-7.9-6.2-11.2-9-2.6-2.3-3.5-3.6-4.4-7.1-1.9-7.9-5.5-19.4-6.8-26.1V7c2-1.3 4.4-1.8 6.7-1.4h.1c.6 5.7 6.8 19.3 7.6 22.7-1.2 3.9-1.9 7.3-1.3 9.6C35 44 40.6 48.3 46.3 53.2c-.4.7-.6 1.2-.7 1.7h-.2c-.1 0-.3-.2-.4-.3Z" class="cls-9"/><path d="M46.6 56.8c-.4.6-.5 1.5-.7 2.2-1.2-1.3-1.9-2.9-.9-4.5.2.1.3.2.4.2h.2c-.1.5 0 .9 0 1.1.2.3.6.6.9 1Z" class="cls-6"/><path d="M21.3 112h.3c5.3 2.2 8.4-.7 9.5-1 .3 0 .5 0 .5.4 1.2 1.8 2.4 9.2 1.6 11.3-.5 0-5.3.8-10.1.6-5.3-.3-9.8.3-14.8.3v-.2c.2-2 0-5.3 0-7.4h.1c2.6-.8 8.1-2.7 11.1-3.5.8-.2 1.4-.3 1.8-.4Z" class="cls-8"/><path d="M33.2 122.7s.3 2.7 0 2.6c-2.7.6-5.6-.3-9.9-.1-10 .3-17.1 1-22.9-.5-.3-1-.5-1.3-.3-2h.5c2.9.6 5.4.8 7.9.8 5 0 9.5-.6 14.8-.3 4.8.3 9.6-.5 10.1-.6Z" style="stroke-width:0;fill:#aeaead"/><path d="M33.6.9c-1.2 2.9-6.4 3.4-9.3 3.9v.7h-.1c-2.3-.4-4.8.2-6.7 1.4-.3-2.4 0-5.2 0-5.2.4-1.3 15.9-1.7 16-.8Z" class="cls-7"/><path d="M21.3 107.6c.5.7.5 2.1 0 4.4-.4 0-1 .2-1.8.4v-.2c.8-1 1.7-4.2.4-5h-.2c.8 0 1.3 0 1.7.5Z" class="cls-8"/><path d="M19.6 107.1h.2c1.4.8.5 4-.4 5v.2c-3 .8-8.4 2.6-11 3.5h-.1c0-1.2-.1-1.9-.1-1.9 3-.4 8.4-2.1 9.7-2.8 1.5-.8.7-4.2 1.7-4m-19.3 15c0-3.1 1.3-6.9 7.9-8.2 0 0 0 .8.1 2 .1 2.1.3 5.4 0 7.4v.2c-2.5 0-5.1-.2-7.9-.8H0c0-.2.1-.4.2-.6Z" class="cls-8"/><path d="M73 50c1.1.8 1.9 1.3 3.9 3.8 2.5 3.1 3.1 9.6 2.9 16.6 0 1.4-.1 2.8-.2 4.2 0 1.2-.2 2.5-.4 3.7q-.3 2.4-.6 4.5c-1.8 11.9.8 27.3.5 28.2m-9.5-7.9c-2.2-1.9-9-10.9-15.5-19.5-.3-.4-.7-.9-1-1.3-5.6-7.4-10.6-14-11.8-14.9m0 0c-2.5-1.1-5.1-1.7-9.6.5-3.1 1.5-4.7 11.9-5.2 14.2M79.1 111c-.5 6.3-2.2 11.6-8.6 13.8-5.8 2-15 .8-19-4.2" class="cls-13"/><path d="M38.4 103.1c.3-1.6.8-3.1 1.4-4.5 3.3-7.9 9.9-12.1 14.3-15m-17.9 1.9c.5 2.8.9 5.3 1.6 7.7.5 1.8 1.1 3.5 1.9 5.3" class="cls-13"/><path d="M51.5 120.5c-3.5-3.2-11.4-13-13.1-17.5m14.8-58.5c-3 3.1-5.7 6.4-6.9 8.7-.4.6-.6 1.2-.7 1.6-.1.5 0 .8 0 1.1.2.3.6.6.9 1 .3.3.6.5.9.8 1.1 1 2.6 2.2 4.1 3.3 1.2.9 2.4 1.8 3.5 2.6 2.6 1.8 4.7 3.2 5.1 3.2" class="cls-13"/><path d="M57.1 44.9c-1.1-.4-2.2-.8-3.2-1.1-.2.2-.4.4-.6.7" class="cls-12"/><path d="M65.7 48.9C63 47.6 60 46.1 57.1 45m12.1 5.4c-.5-.2-1.1-.4-1.7-.7s-1.2-.6-1.9-.9M47.8 4.9V5c-.1.4-.3.8-.5 1.2-2.3 6.4-6.4 22.1-7.8 27.2 0 .2-.1.4-.2.6m1.4-29.6c0 .3-.1.6-.2.9-1.3 5.6-6.1 15.2-8.6 23-1.2 3.9-1.9 7.3-1.3 9.6" class="cls-13"/><path d="M53.1 44.3c-1.8-1.4-3.3-2.6-4.5-3.5-5.7-4.5-5.3-4.4-9-7.3h-.2m6.8 19.6c-5.8-4.9-11.4-9.3-15.6-15.3m22.3-34c-2 .3-3.8.6-5.1 1.2-.3.1-.5.3-.8.4m-6.3-1c.5-2.2.5-3.6 3.2-3.7 5.5-.4 13.6-.8 14.7.6" class="cls-13"/><path d="M31.9 28.2c-.8-3.4-6.9-17-7.6-22.7v-.7c2.9-.6 8.1-1.1 9.3-3.9-.1-.8-15.6-.5-16 .8 0 0-.4 2.8 0 5.3v.6c1.2 6.7 4.8 18.2 6.8 26.1.8 3.5 1.8 4.9 4.4 7.1 3.3 2.9 8.3 6.7 11.2 9 1.9 1.6 3.9 3.9 5 4.7.2.1.3.2.4.2m6.2 6.3q-.15 1.2-.3 2.7v1.6c0 2.8.5 6 .9 9 .2 1.2.3 2.4.5 3.5q.3 2.55.3 4.5m-1.8-18.6c-1.3-1.2-3.8-2.8-5.4-4.5-1.2-1.4-1.9-3-.9-4.6q0 0 0 0" class="cls-13"/><path d="M73.2 49.3c0 .3-.1.5-.2.6-.8 1.6-3 .7-3.8.4m2.3-3.8c1.7-.7 4.7-2.3 6.8-6.6q.9-1.8 1.5-4.5M65.7 48.9s0 0 0 0q0 0 0 0c1.5-.5 3.1-1.2 5-2 .1 0 .3-.1.5-.2.1 0 .2 0 .4-.2M47.3 20.6v4c0 .9.2 3.4.2 6.6 0 3.3 0 6.6 1.2 9.4m1.9-21.5c1.7-1.5 4.3-.9 5.6.2m10 1.3c2.5-1.4 5.5-.1 5.8 1.3" class="cls-12"/><path d="M73.2 49.3c.1-2-.6-2.7-1.7-2.9h0M53.8 25c-.2 1.4-.9 2.4-1.5 2.3-.6 0-1-1.3-.8-2.6s.9-2.4 1.5-2.3c.6 0 1 1.3.8 2.6m16 2.3c-.2 1.6-1 2.7-1.8 2.6s-1.3-1.5-1-3c.2-1.6 1-2.7 1.8-2.6s1.3 1.5 1 3m-14.6 5.9c-.3 2 3.7 2.6 5.2 2.7m-6.1 3.2s.2.1.3.2c3.9 1.9 12.9 1.2 13.8.5-2 2.1-2.6 2.3-4.1 2.9-1.5.7-4.4.6-5.8.2-2.3-.6-3.2-1.7-4-3.6" class="cls-12"/><path d="M52.9 3.8h0c-4.6 3.4-6.4 9.1-6.9 19.5" class="cls-13"/><path d="M84.4 28.6c2.9-8.9 2.3-13.2-1-19.1-3.3-6-8.6-8-15.4-8.8-.6 0-1.2-.1-1.8-.2-2.3-.2-5.3 0-7.7.6-.8.2-1.5.4-2.1.7-1.4.6-2.6 1.2-3.6 2" class="cls-12"/><path d="M61.4 10.4C61 6.3 65.2 1.2 68.2.8" class="cls-12"/><path d="M47.3 20.6C48 14 50.8 7.2 61.4 10.4 65.9 9.2 79.8 8 80.8 28.2" class="cls-12"/><path d="M80.7 28.2c1-1 2.8-.7 3.7.4s1.1 2.7.7 4.1c-.2.8-.5 1.6-1.1 2.1-.4.3-.8.5-1.2.7-1 .3-2.1.1-3.1 0m-32.5-12c-.4-.3-.8-.3-1.3 0-.7.4-1.4 1.5-1.7 3.6-.4 3.1 2.4 4.2 3.1 4.3m35.6 4.1c-1.1 1.8-3.1 3-4.6 4.5" class="cls-12"/><path d="M78.3 39.9c1.3 5.9 7.1 25.9 1.5 30.4M67.6 49.7c2.3-.4 3.9-.4 3.6-3.1h0M37.8 93.2c-.7 3.5-6.5 11.1-6.7 17.8h0m-4.6-28.8c-2.3 11.4-2.8 17.3-5.2 25.4m10.3 3.8c1.2 1.8 2.4 9.2 1.6 11.3M21.6 112c5.3 2.2 8.4-.7 9.5-1 .3 0 .5 0 .5.4m1.6 11.3c-.5 0-5.3.8-10.1.6-5.3-.3-9.8.3-14.8.3-2.5 0-5.1-.2-7.9-.8M21.6 112h-.3c-.4 0-1 .2-1.8.4-3 .8-8.4 2.6-11.1 3.5" class="cls-12"/><path d="M.3 122.3v-.2c0-3.1 1.3-6.9 7.9-8.2 0 0 0 .8.1 2 .1 2.1.3 5.4 0 7.4" class="cls-12"/><path d="M19.4 112.2c.9-1 1.8-4.2.4-5h-.2c-1-.2-.2 3.2-1.7 4-1.4.7-6.7 2.4-9.7 2.8M.3 124.7c5.8 1.5 12.9.7 22.9.5 4.3-.1 7.2.7 9.9.1.4.1 0-2.6 0-2.6m-32.9-.6c-.1.2-.2.4-.2.6-.2.7 0 .9.3 2" class="cls-12"/><path d="M21.3 112s0 0 0 0c.5-2.3.5-3.7 0-4.4-.3-.5-.9-.6-1.7-.5h-.2m37.7-62.2s0 0 0 0c-4.4 3.2-7.9 7.6-9.6 12.7m-1.6 1.5c.2-.7.3-1.6.7-2.2h0" class="cls-12"/><path d="M52.5 74.3c9.9 4 18.7 3.6 27 .2" class="cls-13"/><path d="M53 77.8c8.9 3.8 18.1 3.8 26.2.5h0M55.1 63.6c-.6.8-.4 2.4-1.1 2.3s-2-.2-2.5-.6m-11-60c2.3-.4 4.5.2 6.7 1m-23-.8c-2.3-.4-4.8.1-6.7 1.4" class="cls-12"/></svg>')}`;
export default image;