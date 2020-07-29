import { openStorage } from "../commons";

async function create(name, version, fields = []) {
  const db = await openStorage(name, version, fields);
  return { db, name, version };
}

export default create;
