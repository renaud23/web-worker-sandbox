import {
  createStore,
  bulkInsert,
  clearStore,
  searchByPrefix,
  searchByTokens,
} from "./store";
import { BULK_INSERT_MESSAGES } from "./commons";
import BulkInsertWorker from "./worker/bulk.worker";

export {
  createStore,
  bulkInsert,
  clearStore,
  searchByPrefix,
  searchByTokens,
} from "./store";
export { BULK_INSERT_MESSAGES, SEARCH_TYPES } from "./commons";
export { default as BulkInsertWorker } from "./worker/bulk.worker";

export default {
  createStore,
  clearStore,
  bulkInsert,
  BULK_INSERT_MESSAGES,
  BulkInsertWorker,
  searchByPrefix,
};
