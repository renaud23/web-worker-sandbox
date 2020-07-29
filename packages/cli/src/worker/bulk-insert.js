import { BulkInsertWorker } from "store-index";

function create(callback = () => null) {
  const worker = new BulkInsertWorker();
  worker.addEventListener("message", function (e) {
    callback(e.data);
  });

  return function (idbName, fields, entities) {
    worker.postMessage({ idbName, entities, fields });
  };
}

export default create;
