/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Asia" width="88" height="126" viewBox="0 0 88 126"><defs><style>.cls-1{fill:#010101}.cls-1,.cls-2,.cls-5,.cls-7{stroke-width:0}.cls-2{fill:#2e2e2e}.cls-8{stroke-linejoin:round}.cls-10,.cls-8,.cls-9{fill:none;stroke:#000;stroke-width:.6px}.cls-10,.cls-8{stroke-linecap:round}.cls-10,.cls-9{stroke-miterlimit:10}.cls-5{fill:#bdcae8}.cls-7{fill:#7d584d}</style></defs><path d="m76.8 7 2.7 3.8c0 .3.2.8.5 1.3-.4.6-1.1.6-1.9.6-.4-1.8-1.2-3.4-2.9-4.4.5-.4 0-1.4.6-1.7.3.2.6.3 1 .4" class="cls-5"/><path d="M79.5 10.8 76.8 7c-.3-.1-.7-.2-1-.4.2-.1.5 0 .8 0 .8.2 1.5.6 2.1 1.1.4.3.7.7.9 1.1.5.8.8 2 .5 3 0 .1 0 .2-.1.3-.3-.5-.5-1-.5-1.3" class="cls-5"/><path d="M70.5 26.2c.7 0 1.3 1.2 1.2 2.7 0 1.5-.7 2.6-1.4 2.6s-1.3-1.3-1.2-2.7c0-1.5.7-2.6 1.4-2.6" class="cls-1"/><path d="M57.3 40.2c3.6 1.8 11 .3 11.7-.4-1.6 2.3-1.6 1.8-2.9 2.6-1.4.8-3.5 1.3-4.9 1.1-2.2-.4-3.1-1.4-4-3.3Z" style="stroke-width:0;fill:#fff"/><path d="M55.4 30.5c-.6 0-1.1-1.1-1-2.4 0-1.3.6-2.4 1.2-2.3s1.1 1.1 1 2.4c0 1.3-.6 2.4-1.2 2.3" class="cls-1"/><path d="M51.1 11c.8-1.7 1.8-3.2 3-4.3.2 0 .5-.2.8-.5.9 0 1.1.8 1.3 1.5-1.6.7-2.9 1.7-3.4 3.4-.5-.3-1.3.2-1.7-.1m3.4-4.8h.3c-.3.2-.6.4-.8.5.1-.2.3-.3.5-.4Z" class="cls-5"/><path d="M50.9 10.6c0-.3 0-.5.1-.8l3-3.2c-1.1 1.1-2.1 2.6-3 4.3 0 0-.1-.2-.2-.3Z" class="cls-5"/><path d="M50.9 10.3c0-1.1.5-2.3 1.4-3 .6-.5 1.4-.9 2.2-1-.2.1-.3.3-.5.4l-3 3.2c0 .3 0 .5-.1.8v-.3Zm17.9 37c1.1-.5 2.6-2.5 4-2.4.7 0 1.3.5 1.9 1.8s1.3 2.4 2 3.4c-1.3.1-1.9.2-3.1-.3-1.6-1-3.3-1.8-4.9-2.4" class="cls-5"/><path d="M77.9 51.9c-.4-.6-.8-1.2-1.1-1.8-1.3.1-1.9.2-3.1-.3-1.6-1-3.3-1.8-5-2.4-2.4-.9-7.3-2-13.7-4.8-2-.9-4.2-1.9-6.4-3.2-2.5 3.7-4.1 7.5-4 12l-.4.2c-3.2-2.4-6.5-4.9-9.2-7.2-.9.6-1.2 1.5-1.2 2.5.6.5 1.1 1 1.5 1.3 2.2 1.8 14.1 13.2 15.1 13.6-.7 6.8-.3 15.8-.3 16.7 1.2 1.3 2.4 2.7 3.6 4.1.6.6 1.1 1.3 1.7 1.9.5.5.9 1.1 1.4 1.6l4.5 5.1c7.5 8.4 14.5 16.3 16.8 18.4 0-6.2 2.1-53.6-.3-57.8Z" style="stroke-width:0;fill:#8ea3d3"/><path d="M86.3 7.8c.9-.3 1.5-1.4 1.1-2.3-.3-.9-1.5-1.4-2.5-1.1 0-.6.7-1.7-.9-2.5-1.9-.8-2.4.4-3.1 1.3-.8-2-3.2-1.5-2.8.7-.5-.3-1.1-.6-1.8-.6-.6 0-1.3.3-1.6.8-.2.4-.2.7-.2 1-3.3-1.4-7.2-1.9-11.3-1.1H63s-4.4-.3-6.5.7c-.3.2-.7.3-1 .6.4-.6.3-1.3-1.2-1.5v-.2c-3 .8-7.9 1.5-9.8 2.5.4.4 1 .6 1.6.9-1.8 1.1-.7 3.1 1.3 2.3-.2.5-.3 1.1-.1 1.7.1.5.5 1.1 1.1 1.2 1.5.2 2-.6 2.2-1.6v-.3c0-1.1.5-2.3 1.4-3 .6-.5 1.4-.9 2.2-1h.3c.1 0 0 0 0 0 .9 0 1.1.8 1.3 1.5-1.6.7-2.9 1.7-3.4 3.4-.5-.3-1.3.2-1.7-.1-2 4.1-2.9 9.6-1.8 14.7 0 0 .2 0 .2.1h.8v-2.3c.3-6.8 6.7-12.5 11.5-13h.5c3-.2 19.4 5.7 18.4 16.6.9-.1 1.5 0 2 .1h.3c1.5-6.5 1.5-10.9-.5-14.9 0-.1.1-.2.2-.4.5.4 1.4 1 2 .8.6-.3.9-1.5.9-2.2.8.2 2 0 2.1-.9 0-.8-.5-1.5-1.2-1.9Zm-8.1 4.9c-.4-1.8-1.2-3.4-2.9-4.4.5-.4 0-1.4.6-1.7.2-.1.5 0 .8 0 .8.2 1.5.6 2.1 1.1.4.3.7.7.9 1.1.5.8.8 2 .5 3 0 .1 0 .2-.1.3-.4.6-1.1.6-1.9.6" class="cls-2"/><path d="M72.8 20.4c-1.2-.4-5.1-.6-4.6 1.3.1.4.5.8 1 .9.5 0 1.7-.2 2.2-.2 1.3 0 2.2.2 3.6.4.4 0 .7-.2.5-.6-.3-.6-1.1-1.4-2.6-1.8Zm-15-.4c-1.4-.7-3.1 0-4.2.9-.2.1-.3.3-.4.5v.6c.1.2.4.2.6.2s3.3.4 3.7.4c.6 0 1.1-.5 1.1-1.1s-.4-1.1-1-1.4ZM51.1 0c-.4 0-.8.3-1.1.6h2.1c-.2-.4-.6-.7-1-.6" class="cls-2"/><path d="M51.2 120.7c-3.5-3.2-9-16.2-10.6-20.6-.1-.2-.2-.5-.3-.7-.7-1.5-1.6-3.3-2.4-5.1 6.3-1.7 12.7-6.1 15.9-11.7.6.6 1.1 1.3 1.7 1.9.5.5.9 1.1 1.4 1.6l4.5 5.1c7.5 8.4 14.5 16.3 16.8 18.4-.6 2.4-.7 4.9-1.7 7.2-1.2 2.9-3.2 6.1-6.8 7.3-5.6 1.9-14.2 1.2-18.4-3.4Z" class="cls-5"/><path d="M82.6 27.3c-.5-.2-1.1-.3-2-.1 1.1-10.9-15.3-16.8-18.4-16.6h-.5c-4.8.4-11.3 6.1-11.5 13v2.3h-.8s-.1-.1-.2-.1c-.3 0-.7 0-.9.4-.3.3-.4.8-.5 1.2-.3 1.8 0 3.7.5 5.4.2.5.4 1 .8 1.4s.9.7 1.4.7l.4.3c.5 2.2 1.5 4.6 3.3 6.7.8.9.3.4.7.8 6.3 2.8 11.2 3.9 13.7 4.8 1.1-.3 2.7-2.6 4.2-2.5 1.1-.9 2.3-2 3.8-3.4 1.5-1.9 2-2.8 2.6-4.8 1.9-.3 3.1-2 3.8-4.2.6-1.8 1.2-4.4-.7-5.1Zm-28.7-5.2c-.2 0-.5 0-.6-.2q-.15-.3 0-.6c0-.2.2-.3.4-.5 1.1-.9 2.8-1.6 4.2-.9.5.3 1 .8 1 1.4s-.5 1.1-1.1 1.1c-.5 0-3.5-.5-3.7-.4Zm1.5 8.4c-.6 0-1.1-1.1-1-2.4 0-1.3.6-2.4 1.2-2.3s1.1 1.1 1 2.4c0 1.3-.6 2.4-1.2 2.3m10.8 11.9c-1.4.8-3.5 1.3-4.9 1.1-2.2-.4-3.1-1.4-4-3.3 3.6 1.8 11 .3 11.7-.4-1.6 2.3-1.6 1.8-2.9 2.6Zm4.1-10.8c-.7 0-1.3-1.3-1.2-2.7 0-1.5.7-2.6 1.4-2.6s1.3 1.2 1.2 2.7c0 1.5-.7 2.6-1.4 2.6m4.6-8.8c-1.4-.2-2.3-.4-3.6-.4-.5 0-1.7.2-2.2.2s-.9-.4-1-.9c-.5-1.9 3.5-1.7 4.6-1.3 1.5.5 2.4 1.2 2.6 1.8.2.4 0 .7-.5.6ZM50.2 78.5c-5.9-6.6-10.4-11.7-10.8-11.8-1.8-1.3-5.9-2.2-10.3 0-3 1.5-5.8 17.6-5.8 23.9s0 16.2-.7 20.6c0 .6-.2 1.1-.3 1.5 1.3 1.2 3.5 2.4 5.2 2.9s4.5-1.2 5.3-1.6c.6-9.1 5-18.9 4.4-20.2h.3c.1.1.2.4.3.6 6.3-1.7 12.7-6.1 15.9-11.7-1.3-1.4-2.5-2.8-3.6-4.1Z" class="cls-7"/><path d="M33.8 46.9c0-1 .3-1.9 1.2-2.5 2.7 2.4 6 4.8 9.2 7.2l.4-.2c0-4.5 1.5-8.3 4-12-3.4-1.9-7-4.3-10.7-7.3 1.4-4.7 4.6-20.9 6.8-26.1 0 0 0 .1.1.2 1.9-1 6.7-1.7 9.8-2.5.8-.2 1.4-.4 1.9-.6.6-.3 1.4-2.2.9-2.2-1.3 0-3.1-.2-5.1-.2h-2.1c-2.9 0-6.1 0-9.2.2-2.4.2-2 2.5-2.4 4.6-1.8 5-5.8 13-8.2 20.1-.8-3.5-6.4-14.7-6.6-19.8 2.8-.6 7.4-1.6 8.5-4.5-.1-.8-15.9-.5-15.9 1.1 0 0-.4 2.9 0 4.3 1.8 6.5 3.7 19.7 6.6 27.7 1 2.9 7.4 9.4 10.9 12.6Z" class="cls-7"/><path d="M33.7 121.6c.4-1 .1-5.3-.9-7.6-.8.4-3.6 2.1-5.3 1.6s-3.9-1.7-5.2-2.9q.15-.6.3-1.5c-.8-4.8-1.5-3.8-2.2-1-.5 2-7.3 3.1-10.5 3.5-6.8 1.3-8.2 5.2-8.2 8.5h-.2c-.1.3-.2.5-.3.7-.2.8 0 1.3.5 2.1 6.1 1.5 11.4 1.3 22.1-.2 4.4-.6 7 .1 9.8-.5.4.1 0-2.7 0-2.7Z" style="stroke-width:0;fill:#383938"/><path d="M68.5 47.5h.2c1.4-.5 2.6-1.3 4.2-2.5 1.1-.9 2.3-2 3.8-3.4l.5-.5m-27-15.9v.6c0 .4.2.9.3 1.5 0 0-.6 3.6.4 7.8.5 2.2 1.5 4.6 3.3 6.7.8.9.3.4.7.8m-4.7-19v1.6m6.4 2.9c0 1.3-.6 2.4-1.2 2.3-.6 0-1.1-1.1-1-2.4 0-1.3.6-2.4 1.2-2.3s1.1 1.1 1 2.4m15.2.8c0 1.5-.7 2.6-1.4 2.6s-1.3-1.3-1.2-2.7c0-1.5.7-2.6 1.4-2.6s1.3 1.2 1.2 2.7m-13.6 5.7c.3 3.4 3.3 2.5 5.7 2.6m-6.6 3c3.6 1.8 11 .3 11.7-.4-1.6 2.3-1.6 1.8-2.9 2.6-1.4.8-3.5 1.3-4.9 1.1-2.2-.4-3.1-1.4-4-3.3Z" class="cls-8"/><path d="M79.9 34.9q-.3 1.05-.6 1.8c-.7 2-1.1 2.9-2.6 4.8-.2.2-.4.5-.6.8" class="cls-8"/><path d="M80.6 27.1c.9-.1 1.5 0 2 .1 1.8.7 1.3 3.4.7 5.1-.8 2.2-2 3.9-3.8 4.3M68.2 21.7c.1.4.5.8 1 .9s1.7-.2 2.2-.2c1.3 0 2.2.2 3.6.4.4 0 .7-.2.5-.6-.3-.6-1.1-1.4-2.6-1.8-1.2-.4-5.1-.6-4.6 1.3ZM57.8 20c.5.3 1 .8 1 1.4s-.5 1.1-1.1 1.1c-.5 0-3.5-.5-3.7-.4-.2 0-.5 0-.6-.2q-.15-.3 0-.6c0-.2.2-.3.4-.5 1.1-.9 2.8-1.6 4.2-.9Zm-7.9 6s-.6-.3-.7-.3c-.3 0-.7 0-.9.4-.3.3-.4.8-.5 1.2-.3 1.8 0 3.7.5 5.4.2.5.4 1 .8 1.4s.9.7 1.4.7m-.3-11.2v1.6h0c0 .2.1.6.3 1.5" class="cls-8"/><path d="M51.1 11c-2 4.1-2.9 9.6-1.8 14.7v.3M74.6 5.1C71.3 3.7 67.4 3.2 63.3 4h-.2s-4.4-.3-6.5.7c-.3.2-.7.3-1 .6m27.3 21.9c1.5-6.5 1.5-10.9-.5-14.9M50.2 23.6c.3-6.8 6.7-12.5 11.5-13h.5c3-.2 19.4 5.7 18.4 16.6" class="cls-8"/><path d="M75.9 6.6c-.7-.3-1.2-.8-1.2-1.5 0-.3 0-.6.2-1 .2-.6 1-.8 1.6-.8s1.2.3 1.8.6c-.4-2.1 2-2.7 2.8-.7.8-.9 1.3-2.1 3.1-1.3 1.5.8 1 1.8.9 2.5.9-.3 2.1.2 2.5 1.1s-.2 2-1.1 2.3c.7.4 1.3 1.1 1.2 1.9s-1.4 1.1-2.1.9c0 .6-.3 1.9-.9 2.2s-1.5-.4-2-.8c0 .1-.1.3-.2.4-.7 1.4-1.7.7-2.3-.2" class="cls-9"/><path d="M80 12.1s0-.2.1-.3c.3-.9 0-2.1-.5-3-.2-.4-.5-.8-.9-1.1-.6-.5-1.3-.9-2.1-1.1h-.8c-.5.3-.1 1.3-.6 1.7 1.8 1 2.6 2.6 2.9 4.4.7 0 1.5 0 1.9-.6ZM54.5 3.7v.2c1.5.2 1.6.8 1.2 1.5-.2.3-.5.6-.8.9M50 .6c.3-.3.6-.5 1.1-.6.4 0 .8.2 1 .6m-1.2 10c-.2 1-.8 1.8-2.2 1.6-.6 0-1-.6-1.1-1.2-.1-.5 0-1.1.1-1.7-2 .8-3-1.1-1.3-2.3-.6-.3-1.3-.4-1.6-.9" class="cls-9"/><path d="M54.5 6.2c-.8.1-1.6.6-2.2 1-.9.8-1.4 1.9-1.4 3v.3c0 .1 0 .2.2.3.4.4 1.2-.2 1.7.1.5-1.7 1.8-2.7 3.4-3.4-.2-.7-.4-1.4-1.3-1.5h-.3Z" class="cls-9"/><path d="M61.7 10.5c-.3-2.2.3-4.6 1.6-6.4q0 0 0 0" class="cls-8"/><path d="M50.2 78.5c-5.9-6.6-10.4-11.7-10.8-11.8m38.8 43c-2.2-2.1-9.3-10-16.8-18.4l-4.5-5.1c-.5-.5-.9-1.1-1.4-1.6-.6-.6-1.1-1.3-1.7-1.9-1.3-1.4-2.5-2.8-3.6-4.1m28 31.1c-.6 2.4-.7 4.9-1.7 7.2-1.2 2.9-3.2 6.1-6.8 7.3-5.6 1.9-14.2 1.2-18.4-3.4-.1-.1-.2-.3-.3-.4h0m-13.1-26c.8 1.8 1.7 3.5 2.4 5.1.1.2.2.5.3.7 0 .2.2.4.3.5m-6.1-15c.4 2.5 1.5 5.3 2.7 8 .1.2.2.5.3.7" class="cls-10"/><path d="M51.2 120.7c-3.5-3.2-9-16.2-10.6-20.6m13.2-17.5c-3.3 5.7-9.6 10.1-15.9 11.7h0" class="cls-10"/><path d="M68.6 47.4c1.1-.3 2.7-2.6 4.2-2.5.7 0 1.3.5 1.9 1.7.6 1.3 1.3 2.4 2 3.5.4.6.8 1.2 1.1 1.8 2.4 4.1.3 51.5.3 57.8" class="cls-8"/><path d="M68.6 47.4s0 0 0 0c1.7.7 3.4 1.5 4.9 2.4m-22.2 6.9c-.4 1.3-.7 3.1-.9 5.1-.7 6.8-.3 15.8-.3 16.7h0M28.3 37.2c.9 1.9 3.4 4.5 6.7 7.3 2.7 2.4 6 4.8 9.2 7.2 2.5 1.8 4.9 3.5 7.2 5 1.3.9 2.5 1.7 3.7 2.4 3.3 2.1 5.5 3.5 5.8 3.4m7.7-15.1c-2.4-.9-7.3-2-13.7-4.8-2-.9-4.2-1.9-6.4-3.2-3.4-1.9-7-4.3-10.7-7.3l-.9.9" class="cls-8"/><path d="M44.6 6.1c-2.2 5.2-5.4 21.4-6.8 26.1m.7-27.1v.3c-1.8 5-5.8 13-8.2 20.1-1.6 4.7-2.6 8.9-1.8 11.7" class="cls-8"/><path d="M50.4 61.8c-1-.4-12.9-11.8-15.1-13.6-.4-.3-.9-.8-1.5-1.3-3.6-3.2-9.9-9.8-10.9-12.6-2.9-8-4.8-21.2-6.6-27.7-.4-1.4 0-4.3 0-4.3C16.3.7 32 .4 32.2 1.2 31 4 26.5 5.1 23.7 5.7" class="cls-8"/><path d="M30.2 25.5s0 0 0 0c-.8-3.5-6.4-14.7-6.6-19.8m15.7 61c-1.8-1.3-5.9-2.2-10.3 0-3 1.5-5.8 17.6-5.8 23.9m25.3-51.2c-2.5 3.7-4.1 7.5-4 12m-9.5-7c-.9.6-1.2 1.5-1.2 2.5m4.5-41.1v-.4c.4-2.1 0-4.4 2.4-4.6C43.8.6 47 .5 49.9.6H52c2.1 0 3.8.1 5.1.2.5 0-.2 1.9-.9 2.2-.5.2-1.1.4-1.9.6-3 .8-7.9 1.5-9.8 2.5 0 0-.1 0-.2.1M13.7 115h.1m-3.6 8.5v.2m-.1-8h.1m-8.7 7.2h.4m20.4-10.2c1.3 1.2 3.5 2.4 5.2 2.9s4.5-1.2 5.3-1.6c.6-9.1 5-18.9 4.4-20.2m-13.9-3.2c0 8 0 16.2-.7 20.6 0 .6-.2 1.1-.3 1.5m10.6 1.3c1 2.3 1.3 6.6.9 7.6m-.1 0c-.5 0-6.1.3-11.2.9-5.2.5-8.4 1.3-12.4 1.3-2.3 0-4.9-.2-8.3-.9m20.5-10.2c-1.6.9-7.5 2.2-12.1 3" class="cls-8"/><path d="M1.8 122.5v-.4c0-3.3 1.4-7.1 8.2-8.5 0 0 0 .8.1 2 .1 2.2.3 5.7 0 7.8" class="cls-8"/><path d="M22.6 111.3v-.1c-.8-4.8-1.5-3.8-2.2-1-.5 2-7.3 3.1-10.5 3.5m-8.1 11.2c6.1 1.5 11.4 1.3 22.1-.2 4.4-.6 7 .1 9.8-.5.4.1 0-2.7 0-2.7m-32.2.6c-.1.3-.2.5-.3.7-.2.8 0 1.3.5 2.1m75.1-74.8c-1.3.1-1.9.2-3.1-.3" class="cls-8"/><path d="M55 58.9v.2c-.8 7.8 0 18.3.5 25.5m1.3-23.3c-.3.3-.4.8-.5 1.2-.3 2.4-.2 4.8.4 7.2.2.6.4 1.3.8 1.8s1 .8 1.6.6c.9-.3 1.2-1.5 1.3-2.5.2-1.6.9-5.6.1-7.1 0 0-2.8-2-3.7-1.2Zm-5.6-2.2c-.1.3-.2.8-.2 1.2-.2 2.4-.1 4.8.2 7.2 0 .6.2 1.3.4 1.8s.5.8.8.6c.4-.3.6-1.5.6-2.5 0-1.6.5-5.6 0-7.1 0 0-1.4-2-1.8-1.2ZM57 86.6v-.5c-.2-1.5-.2-2.7.4-2.8.8-.2 5 .9 5.3 1.7.2.6.2 1.2.2 1.8-.1 1.5-.4 3.2-1.3 4.3" class="cls-9"/></svg>')}`;
export default image;