
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


const idb_name = 'mws-restaurant-stage-1';
const objectStoreName =  'Restaurants';
const version = 1;

const allRestKey = 'allResturnats';


var getIDBObject =() => {
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open(idb_name, version);
	open.onupgradeneeded = function() {
		var db = open.result;
		var store = db.createObjectStore(objectStoreName);

	};
	return open;
}

var allResturnats = () => {
	
	let open = getIDBObject();

	open.onsuccess = ()=>{
		var db = open.result;
    	var tx = db.transaction(objectStoreName);
    	var store = tx.objectStore(objectStoreName);
    	return store.get(allRestKey);
	};

}


function resturantByID(id){
	let open = getIDBObject();

	open.onsuccess = ()=>{
		var db = open.result;
    	var tx = db.transaction(objectStoreName);
    	var store = tx.objectStore(objectStoreName);
    	return store.get(id);
	};
}

var addAllResturants = (restJson) => {
	let open = getIDBObject();
	open.onsuccess = ()=>{
		var db = open.result;
		var tx = db.transaction(objectStoreName, 'readwrite');
		var store = tx.objectStore(objectStoreName);
		store.put(restJson, allRestKey);
		return;
	}
}


var addResturant = (id, restJson) =>{
	let open = getIDBObject();
	open.onsuccess = ()=>{
		var db = open.result;
		var tx = db.transaction(objectStoreName, 'readwrite');
		var store = tx.objectStore(objectStoreName);
		store.put(restJson, id);
		return;
	}
}