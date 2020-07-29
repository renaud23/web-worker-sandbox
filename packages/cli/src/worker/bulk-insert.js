import { BulkInsertWorker } from "store-index";

function create(callback = () => null) {
  const worker = new BulkInsertWorker();
  worker.addEventListener("message", function (e) {
    callback(e.data);
  });

  return function (db, entities) {
    worker.postMessage({ db, entities });
  };
}

export default create;
