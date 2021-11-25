/* webPackSlot: 'precacheList' */
/* webPackSlot: 'precacheName' */
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(precacheName)
        await cache.addAll(precacheList)
        console.log(1)
    })())
})

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const cacheNames = await caches.keys()
        for (const cacheName of cacheNames) {
            if (cacheName !== precacheName && /^precache\-\d+$/.test(cacheName)) {
                await caches.delete(cacheName)
            }
        }
    })())
})

self.addEventListener('fetch', (event) => {
    
});
