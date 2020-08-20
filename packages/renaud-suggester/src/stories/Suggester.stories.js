import React from "react";
import { Suggester } from "../suggester";

const SIMPLE_DATA = {
  python: { id: "python", type: "multi-paradigme" },
  calm: { id: "calm", type: "multi-paradigme" },
  java: { id: "java", type: "orienté objet" },
  ada: { id: "ada", type: "orienté objet" },
  javascript: { id: "javascript", type: "multi-paradigme" },
  c: { id: "c", type: "structuré" },
  basic: { id: "basic", type: "structuré" },
  haskel: { id: "haskel", type: "fonctionnel" },
  perl: { id: "perl", type: "structuré" },
  ocalm: { id: "ocalm", type: "fonctionnel" },
  pascal: { id: "pascal", type: "structuré" },
  fortran: { id: "fortran", type: "structuré" },
  ruby: { id: "ruby", type: "orienté objet" },
  ml: { id: "ml", type: "fonctionnel" },
  lisp: { id: "lisp", type: "fonctionnel" },
  scheme: { id: "scheme", type: "fonctionnel" },
};

function findBetweenRange(range, data) {
  const { lower, upper } = range;
  return Object.entries(data).reduce(function (a, [k, o]) {
    if (k >= lower && k <= upper) {
      return [...a, o];
    }
    return a;
  }, []);
}

function createMockedIDBIndex(data) {
  return {
    getAll: function (range) {
      const { lower, upper } = range;
      const cally = {};

      setTimeout(function () {
        if ("onsuccess" in cally) {
          cally.onsuccess({
            target: { result: findBetweenRange(range, data) },
          });
        }
      }, 200);
      return cally;
    },
  };
}

function createMockedIDBStore(data) {
  return {
    index: () => createMockedIDBIndex(data),
  };
}

function createMockedStore(data) {
  return {
    db: {
      transaction: () => ({ objectStore: () => createMockedIDBStore(data) }),
    },
  };
}

export function SimpleSuggester() {
  return (
    <>
      <p>Rechercher un langage de programmation.</p>
      <div style={{ width: "350px" }}>
        <Suggester
          store={createMockedStore(SIMPLE_DATA)}
          placeHolder="Rechercher..."
          displayPath="id"
          onSelect={function (item) {
            console.log("onSelect", item);
          }}
        />
      </div>
    </>
  );
}

function getColor(type) {
  switch (type) {
    case "multi-paradigme":
      return "crimson";
    case "orienté objet":
      return "GreenYellow";
    case "fonctionnel":
      return "Gold";
    case "structuré":
      return "Tan";
    default:
      return "blue";
  }
}

function CustomOption({ suggestion }) {
  const { id, type } = suggestion;
  return (
    <div>
      <span
        style={{
          width: "10px",
          height: "10px",
          display: "inline-block",
          backgroundColor: getColor(type),
          borderRadius: "50%",
          marginRight: "2px",
        }}
        title={type}
      />
      <span>{id}</span>
    </div>
  );
}

export function SimpleSuggesterWithCustomOption() {
  return (
    <>
      <p>Rechercher un langage de programmation.</p>
      <div style={{ width: "350px" }}>
        <Suggester
          store={createMockedStore(SIMPLE_DATA)}
          placeHolder="Rechercher..."
          displayPath="id"
          optionComponent={CustomOption}
          onSelect={function (item) {
            console.log("onSelect", item);
          }}
        />
      </div>
    </>
  );
}

export default {
  title: "Example/Suggester",
  component: Suggester,
  argTypes: {},
};
