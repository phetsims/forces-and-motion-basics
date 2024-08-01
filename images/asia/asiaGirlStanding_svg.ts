/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Asia" width="72.8" height="196.6" viewBox="0 0 72.8 196.6"><defs><style>.cls-1{fill:#010101}.cls-1,.cls-2,.cls-4,.cls-5{stroke-width:0}.cls-2{fill:#2e2e2e}.cls-10,.cls-9{fill:none;stroke:#000;stroke-width:.6px}.cls-9{stroke-linecap:round;stroke-linejoin:round}.cls-10{stroke-miterlimit:10}.cls-4{fill:#bdcae8}.cls-5{fill:#ebebeb}</style></defs><path d="M58.3 143.9c-2.6 1.1-7.1 2.3-13.6 3-3 .3-6.3.5-10.1.5h-4.8c-7.8 0-9.9-.3-14.2-1.7-.8-.3-1.7-.6-2.8-1 0-4.9 4.1-26 4.8-30.5 1.8 0 8.6 2.4 9.5 2s3.2-4.6 3.6-4.6c0 0 2.4 3.9 4.2 4.4 1.9.6 4.2.2 6.1 0 4.3-.4 8.6-1.4 12.3-3.7 1 6 7 30.5 7 30.5-.3.3-1.1.8-2.3 1.3Zm-5.2-88.5-1.2.6c-1.4.5-2.9.8-4.4.8.6 1.1 1.2 2.1 1.8 3.2-5.4 1.6-10.8 3.3-16.2 4.9v-.3s10.5-8.9 10.3-11c-.1-1.6 0-1.6 0-3.4h.1c4.3 2.2 6.2 2.5 9.6 5.2m-2-46.8c.5.9.9 2.2.7 3.2 0 .1 0 .2-.1.3-.3-.5-.6-1-.6-1.4L48 6.8c-.4-.1-.7-.2-1-.4.2-.1.5-.1.8 0 .9.2 1.7.6 2.3 1.1.4.3.7.7 1 1.2Z" class="cls-4"/><path d="M51.7 12c-.4.6-1.2.7-2 .7-.5-1.9-1.4-3.6-3.4-4.5.5-.4 0-1.5.6-1.9.3.1.7.3 1 .4l3.1 3.9c0 .3.3.9.6 1.4Z" class="cls-4"/><path d="M42.2 27.6c.8 0 1.4 1.3 1.4 2.9s-.6 2.9-1.4 2.9-1.4-1.3-1.4-2.9.6-2.9 1.4-2.9" class="cls-1"/><path d="M41.2 42.2c-1.7 2.6-1.6 2-3 2.9-1.4 1-3.7 1.6-5.2 1.3-2.3-.3-3.4-1.4-4.4-3.3 3.9 1.8 11.8-.1 12.6-1Z" style="stroke-width:0;fill:#fff"/><circle cx="35.5" cy="69.2" r="1.9" class="cls-5"/><path d="M34.6 82.8c1 0 1.9.8 1.9 1.9s-.8 1.9-1.9 1.9-1.9-.8-1.9-1.9.8-1.9 1.9-1.9m-.4 16.9c1 0 1.9.8 1.9 1.9s-.8 1.9-1.9 1.9-1.9-.8-1.9-1.9.8-1.9 1.9-1.9" class="cls-5"/><path d="M33.1 64.5v.3h-.2c-.2 0-6.4-4-10-5.7 1-.8 2.3-2.1 3.3-2.9-1.6-.4-3.6 0-5.4 0-.6 0-1.1 0-1.6-.2 2.7-1.6 7.6-4.9 10.8-5.1l.4-.4c.2.2.4.3.6.5l-.5.3c-1 6.6 2.7 13.2 2.7 13.2Z" class="cls-4"/><path d="M26.1 27.7c.7 0 1.2 1.1 1.2 2.6s-.5 2.6-1.2 2.6-1.2-1.1-1.2-2.6.5-2.6 1.2-2.6" class="cls-1"/><path d="M62.1 66.2c-1.3-2.4-1.9-5.4-4.1-7.1-.5-.4-6-2.9-6.2-3.1-1.4.5-2.9.8-4.4.8.6 1.1 1.2 2.1 1.8 3.2-5.4 1.6-10.8 3.3-16.2 4.9h-.2c-.2 0-6.4-4-10-5.7 1-.8 2.3-2.1 3.3-2.9-1.6-.4-3.6 0-5.4 0-.6.6-5.4 3.5-6.4 5.3-2 3.6-2.9 10.2-4.6 15.5.5.6.9 1.2 1.2 1.7 1.8 2.4 2.8 3 7.4 3.2h.6v2.2c0 2.3 0 5.4-.2 8.8 0 2.6-.2 5.4-.3 8.2-.2 5-.5 9.7-.9 13 1.8 0 8.6 2.4 9.5 2s3.2-4.6 3.6-4.6c0 0 2.4 3.9 4.2 4.4 1.9.6 4.2.2 6.1 0 4.3-.4 8.6-1.4 12.3-3.7.3-.2.7-.4 1-.7 0-.4-.6-4.6-1.1-8.5-.4-3.3-.8-6.3-.8-6.7-.2-3-.4-4-.7-7.5-.2-2.5.1-5 .3-7.4 0-.9.1-1.8.1-1.8q.75 2.1 1.5 3.6c1.4 0 2.4-.1 3.5-.3 1.2-.2 2.3-.5 3.6-1.2 1.1-.5 2.7-1.9 3.9-3.3.9-1.1 1.7-2.2 1.9-3.2l-4.5-9Zm-27.9 37.2c-1 0-1.9-.8-1.9-1.9s.8-1.9 1.9-1.9 1.9.8 1.9 1.9-.8 1.9-1.9 1.9m.4-16.9c-1 0-1.9-.8-1.9-1.9s.8-1.9 1.9-1.9 1.9.8 1.9 1.9-.8 1.9-1.9 1.9m.9-15.5c-1 0-1.9-.8-1.9-1.9s.8-1.9 1.9-1.9 1.9.8 1.9 1.9-.8 1.9-1.9 1.9" style="stroke-width:0;fill:#8ea3d3"/><path d="M24.5 6.8c.9 0 1.2.8 1.4 1.5-1.7.8-3 2-3.5 3.8-.5-.3-1.3.3-1.8 0 .8-1.9 1.8-3.5 3-4.7.2 0 .5-.3.8-.5h.1Z" class="cls-4"/><path d="M58.2 7.1c1-.4 1.5-1.6 1.1-2.6-.4-.9-1.7-1.4-2.7-1 0-.7.7-1.9-1-2.6-2.1-.7-2.5.5-3.3 1.5-1-2.1-3.5-1.4-2.9.9-.6-.3-1.2-.6-1.9-.5-.7 0-1.4.3-1.7.9-.2.4-.2.8-.2 1.1-3.6-1.4-7.7-1.7-12.1-.6h-.2s-4.7-.1-7 1.1c-.4.2-.7.4-1 .6.4-.7.3-1.4-1.4-1.5.2-.6.7-1.6.2-2-.4-.5-1.8-.4-2.5-.2 0-.8-.7-1.9-1.5-1.7-.8.1-1.4.9-1.6 1.6-.6-.8-1.9-1-2.7-.4s-1 1.8-.4 2.6c-.7 0-1.9-.2-2.3 1.5-.3 2 1.1 2.1 2.2 2.5-1.8 1.3-.6 3.3 1.5 2.4-.2.6-.3 1.2 0 1.8s.6 1.2 1.3 1.2c1.6.2 2.1-.7 2.3-1.8v-.3c0-1.2.5-2.5 1.4-3.3.6-.5 1.5-1.1 2.3-1.2h.5c.9 0 1.2.8 1.4 1.5-1.7.8-3 2-3.5 3.8-.5-.3-1.3.3-1.8 0-2 4.5-2.7 10.4-1.3 15.9h1.1c0-.2 0-.5-.1-.7v-1.8c0-7.3 6.6-13.8 11.8-14.4h.5c3.3-.4 21.1 5.2 20.4 16.9 1.1-.2 1.8-.1 2.4.2 1.3-7.1 1.2-11.9-1.3-16.1 0-.1.1-.3.2-.4.6.4 1.6 1 2.2.7s.9-1.7.9-2.4c.9.2 2.2-.2 2.3-1 0-.8-.6-1.6-1.4-2Zm-8.5 5.6c-.5-1.9-1.4-3.6-3.4-4.5.5-.4 0-1.5.6-1.9.2-.1.5-.1.8 0 .9.2 1.7.6 2.3 1.1.4.3.7.7 1 1.2.5.9.9 2.2.7 3.2 0 .1 0 .2-.1.3-.4.6-1.2.7-2 .7Z" class="cls-2"/><path d="M44.3 21.2c-1.3-.3-5.5-.4-4.9 1.6.1.4.6.8 1.1.9s1.8-.3 2.3-.3c1.4 0 2.4.1 3.9.3.5 0 .7-.3.5-.7-.3-.7-1.3-1.4-2.9-1.8m-16.1.3c-1.5-.7-3.3 0-4.4 1.1-.2.1-.3.3-.4.5v.6c.2.2.4.2.7.2.2 0 3.5.3 4 .3.7 0 1.2-.6 1.2-1.3 0-.6-.5-1.2-1.1-1.4" class="cls-2"/><path d="M24.1 6.8h.4c-.3.2-.6.4-.8.5l.5-.5Z" class="cls-4"/><path d="M24.1 6.8c-.2.1-.3.3-.5.5l-3.1 3.5v.8-.3c0-1.2.5-2.5 1.4-3.3.6-.5 1.5-1.1 2.3-1.2Z" class="cls-4"/><path d="M23.6 7.3c-1.2 1.3-2.2 2.9-3 4.7-.1 0-.2-.2-.2-.3v-.8l3.1-3.5Z" class="cls-4"/><path d="M72.4 188.8c-.5-2-3.9-4.1-5.8-5-.7-.3-1.4-.6-2-.9-.5-.3-.9-.6-1.2-1-.4-.6.3-2.7 0-3.4-.4-.9-1.2-1.6-2.2-1.9-.5-.2-1-.2-1.5-.3-1.6 0-6.4 1.5-5 7.6-.6.4-1.2.9-1.7 1.9-.8 1.4-1.6 8.2-.4 9.3.9.9 3.6.7 4.9.7h11.2c1.2 0 2.5-.1 3.3-1 .7-.8.7-5 .5-6Zm-53.8-4.6h.8c.4-2 .2-4.1-1.2-5.6-.9-1-3.1-1.7-5-1.6-.8 0-1.6.2-2.1.7-1.2 1.1-1.2 3.1-1.3 4.7 0 .3 0 .6.1.8-2.7.7-7.8 2.7-9 5.2-.5 1-1 7 0 7.4.3.1 2.3.6 2.6.6 3.5.2 15.9-.2 16.9-.8 1.4-.9 1-7.3.3-8.7-.6-1.2-1.1-2-2.1-2.5Z" style="stroke-width:0;fill:#424242"/><path d="M69.5 87.9c-.4-1.9-3.3-6.8-4.8-9.6-1.2 1.5-2.8 2.8-3.9 3.3-1.4.7-2.5 1-3.6 1.2.7 1.2 2.1 4.5 2.5 5.2-1.3 1.4-2.1 3.2-4 5-1.9 1.9-3 2.9-3.2 3.2 0 .3.4 3.4.8 6.7 2.5-2 5.9-4 8.5-5.6 3.5-2.2 8.5-5.2 7.7-9.3Zm-24.8 59c1 6.2 4 15.4 5.3 20.2.9 3.3 2.5 8.9 3 18.7.6-.9 1.1-1.5 1.7-1.9-1.3-6.1 3.4-7.6 5-7.6.5 0 1 0 1.5.3v-.3c-1.6-9.6-.2-21.7-2.9-32.5-2.6 1.1-7.1 2.3-13.6 3Zm-1.3-96.8v-1c1.7-1.3 3.6-2.9 5.6-5 1.9-2.4 2.3-3.4 3-5.8 2-.5 3.2-2.3 3.9-4.7.6-1.9 1-4.6-.7-5.4-.6-.3-1.3-.3-2.4-.2.7-11.7-17.2-17.3-20.4-16.9h-.5c-5.2.7-11.8 7.1-11.8 14.4v1.8c0 .2 0 .5.1.7h-.9l-.2-.1c-.4 0-.8.1-1 .4-.3.4-.4.9-.4 1.4-.2 2 0 4 .8 5.8q.3.9.9 1.5c.4.4 1 .7 1.6.7h.4c.7 2.4 1.8 5 4 7.3 1.6 1.7 3 3.9 4.8 5.5.2.2.4.3.6.5l-.5.3c-1 6.6 2.7 13.2 2.7 13.2s10.5-8.9 10.3-11c-.1-1.6 0-1.6 0-3.4Zm-1.2-16.8c-.8 0-1.4-1.3-1.4-2.9s.6-2.9 1.4-2.9 1.4 1.3 1.4 2.9-.6 2.9-1.4 2.9m2.1-12.1c1.6.4 2.6 1.2 2.9 1.8.2.4 0 .7-.5.7-1.5-.2-2.5-.3-3.9-.3-.5 0-1.8.3-2.3.3s-1-.4-1.1-.9c-.6-2 3.6-1.9 4.9-1.6M26.1 32.8c-.7 0-1.2-1.1-1.2-2.6s.5-2.6 1.2-2.6 1.2 1.1 1.2 2.6-.5 2.6-1.2 2.6m-2-8.9c-.2 0-.5 0-.7-.2-.1-.2-.2-.4 0-.6 0-.2.2-.4.4-.5 1.1-1 2.9-1.8 4.4-1.1.6.3 1.1.8 1.1 1.4s-.5 1.2-1.2 1.3c-.5 0-3.8-.3-4-.3m4.5 19.2c3.9 1.8 11.8-.1 12.6-1-1.7 2.6-1.6 2-3 2.9-1.4 1-3.7 1.6-5.2 1.3-2.3-.3-3.4-1.4-4.4-3.3ZM14 164.7c0 2.2-.2 9.8-.8 12.2 1.8 0 4 .6 5 1.6 1.3 1.5 1.6 3.7 1.2 5.6h-.8c1 .5 1.5 1.4 2.1 2.6.7-8.2 9.3-33.4 9.1-39.3-7.8 0-9.9-.3-14.2-1.7-1.6 8.2-1.6 17-1.6 19.1Zm4.5-63.6c.1-2.7.2-5.5.3-8.2-1.2-1.4-1.7-2.1-2.5-2.8h.3c.2.2 1.2-6 1.7-8v-.2c-4.6-.2-5.6-.7-7.4-3.2-.7 2.8-2.5 8.9-2.8 9.8-1.7 4.6 5.7 9.7 10.2 12.6h.1Z" style="stroke-width:0;fill:#7d584d"/><path d="M20.3 27.3c0 .2 0 .5.1.7 0 .4.2.9.4 1.6 0 0-.4 3.7.7 7.9.7 2.5 1.8 5.1 4 7.4 1.6 1.7 3 3.9 4.8 5.5.2.2.4.3.6.5 2.8 2.1 6.4 2.7 12.5-1.8 1.7-1.3 3.6-2.9 5.6-5M20.3 25.6v1.8" class="cls-9"/><path d="M27.3 30.2c0 1.4-.5 2.6-1.2 2.6s-1.2-1.1-1.2-2.6.5-2.6 1.2-2.6 1.2 1.1 1.2 2.6m16.3.2c0 1.6-.6 2.9-1.4 2.9s-1.4-1.3-1.4-2.9.6-2.9 1.4-2.9 1.4 1.3 1.4 2.9m-14.3 6.7c.4 3.6 3.6 2.6 6.2 2.6m-6.9 3.4c3.9 1.8 11.8-.1 12.6-1-1.7 2.6-1.6 2-3 2.9-1.4 1-3.7 1.6-5.2 1.3-2.3-.3-3.4-1.4-4.4-3.3Zm23.9-6.7c-.2.7-.4 1.4-.5 1.9-.7 2.4-1.1 3.3-3 5.8 0 .1-.2.2-.3.3" class="cls-9"/><path d="M53 28.1c1.1-.2 1.8-.1 2.4.2 1.7.8 1.3 3.5.7 5.4-.7 2.4-2 4.3-3.9 4.7M39.4 22.8c.1.4.6.8 1.1.9s1.8-.3 2.3-.3c1.4 0 2.4.1 3.9.3.5 0 .7-.3.5-.7-.3-.7-1.3-1.4-2.9-1.8-1.3-.3-5.5-.4-4.9 1.6m-11.2-1.3c.6.3 1.1.8 1.1 1.4s-.5 1.2-1.2 1.3c-.5 0-3.8-.3-4-.3s-.5 0-.7-.2c-.1-.2-.2-.4 0-.6 0-.2.2-.4.4-.5 1.1-1 2.9-1.8 4.4-1.1m-8.1 6.6s-.7-.1-.8-.2c-.4 0-.8.1-1 .4-.3.4-.4.9-.4 1.4-.2 2 0 4 .8 5.8q.3.9.9 1.5c.4.4 1 .7 1.6.7m9.2 13.6c-1 6.6 2.7 13.2 2.7 13.2s10.5-8.9 10.3-11m-22.7 2.7c-.6.6-5.4 3.5-6.4 5.3-2 3.6-2.9 10.2-4.6 15.5.5.6.9 1.2 1.2 1.7 1.8 2.4 2.8 3 7.4 3.2h.6m32.9-26c.3.2 5.7 2.7 6.2 3.1 2.1 1.7 2.7 4.8 4.1 7.1 1 1.7 4.5 9 4.5 9-.2 1-1 2.1-1.9 3.2-1.2 1.5-2.8 2.8-3.9 3.3-1.4.7-2.5 1-3.6 1.2-1 .2-2.1.2-3.5.3-.5-1-1-2.3-1.5-3.6-1.2-3.3-2.4-7.3-3.1-9.6" class="cls-9"/><path d="M19.2 67.3c-.1 5.1-.2 9.4-.2 14.6v2.2c0 2.3 0 5.4-.2 8.8 0 2.6-.2 5.4-.3 8.2-.2 5-.5 9.7-.9 13 1.8 0 8.6 2.4 9.5 2s3.2-4.6 3.6-4.6c0 0 2.4 3.9 4.2 4.4 1.9.6 4.2.2 6.1 0 4.3-.4 8.6-1.4 12.3-3.7.3-.2.7-.4 1-.7m-2-31.5v-.5s0 .9-.1 1.8c-.2 2.4-.5 4.9-.3 7.4.2 3.5.4 4.5.7 7.5q0 0 0 0" class="cls-9"/><path d="M11 78.6s0 0 0 0c-.7 2.8-2.5 8.9-2.8 9.8-1.7 4.6 5.7 9.7 10.2 12.6m0-19c-.5 2.1-1.5 8.2-1.7 8" class="cls-9"/><path d="M13.3 87.7c1.6 1.1 2.4 1.7 3.1 2.3.8.7 1.3 1.5 2.5 2.8m38.3-10c.7 1.2 2.1 4.5 2.5 5.2m5.1-9.7c1.4 2.8 4.4 7.7 4.8 9.6.8 4.1-4.1 7.1-7.7 9.3-2.6 1.6-6 3.7-8.5 5.6" class="cls-9"/><path d="M52.5 96.3s0 0 0 0l3.2-3.2c1.8-1.8 2.7-3.6 4-5 .7-.8 1.5-1.4 2.7-1.9m-19-32.7c-.1-1.6 0-1.6 0-3.4v-1m-25.7 65c-.7 4.6-4.8 25.6-4.8 30.5m0 0c1 .4 1.9.7 2.8 1 4.2 1.5 6.4 1.7 14.2 1.7h4.8c3.8 0 7.1-.2 10.1-.5 6.5-.7 11.1-1.9 13.6-3 1.2-.5 1.9-.9 2.3-1.3 0 0-6-24.5-7-30.3" class="cls-9"/><path d="M54.4 111.4c0-.4-.6-4.6-1.1-8.5-.4-3.3-.8-6.3-.8-6.7M29.8 50.9c-3.2.2-8 3.4-10.8 5.1.5.1 1.1.2 1.6.2 1.8 0 3.8-.3 5.4 0-1 .8-2.3 2.1-3.3 2.9 3.5 1.6 9.8 5.7 10 5.7h.2c5.4-1.6 10.8-3.3 16.2-4.9-.6-1.1-1.2-2.1-1.8-3.2 1.5 0 3-.3 4.4-.8l1.2-.6c-3.3-2.7-5.3-3-9.6-5.2" class="cls-9"/><path d="M33.1 64.5v.3c-2.7 15.9-2.1 46.8-2.2 46.6m-11-12.9s-1.9 11.4 2.9 11.4c4.4 0 3.4-10.6 3.4-10.6-2.2 0-4.8-.8-6.3-.9Zm18.2.8s-1 11.8 6.4 10.5c6.8-1.1 3.4-11.3 3.4-11.3-3.3.6-7.5.5-9.8.8m-1.2-26s-1 11.8 6.4 10.5c6.8-1.1 3.4-11.3 3.4-11.3-3.3.6-7.5.5-9.8.8m-14.4-1.8s-1.9 11.4 2.9 11.4c4.4 0 3.4-10.6 3.4-10.6-2.2 0-4.8-.8-6.3-.9Zm-2.2-45.9v1.8h0c0 .2.2.6.4 1.6m-.1-16.9c-2 4.5-2.7 10.4-1.3 15.9v.3M45.6 4.7C42 3.3 37.9 3 33.5 4.1h-.2s-4.7-.1-7 1.1c-.4.2-.7.4-1 .6m30.1 22.3c1.3-7 1.2-11.7-1.3-16M20.3 25.6c0-7.3 6.6-13.8 11.8-14.4h.5c3.3-.4 21.1 5.2 20.4 16.9M15.6 145.6s0 0 0 0c-1.6 8.2-1.6 17-1.6 19.1m15.8-17.3c.2 6-8.4 31.2-9.1 39.3m23.9-40.4v.5c1 6.2 4 15.4 5.3 20.2.9 3.3 2.5 8.9 3 18.7m5.3-42v.1c2.7 10.7 1.3 22.8 3 32.5M14 164.7c0 2.2-.2 9.8-.8 12.2v.2m46.5-.8c.5 0 1 0 1.5.3 1 .3 1.8 1 2.2 1.9.3.6-.4 2.8 0 3.4.3.4.7.8 1.2 1 .6.3 1.4.6 2 .9 1.9.9 5.3 3.1 5.8 5 .3 1 .2 5.3-.5 6-.8.9-2.1 1-3.3 1H57.4c-1.4 0-4 .2-4.9-.7-1.1-1.1-.4-8 .4-9.3.6-.9 1.1-1.5 1.7-1.9.8-.4 1.7-.6 2.9-1 1.9-.5 4.4-.9 7-.1.7.2 1.4.5 2 .9" class="cls-9"/><path d="M54.7 183.9c-1.3-6.1 3.4-7.6 5-7.6m-40.4 7.8c.4-1.9.2-4.1-1.2-5.6-.9-1-3.1-1.7-5-1.6-.8 0-1.6.2-2.1.7-1.2 1.1-1.2 3.1-1.3 4.7 0 .3 0 .6.1.8.3.5.9.5 1.4.5 1.7 0 4.8 0 6.4.3.3 0 .6.2.8.3 1 .5 1.5 1.3 2.1 2.5.7 1.5 1.1 7.9-.3 8.7-1 .6-13.4 1-16.9.8-.3 0-2.3-.5-2.6-.6-1-.5-.6-6.5 0-7.4 1.2-2.5 6.3-4.4 9-5.2" class="cls-9"/><circle cx="35.5" cy="69.2" r="1.9" class="cls-10"/><path d="M32.8 84.7c0 1 .8 1.9 1.9 1.9s1.9-.8 1.9-1.9-.8-1.9-1.9-1.9-1.9.8-1.9 1.9Zm-.4 16.9c0 1 .8 1.9 1.9 1.9s1.9-.8 1.9-1.9-.8-1.9-1.9-1.9-1.9.8-1.9 1.9ZM47 6.3c-.7-.3-1.3-.8-1.4-1.6 0-.3 0-.7.2-1.1.2-.6 1-.9 1.7-.9s1.3.2 1.9.5c-.5-2.3 2-3 2.9-.9.8-1 1.3-2.3 3.3-1.5 1.7.8 1.1 1.9 1 2.6 1-.4 2.3.1 2.7 1s-.1 2.2-1.1 2.6c.8.3 1.4 1.1 1.4 2s-1.4 1.3-2.3 1c0 .7-.3 2-.9 2.4s-1.6-.4-2.2-.7c0 .2-.1.3-.2.4-.7 1.5-1.8.8-2.4-.1" class="cls-10"/><path d="M51.7 12s0-.2.1-.3c.3-1-.1-2.3-.7-3.2-.3-.4-.6-.8-1-1.2-.7-.6-1.5-.9-2.3-1.1H47c-.6.4 0 1.4-.6 1.9 1.9.9 2.9 2.6 3.4 4.5.8 0 1.6 0 2-.7Zm-31.3-.3c-.2 1.1-.7 2-2.3 1.8-.6 0-1.1-.7-1.3-1.2s0-1.2 0-1.8c-2.1 1-3.3-1.1-1.5-2.4-1.1-.4-2.5-.6-2.2-2.5.4-1.6 1.6-1.4 2.3-1.5-.6-.8-.4-2 .4-2.6s2.1-.4 2.7.4c.2-.8.8-1.5 1.6-1.6s1.5.9 1.5 1.7c.6-.2 2-.2 2.5.2.4.5 0 1.5-.2 2 1.6.1 1.8.8 1.4 1.5-.2.3-.5.7-.8 1" class="cls-10"/><path d="M24.1 6.8c-.9.1-1.7.7-2.3 1.2-.9.9-1.4 2.1-1.4 3.3v.3c0 .1 0 .3.2.3.5.4 1.3-.3 1.8 0 .5-1.8 1.8-3 3.5-3.8-.2-.8-.5-1.5-1.4-1.5H24Z" class="cls-10"/><path d="M32 11c-.5-2.4 0-4.9 1.4-7q0 0 0 0" class="cls-9"/></svg>')}`;
export default image;