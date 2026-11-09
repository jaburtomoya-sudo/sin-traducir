const CACHE = "sin-traducir-v1";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "a-dont-understand.mp3", "a-excuse-me.mp3", "a-from-chile.mp3", "a-good-morning.mp3", "a-good-night.mp3", "a-hello.mp3", "a-help-me.mp3", "a-here-we-are.mp3", "a-how-are-you.mp3", "a-im-fine.mp3", "a-left-right.mp3", "a-luggage.mp3", "a-minutes.mp3", "a-music.mp3", "a-my-name.mp3", "a-nice-day.mp3", "a-nice-meet.mp3", "a-no-problem.mp3", "a-no-thanks.mp3", "a-p-ac.mp3", "a-p-airport.mp3", "a-p-bye.mp3", "a-p-fast.mp3", "a-p-from.mp3", "a-p-hi.mp3", "a-p-how.mp3", "a-p-long.mp3", "a-p-name.mp3", "a-p-nice.mp3", "a-p-place.mp3", "a-p-speak.mp3", "a-p-thanks.mp3", "a-p-thx.mp3", "a-p-water.mp3", "a-p-word.mp3", "a-repeat.mp3", "a-seatbelt.mp3", "a-see-you.mp3", "a-slowly.mp3", "a-sorry.mp3", "a-speak-little.mp3", "a-temperature.mp3", "a-test.mp3", "a-thank-you.mp3", "a-traffic.mp3", "a-what-mean.mp3", "a-where-from.mp3", "a-where-going.mp3", "a-yes-please.mp3"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin === location.origin && (url.pathname.endsWith("/") || url.pathname.endsWith("index.html"))) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); } return r; })));
});
