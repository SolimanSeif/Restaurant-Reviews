'use strict';

// class idb{

// 	constructor(db_name, tableName,version){

// 		this.tableName = tableName;
// 		this.allRestKey = 'allResturnats';
// 		if (!window.indexedDB) {
// 			this.dbpromise = undefined;
//     		window.alert('Your browser doesn\'t support a stable version of IndexedDB. Such and such feature will not be available.');
// 		}else{
// 			this.dbpromise = indexedDB.open(db_name, version, function(upgradeDB){
// 				var objectStore = upgradeDB.createObjectStore(tableName);
// 			});
// 			this.dbpromise.onerror = function(event) {
// 				this.db = undefined;
// 				alert('Why didnt you allow my web app to use IndexedDB?!');
// 			};
// 			this.dbpromise.onsuccess = function(event) {
// 				this.db = event.target.result;
// 			};
// 		}
// 	}


// 	allResturnats(){
// 		return this.dbpromise.then(function(idbObj){
// 			var tx = idbObj.transaction(this.tableName);
// 			var restObjStore = tx.objectStore(this.tableName);
// 			return restObjStore.get(this.allRestKey);
// 		}).then(function(val){
// 			return val;
// 		});
// 	}

// 	resturantByID(id){
// 		return this.dbpromise.then(function(idbObj){
// 			var tx = idbObj.transaction(this.tableName);
// 			var restObjStore = tx.objectStore(this.tableName);
// 			return restObjStore.get(id);
// 		}).then(function(val){
// 			return val;
// 		});
// 	}

// 	addAllResturants(restJson){
// 		this.dbpromise.then(function(idbObj){
// 			var tx = idbObj.transaction(this.tableName, 'readwrite');
// 			var restObjStore = tx.objectStore(this.tableName);
// 			restObjStore.put(this.allRestKey, restJson);
// 		});
// 	}

// 	addResturant(id, restJson){
// 		this.dbpromise.then(function(idbObj){
// 			var tx = idbObj.transaction(this.tableName, 'readwrite');
// 			var restObjStore = tx.objectStore(this.tableName);
// 			restObjStore.put(id, restJson);
// 		});
// 	}
// }

//import idb from 'idb';


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
		return store.get(allRestKey);
	};
};

function resturantByID(id) {
	var open = getIDBObject();

	open.onsuccess = function () {
		var db = open.result;
		var tx = db.transaction(objectStoreName);
		var store = tx.objectStore(objectStoreName);
		return store.get(id);
	};
}

var addAllResturants = function addAllResturants(restJson) {
	var open = getIDBObject();
	open.onsuccess = function () {
		var db = open.result;
		var tx = db.transaction(objectStoreName, 'readwrite');
		var store = tx.objectStore(objectStoreName);
		store.put(restJson, allRestKey);
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
		return;
	};
};