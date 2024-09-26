// Import necessary modules from Workbox for implementing service worker strategies and functionalities
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache all the assets listed in the service worker's manifest
precacheAndRoute(self.__WB_MANIFEST);

// Create a cache strategy for pages using the CacheFirst strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name of the cache
  plugins: [
    // Plugin to ensure only successful responses (status 0 and 200) are cached
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Plugin to manage the expiration of cached entries
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Set cache entries to expire after 30 days
    }),
  ],
});

// Warm the strategy cache with specific URLs to ensure they're available in the cache when needed
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to pre-cache
  strategy: pageCache, // Use the pageCache strategy for these URLs
});

// Register a route to handle navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache images and styles using a separate CacheFirst strategy
registerRoute(
  // Define a route for caching requests that are either images or styles
  ({ request }) => request.destination === 'image' || request.destination === 'style',
  new CacheFirst({
    cacheName: 'asset-cache', // Name of the cache for assets
    plugins: [
      // Plugin to cache only successful responses (status 0 and 200)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);


