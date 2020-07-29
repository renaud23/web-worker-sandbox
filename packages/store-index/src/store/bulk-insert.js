import { idbBulkInsert, CONSTANTE } from "../commons";

async function bulk(store, entities, hook = () => null) {
  return await idbBulkInsert(store, CONSTANTE.STORE_NAME, hook)(entities);
}

export default bulk;
