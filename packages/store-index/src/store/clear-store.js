import { CONSTANTE } from "../commons";

/**
 *
 */
async function clearStore(db) {
  new Promise((resolve) => {
    const transaction = db.transaction(CONSTANTE.STORE_NAME, "readwrite");

    transaction.oncomplete = () => {
      resolve(true);
    };
    const store = transaction.objectStore(CONSTANTE.STORE_NAME);
    store.clear();
  });
}

export default clearStore;
