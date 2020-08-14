import searchByPrefix from "./search-by-prefix";
import tokenizer from "string-tokenizer";
import removeAccents from "remove-accents";
import { tokensToArray } from "../commons";

function mergeToPatterns(p, field) {
  const { rules, name } = field;
  return rules.reduce(
    function (a, pattern, i) {
      return { ...a, [`pattern${name}${i}`]: pattern };
    },
    { ...p }
  );
}

function createTokenizer(fields) {
  const patterns = fields.reduce(function (a, f, i) {
    const { rules } = f;
    if (rules) {
      return mergeToPatterns(a, f);
    }
    return a;
  }, {});

  return function (query = "") {
    const all = tokenizer()
      .input(removeAccents(query).toLocaleLowerCase())
      .tokens(patterns)
      .resolve();
    return tokensToArray(all);
  };
}

function resolve(propositions, how) {
  const map_ = propositions.reduce(function (a, suggestions) {
    return suggestions.reduce(
      function (b, s) {
        const { id } = s;
        if (id in b) {
          const [s_, how] = b[id];
          return { ...b, [id]: [s_, how + 1] };
        }
        return { ...b, [id]: [s, 1] };
      },
      { ...a }
    );
  }, {});

  const sorted = Object.values(map_).sort(function (a, b) {
    if (a[1] > b[1]) {
      return -1;
    }
    if (a[1] < b[1]) {
      return 1;
    }
    return 0;
  });
  return sorted.reduce(function (a, [s]) {
    if (a.length < how) {
      return [...a, s];
    }
    return a;
  }, []);
}

function create(store, fields = []) {
  if (!store) {
    return () => null;
  }
  const queryParser = createTokenizer(fields);
  const searching = searchByPrefix(store);

  return async function (query, how) {
    const tokens = queryParser(query);
    const suggestions = await Promise.all(
      tokens.reduce(function (a, t) {
        return [...a, searching(t, how)];
      }, [])
    );
    return resolve(suggestions, how);
  };

  // if (!store) {
  //   return () => null;
  // }
  // const { db } = store;

  // return function search(query, how) {
  //   return [];
  // };
}

export default create;
