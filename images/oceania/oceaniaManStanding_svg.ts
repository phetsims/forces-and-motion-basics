/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Oceania" width="88.6" height="280.6" viewBox="0 0 88.6 280.6"><defs><style>.cls-1{fill:none}.cls-1,.cls-2,.cls-3,.cls-5,.cls-6,.cls-7{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:.6px}.cls-2{fill:#52b8e9}.cls-3{fill:#fff}.cls-5{fill:#29272c}.cls-6{fill:#c8967a}.cls-7{fill:#3f67b1}</style></defs><path d="M40.1 139.2v-22.1c-1 .6-10.3 6.2-14.4 10.2-3.4-3.8-5.9-6.1-8.1-10.7l-.3 4.5c-.1 1.9-.2 3.9-.3 5.7 0 1.5-.1 3-.2 4.5v8.3h0v10.5h0c2.6-3.7 4.8-6.8 7.4-10.5 2.8 5.1 6.2 10 9.9 14.4l.7.5c.9-1.1 2.4-4.3 3.6-6.6.8-1.5 1.6-2.7 2-2.7 0-2-.1-4.1-.2-6.1Z" class="cls-2"/><path d="M72.1 146.7c-.2-1.4-.5-2.9-.8-4.3 0-.6-.2-1.2-.3-1.7v-.4c0-.9-.2-2.9-.3-5.7 0-1.2 0-2.5-.2-3.8 0-1.6-.1-3.2-.2-4.9 0-2.2-.2-4.6-.2-6.9 0-1.6 0-3.2-.1-4.7h-.4c-3.2 4.1-6.8 8.3-10.8 11.5-.8.6-1.7 1.3-2.7 1.4-1.3.1-2.5-.7-3.6-1.4l-12.6-8.7q0 0 0 0v22.1c0 2 .1 4.1.2 6.1.6 0 1.3 1.5 2 3.3.6 1.7 1.2 3.5 1.9 4.8 5.1-4.7 9.1-9.7 12.7-15.6 5.2 4.5 10.4 8.9 15.6 13.4h.4c-.2-1.6-.5-3.1-.7-4.5ZM86 106.6c0-1.2-.2-2.7-.3-4.3-.4-4.8-1-10.9-1.8-15.1-.2-1.2-.4-2.2-.7-3 0-.3-.2-.6-.3-1-4.7.8-7.8 1-12.6.9 1.6-5.7-.4-14.9-4.8-19.6-2.6.6-5.2 1.2-7.7 1.8 1.3 1.5 2.4 3.3 3 5.3-4.4 1-8.7 3.3-12.7 5.9l.2.3c1.6 1.7 2.3 4 2.6 6.4-2.9.6-5.8.8-8.7.8s-5-.2-7.5-.6c.9-2.2 2.2-5.5 3.1-7.8-3.4-3.1-7.4-5.8-11.4-6.8 1.8-.9 3.5-1.8 5.3-2.7-2.1-.4-4.2-.9-6.3-1.3h0c-4.6 3.5-11.6 11.4-11.7 17.1l-5.4-3h0c-.6 1.6-1.1 3.2-1.5 4.4-.2.6-.3 1.1-.5 1.5-1.3 4.5-1.7 9.4-2 13.6 0 1.2-.1 2.3-.2 3.3h.4c5.9 0 9-.8 13.8 2.4h.3c0 1.1-.1 2.2-.3 3.4q0 0 0 0h.1c7.3-.2 14.6-.2 21.9-.1 9.9.1 19.7.5 29.6 1.2h.2v-2c6-2.4 9.8-2.3 16.1-.8Z" class="cls-2"/><path d="M72.8 151.2h-.4c-5.2-4.4-10.4-8.8-15.6-13.3-3.6 6-7.6 10.9-12.7 15.6.4.9.9 1.4 1.3 1.4 11-.3 25.3-1.2 27.4-3.4h0v-.4Zm-38.9 3q-5.7-6.75-9.9-14.4c-2.6 3.7-4.8 6.8-7.4 10.5h0v.7s-.3.9 1.3 1.8c1.8 1.1 6.1 2.3 16.3 2.4.1 0 .3-.2.5-.4l-.7-.5ZM70 111.5v-2.2h-.2c-9.8-.6-19.7-1-29.6-1.1 0 1.4 0 2.8-.1 4.1h0v4.9q0 0 0 0l12.6 8.7c1.1.8 2.3 1.5 3.6 1.4 1-.1 1.9-.8 2.7-1.4 4.1-3.2 7.6-7.4 10.8-11.5h.4v-2.9Zm-51.8-3.2h-.1c0 .4 0 .9-.1 1.3-.2 2.4-.4 4.8-.6 7.1h0c2.2 4.6 4.7 6.9 8.1 10.7 4.1-4 13.4-9.6 14.4-10.2v-4.9h0c0-1.4 0-2.8.1-4.1-7.3 0-14.6 0-21.9.1Z" class="cls-7"/><path d="M67.4 32.3c-.1 0-.3-.1-.4-.2-2.3-.8-2.8-.6-4.4 3-.2.4 2.8-17-7.5-22.8-3.1-1.8-8-1.5-13.8-1.5-5.6 0-6.1.3-9.5.8-4.9.7-8.8 13-9.4 20.4 0 .9-.1 1.7-.1 2.4 0 0 .9 4.2 2 8.5.2.7.3 1.4.5 2 1.2 4.5 1.2 5.9 3 8.2 1.3 1.8 3.6 3.8 5.7 5.3.2.2.5.3.7.5 3.4 2.2 7 3.7 10.6 3.1 1.9-.3 5-1.5 8.4-3.8 1.7-1.2 3.4-2.7 5.1-4.6 1.3-1.3 3.5-6.3 4.3-10.5h.3c1.1.7 3.2.1 4.2-2.4.8-2.1 2.9-6.8.4-8.2Zm-36.5 2.6c-.5 0-1-.8-1-1.9s.4-1.9 1-1.9.9.8.9 1.9-.4 1.9-.9 1.9m4.7-5.9c-2.3-.7-7.8-.6-10.7.5.5-2 3.3-4.6 6.1-4.6s5.7.2 4.6 4.1m16.5 5.9c-.6 0-1.1-.8-1.1-1.9s.5-1.9 1.1-1.9 1.1.8 1.1 1.9-.5 1.9-1.1 1.9m-5.4-5.8c-.7-.3-.3-1.4-.7-2.6 1.8-1.3 5.3-2 7.5-1.3.9.3 4.2 1.2 4.3 2.9-.4 1.6-6.2-.6-11.2.9Z" class="cls-6"/><path d="M54.3 58.3v1.9c-2.6 8.3-9.6 18.5-11.6 20.5q0 0 0 0c-.1 0-.3.2-.4.2 0 0-6.4-12.8-7.5-19.2-.3-1.2-.2-1.6-.5-2.6q0 0 0 0c0-.1 0-.2-.1-.4 3.4 2.2 7 3.7 10.6 3.1 1.9-.3 5-1.5 8.4-3.8v.2c.5 0 .9 0 1.2.1Z" class="cls-6"/><path d="M34.1 43.7c2.2 2.1 4.7 2.1 8.2 1.6m20.5-5.4c0 .9-.1 2-.3 3" class="cls-1"/><path d="M18.3 104.8c0 1.1-.1 2.2-.3 3.4q0 0 0 0c0 .4 0 .9-.1 1.3h-.2c-3.5-2.8-6.7-3.3-10.5-3.1-1.2 0-2.5.2-3.8.3.2-1.1.3-2.6.5-4.3h.4c5.9 0 9-.8 13.8 2.4h.3Z" class="cls-7"/><path d="M18.3 104.8c.5-8.6-.4-13.9-.3-23.8m53.3 7.7c-.9 2-1.3 11.7-1.5 13.5v5.2" class="cls-1"/><path d="M78.1 243.1c-.8 1.4-3.6 3.1-7.7 4.6-3.4 1.2-7.8 2.4-12.6 3.1-3.4.5-7 .8-10.8.8-6 0-11.4.1-16.2-.2-5-.3-9.2-1-12.4-2.6-2.6-1.3-4.4-3.3-5.5-6.1 0-14.6 3-68.7 4-79.2.6-5.8.2-2.6 1-10.7 1.8 1.1 6.1 2.3 16.3 2.4.1 0 .3-.2.5-.4.9-1.1 2.4-4.3 3.6-6.6.8-1.5 1.6-2.7 2-2.7.6 0 1.3 1.5 2 3.3.6 1.7 1.2 3.5 1.9 4.8.4.9.9 1.4 1.3 1.4 11-.3 25.3-1.2 27.4-3.4h0c5.8 39.1 5.2 91.6 5.2 91.6Z" class="cls-5"/><path d="M54.3 60.4v-.2m0-1.9v-.2m-20.2.6v-.1" class="cls-1"/><path d="M35.6 29c-2.3-.7-7.8-.6-10.7.5.5-2 3.3-4.6 6.1-4.6s5.7.2 4.6 4.1m22.2-.9c-.4 1.6-6.2-.6-11.2.9-.7-.3-.3-1.4-.7-2.6 1.8-1.3 5.3-2 7.5-1.3.9.3 4.2 1.2 4.3 2.9Z" class="cls-5"/><path d="M33.8 49.4c5.1 1.6 12.2 2 17.2-.7" class="cls-1"/><path d="M31.8 33c0 1-.4 1.9-.9 1.9s-1-.8-1-1.9.4-1.9 1-1.9.9.8.9 1.9m21.4-.1c0 1.1-.5 1.9-1.1 1.9S51 34 51 32.9s.5-1.9 1.1-1.9 1.1.8 1.1 1.9" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:.6px;fill:#000"/><path d="M24.2 42.8c-4.5-1.9-5-6.7-4.1-9.5.1-.4.3-.8.6-1.1.1-.1.2-.2.4-.3.3-.1.6-.2.9 0h.5c0 .9-.1 1.7-.1 2.4 0 0 .9 4.2 2 8.5Z" class="cls-6"/><path d="M86.1 109.6h-5c-4.3 0-8.6.1-11.1 1.8v-4.1c6-2.4 9.8-2.3 16.1-.8.1 1.8.2 3 .2 3Z" class="cls-7"/><path d="M70 111.5s0 0 0 0" class="cls-1"/><path d="M42.3 81c-1.4-1.5-2.9-3.1-4.6-4.6-3.4-3.1-7.4-5.8-11.4-6.8 1.8-.9 3.5-1.8 5.3-2.7-2.1-.4-4.2-.9-6.3-1.3-.6-.1-1.2-.2-1.7-.4.7-.7 1.4-1.3 2.2-1.9 2.4-1.8 5.1-3.2 8-4l.6-.2c.3 1 .2 1.4.5 2.6 1.1 6.4 7.5 19.2 7.5 19.2Zm15.5-14.8c1.3 1.5 2.4 3.3 3 5.3-4.4 1-8.7 3.3-12.7 5.9-1.8 1.1-3.6 2.3-5.3 3.3 2-2 9-12.2 11.6-20.5v-1.9c3.8.6 7.3 2.4 10.1 5 .4.3.7.7 1 1.1-2.6.6-5.2 1.2-7.7 1.8" class="cls-7"/><path d="M42.7 80.8v-.2m27.9 50.2" class="cls-1"/><path d="M50.8 83.9c-2.9.6-5.8.8-8.7.8.2-1.3.4-2.7.6-4q0 0 0 0c1.7-1.1 3.5-2.2 5.3-3.3l.2.3c1.6 1.7 2.3 4 2.6 6.4Z" class="cls-7"/><path d="M42.7 80.8c-.2 1.3-.4 2.7-.6 4q-3.75 0-7.5-.6c.9-2.2 2.2-5.5 3.1-7.8 1.7 1.5 3.2 3.1 4.6 4.6 0 0 .2 0 .4-.2" class="cls-7"/><path d="M67.4 32.3c-.1 0-.3-.1-.4-.2-2.3-.8-2.8-.6-4.4 3-.2.4 2.8-17-7.5-22.8-3.1-1.8-8-1.5-13.8-1.5-5.6 0-6.1.3-9.5.8-4.9.7-8.8 13-9.4 20.4h-.5c-.3-.1-.6 0-.9 0v-.3c-.7-7.7 1.5-25.2 2.8-26.8 1.6-1.9 2.1-2.4 4.4-3.2C32.8 0 38.9.3 43.7.4c7.8.2 8.1-.7 15.6 1.5 1.4.4 3.8 1.5 5.5 3.6 1 1.3 5 19.5 2.6 26.7Z" class="cls-5"/><path d="M30.7 251.5c-.9 2.2-1.7 4.7-1.8 7 0 1.1.2 2 .2 3 0 .5 0 .9-.2 1.4-.4 1.2-1 2.4-1.7 3.4-3.5 1-7.1 1.2-10.7 1.3-1.5 0-3.2 0-4-1.2-.6-.8-.6-1.9-.2-2.9.4-.9.9-2.4 1.6-3.2 1.1-.5 2.1-1.1 3.2-1.6 1.1-2.9 1.6-6.8 1-9.8l.2-.4c3.2 1.7 7.4 2.4 12.4 2.6h0Z" class="cls-6"/><path d="M27.2 266.4c-1 1.4-2.3 2.6-3.7 3.5-1 .7-2.1 1.3-3.2 1.8-3.9-1.3-9.1-.3-12.6 1.8-.8 0-1.6-.2-2.4-.4q0 0 0 0c-.2 0-.5-.1-.7-.2h.9c1.1-2.2 2.2-4.2 3.4-6.2.3-.5.6-1.1.6-1.7s-.2-1.3-.7-1.5v-.2c1.7-1 3.5-1.9 5.3-2.8-.7.8-1.2 2.2-1.6 3.2-.4.9-.4 2.1.2 2.9.8 1.2 2.5 1.2 4 1.2 3.6-.1 7.3-.3 10.7-1.3Z" class="cls-5"/><path d="M9.3 265c0 .6-.3 1.1-.6 1.7-1.1 2-2.2 4.1-3.4 6.1h-.9c-1.7-.4-3.3-1.1-3.2-2.9 0-1.6 1.4-3.3 2.8-4.1 1.5-.8 2.9-1.7 4.4-2.5v.2c.7.2.9.9.8 1.5Zm69.7 1.3c0 1-.3 2.1-1.1 2.5-.7.4-1.5.3-2.3.2-4.6-.5-9.2-1.1-13.7-2h0c-.6-.6-1.2-1.3-1.6-2.1q-.3-.75-.6-2.1 0 0 0 0c-.6-3.7-.7-10.3-1.8-12.1h0c4.9-.8 9.2-1.9 12.6-3.2v11.6c2.7 1.4 5.2 2.9 7.7 4.4.4.8.8 1.7.9 2.6Z" class="cls-6"/><path d="M85.6 276.2c-.6.4-1.4.6-2.1.7h-1.8c-1-2-3.1-3.4-5.3-4-2.3-.7-4.7-.6-7.1-.6v.2c-2.2-1.1-4.1-2.4-6.3-4.2-.4-.3-.8-.7-1.2-1.1h0c4.6.8 9.1 1.5 13.7 2 .8 0 1.6.2 2.3-.2.8-.5 1.2-1.6 1.1-2.5 0-.9-.5-1.8-.9-2.6 1.6 1 3.2 2.1 4.8 3.2.1 1-.5 2-.5 3.1 0 1.2.5 2.3 1.2 3.2.7 1 1.5 1.9 1.8 3h0Z" class="cls-5"/><path d="M87.1 274.6c-.3.7-.9 1.2-1.5 1.6h0c-.4-1.2-1.2-2.1-1.8-3-.7-.9-1.3-2-1.2-3.2 0-1 .6-2.1.5-3.1h.1c1.3.9 2.6 1.8 3.4 3.1l.3.6c.6 1.2.8 2.7.2 3.9Zm-5.4 2.3c-.9-.1-1.8-.4-2.6-.6-3.8-1.2-6.9-2.2-9.8-3.8v-.2c2.5 0 4.9 0 7.2.6 2.2.6 4.3 2 5.3 4Z" class="cls-6"/><path d="M81.8 277.1s0-.2-.1-.3" class="cls-1"/><path d="M85.9 279.1c-1.9 1.3-4.5 1.3-6.8 1.1-5.1-.4-10.3-1.4-14.4-4.5-3.9-2.9-6.5-8.1-5.2-12.8.2.9.3 1.7.6 2.1.4.8 1 1.5 1.6 2.1.4.4.8.7 1.2 1.1 2.1 1.8 4.1 3.1 6.2 4.2 3 1.6 6 2.6 9.8 3.8.9.3 1.7.5 2.6.6.6 0 1.2.1 1.8 0 .8 0 1.5-.3 2.1-.7.7-.4 1.2-.9 1.5-1.6.6-1.2.4-2.7-.2-3.9h0c2.2 2.3 1.6 6.6-1 8.4Z" class="cls-5"/><path d="M59.8 262.3c0 .2-.1.4-.2.6q0 0 0 0" class="cls-1"/><path d="M20.3 271.7c-3.9 1.7-8.4 2.4-12.6 1.8 3.5-2.1 8.7-3.2 12.6-1.8" class="cls-6"/><path d="M28.6 268.1c-1.4 1.9-3.4 3.1-5.5 4.2-4.6 2.4-9.6 4.3-14.7 4.7-2.2.2-4.6 0-6.4-1.4s-2.4-4.3-.8-5.8c0 1.8 1.5 2.5 3.2 3 .2 0 .5.1.7.2q0 0 0 0c.8.2 1.6.3 2.4.4 4.2.5 8.7-.1 12.6-1.8 1.1-.5 2.2-1.1 3.2-1.8 1.4-1 2.7-2.1 3.7-3.5.8-1 1.4-2.2 1.7-3.4.1-.5.2-1 .2-1.4h.2c1.2 2 .6 4.7-.7 6.6Z" class="cls-5"/><path d="M25.7 63.3c-2.7 1-8.8 2.9-10.9 3.9-1.4.7-3.1 3.6-4.6 7-.4.9-.8 1.8-1.2 2.8-.4.9-.7 1.8-1 2.7h0c1.8 1 3.6 2 5.4 3.1 0-5.8 7-13.6 11.7-17h0c-.6-.2-1.2-.3-1.7-.4.7-.7 1.4-1.3 2.2-1.9Zm56.1 16.3c-.3-1-.7-2.1-1.1-3.2-1-3-2.3-5.9-3.6-7.4-1.3-1.4-10.7-4.8-12.6-5.7h0c.4.4.7.8 1 1.1 4.4 4.7 6.4 13.9 4.8 19.6 4.8.2 7.9 0 12.6-.9-.3-1-.7-2.2-1.1-3.5" class="cls-7"/><path d="M81 126.6c-.8 3.7-5.9 17.6-8.8 20.1-.2-1.4-.5-2.9-.8-4.3 0-.6-.2-1.2-.3-1.7v-.4c0-.9-.2-2.9-.3-5.7 0-1.2 0-2.5-.2-3.8 0-1.6-.1-3.2-.2-4.9 0-2.2-.2-4.6-.2-6.9 0-1.6 0-3.2-.1-4.7v-2.9c2.6-1.7 6.9-1.9 11.1-1.8.3 5.6.8 12.6-.1 16.9Z" class="cls-6"/><path d="M81.1 109.6v-.2" class="cls-1"/><path d="M18 109.6c-.2 2.4-.4 4.8-.6 7.1h0l-.3 4.5c-.1 1.9-.2 3.9-.3 5.7 0 1.5-.1 3-.2 4.5v8.3h0v7.1h-.2c-4.2-9.5-11.1-19.6-9-40.3 3.7-.2 7 .3 10.5 3.1h.2Z" class="cls-6"/><path d="M12 76.5c-.3.5-.7 1.1-1.3 1.2-.5 0-1-.3-1.5-.6h-.1c.4-1 .8-1.9 1.2-2.8.5.6 1.8.4 2.1 1.2.1.4-.1.7-.3 1Zm6.9 65c0 .2-.1.4-.3.5-.9 1.2-1.3 1.7-2.2 2.9v-5.1c.4.3.8 1 1.3 1s1.2.2 1.1.7Zm21.4 3.8c-.4 0-1.2 1.2-2 2.7l-.8-.2c-1.9-3.4-2.7-6.2-4.6-9.6 2.4.3 4.8.7 7.1 1 0 2 .1 4.1.2 6.1Z" class="cls-3"/><path d="M47.8 140.3c-2.1 2.5-3.8 5.3-5.2 8.2h-.4c-.7-1.7-1.3-3.2-2-3.2 0-2-.1-4.1-.2-6.1 2.6.4 5.1.7 7.7 1.1Zm17.1-35c-5.4 0-10.8-.5-16.1-1.2-.5 0-1.1-.2-1.1-.7 0-.4.2-.7.5-1 1.8-1.7 3.6-3.3 5.4-5 1.9-1.7 2.3-2.5 4.5-1.1 1.6 1 3 2.6 4.1 4.1.3.4 2.6 4.9 2.7 4.9M40 128.8c-2.3 0-4.6-.2-6.9-.7.5 0 4.9-6.1 6.8-6.3q0 0 0 0v7Zm7.1-.8c-2.3.5-4.7.7-7.1.7v-7c2.8-.2 5.7 4.1 7.2 6.2Zm5.8 6.1c-4.1 1.5-8.5 2-12.9 2v-3.9c4.3.3 8.7 1 12.9 1.9" class="cls-3"/><path d="M40.1 136.1c-3.9 0-7.9-.5-11.8-1-2.2-.3-4.3-2.7-1.2-3.8 1.6-.5 4.9.5 6.6.6q3.15 0 6.3.3v3.9Zm28-40.1c0 1.2-1.2 1-2.1.8-2.2-.3-4.2-1.6-5.5-3.4-.4-.6-.7-1.4-.2-1.9.4-.4 1.1-.3 1.7-.1 1.4.4 2.8.9 4 1.8.8.6 2 1.8 2.1 2.8m-9.4-8.4c-.3.6-.9 1.3-1.6 1.1-.6-.2-.8-.9-.9-1.5-.3-1.4-.5-2.9-.3-4.4.1-.9.6-2.6 1.6-3.1 1-.6 1.4.6 1.7 1.4.7 2.1.6 4.5-.5 6.5m-5.9 5.5c-1.4 1.7-3.5 2.8-5.7 3-.7 0-1.5-.1-1.7-.8-.2-.6.3-1.1.8-1.5 1.1-1 2.2-2 3.6-2.6.9-.4 2.6-.9 3.5-.3 1 .6.2 1.5-.3 2.2Zm-16.2 19.7c-.4 0-4.6-.3-4.6-.4 0 1.9 0 3.8-.5 5.6s-1.6 3.4-3 3.8c-1.5.4-3.8 0-5.1-1.2-1.1-.9-1.1-1.3-1.7-2.7-.6-1.5-.8-4.4-.2-5.9-1.5-.2-1.6-.3-3.1-.5 0-.5-.2-1.2-.2-1.7 2.1.3 2.9.5 5.1.8-1 2.1-.6 5.1.8 6.7s3.8 1.6 5.3 0 1.9-4.6.9-6.7c1.5 0 2.9 0 4.4.1 1.4 0 2.1 0 1.9 2ZM60 150.5c.2.2 0 .6-.2.7-.2.2-.5.2-.8.2-2.4.1-4.7.3-7.1.4 1.1-1.4 4.8-7.7 6.4-7.3 1.2.3 3 2.4 4 3.2 1.4 1.1 2.8 2.3 4.3 3.4-3.4-.2-6.3-2.2-9.1-4.2-1.1 1-2 2.3-2.4 3.8 1.6 0 3.3-.1 4.9-.2m-30 1.9c-.4.3-.9.3-1.3.2-.4-.2-.8-.4-1.2-.8-1.4-1.2-2.9-2.3-4.3-3.5l-1.3 1.9c1.4.2 2.9.5 3.6 1.7-1.8-.3-3.6-.9-5.3-1.7-.2 0-.3-.2-.4-.3-.2-.4.3-.9.7-1.1.9-.5 1.6-1.2 2.4-1.8 1.1-.9 1.3-.9 2.3.1 1.7 1.7 3.3 3.5 4.9 5.3Zm-9.7-25.7c-.2.3-.5.2-.8.2-1-.2-1.7.2-2.6 0h0c0-1.9.2-3.8.3-5.7 1.3 1.4 2.3 3.1 3.1 4.8 0 .2.2.5 0 .7m50.5 7.9c-2.1 0-8-.3-10.1-.8-.4 0-.7-.2-1-.3-.3-.2-.5-.6-.4-.9 0-.4.5-.6.8-.7 1-.4 9.2-1.2 10.5-1.1 0 1.4.1 2.7.2 3.8m-50.7-.6c-1.1.6-2.4.5-3.5-.1h0v-2.4h.2c1.1 0 2.4.2 3.4.6.3.1.6.3.7.6.2.5-.3 1.1-.8 1.4Zm52.1 12.7c-1.5-.9-3.2-2.3-4.7-3.2-.3-.2-.7-.6-.5-.9.1-.2.4-.2.6-.2 1.4.1 2.5-.1 3.8 0 .3 1.4.5 2.8.8 4.3m13.5-44.4h-.1c-3.2 0-6.4.3-9.5.9-.3-1-.8-1.8-1.5-2.5 1.8-.5 3.6-1.1 5.3-1.6.2 0 .5-.1.7-.3.5-.5.3-1.4 0-2-.7-1.7-1.1-3.6-.7-5.4s1.6-3.5 3.4-4h.6c.8 4.1 1.4 10.2 1.8 15Zm-73.2-1.5c-3.2-.9-4.4-.8-7.6-1.7h-.8c.3-4.2.7-9.2 2-13.7.1-.4.3-.9.5-1.5 2 .6 3.7 1.8 4.4 3.7.6 1.7 0 3.5-.7 5.2-.8 1.6-1.8 3.1-2.5 4.7 1.1 0 2.2.1 3.2.6s1.7 1.6 1.5 2.6Zm69.4-21.2h-.2c-2.5-.1-3.5-.5-5.9-.7-.3-1.1-.4-2.2-.6-3.4 2.1.5 3.5 1 5.6.9.4 1.1.7 2.2 1.1 3.2M76.2 95c-1 1.1-3-1.5-3.8-2.2-.4-.4-.8-1-.5-1.5.2-.3.6-.4.9-.4.4 0 .7.2 1 .3.8.4 3.4 2.5 2.4 3.7Zm-40.6 8.8c-4.7.5-9.5.3-14.2-.6.5-2.9 4.2-5.1 6.2-6.7 2.2-1.8 2.3-1 4 1.5.5.7 3.4 5.9 4 5.9Zm3.6-8.6c0 1.2-1 1.1-1.8 1-1.9-.2-3.8-1.3-5.1-3-.4-.5-.7-1.3-.3-1.9.3-.5 1-.4 1.5-.2 1.3.3 2.5.7 3.7 1.5.7.5 1.9 1.6 2 2.7Zm-8.9-7.7c-.2.6-.7 1.3-1.3 1.2-.5-.1-.8-.8-.9-1.4-.3-1.4-.6-2.9-.5-4.3 0-1 .4-2.7 1.2-3.2.9-.6 1.3.5 1.6 1.3.8 2 .8 4.4 0 6.5Zm-4.7 5.9c-1.1 1.8-2.9 3.1-4.8 3.4-.6.1-1.4 0-1.6-.6s.2-1.2.6-1.6c.9-1.1 1.8-2.1 3-2.8.8-.4 2.2-1 3-.6.9.5.3 1.5-.2 2.2M18 92.3c-.8 1.5-2.4 2.5-4.1 2.7h-.6c-.2 0-.3-.3-.3-.5s.3-.5.5-.8c1-1.3 2.9-1.9 4.4-1.4ZM67.9 114c-.5 0-5.9-.3-5.9-.4 0 1.9 0 3.8-.7 5.6-.6 1.8-2 3.4-3.8 3.8-1.9.4-5 0-6.6-1.2-1.4-.9-1.4-1.3-2.2-2.8s-1-4.5-.3-6c-2-.3-4-.5-6-.8v-1.6c2.8.3 5.6.7 8.3 1-1.3 2.1-.8 5.1 1.1 6.7s4.9 1.7 6.8 0c1.9-1.6 2.4-4.6 1.2-6.7 1.9 0 3.8 0 5.7.1 1.8 0 2.7 0 2.5 2Zm2.6 11.9h-.4c-1.2.3-2.5.4-3.8.1-.4 0-.7-.2-1-.4s-.5-.6-.4-1c0-.2.2-.4.4-.6 1.6-1.7 3.1-3.4 4.7-5.1h.2c0 2.3.1 4.6.2 6.9Z" class="cls-3"/></svg>')}`;
export default image;