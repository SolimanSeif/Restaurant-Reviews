
const cacheName = 'RestaurantReviews';


self.addEventListener('install', function(event) {

	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			return cache.addAll(['/index.html', '/restaurant.html',
				'/styles/ResponsiveDesign.css', '/styles/RestaurantsResponsiveDesign.css','/styles/styles.css',
				'/scripts/dbhelper.js','/scripts/main.js','/scripts/restaurant_info.js','/scripts/sw.js', '/scripts/idb.js'
				]);
		})
	);
	console.log('installation completed..');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating...');  
});

self.addEventListener('fetch', function(event) {
	console.log('Start retriving data from caching......' + event);
	
	var requestURL = new URL(event.request.url);
	if(requestURL.origin === location.origin){
		if(requestURL.pathname === '/'){
			event.respondWith(caches.match('index.html'));
			return;
		}
	}
	
	event.respondWith(
		caches.open(cacheName).then(function(cache) {
			return cache.match(event.request).then(function (response) {
				return response || fetch(event.request).then(function(response) {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});