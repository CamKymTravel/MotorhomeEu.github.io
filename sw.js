const CACHE='kym-r24-1-lesley-1278-isolated-20261101';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./dedup_aliases.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>name.startsWith('kym-r')&&name!==CACHE).map(name=>caches.delete(name)))));self.clients.claim()});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(req);if(response.ok)await cache.put('./index.html',response.clone());return response}catch(err){const offline=await cache.match('./index.html');if(offline)return offline;throw err}})());return}
event.respondWith(caches.match(req).then(cached=>cached||fetch(req)))
});
