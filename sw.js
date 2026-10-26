// Offline support: keeps the app, its fonts and the character art on the phone after the first visit.
const CACHE = "style-book-v2";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png"];
// Portraits and spouse-room photos. Each file is cached on its own, so one missing
// image can never break the install.
const ART = [
  "assets/img/portraits/abigail.webp",
  "assets/img/portraits/abigail-beach.webp",
  "assets/img/portraits/abigail-winter.webp",
  "assets/img/portraits/alex.webp",
  "assets/img/portraits/alex-beach.webp",
  "assets/img/portraits/alex-winter.webp",
  "assets/img/portraits/alissa.webp",
  "assets/img/portraits/anton.webp",
  "assets/img/portraits/blair.webp",
  "assets/img/portraits/bryle.webp",
  "assets/img/portraits/corine.webp",
  "assets/img/portraits/daia.webp",
  "assets/img/portraits/elliott.webp",
  "assets/img/portraits/elliott-beach.webp",
  "assets/img/portraits/elliott-winter.webp",
  "assets/img/portraits/emily.webp",
  "assets/img/portraits/emily-beach.webp",
  "assets/img/portraits/emily-winter.webp",
  "assets/img/portraits/faye.webp",
  "assets/img/portraits/flor.webp",
  "assets/img/portraits/haley.webp",
  "assets/img/portraits/haley-beach.webp",
  "assets/img/portraits/haley-winter.webp",
  "assets/img/portraits/harvey.webp",
  "assets/img/portraits/harvey-beach.webp",
  "assets/img/portraits/harvey-winter.webp",
  "assets/img/portraits/ian.webp",
  "assets/img/portraits/irene.webp",
  "assets/img/portraits/jeric.webp",
  "assets/img/portraits/jio.webp",
  "assets/img/portraits/june.webp",
  "assets/img/portraits/kenneth.webp",
  "assets/img/portraits/kiarra.webp",
  "assets/img/portraits/krobus.webp",
  "assets/img/portraits/leah.webp",
  "assets/img/portraits/leah-beach.webp",
  "assets/img/portraits/leah-winter.webp",
  "assets/img/portraits/maddie.webp",
  "assets/img/portraits/maru.webp",
  "assets/img/portraits/maru-beach.webp",
  "assets/img/portraits/maru-winter.webp",
  "assets/img/portraits/paula.webp",
  "assets/img/portraits/penny.webp",
  "assets/img/portraits/penny-beach.webp",
  "assets/img/portraits/penny-winter.webp",
  "assets/img/portraits/philip.webp",
  "assets/img/portraits/sam.webp",
  "assets/img/portraits/sam-beach.webp",
  "assets/img/portraits/sam-winter.webp",
  "assets/img/portraits/sean.webp",
  "assets/img/portraits/sebastian.webp",
  "assets/img/portraits/sebastian-beach.webp",
  "assets/img/portraits/sebastian-winter.webp",
  "assets/img/portraits/shane.webp",
  "assets/img/portraits/shane-beach.webp",
  "assets/img/portraits/shane-winter.webp",
  "assets/img/portraits/shiro.webp",
  "assets/img/portraits/ysabelle.webp",
  "assets/img/portraits/zayne.webp",
  "assets/img/rooms/abigail.webp",
  "assets/img/rooms/alex.webp",
  "assets/img/rooms/alissa.webp",
  "assets/img/rooms/anton.webp",
  "assets/img/rooms/corine.webp",
  "assets/img/rooms/daia.webp",
  "assets/img/rooms/elliott.webp",
  "assets/img/rooms/emily.webp",
  "assets/img/rooms/flor.webp",
  "assets/img/rooms/haley.webp",
  "assets/img/rooms/harvey.webp",
  "assets/img/rooms/ian.webp",
  "assets/img/rooms/jeric.webp",
  "assets/img/rooms/jio.webp",
  "assets/img/rooms/june.webp",
  "assets/img/rooms/kenneth.webp",
  "assets/img/rooms/leah.webp",
  "assets/img/rooms/maddie.webp",
  "assets/img/rooms/maru.webp",
  "assets/img/rooms/penny.webp",
  "assets/img/rooms/philip.webp",
  "assets/img/rooms/sam.webp",
  "assets/img/rooms/sean.webp",
  "assets/img/rooms/sebastian.webp",
  "assets/img/rooms/shane.webp",
  "assets/img/rooms/shiro.webp",
  "assets/img/rooms/ysabelle.webp"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => Promise.all([...CORE, ...ART].map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // The page itself: try the network first so updates arrive, fall back to the saved copy offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { caches.open(CACHE).then(c => c.put("./index.html", r.clone())); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Everything else (icons, art, Google Fonts): saved copy first, then network.
  if (url.origin === location.origin || url.hostname.endsWith("googleapis.com") || url.hostname.endsWith("gstatic.com")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return r;
    })));
  }
});