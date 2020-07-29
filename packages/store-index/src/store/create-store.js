import { openStorage } from "../commons";
//window.indexedDB.open("MyTestDatabase", 3);
async function create(name, version) {
  return openStorage(name, version);
}

export default create;
