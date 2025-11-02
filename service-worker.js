// Simple PWA service worker for MiniCRM v2 (GitHub Pages-friendly relative paths)
const CACHE_NAME = "minicrm-v2-cache-v1";
const APP_SHELL = [
  "./index.html",
  "./styles.css",
  "./app.min.js",
  "./manifest.webmanifest"
  // optionally: "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(()=>{}));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))))
  );
  self.clients.claim();
});

// Network-first for navigations (SPA), cache-first for static assets
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // SPA navigations
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put("./index.html", clone)).catch(()=>{});
          return resp;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Static assets
  if (APP_SHELL.includes(url.pathname.replace(/^[^?]*\//, './'))) {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached || fetch(req).then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone)).catch(()=>{});
          return resp;
        })
      )
    );
    return;
  }
});
