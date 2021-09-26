const CACHE_NAME = 'fit-tracker'

const FILES = [
  '/index.html',
  '/favicon.png',
  '/global.css',
  '/images/icons/icon-32x32.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-256x256.png',
  '/images/icons/icon-512x512.png',
  '/build/bundle.css',
  '/build/bundle.js',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(FILES)
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(res => res))
})
