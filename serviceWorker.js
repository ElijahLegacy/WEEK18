var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/icon-store-32.png',
    'images/icon-store-512.png',
]

// self refers to the browser window object
// caches is a special cache storage object for service worker to save data
// addOn allows the data to be sen tin chace storage in application
// self.addEventListener('install', (e) => {
    // console.log('[Service Worker] Install');
    // e.WaitUntil(
        // caches.open(cacheName).then((cache) => {
            // console.log('[Service Worker] Caching all the files...');
           //  return cache.addAll(cacheFiles);
       // })
  //  );
//});

// self.addEventListener('fetch ', function (e) {
   // e.respondWith(
      //  caches.match(e.request).then(function (r) {
      //      console.log('[Service Worker] Caching all the files...'
      //      + e.request.url);
    //    })
  //  );
//});

self.addEventListener('fetch ', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});