import tokenizer from "string-tokenizer";
import removeAccents from "remove-accents";
import prepareStringIndexation from "./prepare-string-indexation";

function defaultTokenizeIt(string) {
  return [prepareStringIndexation(string)];
}

function createTokenizer(fields = []) {
  const FIELDS_TOKENIZER_MAP = fields.reduce(function (a, f) {
    const { name, rules = [] } = f;
    if (rules.length) {
      const tokenRules = rules.reduce(function (a, pattern, index) {
        return { ...a, [`pattern${name}${index}`]: pattern };
      }, {});
      return {
        ...a,
        [name]: function (string) {
          const what = tokenizer().input(string).tokens(tokenRules).resolve();
          const severals = Object.entries(what).reduce(function (
            a,
            [k, values]
          ) {
            if (k.startsWith("pattern")) {
              if (typeof values === "string") {
                return [...a, values];
              }
              return [...a, ...values];
            }
            return a;
          },
          []);

          return severals;
        },
      };
    }
    return { ...a, [name]: defaultTokenizeIt };
  }, {});

  return function (field, entity) {
    const { name } = field;
    const tokenizeIt = FIELDS_TOKENIZER_MAP[name];
    const value = `${entity[name]}`;

    return tokenizeIt(removeAccents(`${value}`).toLowerCase());
  };
}

export default createTokenizer;
