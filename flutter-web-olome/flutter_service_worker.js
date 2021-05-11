'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "manifest.json": "2ee6405651c0d0286b63c53b14ac74dd",
"main.dart.js": "7f2db8fb5cda6ef2a9d117d86a26a21d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"version.json": "4e7e1e841e03bb22fe9b0ad2a3413654",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"index.html": "26c67c4713b2246cae12cf2d561fad6d",
"/": "26c67c4713b2246cae12cf2d561fad6d",
"assets/AssetManifest.json": "a143dfa38e6e9d90a1007cebbcc143cc",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/assets/images/olome_white.jpg": "97f1cb4f9918fd605f0df14611cb8f04",
"assets/assets/images/olome_icon_orange_dot_white_bg.png": "4290ea3504fa1564ad94de67327019bb",
"assets/assets/images/unauthorizedCompany.png": "e1298abdfc9ceb3bd30db0cf151bb353",
"assets/assets/images/not_found.svg": "5860a7518247a1c931dfd132b93e31f2",
"assets/assets/icons/dependency.svg": "35f737aa03446fb03e4d1c28be36ca84",
"assets/assets/icons/filters.svg": "b212ff6e39707e2b7e7a04a7223891bd",
"assets/assets/icons/csv.svg": "349a3112d6607e067e5032c8e184ae3c",
"assets/assets/icons/odt.svg": "32f6f1d6e45b50b0292c9d4947b39066",
"assets/assets/icons/cut.svg": "82d42e5ffb0b8fffa0a50d4676e3904c",
"assets/assets/icons/component.svg": "2d0376fa61aa9a1abbc076716f1d605f",
"assets/assets/icons/xls.svg": "d77eb68bf39e94e47901c40c1385f85f",
"assets/assets/icons/printQRCode.svg": "8d797b7595274255cf46528d6600cf05",
"assets/assets/icons/clone.svg": "fbcdfdb898c2dbf21e7e60bb9976304b",
"assets/assets/icons/menu/camera.svg": "e9becda534c859f3a40aefa08deecf86",
"assets/assets/icons/menu/news-filled.svg": "1b5988daba35624abaf29264f9785459",
"assets/assets/icons/menu/other.svg": "dd7e9018714fb0f939736c05d3205ea7",
"assets/assets/icons/menu/home.svg": "e13336aa2451f3cc96970a45313d73ad",
"assets/assets/icons/menu/inventory.svg": "80f89b9daac959af13af2273a27455ee",
"assets/assets/icons/menu/news.svg": "c699c6eb1676e78b40116bb4045c0bb7",
"assets/assets/icons/menu/trends-filled.svg": "95390ffac95a75777ee3deed4dff1a00",
"assets/assets/icons/menu/trends.svg": "982eaaef9368133605e843e4236be512",
"assets/assets/icons/menu/datas.svg": "68ade9cdb082f0d1fe4a24bb3ca3fbbd",
"assets/assets/icons/otherActions/archivedProducts.svg": "bb918a64c03b1cade21f11a2168ffe91",
"assets/assets/icons/otherActions/productTypes.svg": "b2dab6c897b6d901bd4c2ad9ae9bd267",
"assets/assets/icons/otherActions/textRecognition.svg": "19fb78507020c630a648c3ca5130e8c1",
"assets/assets/icons/ppt.svg": "26689c6fa66969d0dc97143b5dabcf93",
"assets/assets/icons/ops.svg": "76972d9fb8e83a11214e509e6ee747eb",
"assets/assets/icons/assembly.svg": "06e45e6fc49a401c65d57510004c0c62",
"assets/assets/icons/printSeveralQRCode.svg": "cbaa08a947b52477eed9d32480837724",
"assets/assets/icons/cutout.svg": "56d83292d921ca168f6a25f2c8af9621",
"assets/assets/icons/xlsx.svg": "b49e7a125394314fadc370536cfcd141",
"assets/assets/icons/ods.svg": "2218dad0fe14c833b114d4e8e94b038b",
"assets/assets/icons/pdf.svg": "0e8962eee89970bf990d06d10c5e354a",
"assets/assets/icons/doc.svg": "51609f497f2544fbb4ad1c4ed53a8fb2",
"assets/assets/icons/profile.svg": "3f0aeb0949df2de5e47c90ec7620c1d1",
"assets/assets/icons/olome_white.svg": "488f5cb6a0ce524154e644901b84de88",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "cf34a462e2933b51c285a2b8eed768d5"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
