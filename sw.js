if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let c={};const d=e=>n(e,s),f={module:{uri:s},exports:c,require:d};i[s]=Promise.all(o.map((e=>f[e]||d(e)))).then((e=>(r(...e),c)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Courgette-Regular-min-C2fLfKJK.woff2",revision:null},{url:"assets/index-BEVE8iHW.css",revision:null},{url:"assets/index-g6zQZBjD.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"favicon/android-chrome-192x192.png",revision:"ed89ed5ec69774e8cbe08c1e7e4fe87c"},{url:"favicon/android-chrome-512x512-maskable.png",revision:"85fb5f881d09dafed2370b6382ec5107"},{url:"favicon/android-chrome-512x512.png",revision:"52ca151f5bbfb9f52e601a20a2f4fecd"},{url:"favicon/apple-touch-icon.png",revision:"c178cc53ae097da35072f083fe7bad3d"},{url:"favicon/icon.svg",revision:"58b778e208a68491360b08c44c4439fe"},{url:"index.html",revision:"e120fe1ddccb2350934a4410e12ceee5"},{url:"favicon/android-chrome-192x192.png",revision:"ed89ed5ec69774e8cbe08c1e7e4fe87c"},{url:"favicon/android-chrome-512x512.png",revision:"52ca151f5bbfb9f52e601a20a2f4fecd"},{url:"favicon/android-chrome-512x512-maskable.png",revision:"85fb5f881d09dafed2370b6382ec5107"},{url:"manifest.webmanifest",revision:"50017d1d6947b0709919991f3a86a749"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
