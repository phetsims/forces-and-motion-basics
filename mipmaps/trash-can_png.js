/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const mipmaps = [
  {
    "width": 68,
    "height": 125,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 34,
    "height": 63,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 17,
    "height": 32,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAgCAYAAAD0S5PyAAAAAklEQVR4AewaftIAAASpSURBVJ3Bz4tdZxnA8e/zvOc959ybtPPjzh2miUlsAy3UuvIPcO1O/QOE4lLt0m504cYKghBEsIgIgtWCu4q4MCuXUkOThkC1yUzaC8l05t65c8/P95zzvp6T3MiYFBd+PsL/8Ovf/PYusA0E4Bfffv1bP+BzGJ7y9W988/Xvfu+N7+y9cOGNJEm+cnj4MJ0fz9PbH96abG5tvWqMnl8sFrc5Q3gs/cO77/5cRb+mUXRxMV/QNC2IcHx0xPjcOR48eECWrcizjNVqNdvd3f3b79/53Y9PT5e3BHjtvff+9MfpdPrKKstou47ZpzMiazlZnFBWFVVVkq0yFicLnHPENmZjY4PtyfaJivzU3Lhx4++vfum1q9bGxHGMipKOxqgqJoowxgCCGoONIkSFyEbs7b3A5ctX0ufOP/fVaHNz88PZbHa5bVuyLCfPc7I8J88L8jyjyAvyIqfIC/KioMgzrLXUdUVZlrRte8dcu3btnTff/P4PJ5OJ2jjGxjHWWqLIoGpQVUAYhBDwwbO1ucnFL1zi0qVL/OrtX/5I6cVxnPF/unPn9kFEr67r4q9//svGiy9+kQ9u3mI6nbJYLDAmom0cVVVhVEliy+TKFfIswxhlPj/m8PDwvtLb3z9oHh5+xmw2w9qYw4cP2d7eZn58xN7eHiIw2dlhurPD1ZeukiYJr7z8Mlm2ojdTHgmha1uapmGQpilnNc6hqgQCCJRlgagiogWwUHrT6W7edi0gPCI8JsLAe4+IsDhZYK2lKEsGqpLTU3obG89nqoqqEEJARBkYYzjL1Y5B13UMiqKs6Sm9EEJprSUdjejalrZpGIgIg7brOKssK6qypK7qjp7Sm88XTZqmJHFC5z0iwlkhBAarLGcQfGC1ykiSpKSn9JbLZbe5sUEIEEIgiiI+j/eeQec9ZVmyPZks6UX0xuNzR2maggSMUUxkCAEIPMM5h40tPni8DyW9iN7m5vNLExkGIkqaprRtg4kMg8Y5bBRRVRV5XmDU4L1nuTxt6Sm9/f2D0kYRBFARRIQnAmsiiAjOOYwx1LXDubqgp/Ru3vygHZ8bg4CNLXGc4L0nSRK6tuWJrutomwYTGbz3pOloTk/pffTRP0/SJKVxDXEckyQxwQee1rUtbdcRvGcQgl/SU3off/yvT1QVNUpsLSEEBiLCswKIEEJg/969mp7Su379+v0QPMYYVA0iiqhgo4gn2rbFRBG+8xhjgMDde3crespj98uyQkQR4RkByPOM2Fq89wxc7fj0k/t36SmPHRACIiAijEYjRIT/CIFBAMqyZOCD5x/vv79PT1mz1p6O0hFVVaGqCP+tbTuMGjrfIUBZFPT26Slr4/G4SpIE1zhEIADnz5/De8/AOYe1lq7r8CFQ1XUADugpa1EUOWstIYAgiAij0ZgQAmd57xkIcsqashZFUde2LSrC05q2JXjPIwFUFR98wZqy5r2vVQUERITYWs4KBAbeewZVVTnWlLUkTVYhBC5cuEiWZ/gQyIuCo6Njtra2OF2eggjH82OqqoIQAmsRaz95662fTXZ2vuxqR+0cde1wrqauHc7VOOdwzuGcY3e6y3S6+xlr/wY+YVPBTsQwXwAAAABJRU5ErkJggg=="
  },
  {
    "width": 9,
    "height": 16,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAAAAklEQVR4AewaftIAAAGuSURBVC3BvW7TUBiA4fecHNuxo7q0KBJtuYIysnExjEhMDLCxA3eACox0L0sEl0AFEqhVJ5qxLUI4SfNnH/t8HycSz2P479XrN4+N7T1xLnk4vvz14cvn0bvxeHxGZE5OPr3I8/zZ38nk/mx6SzWZcHN9zWRSNfv7B9+3t8uX7vDB4fPlcn1PMHjfkSwW9Pt98qLI9g8OHg0Gg6c2S9NvO7t3KMuSwaAgyzJckpDnOcPhkPdHb49cVVXzHz/PmC8WoKAS2C5L7u7uoCqcnn69sE1UVRUoYMA5R5qlZFlGURQ1cGP39vamLkkQEay1iCree0IItN43RPbq6rouyxIRYUNVadsWEWFdNzWRLYriT7+fkWYpqoqqoKr4tqXr2prInp+f36ZpSpamGGOQIIDBe896XddEdjQa/U6ShGJQsKGqqAghBEIIayJ7fPzxgqhnHa7XY6MLHapKU9c1kQUurTGdSxwYw0boAt57utAtiSxRuVWuQ9eR9/uICCJCCIHValUTWSJrbWeMwTmHiKCqoNC27YzIES1Xi1Pf+uF0OuN2Pmc6m9I0DeXW1iXRP26C6DeGfxegAAAAAElFTkSuQmCC"
  },
  {
    "width": 5,
    "height": 8,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAAAklEQVR4AewaftIAAACcSURBVA3BMQ6CMBgG0I/SkgAGBgfGGrmQu4sxnMPJ87hiTDwCl1BQUMJES4n9Qd5z8vx6fjzLXVm91k39vkspT3ybptmPpqT5fCHlZh/F8Y0XRdG1bZeswhBRHE3Z8XBhjsPMjBk0EchaA6BnnicM5xxEhF6pEQvGXHfwfR8TEQY9GCxYGARaCAFrCUorgwX3hKgxz7UZDbRSFRZ/zPNLc0muIPQAAAAASUVORK5CYII="
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = simLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;