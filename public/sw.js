const CACHE_NAME = 'esim-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// THIẾT LẬP HÀNG ĐỢI (MESSAGE QUEUE) ĐỂ RETRY API
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-esim-vendor') {
    event.waitUntil(retryVendorAPI());
  }
});

async function retryVendorAPI() {
  console.log('[Service Worker] Đang thực hiện Retry gọi API sang Vendor lấy mã QR...');
  // Giả lập logic lấy từ IndexedDB các request bị fail và gọi lại
  // Nếu gọi thành công thì xóa khỏi DB
  // Nếu fail tiếp thì throw error để trình duyệt tự động retry lại sau
}
