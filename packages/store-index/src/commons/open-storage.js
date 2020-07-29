import { CONSTANTE } from "../commons";

function openStorage(name, version = 1) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    let db;
    let doIt = true;

    request.onupgradeneeded = function () {
      doIt = false;
      db = request.result;
      const store = db.createObjectStore(CONSTANTE.STORE_NAME, {
        keyPath: "id",
      });
      store.createIndex(
        CONSTANTE.STORE_INDEX_NAME,
        CONSTANTE.STORE_INDEX_PATH,
        {
          multiEntry: true,
        }
      );
      resolve(db);
    };

    request.onsuccess = function () {
      db = request.result;
      if (doIt) resolve(db);
    };

    request.onerror = function (e) {
      reject(e);
    };
  });
}

export default openStorage;
