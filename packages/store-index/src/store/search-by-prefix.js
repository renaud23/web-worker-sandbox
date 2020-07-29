import { CONSTANTE, prepareStringIndexation } from "../commons";

function search(store) {
  if (!store) {
    return () => null;
  }
  const { db } = store;
  return async function (prefix, how) {
    return new Promise((resolve) => {
      if (!prefix) {
        resolve(null);
        return;
      }
      const pp = prepareStringIndexation(prefix);
      const transaction = db.transaction(CONSTANTE.STORE_NAME, "readonly");
      const store = transaction.objectStore(CONSTANTE.STORE_NAME);
      const index = store.index(CONSTANTE.STORE_INDEX_NAME);
      const range = IDBKeyRange.bound(pp, `${pp}${CONSTANTE.MAX_STRING}`);
      index.getAll(range).onsuccess = function (req) {
        if (how) {
          resolve(
            req.target.result.reduce(function (a, e, i) {
              if (i < how) {
                return [...a, e];
              }
              return a;
            }, [])
          );
        }
        resolve(req.target.result);
      };
    });
  };
}

export default search;
