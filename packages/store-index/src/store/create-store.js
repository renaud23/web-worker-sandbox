import { openStorage } from "../commons";

async function create(name, version) {
  const db = await openStorage(name, version);
  return { db, name, version };
}

export default create;
