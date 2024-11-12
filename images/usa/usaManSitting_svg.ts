/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="USA" width="107" height="161" viewBox="0 0 107 161"><defs><style>.cls-3,.cls-4,.cls-5,.cls-6,.cls-7,.cls-8{stroke-width:0}.cls-10{stroke-linecap:round;stroke-linejoin:round;fill:none;stroke:#000;stroke-width:.6px}.cls-3{fill:#847b63}.cls-4{fill:#282c2d}.cls-5{fill:#9b7a6b}.cls-6{fill:#000}.cls-7{fill:#444545}.cls-8{fill:#fff}</style></defs><path d="M57.2 25.6c0 2.4.4 5.2.8 7.7-.3 0-.6 0-1 .1-3-13.7-3.5-19.1-.7-22.8C61.9.9 72.7 0 80.9.3 90.8.7 96 9.8 97.6 11.6c4 6.3 4.4 17.5 2 26.3v-2.2h-1.2c.7-1 .5-3.2-.3-3.9-2.6.2-4.4 2.5-6.9 1.5.2-22.2-.6-18.7-18.1-15.6-9-2-13.4-7.1-15.9 7.8Z" class="cls-4"/><path d="M98.4 35.7h1.2c-1 4.4-2 9.5-4.4 12.6-.2.3-.3-.8-.5-.6-.5.5-.8.9-1.2 1.3v-5.2c2.6 2 4.1-5.5 4.4-7.7.2 0 .3-.2.4-.4Z" class="cls-4"/><path d="M59 89.8c-11 1.8-22.2 3.3-33.3 1.1-.9-.9-3.6-.9-5.5-.5-2.2-1.7-2.5-7.7-1-9.8 1.6-2.2 5.3-2.8 7.9-3 6.9-.5 13.2-1.8 19.4-3.6 16.2-4.5 26.5-10.3 42.6-9.4 2.2-1.9 4.6-4 6.2-6.1v-3.1c7.7 12.2 2.4 28.9 2.5 42.8-1.3 15 0 28.7-.4 44.1-5 .3-13.7-.7-16.4-4.3-5.2-9.8-16.7-30.4-22.5-43 0-2.4.3-2.9.2-5.2Z" style="stroke-width:0;fill:#152b50"/><path d="M97.8 31.9h.3c.9.7 1.2 3.4-.1 4.1.2-3.5-5-3.2-4.7.6 0 .7-1.4.5-2.3.3.1-1.2.2-2.4.2-3.6 2.4 1.1 4.1-1.4 6.6-1.4" class="cls-7"/><path d="M19.6 147.3c-.4-14-.3-29.3.9-43.4 4.2 1 8-.3 2.6-2.9 2.2-.1 4.2-.6 2.3-3.3-.3-.4-.9-.6-1.6-.7 4.7 0 2.4-3.9-1.4-3.6 2.1.2 4.7-.6 3.4-2.6 10.2 2.1 20.5.8 30.6-.7 3.5 7.6 7.4 15.4 11.3 22.2 3.7 6.5 11.8 23 13.6 25.5 2.4 3.4 10.7 4.5 15.4 4.4-1.2 8.2-8.2 18.1-17.5 18.1-6.1.4-11.7.8-17.3-1.2-12.2-3.2-16.7-24.9-20.4-35.3h-.3c.5 7.6 1.1 16.3.7 23.8-7.2.6-14.9.2-22.2-.4Z" class="cls-3"/><path d="M93.6 54.4c.8-.6 1.5-1.1 1.8-1.4.2 2 .2 3.6 0 5.6-1.6 2.1-4 4.2-6.2 6.1-7.4 0-15.3 0-22 2.9-.6-1.3-.6-1.9-1.5-3.3 9.7-1.5 18.3-3.3 27.9-9.9" style="stroke-width:0;fill:#bdbec1"/><path d="M75.9 34c0-.9-.2-1.9-.3-2.9l.3-.3 15 .5v.2c-.1 1.6-.6 7.2-1 7.7H76.7c-.3-2-.6-3.5-.7-5.3Zm13.7-1.5c-1.8 0-10.4-.2-12.7-.3.3 2.4.4 3.9.9 6 3.1.1 7.7.2 11 0 .3 0 .8-5.1.8-5.8Z" class="cls-7"/><path d="M89.6 32.5c-.7 7 .2 5.7-6.6 5.8v-1.4c1.1 0 1.1-3.6 0-3.6v-.9c2.9 0 5.8.1 6.6.1" class="cls-8"/><path d="M87.1 29.9c-.3.8-3.9-.3-7.1.5-.4-.1-.2-.7-.4-1.3 1.1-.7 3.5-1.3 4.8-.6.5.3 2.6.6 2.8 1.5Z" class="cls-4"/><path d="M83 33.3c1.1 0 1.1 3.6 0 3.6s-1.1-3.6 0-3.6" class="cls-6"/><path d="M83 32.4v.9c-1.1 0-1.1 3.6 0 3.6v1.4c-2 0-3.8 0-5.3-.1-.4-2.1-.6-3.6-.9-6 1.3 0 3.7.1 6.2.2" class="cls-8"/><path d="M75.7 32.3c0 .6.1 1.2.2 1.7-1.3 0-2.7.1-4 .1 0-.6.1-1.1.2-1.7h3.6Z" class="cls-7"/><path d="M58.8 32.3c0 .6.5 5.5.8 5.5h10.5c.4-2 .6-3.4.8-5.8-2.4.2-10.7.3-12.2.3Zm-.8 1-.3-2.1 14.5-.4c-.2 2.8-.5 5.1-1 7.9-3.4.1-8.6.2-12.7.1-.4-1.3.2-2.4 0-2.7-.2-.8-.4-1.8-.6-2.8Z" class="cls-7"/><path d="M71 32c-.2 2.3-.4 3.8-.8 5.8-1.2 0-2.7 0-4.2.1v-1c1 0 1-3.5 0-3.5v-1.2c2 0 4-.1 5.1-.2Z" class="cls-8"/><path d="M65.1 28.2c1.8 0 3.8.1 3 2.3-1.6-.4-5.5-.3-7.4.3.4-1.1 2.5-2.6 4.4-2.6" class="cls-4"/><path d="M65.9 33.4c1 0 1 3.5 0 3.5s-1-3.5 0-3.5" class="cls-6"/><path d="M65.9 36.9v1c-6.7-.3-6.6 2-7.1-5.5.8 0 4 0 7.1-.1v1.2c-1 0-1 3.5 0 3.5Z" class="cls-8"/><path d="M57.7 33.3c0 .9.2 2 .3 2.9-2.2.5-1.6-1.1-2.1-2.6.4 0 1.3-.3 1.8-.3" class="cls-7"/><path d="M47.8 73.5c-6.7 2.1-13.3 3.6-20.7 4.1 3.3-8.4 15.3-8.6 20.7-4.1" class="cls-3"/><path d="M41.8 147.7c1.9 2.5 1.8 8.2 1.5 11.2-6 1.9-13.2 1.1-19.4 1.2-6.6.6-13 .3-19.5-.5-.9-7.5 8.8-12.3 15.1-12.1v-.4c7.3.6 15 1 22.2.4Z" style="fill:#3a3a3a;stroke-width:0"/><path d="M96.9 33.9c-1.8-.8-3.6.3-3.6 2.8s-1.4.5-2.3.3c.7-6.4 0-19.7-1.5-20.6-3.5-3-10.9 1.4-16.4 1.4-9-2-13.4-7.1-15.9 7.8 0 1.8.2 3.8.5 5.7l14.5-.4c0 .5 0 1.1-.1 1.6h3.6c0-.4 0-.7-.1-1.1l.3-.3 15 .5v.2c-.1 1.6-.6 7.2-1 7.7H76.7c-.3-2-.6-3.5-.7-5.3-1.3 0-2.7.1-4 .1-.2 1.6-.4 2.9-.7 4.6-3.3-.1-9.3.7-12.8-.2-.8 8 5 18 12.1 21.1-.2 1.4 0 2.5-.1 3.8 8.4-1.3 14.6-3.5 23.2-9.1-.3-3.4-.1-7.1 0-10.6.9.6 1.9.7 2.7-1.7.4-1.8 3.3-6.7.6-8.2Zm-28.7-3.4c-1.6-.4-5.5-.3-7.4.3.4-2.2 8.6-4.6 7.4-.3m11.8-.2c-.4-.1-.2-.7-.4-1.3 1.1-.7 3.5-1.3 4.8-.6.5.3 2.6.6 2.8 1.5-.3.8-3.9-.3-7.1.5ZM26.1 91.9c0-2.7-6-1.9-7.6-.6-1.6 2.1 1 2.1 3.4 2.2 1.8 0 4 0 4.2-1.6" class="cls-5"/><path d="M25.2 94.1c-1.4-.8-6.3-1.2-7 .8-.9 2.5 1.2 2.4 3.3 2.3v.1c-3.2.5-3.9 2.8-.5 3.3 0 .2 0 .4-.1.7-2.5-.1-2.7 2.7-.4 2.6v.3c4.2 1 8-.3 2.6-2.9 2.2-.1 4.2-.6 2.3-3.3-.3-.4-.9-.6-1.6-.7 2.2-.2 4-.7 1.5-3Z" class="cls-5"/><path d="M58.6 36.1c-1.6 8.5 4 20.1 11.9 23.6 5.2 1.9 11.8-.8 21.5-8.6M58 33.3c.2 1 .4 2 .6 2.8m-1.2-13c-.4 3.2 0 6.9.6 10.2m2.7-2.5c1.9-.6 5.9-.7 7.4-.3m11.9-.2c3.2-.8 6.8.4 7.1-.5" class="cls-10"/><path d="M71.9 39.9c-.8 1-2.3 1-3.1 2.6 0 2.1.9 2.6 2.2 3.1m-13.8-20c2.5-14.9 6.8-9.8 15.9-7.8 5.5 0 12.9-4.4 16.4-1.4 1.6.9 2.2 14.2 1.5 20.6.9.2 2.3.4 2.3-.3-.3-3.7 4.9-4 4.7-.6-.4 2.3-1.8 9.7-4.4 7.7m4-32.2C95.9 9.8 90.7.7 80.9.3" class="cls-10"/><path d="M57 33.2c-3.6-18.1-4.2-19.3 3.4-27.4M93 49.4c.7-.6 1.1-1 1.7-1.7.2-.3.3.8.5.6 2.4-3 3.4-8.1 4.4-12.5V38c2.3-8.9 1.9-20.1-2-26.3M60.4 5.8C64.6.4 77 0 80.9.3" class="cls-10"/><path d="M93.5 42.2c0 3 .1 7.7-2.1 9.6m-30.7-21c.4-2.2 8.6-4.6 7.4-.3m11.9-.2c-.4-.1-.2-.7-.4-1.3 1.1-.7 3.5-1.3 4.8-.6.5.3 2.6.6 2.8 1.5M68 51.7c4.1 1.5 10 .7 14-1.8m13.2-13.4q0 1.8-.9 3.3m-28.4-6.4c1 0 1 3.5 0 3.5s-1-3.5 0-3.5m17.1-.1c1.1 0 1.1 3.6 0 3.6s-1.1-3.6 0-3.6" class="cls-10"/><path d="M58.8 32.3c0 .6.5 5.5.8 5.6h10.5c.4-2 .6-3.4.8-5.8-2.4.2-10.7.3-12.2.3m.1-.1s0 0 0 0" class="cls-10"/><path d="M57.6 31.4c.2.9.4 6.1 1 7.4 4 .1 9.3 0 12.7-.1.5-2.7.7-5 1-7.7m17.3 1.5c0 .3-.5 5.8-.9 5.8h-11c-.4-2.1-.6-3.6-.9-6 2.3.1 10.9.3 12.7.3m-12.9 6.6c-.5-2.8-.8-5.2-1-8m15.2.4s0 0 0 0c-.2 1.7-.6 7.3-1 7.8m.9-6.3c2.5 1.6 4.5-1.1 7.2-1.1" class="cls-10"/><path d="M58.1 33.3H58c-.6 0-1.6.3-2.1.3.3 2 .4 3.4 2.9 2.4m13.5-3.6c1.2 0 2.3 0 3.5-.1m-3.9 1.8c1.4 0 2.8-.2 4.1-.1m-18.4-2.8c.2 0 14.5-.4 14.7-.5m3.6.1c.3 0 14.9.5 15.1.6m-14.4 7.8h13.5m8-7.4c.9.8 1.2 3.6-.2 4.3M81.7 60.7c-3.7 1.5-12.7 2.9-16 3.6.9 1.3.9 1.9 1.5 3.1" class="cls-10"/><path d="M20.2 90.4c-2.2-1.7-2.5-7.7-1-9.8 1.6-2.2 5.3-2.8 7.9-3 6.9-.5 13.2-1.8 19.4-3.6 16.3-4.5 26.7-10.4 42.9-9.4M96.1 81c-3.2 5.6-16.8 5.3-22.2 6.2-16 2.4-31.9 6.8-48.1 3.6m55.9-30.1c1.4-.5 10.7-4.9 13.7-7.8.2 2.6.2 4.8 0 7.3" class="cls-10"/><path d="M59 90c0 2.3-.2 2.6-.2 5m8.8 17.4c-.3-.5-.6-1-.8-1.4m28.7-55.6c7.7 12.2 2.4 28.9 2.5 42.8-1.3 15 0 28.7-.4 44.1-5 .3-13.7-.7-16.4-4.3-1.8-2.5-9.9-19-13.6-25.5" class="cls-10"/><path d="M56.4 90.3c4.6 10.3 10.6 20.5 15.1 30.1m-51-16.7c-1.3 14.2-1.3 29.6-.9 43.7 7.3.6 15 1 22.2.4.4-7.5-.2-16.2-.7-23.7-.7-4.8-2.1-12.7-.9-16.8M21 100.5c0 .2 0 .4-.1.7m.6-4.1v.1m75.2 44.9c-1.2 8.3-8.2 18.3-17.6 18.3-6.1.4-11.7.8-17.3-1.2-12.2-3.2-16.7-24.9-20.4-35.3M27.1 77.6c3.3-8.4 15.3-8.6 20.7-4.1m45.6-26.8c.3 2.4-.2 5.3.2 7.7" class="cls-10"/><path d="M19.6 146.6v1.1c-6.3-.2-16 4.6-15.1 12.1 6.5.8 12.8 1 19.5.5 6.2-.2 13.5.6 19.4-1.2.3-3.2.5-9.2-1.9-11.6M70.3 60c.2 1.5 0 2.1 0 3.4" class="cls-10"/><path d="M19.5 103.7c6.9 1.9 9-1.4 1.5-3.3-5.2-1.1-.3-3.8 2.7-3.4 4.7 0 2.4-3.9-1.4-3.6-2.3 0-5.7 0-3.9-2.2.2-.3.9-.6 1.8-.8 5.4-1.7 9.1 2.9 2.1 3-1.6 0-3.7 0-4.1 1.4-1.2 3.4 3.5 1.9 5.5 2.2.7 0 1.3.2 1.6.7 1.9 2.7 0 3.1-2.3 3.3-1.2.1-3.2 0-3.9.7-1 1.6.6 2 1.8 2m68.3-39.1c2.3-2 4.8-4.1 6.4-6.5" style="fill:none;stroke:#000;stroke-width:.6px;stroke-miterlimit:10"/></svg>')}`;
export default image;