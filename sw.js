/* Service worker mínimo: red primero, copia local como respaldo para la carcasa de la app */
const C='mototech-shell-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||e.request.mode!=='navigate')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(k=>k.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
