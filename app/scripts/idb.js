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
    	var data = store.get(allRestKey);
    	tx.oncomplete = function() {
	        db.close();
	    };
    	return data;
	};

}


function resturantByID(id){
	let open = getIDBObject();

	open.onsuccess = ()=>{
		var db = open.result;
    	var tx = db.transaction(objectStoreName);
    	var store = tx.objectStore(objectStoreName);
    	var data = store.get(id);
    	tx.oncomplete = function() {
	        db.close();
	    };
    	return data;
	};
}

var addAllResturants = (restJson) => {
	let open = getIDBObject();
	open.onsuccess = ()=>{
		var db = open.result;
		var tx = db.transaction(objectStoreName, 'readwrite');
		var store = tx.objectStore(objectStoreName);
		store.put(restJson, allRestKey);
		tx.oncomplete = function() {
	        db.close();
	    };
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
		tx.oncomplete = function() {
	        db.close();
	    };
		return;
	}
}