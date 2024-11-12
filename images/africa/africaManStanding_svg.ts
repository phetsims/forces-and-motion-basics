/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Africa" width="98.6" height="280.6" viewBox="0 0 98.6 280.6"><defs><style>.cls-1{fill:#010101}.cls-1,.cls-4,.cls-5,.cls-6,.cls-7,.cls-8{stroke-width:0}.cls-10,.cls-9{fill:none;stroke:#000;stroke-width:.6px}.cls-9{stroke-linecap:round;stroke-linejoin:round}.cls-10{stroke-miterlimit:10}.cls-4{fill:#2f3d52}.cls-5{fill:#cda266}.cls-6{fill:#845d3d}.cls-7{fill:#1c1c1c}.cls-8{fill:#222427}</style></defs><path d="M13.4 102.3c.6 1.1 1.1 2.1 2.2 4.4.9 1.7 5.6 6.9 5.9 7.5-1.3 2.5-3.2 7.7-5.2 11.3-.7 1.2-1.3 2.2-2 2.9-5.4-6.9-10.1-16.1-13-22.7-1.2-2.6-1.5-5.7-.5-9.3.8-3 2.5-6.5 4.3-9.6 2.1-3.2 13.8-24.1 17.1-24.9.6-.2 1.6-.5 2.6-.9h.4c.9 5.7 14.2 7.6 14.2 7.6 1.1 1.9-1.3 37.2-1.2 53.3 0 .9 5.8.6 6.6.6.3 0-.5-16-.4-23.9 0-1.8-1-28.8.5-29.7 2.7-1.6 16.4-6.6 15.7-9.5 2.7.5 9.6 3.7 11.1 4.3 3.3 1.5 19.5 20.6 19.5 20.6 4 4.8 4.1 4.8 6.4 8.9 2.7 4.9-2.2 19.2-5.8 23.4-2.9 3.8-8 9.3-10.7 12.5-.6-1-1.2-2.5-2-4-1.6-3.4-3.6-7.4-6.1-8.5 3.6-4.6 5.7-10 8.1-13.3 1.1-1.5 1.9-3 3.1-4.5l-.3-.3c-1.9-2.1-8.4-7.7-12.6-13.7H71c-.8 2-1.1 27.4-.8 31.4v.9c-3.2.5-6.9.9-6.1 4.6-1.8 1.9-3.4 4.1.6 5.1-.8 1.9.6 3.2 1.8 3.4-1.2 1.5 1 2.7 2 2.7-.1 2 1.6 2 3.4 1.4 2.4 8.3 3.5 29.5 5.8 44.6 2.6 16.7 5.1 46.3 5.1 46.3-2.2 1.1-4.8 2.1-7.6 2.9-5.8 1.7-12.7 2.8-19.7 3.3-4.9.3-9.9.4-14.6.2-7-.3-13.5-1.3-18.7-2.8-3.3-1-6.1-2.2-8-3.6 1.5-7.9 5.6-67.4 6.6-75.5.8-7.1 1.2-7.8 1.6-15.4-.2-5.1-.6-12.8-1-20.3-.3-6.7-.6-13.4-.6-18.1v-6.7h-.3c-2 2.3-6.3 12.1-7.1 12.9Zm50.3-19.1c0-1.2-.1-2.4-.1-2.4-1-.4-12.1.3-12.1 0 0 .9-.2 1.7-.2 2.6 4.5.2 7.9-.1 12.4-.2" style="stroke-width:0;fill:#46678a"/><path d="M96.2 276.9c.1 1.2-1.3 2.1-2.5 2.5-5.3 1.8-11.4.8-16.5-1.4s-12.4-3.4-13.6-4.8c-.6-.7-2.3-8.8-1.5-10.2 2.4.1 5.4-.1 6.7-.3 2.1-.4 3.6-1.4 4.9-3 5.4 4.3 13.9 9.7 21.3 15.4.6.5 1.2 1.1 1.3 1.8Z" class="cls-8"/><path d="M75.3 228.3c.2 6-1.8 18.2-1.6 31.3-1.2 1.6-2.8 2.6-4.9 3-1.3.2-4.2.5-6.7.3-1.5 0-2.7-.3-3.4-.6-1.4-8.1-3.4-22.5-3.1-30.7 7-.5 13.8-1.6 19.7-3.3" class="cls-4"/><path d="M63.5 80.8s.2 1.2.1 2.4c-4.5.1-7.9.4-12.4.2 0-.9.2-1.7.2-2.6 0 .2 11.1-.4 12.1 0" class="cls-5"/><path d="M30.8 60.6c2 3.1 7.9 4.6 12.1 4.2 3-.3 9.6-1.7 12.5-4.8-.1-.2-.3-.8-.4-1.6 2.3.2 3 .8 5 1h.6c.7 2.9-13 7.9-15.7 9.5-1.5.9-.5 27.9-.5 29.7 0 7.8.8 23.8.4 23.9-.7 0-6.5.3-6.6-.6-.1-16 2.3-51.3 1.2-53.3 0 0-13.4-1.9-14.2-7.6h-.4c2.3-.9 5.1-2 6.5-2.2-.2.8-.4 1.5-.6 1.7Z" class="cls-5"/><path d="M59.3 31.3c.2 2.3 0 6.6 0 6.6 0 .3-.2.5-.2.8-1.6 4.8-3.8 8.8-5.5 11.1q-.6.9-1.2 1.5c-2.6 2.8-6.9 6.5-12.7 6.5-2.7-.5-4.9-1.7-6.8-3.3-4.8-4-7-10.4-7.9-13.8 1 2.9 4.7 7.9 5.3 7.7.3-1.6.7-4.3 1-5.9 2.1-.5 5.2-1.6 7.2-1.6 2.7 0 7.1.8 9.7 1.2.6 2.7.4 4.1.8 6.6 5-1.8 10.3-11.9 10.3-17.5ZM46.7 48.7c.4-.9.4-4.7-.1-5-.7-.4-7.1-1.1-8.2-1.3-.9-.1-5.3 1.3-5.9 1.9-.4.4-.2 4.2.4 5.2.6.9 1.6 1.4 2.6 1.7 2.6.8 5.4.8 8 0 1.3-.4 2.7-1.1 3.2-2.4Zm5.9-25.2c-.3.7-4.7 0-9 .9-.2-.1-1.2-3.2.6-3.9 1.7-.6 8.3.7 8.3 3Z" class="cls-7"/><path d="M48.3 27.5c.5 0 .9.8.9 1.9s-.4 1.9-.9 1.9-.9-.8-.9-1.9.4-1.9.9-1.9" class="cls-1"/><path d="M35.6 263.2c-2.5.3-5.4.4-6.8 0-2.3-.4-4.3-1.7-5.7-3.4.5-9.8-1.1-24.9-.8-30.9 5.1 1.5 11.7 2.4 18.7 2.8.7 7.9-1.2 24.3-1.6 30.5-.8.5-2.2.8-3.9 1Z" class="cls-4"/><path d="M35.6 263.2c0 2.5-1.6 9-2 9.5-2.4 3-10.1 3.9-14.5 5.5-5.1 1.8-11 2.4-16 .3-1.2-.5-2.4-1.4-2.2-2.6.1-.7.7-1.3 1.3-1.7 7.6-5 16.8-10.8 21-14.1v-.2c1.3 1.8 3.4 3 5.7 3.4 1.4.3 4.3.2 6.8 0Z" class="cls-8"/><path d="M30.7 20.8c2.2 0 4.6.8 3.7 3.6-1.9-.5-6.6-.4-8.9.4-.2-2 3-4 5.2-4" class="cls-7"/><path d="M30.2 27.7c.4 0 .8.8.8 1.8s-.4 1.8-.8 1.8-.8-.8-.8-1.8.4-1.8.8-1.8" class="cls-1"/><path d="M79.1 125.3c-1.6-3.4-3.6-7.4-6.1-8.5-.8.2-1.7.4-2.7.5-3.3.5-7 .9-6.2 4.6-1.8 1.9-3.4 4.1.6 5.1-.8 1.9.6 3.2 1.8 3.4-1.2 1.5 1 2.7 2 2.7-.1 2 1.6 2 3.4 1.4 1.8-.7 3.8-2 4.5-2.6 1.8-1.7 3.4-4 2.6-6.5ZM63 28.2c1-4.7.4-7.9-.2-12.6-1-7.3-5.7-10.7-9.3-12.7C49.1.4 45.3.3 40.3.3 26.7.3 22.9 11.2 22.4 14.8c-.5 3.4-1.7 9-.7 13.5-.2.1-.4.2-.5.4-.3.3-.4.7-.5 1.1-.7 2.8-.1 6.8 3.7 8.7.1.6.3 1.3.4 1.9 0 .2 0 .4.1.6 1 2.9 4.7 7.9 5.3 7.7.3-1.6.7-4.3 1-5.9 2.1-.5 5.2-1.6 7.2-1.6 2.7 0 7.1.8 9.7 1.2.6 2.7.4 4.1.8 6.6 5-1.8 10.3-11.9 10.3-17.5.2 2.3 0 6.6 0 6.6 0 .3-.2.5-.2.8h.5c.9.8 2.8.2 3.6-2.3.7-2.2 2.7-7.2 0-8.3Zm-32.8 3.1c-.4 0-.8-.8-.8-1.8s.4-1.8.8-1.8.8.8.8 1.8-.4 1.8-.8 1.8m4.1-6.8c-1.9-.5-6.6-.4-8.9.4-.2-2 3-4 5.2-4s4.6.8 3.7 3.6m14 6.8c-.5 0-.9-.8-.9-1.9s.4-1.9.9-1.9.9.8.9 1.9-.4 1.9-.9 1.9m-4.7-6.9c-.2 0-1.2-3.2.6-3.9 1.7-.6 8.3.7 8.3 3-.3.7-4.7 0-9 .9Zm9.9 25.5q-.6.9-1.2 1.5c-2.6 2.8-6.9 6.5-12.7 6.5-2.7-.5-4.9-1.7-6.8-3.3-.3.4-.9 2.7-1.3 4.3-.2.8-.4 1.5-.6 1.7 2 3.1 7.9 4.6 12.1 4.2 3-.3 9.6-1.7 12.5-4.8-.1-.2-.3-.8-.4-1.6-.5-2.7-1.2-7.7-1.5-8.5Z" class="cls-6"/><path d="M35.6 51.1c2.6.8 5.4.8 8 0 1.3-.4 2.7-1.1 3.2-2.4.4-.9.4-4.7-.1-5-.7-.4-7.1-1.1-8.2-1.3-.9-.1-5.3 1.3-5.9 1.9-.4.4-.2 4.2.4 5.2.6.9 1.6 1.4 2.6 1.7Zm-14.1 63.1c-1.3 2.5-3.2 7.7-5.2 11.3.6 2 1 3.8 1.8 5.8 1 2.7 2.8 2.9 4.4 3.3-.2-5.1-.6-12.8-1-20.3Z" class="cls-6"/><path d="M62.8 15.5c.7 4.7 1.2 7.9.2 12.6-1.8-.8-3.5.1-3.7 2.4v-.2c0 .7-.8-14.5-6-18.7-3.8-3.1-8.3-3.4-14.2-3.4C30 8.2 25 12.1 23 20.4c-.6 2.4-.6 5.4-.5 7.9h-.7c-1-4.5.2-10.1.7-13.5C23.1 11.2 26.8.3 40.4.3c5 0 8.8 0 13.2 2.5 3.6 2 8.2 5.4 9.3 12.7Z" style="stroke-width:0;fill:#574538"/><path d="M31.4 58.9c-1.4.2-4.2 1.3-6.5 2.1-1 .4-2 .7-2.6.9-3.3.8-15 21.7-17.1 24.9m78.7 11.9C82 96.6 75.5 91 71.3 85c-.9-1.2-1.7-2.5-2.3-3.7m-9-21.9h.6c2.7.5 9.6 3.7 11.1 4.3 3.3 1.5 19.5 20.6 19.5 20.6m-70.3-4.2c-.3 4.4-.2 5.6 0 9.2V96c0 4.7.3 11.3.6 18.1q0 0 0 0c.4 7.5.8 15.2 1 20.3M71 85c-.8 1.9-1.1 27.3-.8 31.3m-53.9 8.9v.2c.6 2 1 3.8 1.8 5.8 1 2.7 2.8 2.9 4.4 3.3M5.2 86.8c-1.8 3.1-3.5 6.6-4.3 9.6-1 3.5-.6 6.7.5 9.3m19.1-16.4c-2 2.3-6.3 12.1-7.1 12.9" class="cls-9"/><path d="M11.3 98.7c1 1.7 1.6 2.7 2.1 3.6.6 1.1 1.1 2.1 2.2 4.4.9 1.7 5.6 6.9 5.9 7.5q0 0 0 0h0m69.7-29.7c4 4.8 4.1 4.8 6.4 8.9 2.7 4.9-2.2 19.2-5.8 23.4m-18.8 0c3.6-4.6 5.7-10 8.1-13.3 1.1-1.5 1.9-3 3.1-4.5q1.05-1.35 2.7-2.7" class="cls-9"/><path d="M79.1 125.3c0-.2-.1-.3-.2-.5" class="cls-10"/><path d="M66.2 119.8c-.4.5-1.2 1.2-2 2.1-1.8 1.9-3.4 4.1.6 5.1-.8 1.9.6 3.2 1.8 3.4-1.2 1.5 1 2.7 2 2.7-.1 2 1.6 2 3.4 1.4 1.8-.7 3.8-2 4.5-2.6 1.8-1.7 3.4-4 2.6-6.5" class="cls-9"/><path d="M73 116.8c-.8.2-1.7.4-2.7.5-3.3.5-7 .9-6.2 4.6q0 0 0 0m-41.5 12.6c-.4 7.5-.8 8.3-1.6 15.4-1 8.1-5.1 67.7-6.6 75.5 1.9 1.4 4.6 2.6 8 3.6 5.1 1.5 11.7 2.4 18.7 2.8 4.8.2 9.7.2 14.6-.2 7-.5 13.8-1.6 19.7-3.3 2.8-.8 5.3-1.8 7.6-2.9" class="cls-9"/><path d="M82.9 225.4s-2.5-29.6-5.1-46.3c-2.3-15.1-3.4-36.3-5.8-44.6M30.8 60.6s0 0 0 0c2 3.1 7.9 4.6 12.1 4.2 3-.3 9.6-1.7 12.5-4.8m-.4-1.6c2.3.2 3 .8 5 1" class="cls-9"/><path d="M73 116.8c2.5 1.1 4.4 5.1 6.1 8.5.7 1.6 1.4 3 2 4 2.6-3.2 7.8-8.7 10.7-12.5m-70.3-2.6c-1.3 2.5-3.2 7.7-5.2 11.3-.7 1.2-1.3 2.2-2 2.9-5.4-6.9-10.1-16.1-13-22.7" class="cls-10"/><path d="M44.9 122.5c.3 0-.5-16-.4-23.9 0-1.8-1-28.8.5-29.7 2.7-1.6 16.4-6.6 15.7-9.5q0 0 0 0m-35.4 1.7c.9 5.7 14.2 7.6 14.2 7.6 1.1 1.9-1.3 37.2-1.2 53.3 0 .9 5.8.6 6.6.6M55.4 60c-.1-.2-.3-.8-.4-1.6-.5-2.7-1.2-7.7-1.5-8.5M30.8 60.6c.1-.2.4-.9.6-1.7.5-1.6 1-3.9 1.3-4.3M22.3 229c-.3 6 1.3 21.2.8 30.9v.2M41 231.6v.2c.7 7.9-1.2 24.3-1.6 30.5m35.9-34c.2 6-1.8 18.2-1.6 31.3m-18.1-28c-.4 8.2 1.7 22.6 3.1 30.7m-23.1.9c0 2.5-1.6 9-2 9.5-2.4 3-10.1 3.9-14.5 5.5-5.1 1.8-11 2.4-16 .3-1.2-.5-2.4-1.4-2.2-2.6.1-.7.7-1.3 1.3-1.7 7.6-5 16.8-10.8 21-14.1m73 16.8c0-.7-.6-1.3-1.3-1.8-7.4-5.7-15.9-11.1-21.3-15.4" class="cls-9"/><path d="M62.1 262.9c-.8 1.4.9 9.5 1.5 10.2 1.2 1.4 8.4 2.6 13.6 4.8 5.1 2.2 11.2 3.2 16.5 1.4 1.2-.4 2.6-1.3 2.5-2.5" class="cls-9"/><path d="M73.7 259.6c-1.2 1.6-2.8 2.6-4.9 3-1.3.2-4.2.5-6.7.3-1.5 0-2.7-.3-3.4-.6m-19.2-.1c-.8.5-2.2.8-3.9 1-2.5.3-5.4.4-6.8 0-2.3-.4-4.3-1.7-5.7-3.4q0 0 0 0" class="cls-9"/><path d="M63.7 83.2c-4.5.1-7.9.4-12.4.2 0-.9.2-1.7.2-2.6 0 .2 11.1-.4 12.1 0 0 0 .2 1.2.1 2.4Z" class="cls-10"/><path d="M59.3 31.2v.1c.2 2.3 0 6.6 0 6.6 0 .3-.2.5-.2.8-1.6 4.8-3.8 8.8-5.5 11.1q-.6.9-1.2 1.5c-2.6 2.8-6.9 6.5-12.7 6.5M22.5 30.7s.9 3.6 1.8 7.7c.1.6.3 1.3.4 1.9 0 .2 0 .4.1.6.9 3.4 3.1 9.8 7.9 13.8 1.9 1.6 4.1 2.8 6.8 3.3M25.4 24.9c2.3-.8 7-.9 8.9-.4m9.3-.1c4.3-.9 8.7-.2 9-.9M34.5 38.4c.7 2.3 7.9 2.1 10.4 1" class="cls-9"/><path d="M59.2 31.1v-.5c.2-2.2 1.9-3.1 3.7-2.4 2.7 1.1.8 6.1 0 8.3-.8 2.4-2.6 3.1-3.6 2.4m-33.9-14c-.2-2 3-4 5.2-4s4.6.8 3.7 3.6m9.3-.1c-.2-.1-1.2-3.2.6-3.9 1.7-.6 8.3.7 8.3 3m-17.6 22c4.5 1 5.6 1.3 10.4-.5M31 29.5c0 1-.4 1.8-.8 1.8s-.8-.8-.8-1.8.4-1.8.8-1.8.8.8.8 1.8m18.2-.1c0 1-.4 1.9-.9 1.9s-.9-.8-.9-1.9.4-1.9.9-1.9.9.8.9 1.9" class="cls-9"/><path d="M21.6 28.3c-1-4.5.2-10.1.7-13.5C22.9 11.2 26.6.3 40.2.3c5 0 8.8 0 13.2 2.5 3.6 2 8.2 5.4 9.3 12.7.7 4.7 1.2 7.9.2 12.6m-40.7.2h-.5c-.2 0-.4.2-.5.3-.3.3-.4.7-.5 1.1-.7 2.8-.1 6.8 3.7 8.7m.4 2.1c0 .1 0 .2.1.3 1 2.9 4.7 7.9 5.3 7.7.3-1.6.7-4.3 1-5.9 2.1-.5 5.2-1.6 7.2-1.6 2.7 0 7.1.8 9.7 1.2.6 2.7.4 4.1.8 6.6 5-1.8 10.3-11.9 10.3-17.5v-.8" class="cls-9"/><path d="M46.7 48.7c-.5 1.3-1.9 2-3.2 2.4-2.6.8-5.4.8-8 0-1-.3-2-.8-2.6-1.7-.7-1-.8-4.7-.4-5.2.5-.6 5-2 5.9-1.9 1.1.1 7.5.9 8.2 1.3.6.4.5 4.1.1 5Z" class="cls-9"/></svg>')}`;
export default image;