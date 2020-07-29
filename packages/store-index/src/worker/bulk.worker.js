/* eslint-disable no-restricted-globals */
import { createStore, bulkInsert } from "../store";
import { BULK_INSERT_MESSAGES } from "../commons";

self.onmessage = (e) => {
  const { data } = e;
  const { db, entities } = data;

  createStore(db).then(function (store) {
    bulkInsert(store, entities, function (arg) {
      self.postMessage(arg);
      const { message } = arg;
      if (message === BULK_INSERT_MESSAGES.finished) {
        self.close();
      }
    });
  });
};
