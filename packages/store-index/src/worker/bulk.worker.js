/* eslint-disable no-restricted-globals */
import { createStore, bulkInsert } from "../store";
import {
  BULK_INSERT_MESSAGES,
  CONSTANTE,
  prepareStringIndexation,
} from "../commons";

function createPrepareEntity(fields = []) {
  return function (entity) {
    const searching = fields.reduce(function (a, field) {
      const { name } = field;
      if (name in entity) {
        return [...a, prepareStringIndexation(`${entity[name]}`)];
      }
      return a;
    }, []);
    return { ...entity, [CONSTANTE.STORE_INDEX_PATH]: searching };
  };
}

self.onmessage = (e) => {
  const { data } = e;
  const { idbName, entities, fields } = data;

  const prepareEntity = createPrepareEntity(fields);
  const preparedEntities = entities.map(function (e) {
    return prepareEntity(e);
  });

  createStore(idbName).then(function (store) {
    bulkInsert(store, preparedEntities, function (arg) {
      self.postMessage(arg);
      const { message } = arg;
      if (message === BULK_INSERT_MESSAGES.finished) {
        self.close();
      }
    });
  });
};
