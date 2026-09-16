var CACHE = "scout-v21-c24-20260916";
var ASSETS = [
  "./", "./index.html", "./manifest.webmanifest", "./css/app.css",
  "./js/data.js", "./js/interests.js", "./js/ceremony.js", "./js/uniform.js", "./js/diagrams.js", "./js/svg-kit.js", "./js/songs.js",
  "./js/figs.js",
  "./img/fig/cer-open.avif", "./img/fig/cer-close.avif", "./img/fig/cer-drill.avif",
  "./img/fig/cer-flag.avif", "./img/fig/cer-oath.avif", "./img/fig/cer-salute.avif",
  "./img/fig/fire-circle.avif", "./img/fig/fire-song.avif", "./img/fig/game-banner.avif",
  "./js/c01-lesson.js", "./js/c02-lesson.js", "./js/c03-lesson.js", "./js/c04-lesson.js", "./js/c05-lesson.js", "./js/c06-lesson.js", "./js/c07-lesson.js", "./js/c08-lesson.js", "./js/c09-lesson.js", "./js/c10-lesson.js", "./js/c11-lesson.js", "./js/c12-lesson.js", "./js/c13-lesson.js", "./js/c14-lesson.js", "./js/c15-lesson.js", "./js/c16-lesson.js", "./js/c17-lesson.js", "./js/c18-lesson.js", "./js/c19-lesson.js", "./js/c20-lesson.js", "./js/c21-lesson.js", "./js/c22-lesson.js", "./js/c23-lesson.js", "./js/c24-lesson.js", "./js/app.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png"
];
var EXTERNAL_PREFIX = "https://";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* 逐個 add：其中一張圖 missing 都唔好拖冧晒核心檔案嘅預緩存 */
      return Promise.all(ASSETS.map(function (a) {
        return c.add(a).catch(function(){ return Promise.resolve(); });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then(function (cached) {
      var net = fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { try { c.put(req, copy); } catch (_) {} });
        return res;
      }).catch(function(){ return cached || caches.match("./index.html"); });
      return cached || net;
    })
  );
});
