const CACHE_NAME = 'pierrot'; // put here a cache name for your worker
const CACHE_DURATION = 7200; // implies that the page in cache expires after 7200 seconds (2 hours)

self.addEventListener('install', function (event) { // executed when a user lands on the website
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll([
        '/offline/', // we add the page located at the path $BASE_URL/offline/ in cache
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) { // executed when a user request a page on the website
  if (event.request.url.startsWith('chrome-extension://') || // excludes chrome extensions from being cached
    event.request.url.startsWith('http://localhost') // disable cache when developping locally
    ) { // disable cache on the CMS section
    return;
  }

  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        const headers = response.headers.get('date');
        if (headers) {
          const expirationDate = new Date(headers).getTime() + CACHE_DURATION * 1000;
          const now = new Date().getTime();
          if (now > expirationDate) {
            // if there is a page in cache, that match the requested page, but this page is expired
            // then fetch a new version of the page and return this page
            return fetchAndUpdateCache(event.request);
          }
        }
        // if there is a page in cache, not expired (or without a date header), then return this page
        return response;
      }

      // no such page in cache: fetch, cache and return the requested page
      return fetchAndUpdateCache(event.request);
    })
  );
});

function fetchAndUpdateCache(request) {
  return fetch(request)
    .then(function (networkResponse) {
      if (networkResponse && networkResponse.status === 200) {
        const clonedResponse = networkResponse.clone();
        
        // Add explicit cache-control header if missing
        const headers = new Headers(clonedResponse.headers);
        if (!headers.has('cache-control')) {
          headers.set('cache-control', `max-age=${CACHE_DURATION}`);
        }
        
        const responseWithHeaders = new Response(clonedResponse.body, {
          status: clonedResponse.status,
          statusText: clonedResponse.statusText,
          headers: headers
        });
        
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, responseWithHeaders);
        });
      }
      return networkResponse;
    })
    .catch(function () {
      return caches.match('/offline/');
    });
}

