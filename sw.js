// Çevrimdışı kullanım: önce internetten güncel dosya, internet yoksa saklanan kopya.
const SURUM = "v1";
const CACHE = "tip-ogrenme-" + SURUM;
const ZORUNLU = ["./", "index.html", "style.css", "data.js", "icerik-apandisit.js", "depo.js", "calisma.js", "app.js"];
const ISTEGE_BAGLI = ["manifest.json", "icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ZORUNLU.map(u => new Request(u, { cache: "reload" })))
        .then(() => Promise.all(ISTEGE_BAGLI.map(u => c.add(new Request(u, { cache: "reload" })).catch(() => {})))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(adlar => Promise.all(adlar.filter(a => a.startsWith("tip-ogrenme-") && a !== CACHE).map(a => caches.delete(a))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const istek = e.request;
  if (istek.method !== "GET" || new URL(istek.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(istek, { cache: "no-cache" })
      .then(yanit => {
        if (yanit.ok) {
          const kopya = yanit.clone();
          caches.open(CACHE).then(c => c.put(istek, kopya));
        }
        return yanit;
      })
      .catch(() => caches.match(istek, { ignoreSearch: true }).then(b => b || caches.match("index.html")))
  );
});