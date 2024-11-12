/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Oceania" width="63.3" height="196.6" viewBox="0 0 63.3 196.6"><defs><style>.cls-1{fill:#e5c1ae;stroke-width:.6px}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke:#000;stroke-linecap:round;stroke-linejoin:round}.cls-2{fill:#d91f26}.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke-width:.6px}.cls-3{fill:none}.cls-4{fill:#1c130d}.cls-5{fill:#bf9465}.cls-6{fill:#4c3214}</style></defs><path d="M19.9 45.3c-.3.7-.6 1.4-.7 2-.2.8-.3 1.5-.4 2.1h0c-.2.5-.4 1-.5 1.5-.1.3-.2.7-.3 1-.5 1.7-.7 3.4-1 5.4-.1 2.4-.1 4.4 0 6.2h0c-2.9-.7-5.1-1.4-6-3.7-.2-.4-.3-.9-.4-1.4.4-2.1 1.1-4 1.9-5.6 0-.2.2-.4.3-.5.6-1.1 1.2-2 1.9-2.8h0c1.8-2.3 3.8-3.7 5.1-4.1h.1Zm36.7 14.2c-.2.2-.5.3-.7.5-.1 0-.2.1-.3.2-.1 0-.2.1-.3.2-.2.1-.4.2-.7.4-.6.3-1.2.6-1.7.8-.2 0-.4.2-.6.2-1.1.4-2.1.6-3.1.8-.4 0-.8.1-1.2.2q0 0 0 0h0c-.3 0-.6 0-.9.1-.3 0-.7.1-1 .2-.3 0-1-3.3-1.6-5.8 0 0 0-.4-.2-1-.2-1.3-.5-3.5-.5-3.5 1.3-4.8 2.3-6.1 4.7-6.2.6 0 1.4 0 2.3.2 1.5.3 5.9 5.9 6 12.8Z" class="cls-2"/><path d="M53.6 140.3c-.2-8.5-.6-18.1-1.4-25.7-.1-1.4-.3-2.8-.4-4-.3-2.5-.7-4.6-1.1-6.3-.1-.5-.2-1-.4-1.4 0-.2 0-.5-.1-.9-.4-2.2-1.8-7.1-3-11.9-.1-.5-.2-1-.4-1.5l-.3-1.2c-.4-1.8-.8-3.6-1.1-5.1-.3-1.4-.5-2.6-.5-3.5v-.7c0-1.2 0-2.6.2-4.1q0 0 0 0v-.5c.1-1.5.3-3 .4-4.3 0-.4.2-1.1.3-1.8.4-1.7.9-3.9 1.2-4.5h0c-.3 0-.7 0-1 .1-.3 0-1-3.3-1.6-5.8 0 0 0-.4-.2-1-.2-1.3-.5-3.5-.5-3.5 1.3-4.8 2.3-6.1 4.7-6.2h0c-.5-.1-.9-.2-1.4-.2-1.2-.2-2.5-.3-3.8-.5h0c-3.4 2.1-3.9 5.4-5.6 9-.3.6-.6 1.3-1.2 1.7-.6.3-1.3.3-1.9.2-1.8-.1-9.6-.7-11.4-.8h-.4v.5c0 .6 0 1.3.2 1.9.3 2.4.8 4.7 1.2 7.1.2 1 .3 2 .5 3.1 0 .6 0 1.2-.2 1.7-.1.2-.3.4-.5.6 0 0-.2 0-.3-.2-.5-.9-1.6-3.7-2.5-6.8-.8-2.5-1.5-5.2-1.9-7.2-.2-1.1-.4-2.1-.3-2.6v-2.2c-.3 0-.6 0-.8.1-.5 1.7-.7 3.4-1 5.4-.1 2.4-.1 4.4 0 6.2 0 1.1.2 2.2.3 3.1h0c.4 3.4 1 5.6 1.2 6.8.2 2.2.3 4.3.2 6.8 0 1-.1 2.1-.2 3.3 0 .3 0 .7-.1 1h0c0 .9-.2 1.8-.4 2.8v.8c-.3 2.1-.7 4.4-1.2 7-.2 1.4-.5 2.8-.8 4.3-.3 1.1-.7 3-1 5.3-.2 1.4-.4 2.9-.6 4.6l-.3 2.7c0 .7-.2 1.5-.3 2.3-.3 3-.7 6.2-1 9.6 0 .5 0 .9-.2 1.4-.2 2.4-.5 4.9-.7 7.4-.2 2.2-.4 4.3-.6 6.4-1.1 11.8-2 22.2-2.5 24.6 1 .4 2.2.8 3.4 1.1 3.2.8 6.9 1.4 11.4 1.8 2.7.2 5.7.3 8.9.3 3.7.5 6.6.4 9.2 0 3.9-.7 7.1-2.2 11.3-4h0c.3-.2.7-.3 1.1-.5 0 0 0-10.1-.2-22.2Z" class="cls-2"/><path d="M52.8 184.2v-.1" class="cls-3"/><path d="M27.6 41.2c0 .4.5 2.9-.9 4.1-3.1 2.4-4.3 6.6-4.2 10.5v.5c0 .6 0 1.3.2 1.9.3 2.4.8 4.7 1.2 7.1.2 1 .3 2 .5 3.1 0 .6 0 1.2-.2 1.7-.1.2-.3.4-.5.6 0 0-.2 0-.3-.2-.5-.9-1.6-3.7-2.5-6.8-.8-2.5-1.5-5.2-1.9-7.2-.2-1.1-.4-2.1-.3-2.6v-2.2h0s.1 0 0-.1c0 0 0-.1-.1-.1v-2.1h0c0-.6.2-1.2.4-2.1.2-.6.4-1.3.7-2 1.2-2.6 3.3-5.6 5.1-7h.2c.8.9 1.6 2 2.6 2.8h0Z" class="cls-6"/><path d="M43.1 45.7c-3.4 2.1-3.9 5.4-5.6 9-.3.6-.6 1.3-1.2 1.7-.6.3-1.3.3-1.9.2-1.8-.1-9.6-.7-11.4-.8h-.4c0-3.9 1.1-8.2 4.2-10.5 1.3-1.2.8-3.7.9-4.1h0c2.1 1.7 4.8 2.2 10-1.2l.2.2v4.9c1.1.2 3 .3 5.2.6" class="cls-5"/><path d="M19.3 188.2c-3.2 4-10.3 5.9-15.6 4.6-1.4-.3-2.9-.8-2.8-2.2 0-1.1 1-2.2 2-2.8 1.9-1.1 4.5-2.4 6.9-3.7h0c-.5.6-.8 1.6-1.1 2.2s-.3 1.4.1 2c.6.8 1.8.8 2.8.8 2.6 0 5.2-.2 7.7-.9" class="cls-4"/><path d="M56.5 186.8c0 .7-.2 1.4-.8 1.7-.5.3-1.1.2-1.6.2-3.2-.3-6.4-.8-9.6-1.3h0c-.5-.4-.9-.9-1.2-1.4s-.4-1.2-.2-1.8c0-.4.2-.8.4-1.1 0-5.4-.9-10.2-2-16.1 3.9-.7 7.1-2.2 11.3-4-.6 6.6-1.9 11.8-1.8 18.6 1.2 1 3 2.3 5 3.7h0c.3.5.5 1.1.6 1.6Z" class="cls-5"/><path d="M62.2 192.5c-.5.9-1.5 1.4-2.6 1.6-1 0-2.1-.2-3.1-.5-4.5-1.3-7.6-2.5-11.2-5.4-.3-.2-.6-.5-.8-.7h0c3.2.5 6.4 1 9.6 1.3.6 0 1.2.1 1.6-.2.6-.3.8-1.1.8-1.7s-.3-1.1-.6-1.6c1.1.7 2.2 1.4 3.4 2.1.9.5 1.8 1.2 2.4 2.1 0 .1.2.2.2.4.5.8.6 1.8.2 2.6Z" class="cls-4"/><path d="M45 187.5c-.2 0-.3 0-.5-.1m11.5-2.2s0-.1-.1-.2" class="cls-3"/><path d="M23.3 166.7c-1.2 6.2-2.2 11.5-2.2 17.1 0 .5-.1 1-.2 1.5-.3 1.1-.8 2.1-1.5 2.9-2.5.8-5.1.8-7.7.9-1 0-2.2 0-2.8-.8-.4-.6-.4-1.3-.1-2s.7-1.6 1.1-2.1h0c1.3-.8 2.6-1.4 3.8-1.9 0-6.3-.9-11.3-1.6-17.4h0c3.2.8 6.9 1.4 11.4 1.8Z" class="cls-5"/><path d="M19.7 188.1c-.1 0-.2 0-.4.1" class="cls-3"/><path d="M61.4 195.5c-1.4.9-3.1.8-4.8.7-3.6-.3-7.2-1-10.1-3-2.9-2.1-4.7-5.8-3.5-9.1h0c-.1.7 0 1.3.2 1.8.3.6.7 1 1.2 1.4.3.2.5.5.8.7 3.6 3 6.7 4.1 11.2 5.4 1 .3 2 .6 3.1.5 1-.1 2.1-.6 2.6-1.6.4-.8.3-1.8-.2-2.6h0c1.5 1.6 1.2 4.5-.7 5.7Zm-41.2-6.1c-1 1.3-2.4 2.1-3.8 2.9-3.2 1.6-6.7 2.9-10.3 3.2-1.6.1-3.2 0-4.5-.9-1.2-.9-1.7-2.9-.5-4 0 1.4 1.4 1.9 2.8 2.2 5.3 1.3 12.4-.6 15.6-4.6.7-.9 1.2-1.9 1.5-2.9.6 1.3.2 3-.7 4.1Z" class="cls-4"/><path d="M20.8 185.3c0-.1 0-.2-.2-.3" class="cls-3"/><path d="M19.8 91.8s0 0 0 0c-.7 1.5-1.8 2.7-3.1 3.4.5-2.7.9-5 1.2-7v1c.9.4 2 1.6 2 2.7ZM45 74c-.1 1.5-.2 2.9-.2 4.1h0c-.8 1.1-2 1.9-3.3 2.2.4-1.2.6-2.4.6-3.8h0c.9.3 2.5-1.4 2.9-2.5M13.7 56s0 0 0 0c-.5 1.7-.9 3-2.6 3.6v.1c-.2-.4-.3-.9-.4-1.4.4-2.1 1.1-4 1.9-5.6.8 0 1.3 2.2 1.1 3.4Zm7.4 7.6c-1.6-1-2.8-1.9-2.9-2.2l-.7-5.8c.4.1.3 0 1.8.7.4 2 1.1 4.7 1.9 7.2Zm22.7-7.5-1.9 5.8c-2 1.7-13.7 5.2-15.3 4.8-.4-.1-1.2-.6-2.5-1.3-.4-2.4-1-4.7-1.2-7.1 2.1 1.1 4.1 2.1 4.8 2.4 1.1.5 12.3-3.2 16.2-4.6Zm9.2 84.2c0 1.6-.4 3.2-1.3 4.4 0 0-.2-1.3-.8-2.3-1.2-2.2-3-4.1-5.1-5.4 2.4 2.3 4 5.5 4.3 8.9h0c-.7.3-1.4.3-2.2.2-2-.3-3.9-1.2-5.6-2.3-.9-.6-1.7-1.3-2.4-2-.3-.3-1.5-2.2-1.8-2.3l2.1.3c-1.5-1.4-2.9-2.8-4-4.4s-1.9-3.6-1.9-5.6c.6 0 1.2.2 1.8.3-.9-1.1-1.4-2.5-1.3-3.9 2.4.5 4.7 1.7 6.5 3.4 0-.4.1-.8.2-1.2 3.5 1.2 6.4 3.8 8.2 7 .1-.4.2-.8.3-1.3 1.6 1.4 2.6 3.4 2.8 5.5v.7ZM32.9 84c-.4-.1-.8-.3-1.3-.4.5.9.7 2 .4 3-1.7-.7-3.2-1.9-4.2-3.4-.1.3-.2.6-.3.8-2.3-1.4-4.2-3.6-5.1-6.2-.1.3-.2.6-.4.9-1-1.2-1.5-2.9-1.3-4.4.1-1.3.7-2.7 1.6-3.5 0 0 0 1 .3 1.8.6 1.8 1.6 3.4 3 4.6-1.4-1.9-2.1-4.4-2-6.8.1.2.2.3.3.2.2-.1.4-.3.5-.6.3 0 .6 0 .8.2 1.4.5 2.7 1.4 3.7 2.4.6.5 1 1.1 1.5 1.8.2.2.8 1.8 1 1.9-.5-.2-1-.3-1.5-.5.9 1.2 1.8 2.4 2.4 3.8s.9 2.9.6 4.3Zm-3.1 65.2c.5.1 1 .3 1.5.4-.7 2.2-2 4.1-3.6 5.4-1.5 1.4-3.2 2.3-4.9 3.3.6.2 1.2.3 1.8.5-.3 0-1.9 1.6-2.3 1.8-.9.5-1.8 1-2.7 1.3q-2.7.9-5.4.3c-.7-.1-1.2-.5-1.7-1.1h0c1.2-3 3.2-5.5 5.5-6.8-1.8.5-3.6 1.6-5 3.4-.4.5-.8 1.1-1 1.5h-.2c-.3-1.9 0-4.2.9-6.2.9-2.3 2.5-4.1 4.3-5 0 .5-.2 1-.2 1.5 2.6-2.8 6-4.4 9.3-4.4 0 .5-.2 1-.3 1.4 2.1-1.2 4.4-1.6 6.5-1.2-.4 1.6-1.4 3-2.5 3.8Zm24.8-88.5c-.6.3-1.2.6-1.7.8h0c-.3-1.3-.8-1.7-1.7-2.7.6 1 1 1.7 1.1 2.9h0c-1.1.4-2.1.6-3.1.8h0l-.6-.6c-.4-.4-.7-.9-1-1.4-.1-.2-.5-1.4-.6-1.4.3.2.7.3 1.1.4-.6-.9-1.1-1.8-1.5-2.8s-.5-2.1-.2-3.1c.3.1.6.2.9.4-.3-.7-.4-1.5-.1-2.2 1.2.6 2.2 1.5 2.9 2.6 0-.2.2-.4.3-.6 1.6 1.1 2.8 2.8 3.3 4.7l.3-.6c.7.9 1 1.7.8 2.8Zm-29 49.3c1.1 1.5 1.4 3.7.9 5.5-1-1.1-2.4-1.8-3.8-2-1 2.3-2.7 4.1-4.8 5.2.2-1.5.2-3.1 0-4.7-1.4.6-2.9.8-4.3.5 0-.8.2-1.5.3-2.3.5-.4 1-.9 1.4-1.4h0c-.4-.4-.8-.8-1.1-1.3.2-1.7.4-3.2.6-4.6.7.1 1.3.2 1.8.4.3-3.1 1.8-4 4.5-4.5-1.3.3 0 4.6 0 4.6h0c.3 0 2.4-.3 3.2-.4 1.4-.1 2.7.1 4 .8-1.7.6-4.6 3.4-3.9 3.1 0 0 .9.7 1.2 1.1" class="cls-1"/><path d="M20.8 88.7h.1c-.5 0-2.4 0-3.1.4v-1.3c.1-.6.4-1.1.8-1.5h0c.2 0 1.6-.2 2.2-.3.9 0 1.8 0 2.7.5-1.2.4-3.1 2.3-2.7 2.1Z" class="cls-1"/><path d="M22.3 93.2c-.7-.7-1.6-1.2-2.5-1.3 0-1.1-1.1-2.3-2-2.7.7-.4 2.6-.4 3.1-.4.2.1.6.4.7.7.7 1 1 2.5.6 3.7Zm25.8 71.1c-.7-1-1.5-2-2.5-2.8.9-.9-.3-3.7-1.1-3.8 1.1-.3 3.1-.2 3.8.9q0 0 0 0c.6 1.9.5 3.9-.2 5.6Z" class="cls-1"/><path d="M51.6 157.9c-1.2 0-2.3.2-3.2.8-.8-1.1-2.8-1.2-3.8-.9.2-.9 2-2.4 2.4-2.7h1.2c1.5.3 2.8 1.4 3.5 2.8Z" class="cls-1"/><path d="M46.8 155.1h.1c-.4.3-2.2 1.8-2.4 2.7-.9-.7-1.7-1.9-1.4-3.1h0c.1-.1 1.2-1.4 1.7-2 .7-.8 1.7-1.4 2.8-1.6-.7 1.2-1 4.5-.8 3.9Zm-1.1 6.5s0 0 0 0c-.8 1.6-2.2 2.8-3.9 3.2.4-1.2.6-2.4.6-3.8h0s0 0 0 0c1 .4 2.3-2.1 2.2-3.2.8 0 2 2.9 1.1 3.8" class="cls-1"/><path d="M44.5 157.8c-1.1.5-4 .1-4-.8h-.2c-1.4-2.1-1-3.3.3-5.1-.7.9 2.4 2.8 2.4 2.8h0s0 0 0 0c-.2 1.2.5 2.4 1.4 3.1Z" class="cls-1"/><path d="M42.3 160.9c-2.2-.3-4.2-.7-4.9-2.8 1 .3 2-.9 2.9-1.1h.2c0 .9 2.9 1.2 4 .8.1 1.1-1.2 3.5-2.2 3.2Zm3.5-93.6c-.1.8-.3 1.4-.3 1.8-.1 1.3-.3 2.8-.4 4.3-.9-.7-2.4-2-2.2-3.2h0s0 0 0 0c.1-.1 1.2-1.4 1.7-1.9.4-.4.7-.7 1.2-.9Z" class="cls-1"/><path d="M45.1 73.4c-1.1.5-4.4 0-4.9-.9-1.4-2-1-3.3.3-5.1-.7.9 2.4 2.8 2.4 2.8q0 0 0 0h0s0 0 0 0c-.2 1.2 1.3 2.5 2.2 3.2" class="cls-1"/><path d="M45.1 73.4v.5q0 0 0 0c-.4 1.2-2 2.9-2.9 2.5h0c-2.2-.3-4.2-.7-4.9-2.9 1 .3 1.9-.9 2.9-1.1.5.9 3.8 1.4 4.9.9ZM18.4 50.8c-.1.3-.2.7-.3 1-.8.2-1.5.5-2.1 1-.8-.9-2.1-1.1-3.1-.7.6-1.1 1.2-2 1.9-2.8h.5c1.1.1 2.2.7 3.1 1.5" class="cls-1"/><path d="M16.5 58.5c-.8-.9-1.8-1.8-2.8-2.4.3-1.1-.3-3.3-1.1-3.4 0-.2.2-.4.3-.5 1-.4 2.3-.2 3.1.7q0 0 0 0c.8 1.8 1 3.8.6 5.6Zm.9 80.2c3.1-.3 6.4 1 8.5 3.4-2.6-.8-5.4-.7-8 .1-2.8.9-4.2 2.5-6.1 4.6 0-2.8-.1-4.7-.7-7.5.2-2.1.4-4.3.6-6.4.9 1.5 1.3 2.8 1.7 4.5 1.2-1.1 1-3 .6-4.6-.6-2.8-1-4.4-1.6-7.2 0-.5.1-.9.2-1.4 2.4 2 3.5 4.4 3.9 7.5 2.2-3.5 3.5-7.4 3.8-11.5.6 2 .9 4.1.8 6.1-.2 2.5-.8 4.9-2.1 7.1 1.4-1.2 3.5-1.4 5.4-.9 1.8.5 3.4 1.5 5 2.6-4.2-1.7-9.4 0-12 3.7Zm34.3-23c-1.4 2.9-1.2 5.3-1.1 8.4-5.3-5-11.8-8.8-18.8-10.9 4.3-.8 8.8 0 12.5 2.4 0-1.8-1.7-3.1-3.2-4.1-2.9-1.8-5.9-3.6-8.8-5.5 3.5-.4 7 .6 9.9 2.6-1.1-4.4-3.3-8.5-6.2-11.9 4.6 2.2 8.1 6.4 9.6 11.3.2-2 2.9-4.9 4.7-6 0 .4.1.7.1.9.1.4.3.9.4 1.4-2.1 2.6-2.9 5.8-2.2 9.1 1-1.2 1.9-2.1 3.3-2.8.2 1.3.3 2.6.4 4-.3.4-.3.6-.6 1.1m-17.5 9.7c-.3.3-.6.5-1 .5-.9 0-1.8-.7-1.8-.7s-.8 2.2-2.2 1.7c-.2 0-.4-.2-.6-.4q0 0 0 0c-.5-.6-.6-1.7-.2-2.1-.8.1-1.6-.5-1.9-1.3v-.8c.2-1.1 1.6-1.9 2.6-1.4-.4-.9.1-2.2 1.1-2.5s2.1.4 2.2 1.4c.7-.7 2-.6 2.4.2.5.8-.1 2.1-1.1 2.3 1 .3 1.3 2.2.6 3Z" class="cls-1"/><path d="M28.6 126.5s0 0 0 0c-.3.4-.8.7-1.3.7s-1-.2-1.3-.6c-.1-.2-.3-.4-.5-.5-.5-.3-1.1-.1-1.7 0 .4-.2.7-.7.9-1.2s.4-.9.7-1.3.5-.7.9-.6h.1c.2.8 1.1 1.4 1.9 1.3-.4.3-.3 1.4.2 2.1Zm14.8-36.7c.8.6.7 1.9 0 2.5-.8.5-2.1 0-2.3-.9-.2 1-2.1 1.4-3 .8-1.2-.9 0-2.8 0-2.8s-2.3-.6-1.9-2.1c0-.2.2-.4.4-.6.6-.5 1.7-.7 2-.3-.2-.8.4-1.7 1.2-2 .2 0 .5-.1.8-.1 1.1.1 2 1.4 1.6 2.5.9-.5 2.2 0 2.5.9.4.9-.3 2.1-1.3 2.3Z" class="cls-1"/><path d="M38.6 86.2c-.4-.4-1.4-.2-2 .3h0c-.4-.3-.7-.8-.8-1.3v-.5c0-.3.2-.6.4-.8s.4-.3.5-.5c.3-.5 0-1.1-.2-1.7.3.4.7.7 1.2.8.5.2 1 .3 1.4.6s.7.4.7.9h0c-.8.4-1.3 1.3-1.2 2.1Zm-3.5 75.7c0 1-1 1.8-2 1.6.4.4.4 1 .3 1.6-.2.6-.6 1.2-1 1.4-1.3.6-2.4-1.4-2.4-1.4s-1.7 1.7-2.8.5c-.7-.7-.3-2.4.4-2.6-1.1-.4-1.5-1.8-.9-2.7.7-.9 2.2-1 2.9-.2 0-1 1.1-1.9 2.1-1.7s1.7 1.3 1.3 2.2c.5-.2 1.1 0 1.6.3q0 0 0 0c.3.2.5.6.5 1" class="cls-1"/><path d="M38.3 163.9c-.5-.2-1.2 0-1.6.3-.3.2-.6.6-.9.8-.7.5-1.6.6-2.3.2h0c.2-.6.1-1.3-.3-1.6.9.2 2-.6 2-1.6 0-.4-.2-.7-.5-1q0 0 0 0s.4-.4 1.5.1c1.6.8 2.1 2.6 2.3 2.8Zm-5.7-65.1c-.3.7-1.5 1-2.1.4.1.4 0 .9-.4 1.3s-.9.7-1.3.7c-1.2 0-1.3-2-1.3-2s-1.9.6-2.3-.6c-.3-.8.7-2 1.3-1.8-.7-.7-.5-1.9.4-2.4.8-.4 2.1 0 2.3 1 .4-.8 1.5-1 2.2-.5s.8 1.6.2 2.2c.5 0 .9.4 1.1.8q0 0 0 0c.1.3.2.7 0 1Z" class="cls-1"/><path d="M34.3 101.5c-.4-.3-.9-.5-1.4-.4-.3 0-.6.2-1 .3-.7.1-1.5-.2-1.8-.8h0c.4-.4.6-.9.4-1.4.6.5 1.8.3 2.1-.4.1-.3.1-.7 0-1q0 0 0 0s.5-.2 1.1.7c.9 1.3.6 2.8.6 3" class="cls-1"/><path d="M49.7 24.4c0-1.8-1.2-2.6-2.7-1.7-.8.5-5.3-4.4-5.9-5.1-1.7-2-3-4.2-4.4-6.3-.5-.9-1.5-3-2.4-3.4-1-.3-3.3.8-4.2 1.1-3 1.2-5.5 3.2-7.8 5.5-3.1 3.2-3 8.5-2.7 12.7h0c.6 2.2 1.3 4 2.1 5.5 1 2.1 1.9 3.5 2.6 4.3l.9 1.2c.8 1.1 1.6 2.1 2.6 2.9 2.1 1.8 4.8 2.3 10-1.1 1.5-1 3.1-2.3 5-3.9 2.3-2.4 3.8-5.4 4.4-8.7 1.7.8 2.6-1.2 2.5-3.1Zm-25.8-.5c-.5 0-.9-.8-.9-1.8s.4-1.8.9-1.8.8.8.8 1.8-.4 1.8-.8 1.8m10.5 11c-1.2.8-3.2 1.3-4.4 1.1-2-.3-2.9-1.2-3.8-2.8 3.3 1.5 10 0 10.7-.8-1.4 2.1-1.4 1.7-2.5 2.4ZM38 24.4c-.6 0-1-.9-1-2s.5-2 1-2 1 .9 1 2-.5 2-1 2" class="cls-5"/><path d="M37 32.5c-1.4 2.1-1.4 1.7-2.5 2.4-1.2.8-3.2 1.3-4.4 1.1-2-.3-2.9-1.2-3.8-2.8 3.3 1.5 10 0 10.7-.8Z" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:.6px;fill:#fff"/><path d="M22.5 18.3c.6-1.5 1.9-1.3 2.5-.5m12.1.2c1.2-1.2 2.8-.6 3 .4" class="cls-3"/><path d="M24.7 22.2c0 1-.4 1.8-.8 1.8s-.9-.8-.9-1.8.4-1.8.9-1.8.8.8.8 1.8m14.3.2c0 1.1-.5 2-1 2s-1-.9-1-2 .5-2 1-2 1 .9 1 2" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:.6px;fill:#000"/><path d="M27.7 28.3c0 .6 1.3 1.9 3.2 2.2" class="cls-3"/><path d="M49.7 24.4c0-1.8-1.2-2.6-2.7-1.7-.8.5-5.3-4.4-5.9-5.1-1.7-2-3-4.2-4.4-6.3-.5-.9-1.5-3-2.4-3.4-1-.3-3.3.8-4.2 1.1-3 1.2-5.5 3.2-7.8 5.5-3.1 3.2-3 8.5-2.7 12.7h0c.6 2.2 1.3 4 2.1 5.5-2.4-1.8-5-8.1-5.4-11.1s0-4.9.4-7.9c.5-2.7 1.4-5.2 4.5-8.7C24.4 1.4 30.6-.6 36.4.7c4.2.9 9.7 2.4 12 6.7 2.3 4.2 4.8 13 1.3 17" class="cls-6"/><path d="M18.3 83.5c-.1.2-.1.6-.1 1h0c0 .9-.2 1.8-.4 2.8h-.1c-4.2-2.7-12.1-8.6-10.5-12.8.3-.8 3.1-12.1 3.8-14.8.9 2.3 3.1 3 6 3.7h0c0 1.1.2 2.2.3 3.1h0c-.7 3.2-2 9.6-2.2 9.4l-.2.2c1.3 1.2 2.3 2.5 3.6 4h0c0 1-.1 2.1-.2 3.3Z" class="cls-5"/><path d="M14.9 76.2c-.8-.8-1.8-1.5-3-2.3" class="cls-3"/><path d="M53.7 84.1c-2.5 1.4-4.5 2.8-7 4.5l-.3-1.2c-.4-1.8-.8-3.6-1.1-5.1.5-.4 1.5-1.3 2.9-2.5 1.8-1.6 2.8-3.2 4.1-4.4-.3-.6-3.5-9.9-4.4-12.1v-.6c.3 0 .7 0 1.1-.2 1-.2 2-.4 3.1-.8.2 0 .4-.1.6-.2.5-.2 1.1-.5 1.7-.8.2-.1.4-.2.7-.4.1 0 .2-.1.3-.2h.5c1.2 2.8 5.3 13.8 5.5 15.7.5 3.9-4.4 6.4-7.8 8.3Z" class="cls-5"/><path d="M54.9 73.6c-1.1.4-1.9 1-2.6 1.6" class="cls-3"/></svg>')}`;
export default image;