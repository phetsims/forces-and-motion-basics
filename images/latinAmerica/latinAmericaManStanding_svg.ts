/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Latin_America" width="94.9" height="280.6" viewBox="0 0 94.9 280.6"><defs><style>.cls-1{fill:#a37c67}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-8{stroke-width:0}.cls-2{fill:#010101}.cls-9{stroke-linecap:round;stroke-linejoin:round}.cls-10,.cls-9{fill:none;stroke:#000;stroke-width:.6px}.cls-3{fill:#818066}.cls-4{fill:#8f6c57}.cls-5{fill:#c2a882}.cls-6{fill:#505141}.cls-8{fill:#2c2826}</style></defs><path d="M94.2 270.2c-2 5.5-11.4 7.9-16.8 6.1-2.9-1-5.3-3.2-7.6-5.2-2.4-2.1-8.3-5.2-11.1-6.8 0-1.1.7-2 .6-3.2 6.3-.6 13.2-3.3 14.6-5.7 1.8 1.1 5.4 2.4 7.5 3.1 5 1.7 14.6 3.6 13.1 10.9 0 .3-.2.6-.3.9Z" class="cls-6"/><path d="M94.2 270.2c.3 2.2-.4 2.8-1.6 4.4-5.2 6.8-14.9 7.8-21.1 1.1-2.5-2.7-4.2-5.1-7.6-6.7-4.2-1.9-4.2-1.3-5.1-4 0-.3-.1-.5-.1-.8 2.8 1.7 8.8 4.7 11.1 6.8 2.3 2 4.7 4.3 7.6 5.2 5.4 1.8 14.8-.6 16.8-6.1Z" class="cls-6"/><path d="M88.2 111.3c.3 8.1-2.1 10.8-2.1 10.8-3.4 4.1-11.1 8.3-16.9 11.4-.4-6.3-.6-11.2-.6-11.2 0-1-.2-2-.3-2.9 1.2-.9 1.6-1.3 2.4-2.1 1.3-1.3 2.1-2.1 2.7-2.6 1.3-1.1 1.9-1.3 5.1-2.5 3-1.2 6.5-1.7 9.7-.8Z" class="cls-1"/><path d="M69.7 160.8c-3.5 1.4-10.3 1.6-12.4 1.8-3.5.4-7.1.7-10.6.9-1.4 0-2.5-.3-3.4-1-2-1.4-3.3-3.9-4.9-5.8 0-.1-.3 0-.6.3-1-26.3.9-49.9-.5-76.6 0 .3.4 0 1-.8 3.5-2.1 14.5-5.4 16-6.9 0 0-.9-3.6-2.5-5.3 2.7-.4 5.4-.7 8.2-1.1.7 0 1.5-.2 1.8-.8.4-.6 0-1.4-.3-2 1.8.7 14.9 9.5 16.2 10.7 0 0 5.2 13.7 6.4 17.2 3 8.7 4.1 15.2 4.3 19.9-3.2-.8-6.6-.4-9.7.8-3.2 1.2-3.8 1.3-5.1 2.5-.6-2.9-2.5-8.9-4.8-15.1-.9 2-1.1 7.3-1.1 9.6 0 3.8.5 7 .8 10.2.1 1 .2 2 .3 2.9 0 0 .2 4.9.6 11.2.6 8.9 1.4 20.6 2.4 25.9-.3.6-1 1.1-1.9 1.5Zm-27.4-5.6c.3-.8 0-1.7-.9-2-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2s1.7 0 2-.9m-.7-52c.3-.8 0-1.7-.9-2-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2 .8.3 1.7 0 2-.9m0 18.2c.3-.8 0-1.7-.9-2-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2 .8.3 1.7 0 2-.9m0 15.8c.3-.8 0-1.7-.9-2-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2 .8.3 1.7 0 2-.9m-.3-53.7c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6" class="cls-5"/><path d="M69.7 160.8c2 29.4 4.2 94.4 4.2 94.4-1.4 2.4-8.3 5.1-14.6 5.6-2.5.2-5 0-6.8-.5-3.2-12.4-8.1-78.1-10-94.9 0-.7-.1-1.3-.2-1.8l1-1.2c1 .7 2.1 1.1 3.4 1 3.6-.2 7.1-.5 10.6-.9 2.1-.2 8.9-.4 12.4-1.8Z" class="cls-3"/><path d="M58.7 41.2c-1.3 5.1-6.1 12.7-7.6 14.1-6 4.9-12 5.8-15.7 4.6-1.3-.4-3.8-1.6-6.2-3.5-3-2.3-6-5.7-6.8-9.9-.1-.7-.3-1.4-.4-2.2-1-4.9-2.3-11.1-2.3-11.1v-2.8c0-5.1.7-9.7 1.5-13 1.8-7 3.9-1.6 14.3-1.6s15.7-5 18.8 1.3c2 4.1 5 11 5.1 15.3h.4c.4-1 1.1-1.6 1.9-1.6.3 0 .7 0 1.1.2 2.9 1.2.8 6.4 0 8.6-.9 2.5-2.8 2.4-3.8 1.7h-.4Zm-15.8-11c4.6-1.7 11 .8 11.3-1.1-.2-1.9-3.6-2.8-5.1-3.3-2.3-.8-4.7-.5-6.3 1-.2 1.2-.5 2 0 3.4Zm5.8 3c0-1.1-.4-2-1-2s-1 .9-1 2 .4 2 1 2 1-.9 1-2M37 50.4c4 .2 7.8-1.7 9.8-4.2-1 .8-10.4 2.7-15.1.9 1.2 1.9 2.5 3.1 5.3 3.2Zm-3.9-20.1c1.1-4-1.7-4.3-4.3-4.2-2.6 0-5.7 2.8-6.2 4.7 2.7-1.1 8.3-1.2 10.4-.5Zm-3.8 3c0-1.1-.4-1.9-.9-1.9s-.9.9-.9 1.9.4 1.9.9 1.9.9-.9.9-1.9" class="cls-1"/><path d="M61.4 14.9c.7 4.9 1.4 10.9.3 15.8-.9 0-1.5.6-1.9 1.6h-.4c0-4.3-3.1-11.2-5.1-15.3-3.1-6.3-12.5-1.3-18.8-1.3-10.3 0-12.5-5.5-14.3 1.6-.8 3.3-1.5 8-1.5 13h-.5c-.4-.1-.9 0-1.1.3s-.4.7-.5 1.1c-1-3.6-.2-6.9-.3-10.6-.3-9.1 2.4-19 8.6-19.8 13.3-1.7 25-1.6 28.4 1.2s6 4.7 7.1 12.3Z" class="cls-8"/><path d="M61.4 63.5c.4.6.7 1.4.3 2-.4.5-1.1.7-1.8.8-2.7.4-5.4.7-8.2 1.1 1.6 1.7 2.5 5.3 2.5 5.3-1.5 1.4-12.5 4.7-16 6.9 2.1-2.6 7-10 10.4-14.7 2.3-3.1 2.5-5.8 2.5-9.5 3.5 1.2 8.3 5.2 10.2 8.1Z" class="cls-5"/><path d="M54.3 29.1c-.4 1.9-6.8-.6-11.3 1.1-.6-1.3-.3-2.2 0-3.4 1.6-1.5 4-1.8 6.3-1 1.5.5 4.9 1.4 5.1 3.3Z" class="cls-8"/><path d="M29.2 57.7c0-.8.1-1.3.1-1.3 2.4 1.9 4.9 3.1 6.2 3.5 3.7 1.2 9.6.3 15.7-4.6 0 3.8-.3 6.4-2.5 9.5-3.4 4.7-8.3 12.1-10.4 14.7-.5.3-.8.6-1 .8-.3-.2-.5-.5-.8-.7-1.8-2.5-5.1-11.1-6.4-15.6-.8-2.8-.9-5-.9-6.4Z" class="cls-1"/><path d="M47.8 31.2c.5 0 1 .9 1 2s-.4 2-1 2-1-.9-1-2 .4-2 1-2" class="cls-2"/><path d="M37.7 157c.3-.3.5-.5.6-.3 1.6 1.9 2.9 4.4 4.9 5.8l-1 1.2c0 .5.1 1.1.2 1.8 0 6-1.5 88.6-3.1 94.9-1.1.3-2.1.6-3.1.9-10.3 2.8-13.1 2.4-19.3-3.6-2.9-16.5-.4-87.3.5-97.7v-.2c3.2.5 6.3 1.4 9.3 2.1 1.4.3 5.7 1.9 7 1.2.2 0 2.8-4.7 4.1-6Z" class="cls-3"/><path d="M46.8 46.2c-2 2.5-5.8 4.4-9.8 4.2-2.8-.2-4.1-1.4-5.3-3.2 4.7 1.7 14.2-.1 15.1-.9Z" style="stroke-width:0;fill:#fff"/><path d="M15.2 113.8c-1.1-1.3-1-1.7-2.1-2.6-3.6-1.6-7.6-1.6-11-.2.7-5.8 1-11.8 2.3-16.6 1.1-4.3 3.8-20.9 6.9-22.5 1.8-.9 7.6-4.3 10.5-5.7 1.7 0 3.4-.2 4.8.3-1.4 1.7-1.2 2.7-2.5 4.4 4.2 3.9 8.3 5.2 12.4 8.8.3.5.6.7.8.7 1.4 26.7-.5 50.3.5 76.6-1.2 1.4-3.9 5.9-4.1 6-1.3.7-5.5-.9-7-1.2-3-.6-6.2-1.6-9.3-2.1-1.2-.2-2.4-.3-3.5-.4-.2-5.4.2-16.7.7-27.6.3-6.5.5-13 .7-18Zm10.9.8c8 .1 6.6-21.5 6.6-21.5-3.9 0-10.8-.6-13.6-.8 0 0-1.8 22.2 7 22.3" class="cls-5"/><path d="M38.2 79.6c-.6.8-1 1.1-1 .8.1-.3.5-.5 1-.8m-1.8.1c.3.2.5.5.8.7-.2 0-.5-.3-.8-.7" class="cls-4"/><path d="M.6 269.5h.2c6.4 6.1 11.1 5.7 19.2 2.6 3-1.2 5.9-2.8 8.9-4 2.6-1 6.4-.5 7.8-3.6.2.7.2 1.4 0 2.2-1.1 3.2-6 3.5-8.7 4.6-4.1 1.7-8.8 4.6-13 5.8-5.4 1.6-15.8-4-14.5-7.6h.2Z" class="cls-6"/><path d="M36.1 261.2c.4 1.9-.1 1.3.5 3.2-1.4 3.1-5.2 2.5-7.8 3.6-3 1.2-5.8 2.9-8.9 4-8.1 3.1-12.8 3.6-19.2-2.6H.5c-.2-4.4 1.3-8.2 16.2-11.8 6.2 6 9 6.5 19.3 3.6Z" class="cls-6"/><path d="M21.7 66.1c-1 0-1.9 0-2.8-.4 1.8-2.7 6.9-7 10.3-8 0 1.4 0 3.6.9 6.4 1.3 4.4 4.6 13 6.4 15.6-4.2-3.6-8.2-4.9-12.4-8.8 1.4-1.7 1.2-2.7 2.5-4.4-1.5-.5-3.2-.3-4.8-.3Z" class="cls-5"/><path d="M28.8 26.1c2.6 0 5.3.2 4.3 4.2-2.2-.7-7.8-.6-10.4.5.5-2 3.6-4.7 6.2-4.7Z" class="cls-8"/><path d="M32.7 93.1s1.4 21.7-6.6 21.5c-8.8-.2-7-22.3-7-22.3 2.8.3 9.7.8 13.6.8" class="cls-5"/><path d="M28.4 31.4c.5 0 .9.9.9 1.9s-.4 1.9-.9 1.9-.9-.9-.9-1.9.4-1.9.9-1.9" class="cls-2"/><path d="M19.8 33.2s1.4 6.2 2.3 11.1c-3.1-1.8-5.3-9.6-4.6-12.5.1-.4.2-.8.5-1.1s.7-.5 1.1-.3h.5v2.8Z" class="cls-4"/><path d="M15.2 113.8c-.2 5-.4 11.5-.7 18-.5-.4-.7-.4-1.2-.8-6.3-5-13-10.2-11.6-17.2.1-.9.3-1.9.4-2.8 3.4-1.3 7.4-1.4 11 .2 1.1.9 1 1.2 2.1 2.6" class="cls-1"/><path d="M19.8 33.2s1.4 6.2 2.3 11.1c.2.8.3 1.5.4 2.2.8 4.2 3.8 7.6 6.8 9.9 2.4 1.9 4.9 3.1 6.2 3.5 3.7 1.2 9.6.3 15.7-4.6M22.6 30.8c2.7-1.1 8.3-1.2 10.4-.5m9.9-.1c4.6-1.7 11 .8 11.3-1.1" class="cls-9"/><path d="M32.6 40.6c-1.4 4.3 7.3 4.2 10 3.1m16.8-9.2c0-.8.1-1.6.4-2.2.4-1 1.1-1.6 1.9-1.6.3 0 .7 0 1.1.2 2.9 1.2.8 6.4 0 8.6-.9 2.5-2.8 2.4-3.8 1.7m-39.2-8v-2.8c0-5.1.7-9.7 1.5-13 1.8-7 3.9-1.6 14.3-1.6s15.7-5 18.8 1.3c2 4.1 5 11 5.1 15.3m-.4 6.5c0 .7-.1 1.4-.4 2.3-1.3 5.1-6.1 12.7-7.6 14.1m-29 10.6c-.1 0-.3.1-.4.2-2.8 1.4-8.6 4.8-10.5 5.7-3 1.5-5.8 18.1-6.9 22.5-1.2 4.8-1.6 10.8-2.3 16.6-.1 1-.2 1.9-.4 2.8m71.8.9c-.6-2.9-2.5-8.9-4.8-15.1-1.1-2.8-2.2-5.6-3.4-8.1m-3.8-27.9c1.8.7 14.9 9.5 16.2 10.7 0 0 5.2 13.7 6.4 17.2 3 8.7 4.1 15.2 4.3 19.9.3 8.1-2.1 10.8-2.1 10.8M17 85.6c-1.4 9.5-1.7 11.2-1.7 21.7s0 3.9-.1 6.4c-.2 5-.4 11.5-.7 18-.4 11-.9 22.2-.7 27.6 1.2 0 2.3.2 3.5.4 3.1.5 6.3 1.4 9.3 2.1 1.4.3 5.7 1.9 7 1.2.2 0 2.8-4.7 4.1-6 .3-.3.5-.5.6-.3 1.6 1.9 2.9 4.4 4.9 5.8 1 .7 2.1 1.1 3.4 1 3.6-.2 7.1-.5 10.6-.9 2.1-.2 8.9-.4 12.4-1.8.9-.4 1.6-.9 1.9-1.5" class="cls-9"/><path d="M68.6 99.5c-.9 2-1.1 7.3-1.1 9.6 0 3.8.5 7 .8 10.2.1 1 .2 2 .3 2.9m-66.8-8.4c-1.4 7 5.3 12.3 11.6 17.2.5.4.6.4 1.2.8m-1.5-20.6c1.1.9 1 1.2 2.1 2.6m71 8.3c-3.4 4.1-11.1 8.3-16.9 11.4" class="cls-9"/><path d="M68.3 119.4c1.2-.9 1.6-1.3 2.4-2.1 1.3-1.3 2.1-2.1 2.7-2.6 1.3-1.1 1.9-1.3 5.1-2.5m-61.2 47.7c-1 10.5-3.4 81.3-.5 97.7 6.2 6 9 6.5 19.3 3.6 1-.3 2-.6 3.1-.9 1.7-6.3 3.1-88.9 3.1-94.9m29.3-6c-.9-5.2-1.8-17-2.4-25.9-.4-6.3-.6-11.2-.6-11.2m-26.4 41.4c0 .5.1 1.1.2 1.8 1.9 16.8 6.9 82.4 10 94.9 1.9.6 4.3.8 6.8.5 6.3-.5 13.2-3.2 14.6-5.6 0 0-2.3-65.1-4.2-94.4v-.3m-69 109v-.2h0c-.2-4.5 1.3-8.3 16.2-11.8" class="cls-9"/><path d="M.8 269.4c6.4 6.1 11.1 5.7 19.2 2.6 3-1.2 5.9-2.8 8.9-4 2.6-1 6.4-.5 7.8-3.6m22-.1c2.8 1.7 8.8 4.7 11.1 6.8 2.3 2 4.7 4.3 7.6 5.2 5.4 1.8 14.8-.6 16.8-6.1l.3-.9c1.5-7.3-8.2-9.3-13.1-10.9-2-.7-5.7-1.9-7.5-3.1" class="cls-9"/><path d="M36.1 261.2c.4 1.9-.1 1.3.5 3.2.2.7.2 1.4 0 2.2-1.1 3.2-6 3.5-8.7 4.6-4.1 1.7-8.8 4.6-13 5.8-5.4 1.6-15.8-4-14.5-7.6m58.9-8.4c.1 1.3-.7 2.2-.6 3.2 0 .2 0 .5.1.8 1 2.7 1 2.1 5.1 4 3.4 1.5 5 3.9 7.6 6.7 6.2 6.7 15.9 5.7 21.1-1.1 1.2-1.6 1.9-2.2 1.6-4.4 0-.2 0-.5-.1-.7" class="cls-9"/><path d="M38.2 79.6c2.1-2.6 7-10 10.4-14.7 2.3-3.1 2.5-5.8 2.5-9.5" class="cls-10"/><path d="M37.2 80.4c0 .3.4 0 1-.8" class="cls-9"/><path d="M29.3 56.4s0 .5-.1 1.3c0 1.4 0 3.6.9 6.4 1.3 4.4 4.6 13 6.4 15.6.3.5.6.7.8.7M22.6 30.8c.5-2 3.6-4.7 6.2-4.7s5.3.2 4.3 4.2m9.8-.1c-.6-1.3-.3-2.2 0-3.4 1.6-1.5 4-1.8 6.3-1 1.5.5 4.9 1.4 5.1 3.3m-25 4.2c0 1.1-.4 1.9-.9 1.9s-.9-.9-.9-1.9.4-1.9.9-1.9.9.9.9 1.9m19.4-.1c0 1.1-.4 2-1 2s-1-.9-1-2 .4-2 1-2 1 .9 1 2" class="cls-9"/><path d="M17.5 31.8c-1-3.6-.2-6.9-.3-10.6-.3-9.1 2.4-19 8.6-19.8 13.3-1.7 25-1.6 28.4 1.2s6 4.7 7.1 12.3c.7 4.9 1.4 10.9.3 15.8" class="cls-9"/><path d="M19.2 30.4c-.4-.2-.9 0-1.1.3s-.4.7-.5 1.1c-.8 2.9 1.4 10.7 4.6 12.5q0 0 0 0m24.6 1.9c-2 2.5-5.8 4.4-9.8 4.2-2.8-.2-4.1-1.4-5.3-3.2" class="cls-9"/><path d="M31.7 47.1c4.7 1.7 14.2-.1 15.1-.9" class="cls-9"/><path d="M61.4 63.5c-1.9-2.9-6.8-6.9-10.2-8.1" class="cls-10"/><path d="M38.2 79.6c3.5-2.1 14.5-5.4 16-6.9 0 0-.9-3.6-2.5-5.3 2.7-.4 5.4-.7 8.2-1.1.7 0 1.5-.2 1.8-.8.4-.6 0-1.4-.3-2" class="cls-9"/><path d="M29.4 57.7h-.2c-3.4 1-8.5 5.3-10.3 8 .9.3 1.8.4 2.8.4 1.7 0 3.4-.2 4.8.3-1.4 1.7-1.2 2.7-2.5 4.4 4.2 3.9 8.3 5.2 12.4 8.8.3.2.5.5.8.7.1-.2.5-.5 1-.8" class="cls-10"/><path d="M37.2 80.4c1.4 26.7-.5 50.3.5 76.6v.2M19.1 92.3s-1.8 22.2 7 22.3c8 .1 6.6-21.5 6.6-21.5-3.9 0-10.8-.6-13.6-.8m19.1-8.8c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6-.7-1.6-1.6-1.6-1.6.7-1.6 1.6m2.6 17.7c-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2 .8.3 1.7 0 2-.9.3-.8 0-1.7-.9-2m0 18.1c-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2 .8.3 1.7 0 2-.9.3-.8 0-1.7-.9-2m0 15.9c-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2 .8.3 1.7 0 2-.9.3-.8 0-1.7-.9-2m.6 17.9c-.8-.3-1.7 0-2 .9-.3.8 0 1.7.9 2s1.7 0 2-.9c.3-.8 0-1.7-.9-2m46.8-41.8c-3.2-.8-6.6-.4-9.7.8m-65.4-.9c-3.6-1.6-7.6-1.6-11-.2" class="cls-9"/></svg>')}`;
export default image;