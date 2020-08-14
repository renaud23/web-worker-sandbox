import searchByPrefix from "./search-by-prefix";

function create(store) {
  return searchByPrefix(store);

  // if (!store) {
  //   return () => null;
  // }
  // const { db } = store;

  // return function search(query, how) {
  //   return [];
  // };
}

export default create;
