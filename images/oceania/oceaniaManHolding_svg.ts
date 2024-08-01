/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Oceania" width="107" height="161" viewBox="0 0 107 161"><defs><style>.cls-1{fill:#010101}.cls-1,.cls-2,.cls-3,.cls-5,.cls-6,.cls-7{stroke-width:0}.cls-2{fill:#c8967a}.cls-8,.cls-9{fill:none;stroke:#000;stroke-width:.6px}.cls-8{stroke-linecap:round;stroke-linejoin:round}.cls-9{stroke-miterlimit:10}.cls-3{fill:#29272c}.cls-5{fill:#52b8e9}.cls-6{fill:#fff}.cls-7{fill:#3f67b1}</style></defs><path d="M100.7 39.4c-.7 3.9-2.7 8.5-3.9 9.6q-1.95 2.1-3.9 3.6c-.4.3-.7.5-1.1.8-3 2.1-5.8 3-7.4 3.3-.3 0-.6 0-.9.1-3.8-1.6-7.8-3.3-11.6-5-1.2-1-2.3-2.1-3.1-3.2-1.6-2.1-1.6-3.4-2.7-7.5-.2-.6-.3-1.2-.5-1.9-1-3.9-1.8-7.8-1.8-7.8v-2.2c.6-6.8 4.1-18 8.6-18.6 3.1-.5 3.5-.7 8.7-.7 5.3 0 9.8-.2 12.6 1.4 9.4 5.4 6.6 21.3 6.8 20.9 1.5-3.3 2-3.5 4-2.7.1 0 .3.1.4.2 2.3 1.3.4 5.6-.3 7.5-.9 2.3-2.8 2.8-3.8 2.2h-.3ZM86.2 26.8c4.5-1.4 9.8.6 10.2-.9-.2-1.6-3.1-2.4-4-2.7-2-.6-5.2 0-6.9 1.2.3 1.1 0 2.1.6 2.4Zm5 5.3c.5 0 1-.8 1-1.7 0-1-.4-1.7-1-1.7s-1 .8-1 1.7c0 1 .4 1.7 1 1.7m-15.1-5.3c1-3.6-1.7-3.8-4.2-3.8-2.6 0-5.1 2.5-5.6 4.2 2.6-1 7.7-1.1 9.8-.5Zm-4.4 5.3c.5 0 .9-.8.9-1.7s-.4-1.7-.9-1.7-.9.8-.9 1.7.4 1.7.9 1.7" class="cls-2"/><path d="M102.8 5.3c.9 1.1 4.5 17.8 2.4 24.4-.1 0-.2-.1-.4-.2-2.1-.8-2.6-.6-4 2.7-.2.4 2.6-15.5-6.8-20.9-2.8-1.6-7.3-1.4-12.6-1.4-5.1 0-5.6.2-8.7.7-4.5.7-8 11.8-8.6 18.6h-.4c-.2-.1-.5 0-.8 0V29c-.6-5.5.6-16.6 1.7-21.8 4.1-1.8 8.9-1.9 12.3-3.6.4 0 1.7-1 1-3.2 2 0 3.9 0 5.7.1 7.2.2 7.4-.6 14.3 1.4 1.3.4 3.5 1.3 5 3.3Z" class="cls-3"/><path d="M71.3 81.4v.3c-.3 0-.6.2-.9.4-.4.3-.7.9-.5 1.4.3.7 1.3.7 2 .5.8-.2 1.6-.3 2.2-.9s.7-1.6 0-2.1c-1 .1-1.9.3-2.8.4m11.6-2.9c3.7 1.2 6.6 1.7 8.1 1.1 4.5-1.3 10.4-14.3-.9-19.9.2 0 .4 0 .5.1 1.7 0 4.2-.1 5-1.7 1.7 1.7 3.9 6.6 4.1 9.1.3 3.3.2 4.3-.2 8.9-.2 2.1-.3 4.2-.4 6.4h-.7c-1.2 3-2.3 6-3.2 9.1 1 .2 2.1 0 3-.7h.4c0 .9-.1 1.7-.2 2.6-2.5 2.8-6.7 3.1-10.5 2.8-7.6-.5-15-2.3-22-5.1.7-7.5 2-15.8 2.8-18.1l.2-.4c2.8 1.4 5.7 2.7 8.4 3.8l-.2.7c-.4.9-.8 1.8-.7 2.7 0 .9.9 1.9 1.8 1.8.8-.1 1.4-1 1.4-1.8s-.3-1.6-.7-2.4v-.3c1.4.5 2.7 1 3.9 1.4Zm4 8.9c.3-2.5-1.9-5.1-4.4-5.2l-.2.2c-.3 1.3.1 2.7 1 3.7s2.3 1.5 3.6 1.3m-4 6.1c-.5-3.2-1.8-7-4-9.5-1.6-1.9-2.2-.7-3.8.9-1.2 1.2-2.2 2.5-3.2 3.9-.3.4-.5.8-.5 1.3 0 1 1.1 1.6 2.1 1.9 3 .9 6.2 1.4 9.4 1.5" class="cls-5"/><path d="M98.4 82.4h.7c-.2 2.9-.3 5.7-.5 8.5h-.4c-.9.6-2 .8-3 .7.9-3.1 2-6.1 3.2-9.1Z" class="cls-6"/><path d="m66.1 97.3-.4.3h-.3c.1-2 .3-4.2.5-6.6 7 2.9 14.5 4.6 22 5.1 3.7.3 8 0 10.5-2.8 0 .5 0 1-.1 1.5-.5 6.1-.6 9.5-.6 12.9-1.7-3.2-4.2-5.9-7.2-7.9-3.2 5.2-7.9 9.6-13.4 12.4-3.7-5-7.3-10.1-11-15.1Zm16.9 3.5c1.1.4 2.1.7 3.2 1.1-.5-.6-.8-1.7-1.4-2.2-.5-.5-3.4-.8-3.5-1.1.4 1.4-.3 3-1.6 3.7s-3 .4-3.9-.7c-.5-.6-.8-1.4-.8-2.1s.2-1.3.6-1.9l-5.4-1.2v2.4c1.2.2 2.4.4 3.5.7-1.1 1.4-.4 3.4.6 4.7.9 1.2 2.3 2.2 3.9 2.2 1.3 0 2.4-.9 3.2-1.9s1.2-2.3 1.6-3.5Zm13.8 39.4c-4.7.1-12.8-1-15.2-4.3-.9-1.3-3.6-7-6.5-12.9h.2c.9-.6 1.9-1.1 2.8-1.6 3 3.8 6 7.6 8.9 11.5.8 1 1.6 2 2.8 2.3 1.6.4 3.1-.6 4.3-1.8 1.1-1.1 2.2-2.5 3.7-3v9.9h-1Z" class="cls-7"/><path d="M96.9 112.8c-.2 0-4.3-6.6-5-7.2-1.8 1.2-3.2 3.7-4.6 5.3-.2.2-.4.5-.3.8 0 .3.4.4.6.5 3 1.1 6.2 1.3 9.3.6m.9 17.4c-1.5.5-2.6 1.9-3.7 3s-2.7 2.2-4.3 1.8c-1.2-.3-2-1.3-2.8-2.3-3-3.8-6-7.6-8.9-11.5-.9.5-1.9 1-2.8 1.5h-.2c-2.4-5.1-5-10.5-6.7-13.7.9.5 1.9.9 2.9.9-.5-1.9-1.5-3.7-2.8-5.1-.4-.4-1-.6-1.2-1.1l-1.1 1.1c-.2-.5-.5-1.1-.8-1.7-.3-1-.3-3.1-.2-5.8h.3l.4-.3c3.7 5 7.3 10.1 11 15.1 5.5-2.9 10.2-7.2 13.4-12.4 3 1.9 5.5 4.7 7.2 7.9 0 2.7 0 5.3.1 9.1-4.5-.3-9.1-.5-13.6-.8h-.7c-.5.2-.5.9-.3 1.3q.45.6 1.2.9c4.1 1.8 8.7 2.5 13.1 2h.2v9.9Zm-5.7-1.5c2.2 1.6 3.7-1.6 2.7-3.4-1-1.7-5.1-1.4-6.9-1.7-.3 0-.8 0-.9.2-.2.4.1.8.4 1 1.5 1.3 3.1 2.6 4.7 3.8Z" class="cls-5"/><path d="M97.6 120.4c-4.4.6-9-.1-13.1-2q-.75-.3-1.2-.9c-.3-.4-.2-1.1.3-1.3h.7c4.5.3 9.1.5 13.6.8v3.4h-.2Z" class="cls-6"/><path d="M27.4 134.2c-3.3 0-6.5 0-9-.3-.2-12.2 2.7-27.4 3.2-32.6.3-2.6 1-7.4 1.4-9.9.3-1.7 3-14.2 4.6-18.4 1.5-3.9 6.7-7.1 9.8-7.4 5-.4 8.6 0 11.6 2.6 1.1 1.8 6.4 13.1 11 23.2 1.1 2.4 2.1 4.6 3.1 6.7.9 1.9 1.7 3.7 2.4 5.2.3.6.5 1.2.8 1.7.5 1.1.9 1.9 1.1 2.4.3.4.6 1 1 1.7 1.7 3.2 4.3 8.6 6.7 13.7 2.9 6 5.5 11.6 6.5 12.9 2.4 3.4 10.5 4.5 15.2 4.3-.7 4.4-2.4 9.9-5.6 13.9-3.1 3.9-7.1 5.7-11.8 5.9-6.1.4-11.6.8-17-1.2s-9-8.2-12.4-14.5c-.6-1.1-5.2-15-7-20.4.7 3.2 1.5 6.6 2 9.5-1.1 0-2.4.2-3.8.3-4.2.3-9.2.5-13.9.5Z" class="cls-3"/><path d="M92.9 52.6c1.3 1.2 3.6 3.8 3 5.3h-.3c-.8 1.7-3.3 1.8-5 1.8-.2 0-.4-.1-.5-.2-1.6-.6-3.2-1.3-4.9-2 2.4-.7 4.1-1.9 6.7-4 .4-.3.7-.6 1.1-.8Z" class="cls-7"/><path d="M94.8 125.3c1 1.8-.5 5-2.7 3.4-1.6-1.2-3.2-2.5-4.7-3.8-.3-.3-.6-.7-.4-1s.6-.3.9-.2c1.8.2 5.9 0 6.9 1.7Z" class="cls-6"/><path d="M96.4 25.9c-.4 1.5-5.7-.5-10.2.9-.6-.2-.3-1.3-.6-2.4 1.6-1.2 4.9-1.8 6.9-1.2.8.3 3.8 1.1 4 2.7Z" class="cls-3"/><path d="M96.9 112.8c-3.1.7-6.3.5-9.3-.6-.2 0-.5-.2-.6-.5 0-.3.1-.6.3-.8 1.4-1.7 2.8-4.2 4.6-5.3.7.6 4.7 7.2 5 7.2" class="cls-6"/><path d="M92.1 30.3c0 1-.4 1.7-1 1.7-.5 0-1-.8-1-1.7 0-1 .4-1.7 1-1.7s1 .8 1 1.7" class="cls-1"/><path d="M90.1 59.6c11.3 5.7 5.4 18.6.9 19.9-1.6.6-4.5 0-8.1-1.1 2.9-2.5 4.7-6.1 5.2-9.9.5-3.9-.6-7.9-2.9-11 1.7.7 3.3 1.4 4.9 2Z" class="cls-7"/><path d="M71.9 51.8c3.8 1.7 7.7 3.4 11.6 5 .5.2 1.1.5 1.6.7 2.3 3.1 3.3 7.2 2.9 11-.5 3.8-2.3 7.4-5.2 9.9-1.2-.4-2.5-.8-3.8-1.4-.6-.2-1.2-.5-1.8-.7-2.7-1.1-5.5-2.4-8.4-3.8-2.2-1.1-4.3-2.2-6.4-3.3-.8-.4-1.6-.9-2.3-1.3-.2-.3-.5-.4-.7-.6 3.6-1 6.5-4 7.6-7.5s.4-7.6-1.7-10.6c-.1-.1-.2-.3-.3-.4 2.1.9 4.4 1.9 6.7 2.9Zm8.7 15.4c1.1-1.9-.3-4.6-2.4-5.4-1-.4-2.2-.4-3.1-1.1-1.4-1.1-1.2-3.2-1-4.8-3.3-1.1-3.1 2.4-3.7 4.6-.2.7-3.7 8.3-4.6 7.5 1.6 1.4 4.4.8 5.2-1.1 1.5.9 3 1.9 4.8 2.2 1.7.3 3.7-.3 4.6-1.9Z" class="cls-5"/><path d="M82.4 82.2c2.6 0 4.8 2.6 4.4 5.2-1.3.2-2.7-.3-3.6-1.3s-1.3-2.4-1-3.7zm3.8 19.7c-1.1-.4-2.1-.7-3.2-1.1-.4 1.2-.9 2.5-1.6 3.5-.8 1-1.9 1.9-3.2 1.9-1.5 0-2.9-.9-3.9-2.2-1.1-1.4-1.7-3.4-.6-4.7h1.4c0 .8.3 1.6.8 2.2.9 1.1 2.7 1.4 3.9.7s1.9-2.3 1.6-3.7c.1.4 3 .7 3.5 1.1.6.5.8 1.6 1.4 2.2ZM79 84c2.2 2.5 3.4 6.3 4 9.5-3.2-.1-6.3-.6-9.4-1.5-1-.3-2.1-.8-2.1-1.9 0-.5.3-.9.5-1.3 1-1.4 2-2.7 3.2-3.9 1.5-1.6 2.1-2.9 3.8-.9m-.8-22.2c2.1.7 3.4 3.4 2.4 5.4-.9 1.5-2.9 2.1-4.6 1.9-1.7-.3-3.3-1.2-4.8-2.2-.8 1.9-3.7 2.5-5.2 1.1.8.7 4.4-6.8 4.6-7.5.6-2.1.3-5.6 3.7-4.6-.2 1.6-.5 3.7 1 4.8.9.7 2 .7 3.1 1.1Zm.8 15.6c.4.8.7 1.6.7 2.4s-.6 1.7-1.4 1.8c-.9.1-1.7-.8-1.8-1.8 0-.9.3-1.9.7-2.7l.2-.7c.6.2 1.2.5 1.8.7v.3Z" class="cls-6"/><path d="M77.8.5c.7 2.2-.6 3.2-1 3.2-3.4 1.7-8.2 1.8-12.3 3.6.3-1.4.6-2.4.9-2.7 1.5-1.7 1.9-2.2 4.1-3C72 .7 74.9.5 77.8.5" class="cls-2"/><path d="m44.6 54.5-3.9-3.9-2.1-2.1c-3-3.1-1.7-5.6 1.1-11.4 1.5-3 3.4-7 5.3-12.4 1-2.9 4.9-12.3 6.8-18 .6-1.5-1.8-6.2 4.8-6C62.7.3 72 .7 77.7.3v.2c-2.9 0-5.9.3-8.3 1.1-2.1.8-2.6 1.2-4.1 3-.3.3-.6 1.3-.9 2.7-1.1.5-2.1 1.1-3.1 1.9-.9 2.3-3.7 10.5-5.6 15.9-2.9 8.6-5.1 17.4-5.1 17.4 1.9.8 5.7 2.5 10.4 4.6.8 3.1.6 7.1-.8 10-1.1 2.2-3.3 4.3-5.6 5.7-3.4-2.2-6.8-5-10.2-8.2Z" class="cls-2"/><path d="M71.9 23c2.5 0 5.2.2 4.2 3.8-2.1-.6-7.2-.5-9.8.5.5-1.8 3-4.2 5.6-4.2Z" class="cls-3"/><path d="m70.2 96.3 5.4 1.2c-.4.5-.6 1.2-.6 1.9h-1.4c-1.2-.3-2.4-.5-3.5-.7v-2.4Zm1.1-14.6v-.3c.9-.1 1.8-.3 2.8-.4.7.4.5 1.5 0 2.1s-1.4.7-2.2.9c-.7.1-1.7.2-2-.5-.2-.5 0-1.1.5-1.4.3-.2.6-.3.9-.4" class="cls-6"/><path d="M72.6 30.4c0 .9-.4 1.7-.9 1.7s-.9-.8-.9-1.7.4-1.7.9-1.7.9.8.9 1.7" class="cls-1"/><path d="M68.4 109.2c-.4-.6-.7-1.2-1-1.6-.2-.5-.6-1.3-1.1-2.4.4-.4.7-.8 1.1-1.1.1.5.8.7 1.2 1.1 1.4 1.4 2.3 3.2 2.8 5.1-1 0-2.1-.4-2.9-1Z" class="cls-6"/><path d="M64.2 76.1c-.5-.3-1.2-.1-1.6.4s-.4 1.3-.1 1.9c.4.7 1.2 1 2 .8.7-.2 1.2-1.1 1-1.8-.1-.6-.7-1-1.3-1zm4.7-3.5-.2.4c-.8 2.2-2.1 10.6-2.8 18.1-1.7-.7-3.3-1.4-4.9-2.2h-.7c0-.4 0-.9.2-1.4h.7c.9.7 2.1 1.1 3.3.9-.3-3.4-1.2-6.7-2.6-9.8h-.3c.1-1.2.3-2.4.4-3.4.3-2.7.5-4.8.5-5.5l.2-.3c2.1 1.1 4.2 2.2 6.4 3.3Z" class="cls-5"/><path d="M65.5 49.3c2.1 3.1 2.8 7.1 1.7 10.6s-4 6.5-7.6 7.5l.7.5c-2.7-1.4-5.2-2.9-7.3-4.2.6-.3 1.3-.6 1.9-1 2.3-1.4 4.5-3.4 5.6-5.7 1.4-2.9 1.6-6.9.8-10 1.3.6 2.6 1.2 4 1.8.1.2.2.3.3.4Z" class="cls-7"/><path d="M65.5 103.4c-.7-1.5-1.5-3.2-2.4-5.2h.2c.7-.3 1.4-.4 2-.6-.1 2.7-.1 4.8.2 5.8" class="cls-5"/><path d="M64.2 76.3c.6 0 1.1.4 1.3 1 .2.7-.3 1.6-1 1.8s-1.6-.2-2-.8c-.3-.6-.3-1.4.1-1.9s1.1-.6 1.6-.4z" class="cls-6"/><path d="M65.9 91.1c-.2 2.4-.4 4.6-.5 6.6-.7.2-1.4.3-2 .5h-.2c-1-2-2-4.3-3.1-6.6 0-.4 0-1.4.2-2.7h.7c1.6.8 3.3 1.6 4.9 2.2" class="cls-7"/><path d="M63.9 31.5s.8 3.9 1.8 7.8c-4.1-1.8-4.5-6.2-3.8-8.7.1-.4.2-.7.5-1 .1-.1.2-.2.4-.2.2-.1.5-.1.8 0h.4v2.2Z" class="cls-2"/><path d="M64.4 88.3c-1.1.2-2.4-.1-3.3-.9h-.7c.3-2.6.7-5.9 1.1-9h.3c1.5 3.1 2.4 6.4 2.6 9.8Z" class="cls-6"/><path d="m62.5 69.3-.2.3c0 .7-.2 2.8-.5 5.5h-.1c-7.6-5.4-15.6-10.8-21.1-15.4 2.3-.5 4.1-2.9 4.1-5.2 3.4 3.2 6.8 6 10.2 8.2-.6.4-1.3.7-1.9 1 2.1 1.3 4.6 2.8 7.3 4.3.8.4 1.5.9 2.3 1.3Z" class="cls-5"/><path d="M44.6 54.5c0 2.4-1.7 4.7-4.1 5.2-1.7-1.4-3.2-2.7-4.3-3.9.5-.2.9-.5 1.4-.8 1.6-1.2 3-3.1 3-4.4l3.9 3.9Z" class="cls-7"/><path d="M22.6 157.4c2.7-.4 5.4-.8 8.2-1.1 3.9-.4 8-.7 10.5-.8 1.2 0 2.1-.1 2.3-.1s.3 3.3-.1 3.1c-3.2.7-6.2-.2-11.3.5-12.2 1.7-22.5 2.6-29.4.8-.6-.9-.8-1.5-.6-2.4H3c3.3.7 6.5.9 9.5.8 3.4 0 6.7-.5 10.1-.9Z" class="cls-3"/><path d="M43.1 144.2c1.3 8.2-1.3 9.5-1.7 10.7v.5c-2.5.1-6.6.4-10.5.8-2.8.3-5.5.7-8.2 1.1-.5-3.9-2.1-7-4.1-10.4 4-1.7 8.2-3.8 9.6-4.3 0 0 .2-3.6-.7-8.5 4.7 0 9.7-.2 13.9-.5.5 3.7 1.2 6.7 1.8 10.5Zm-2.4-93.6c0 1.3-1.4 3.2-3 4.4l-.2-.5c-4.5-4.7-5.9-5.4-6.6-7.5-1.6-4.8-12.3-26.2-15-39.1-.6-3-1.2-4.2-.5-5.3C17.5-.6 28 .4 32.8.4s8 0 7.9 1.2c-.4 3.2-5.8 3.5-8.1 4l-6.1 1.3c.6 2.1 4.6 12.6 6.2 16.1 2.2 4.7 4.7 9.1 7 14.1-2.8 5.8-4.1 8.2-1.1 11.4z" class="cls-2"/><path d="M18.5 146.9c2 3.4 3.6 6.5 4.1 10.4-3.3.5-6.6.9-10.1.9.4-3.9-1-8.9-1-8.9 1.5-.2 4.2-1.2 7-2.5Z" class="cls-3"/><path d="M2.8 156.6c0-3.6.9-5.6 8.7-7.2 0 0 1.4 5 1 8.7-3 .2-6.1 0-9.5-.7h-.8c0-.2.2-.5.3-.8z" class="cls-2"/><path d="M95.6 58.1c1.7 1.7 3.9 6.6 4.1 9.1.3 3.3.2 4.3-.2 8.9-.2 2.1-.3 4.2-.4 6.4-.2 2.8-.3 5.6-.5 8.4 0 .9-.1 1.7-.2 2.6 0 .5 0 1-.1 1.5-.5 6.1-.6 9.5-.6 12.9 0 2.7 0 5.3.1 9.1v23.2h-1c-4.7.1-12.8-1-15.2-4.3-.9-1.3-3.6-7-6.5-12.9h0c-2.4-5.1-5-10.5-6.7-13.7-.4-.7-.7-1.2-1-1.7M23 91.4c-.4 2.6-1.2 7.4-1.4 9.9-.5 5.2-3.5 20.3-3.2 32.6 2.5.2 5.7.3 9 .3 4.7 0 9.7-.2 13.9-.5 1.4 0 2.7-.2 3.8-.3-.5-2.9-1.3-6.3-2-9.5-1-4.2-1.8-8.1-1.8-9.9 0-3.1-1.1-8.5 0-10.4" class="cls-8"/><path d="M96.8 140v.2c-.7 4.4-2.4 9.9-5.6 13.9-3.1 3.9-7.1 5.7-11.8 5.9-6.1.4-11.6.8-17-1.2s-9-8.2-12.4-14.5c-.6-1.1-5.2-15-7-20.4-.4-1.1-.6-1.8-.7-2.1" class="cls-8"/><path d="M90.7 59.8c1.7 0 4.2-.1 5-1.7" class="cls-9"/><path d="M12.5 158.1v.3m-.9-6.6.2-.1m-9.2 5.7H3m38.3-2.5c.5-1.2 3-2.5 1.7-10.7-.6-3.7-1.3-6.7-1.8-10.5h0m2.5 21.6c-.2 0-1 0-2.3.1-2.5.1-6.6.4-10.5.8-2.8.3-5.5.7-8.2 1.1-3.3.5-6.6.9-10.1.9-3 0-6.1-.2-9.5-.8" class="cls-8"/><path d="M2.8 157v-.4c0-3.6.9-5.6 8.7-7.2 0 0 1.4 5 1 8.7" class="cls-8"/><path d="M27.4 134.2s0 0 0 0c1 4.8.7 8.5.7 8.5-1.3.4-5.6 2.5-9.6 4.3-2.8 1.2-5.5 2.3-7 2.5m-8.6 10.3c7 1.8 17.2.8 29.4-.8 5.1-.7 8 .2 11.3-.5.4.1.1-3.1.1-3.1m-41.1 1.2c-.1.3-.2.6-.3.8-.2.9 0 1.5.6 2.4M92.7 52.4l.2.2c1.3 1.2 3.6 3.8 3 5.3" class="cls-8"/><path d="M68.7 73c-.8 2.2-2.1 10.6-2.8 18.1-.2 2.4-.4 4.6-.5 6.6-.1 2.7-.1 4.8.2 5.8" class="cls-9"/><path d="M62.4 69.6c0 .7-.2 2.8-.5 5.5-.1 1.1-.3 2.2-.4 3.4-.4 3.1-.8 6.4-1.1 9 0 .5-.1 1-.2 1.4-.1 1.3-.2 2.2-.2 2.7" class="cls-8"/><path d="M49 68.3c1.1 1.8 6.4 13.1 11 23.2 1.1 2.4 2.1 4.6 3.1 6.7.9 1.9 1.7 3.7 2.4 5.2.3.6.5 1.2.8 1.7.5 1.1.9 1.9 1.1 2.4M27.6 73C26 77.2 23.3 89.7 23 91.4M27.6 73c1.5-3.9 6.7-7.1 9.8-7.4 5-.4 8.6 0 11.6 2.6m41.1-8.6c11.3 5.7 5.4 18.6.9 19.9" class="cls-8"/><path d="M61.4 9.2c-.9 2.3-3.7 10.5-5.6 15.9-2.9 8.6-5.1 17.4-5.1 17.4 1.9.8 5.7 2.5 10.4 4.6 1.3.6 2.6 1.2 4 1.8 2.1 1 4.4 2 6.7 3 3.8 1.7 7.7 3.4 11.6 5 .5.2 1.1.5 1.6.7q0 0 0 0c1.7.7 3.3 1.4 4.9 2 .2 0 .4.1.5.2M56.6.7C62.7.3 72 .7 77.7.3v.2c.7 2.2-.6 3.2-1 3.2-3.4 1.7-8.2 1.8-12.3 3.6-1.1.5-2.1 1.1-3.1 1.9" class="cls-8"/><path d="M51.9 6.7c.6-1.5-1.8-6.2 4.8-6M39.8 37.1c1.5-3 3.4-7 5.3-12.4 1-2.9 4.9-12.3 6.8-18m2.9 56c-3.4-2.2-6.8-5-10.2-8.2l-3.9-3.9-2.1-2.1c-3-3.1-1.7-5.6 1.1-11.4" class="cls-8"/><path d="M60.2 68c-2.7-1.5-5.2-3-7.3-4.3" class="cls-9"/><path d="M91 79.5c-1.6.6-4.5 0-8.1-1.1-1.2-.4-2.5-.8-3.8-1.4-.6-.2-1.2-.5-1.8-.7-2.7-1.1-5.5-2.4-8.4-3.8-2.2-1.1-4.3-2.2-6.4-3.3-.8-.4-1.6-.9-2.3-1.3M15.9 8c-.6-3-1.2-4.2-.5-5.3C17.5-.6 28 .4 32.8.4s8 0 7.9 1.2c-.4 3.2-5.8 3.5-8.1 4l-6.1 1.3c.6 2.1 4.6 12.6 6.2 16.1 2.2 4.7 4.7 9.1 7 14.1h0m-2.3 17.5c-4.5-4.7-5.9-5.4-6.6-7.5-1.6-4.8-12.3-26.2-15-39.1m45.9 67.1c-7.6-5.4-15.6-10.8-21.1-15.4-1.7-1.4-3.2-2.7-4.3-3.9" class="cls-8"/><path d="M61.2 47.1c.8 3.1.6 7.1-.8 10-1.1 2.2-3.3 4.3-5.6 5.7-.6.4-1.3.7-1.9 1M37.7 55c-.5.3-.9.6-1.4.8" class="cls-9"/><path d="M40.7 50.6c0 1.3-1.4 3.2-3 4.4m47.4 2.5s0 0 0 0c2.4-.7 4.1-1.9 6.7-4" class="cls-8"/><path d="m18.4 146.7.2.3c2 3.4 3.6 6.5 4.1 10.4" class="cls-9"/><path d="M61 88.8c1.6.8 3.3 1.6 4.9 2.2 7 2.9 14.5 4.6 22 5.1 3.7.3 8 0 10.5-2.8q0 0 0 0m-32.5 3.8.2.2c3.7 5 7.3 10.1 11 15.1 5.5-2.9 10.2-7.2 13.4-12.4 3 1.9 5.5 4.7 7.2 7.9l.3.6M65.7 97.6h-.3m0 .1c-.7.2-1.4.3-2 .5m1.8-49.3c.1.1.2.3.3.4 2.1 3.1 2.8 7.1 1.7 10.6s-4 6.5-7.6 7.5l.7.5M44.6 54.1v.4c0 2.4-1.7 4.7-4.1 5.2h-.1m44.8-2.2s0 0 0 0q0 0 0 0c2.3 3.1 3.3 7.2 2.9 11-.5 3.8-2.3 7.4-5.2 9.9 0 0-.2.2-.3.2" class="cls-8"/><path d="M82.9 93.5c-3.2-.1-6.3-.6-9.4-1.5-1-.3-2.1-.8-2.1-1.9 0-.5.3-.9.5-1.3 1-1.4 2-2.7 3.2-3.9 1.5-1.6 2.1-2.9 3.8-.9 2.2 2.5 3.4 6.3 4 9.5m-21.2-15c1.5 3.1 2.4 6.4 2.6 9.8-1.1.2-2.4-.1-3.3-.9m21.4-5.2c2.6 0 4.8 2.6 4.4 5.2-1.3.2-2.7-.3-3.6-1.3s-1.3-2.4-1-3.7m-11.2-1h.3c1-.1 1.9-.3 2.8-.4.7.4.5 1.5 0 2.1s-1.4.7-2.2.9c-.7.1-1.7.2-2-.5-.2-.5 0-1.1.5-1.4.3-.2.6-.3.9-.4h.6m7.1-4.3c.4.8.7 1.6.7 2.4s-.6 1.7-1.4 1.8c-.9.1-1.7-.8-1.8-1.8 0-.9.3-1.9.7-2.7m-13.5-.7c.2 0 .3-.1.5 0 .6 0 1.1.4 1.3 1 .2.7-.3 1.6-1 1.8s-1.6-.2-2-.8c-.3-.6-.3-1.4.1-1.9s1.1-.6 1.6-.4h.2m9.2 23.2c-1.1 1.4-.4 3.4.6 4.7.9 1.2 2.3 2.2 3.9 2.2 1.3 0 2.4-.9 3.2-1.9s1.2-2.3 1.6-3.5c1.1.4 2.1.7 3.2 1.1-.5-.6-.8-1.7-1.4-2.2-.5-.5-3.4-.8-3.5-1.1.4 1.4-.3 3-1.6 3.7s-3 .4-3.9-.7c-.5-.6-.8-1.4-.8-2.1s.2-1.3.6-1.9l-5.4-1.2v2.4c1.2.2 2.4.4 3.5.7Zm24.8-16.9c-1.2 3-2.3 6-3.2 9.1 1 .2 2.1 0 3-.7m-1.3 22c-3.1.7-6.3.5-9.3-.6-.2 0-.5-.2-.6-.5 0-.3.1-.6.3-.8 1.4-1.7 2.8-4.2 4.6-5.3.7.6 4.7 7.2 5 7.2m.9 4.1c-4.5-.3-9.1-.5-13.6-.8h-.7c-.5.2-.5.9-.3 1.3q.45.6 1.2.9c4.1 1.8 8.7 2.5 13.1 2-.2 0-.4 0-.5-.1m-9.1 3.5c-.3 0-.8 0-.9.2-.2.4.1.8.4 1 1.5 1.3 3.1 2.6 4.7 3.8 2.2 1.6 3.7-1.6 2.7-3.4-1-1.7-5.1-1.4-6.9-1.7Z" class="cls-8"/><path d="M97.8 130.2c-1.5.5-2.6 1.9-3.7 3s-2.7 2.2-4.3 1.8c-1.2-.3-2-1.3-2.8-2.3-3-3.8-6-7.6-8.9-11.5-.9.5-1.9 1-2.8 1.5M66 68c1.6 1.4 4.4.8 5.2-1.1 1.5.9 3 1.9 4.8 2.2 1.7.3 3.7-.3 4.6-1.9 1.1-1.9-.3-4.6-2.4-5.4-1-.4-2.2-.4-3.1-1.1-1.4-1.1-1.2-3.2-1-4.8-3.3-1.1-3.1 2.4-3.7 4.6-.2.7-3.7 8.3-4.6 7.5Zm2.9 41.2h-.5c.9.6 1.9.9 2.9 1-.5-1.9-1.5-3.7-2.8-5.1-.4-.4-1-.6-1.2-1.1l-1.1 1.1m16-48.3h1.3c.3 0 .6 0 .9-.1 1.7-.3 4.4-1.3 7.4-3.3.4-.2.7-.5 1.1-.8q1.95-1.5 3.9-3.6M63.9 31.5s.8 3.9 1.8 7.8c.2.6.3 1.2.5 1.9 1.1 4.1 1.1 5.4 2.7 7.5.8 1.1 1.9 2.2 3.1 3.2.2.2.4.4.7.5m-6.4-25.2c2.6-1 7.7-1.1 9.8-.5m10.1.1c4.5-1.4 9.8.6 10.2-.9M74.7 40.1c2 1.9 4.3 1.9 7.5 1.5m22.9-11.9c2.3 1.3.4 5.6-.3 7.5-.9 2.3-2.8 2.8-3.8 2.2" class="cls-8"/><path d="M63.9 31.5v-2.2c.6-6.8 4.1-18 8.6-18.6 3.1-.5 3.5-.7 8.7-.7 5.3 0 9.8-.2 12.6 1.4 9.4 5.4 6.6 21.3 6.8 20.9 1.5-3.3 2-3.5 4-2.7.1 0 .3.1.4.2m-4 6.8c0 .8-.1 1.8-.3 2.8-.7 3.9-2.7 8.5-3.9 9.6" class="cls-8"/><path d="M66.3 27.2c.5-1.8 3-4.2 5.6-4.2 2.5 0 5.2.2 4.2 3.8m10.1 0c-.6-.2-.3-1.3-.6-2.4 1.6-1.2 4.9-1.8 6.9-1.2.8.3 3.8 1.1 4 2.7M74.4 45.3c4.6 1.4 11.1 1.9 15.8-.7M72.6 30.4c0 .9-.4 1.7-.9 1.7s-.9-.8-.9-1.7.4-1.7.9-1.7.9.8.9 1.7m19.5-.1c0 1-.4 1.7-1 1.7-.5 0-1-.8-1-1.7 0-1 .4-1.7 1-1.7s1 .8 1 1.7m-28.6-1h-.8c-.1 0-.3.1-.4.2-.3.3-.4.6-.5 1-.8 2.6-.3 7 3.8 8.7" class="cls-8"/><path d="M105.1 29.9v-.2h0c2.1-6.6-1.5-23.3-2.4-24.4-1.5-2-3.7-2.9-5-3.3C90.8 0 90.6.8 83.4.6c-1.8 0-3.7-.1-5.7-.1-2.9 0-5.9.3-8.3 1.1-2.1.8-2.6 1.2-4.1 3-.3.3-.6 1.3-.9 2.7-1.1 5.2-2.3 16.3-1.8 21.8" class="cls-8"/></svg>')}`;
export default image;