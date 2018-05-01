'use strict';

// register service worker.
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceWorkerRegistration.js').then(function () {
		console.log('Registration Working..');
	}).catch(function (error) {
		console.log('Registration Failed..');
		console.log(error);
	});
} else {
	console.log('browser doesnt support service worker..');
}