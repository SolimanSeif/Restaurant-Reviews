'use strict';

var idb_name = 'mws-restaurant-stage-1';
var objectStoreName = 'Restaurants';
var version = 1;

var allRestKey = 'allResturnats';

var getIDBObject = function getIDBObject() {
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open(idb_name, version);
	open.onupgradeneeded = function () {
		var db = open.result;
		var store = db.createObjectStore(objectStoreName);
	};
	return open;
};

var allResturnats = function allResturnats() {

	var open = getIDBObject();

	open.onsuccess = function () {
		var db = open.result;
		var tx = db.transaction(objectStoreName);
		var store = tx.objectStore(objectStoreName);
		var data = store.get(allRestKey);
		tx.oncomplete = function () {
			db.close();
		};
		return data;
	};
};

function resturantByID(id) {
	var open = getIDBObject();

	open.onsuccess = function () {
		var db = open.result;
		var tx = db.transaction(objectStoreName);
		var store = tx.objectStore(objectStoreName);
		var data = store.get(id);
		tx.oncomplete = function () {
			db.close();
		};
		return data;
	};
}

var addAllResturants = function addAllResturants(restJson) {
	var open = getIDBObject();
	open.onsuccess = function () {
		var db = open.result;
		var tx = db.transaction(objectStoreName, 'readwrite');
		var store = tx.objectStore(objectStoreName);
		store.put(restJson, allRestKey);
		tx.oncomplete = function () {
			db.close();
		};
		return;
	};
};

var addResturant = function addResturant(id, restJson) {
	var open = getIDBObject();
	open.onsuccess = function () {
		var db = open.result;
		var tx = db.transaction(objectStoreName, 'readwrite');
		var store = tx.objectStore(objectStoreName);
		store.put(restJson, id);
		tx.oncomplete = function () {
			db.close();
		};
		return;
	};
};
//# sourceMappingURL=idb.js.map
