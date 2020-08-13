import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataToolbar from "./data-toolbar";
import { createStore } from "store-index";
import { Suggester } from "./suggester";
import "./custom-cog-option.scss";

async function fetchCommunes() {
  const communes = await fetch("/communes-2019.json").then((data) =>
    data.json()
  );
  return communes.map(function (commune, i) {
    const { com } = commune;
    return { ...commune, id: `COM-${i}-${com}` };
  });
}

async function fetchNaf() {
  const postes = await fetch("/naf.json").then((data) => data.json());
  return postes.map(function (naf, i) {
    const { code } = naf;
    return { ...naf, id: `NAF-${i}-${code}` };
  });
}

const COG_IDB_NAME = "TEST/COG";
const COG_FIELDS = [{ name: "libelle" }, { name: "com" }, { name: "nccenr" }];

const NAF_IDB_NAME = "TEST/NAF";
const NAF_FIELDS = [{ name: "code" }, { name: "libelle" }, { name: "poste" }];

/**
 *
 * @param {*} param0
 */
function CustomCOGOption({ suggestion }) {
  const { com, libelle } = suggestion;
  return (
    <div className="custom-cog-option">
      <span className="com">{com}</span>
      <span className="libelle">{libelle}</span>
    </div>
  );
}

function CustomNafOption({ suggestion }) {
  const { code, libelle } = suggestion;
  return (
    <div className="custom-naf-option">
      <span className="code">{code}</span>
      <span className="libelle">{libelle}</span>
    </div>
  );
}

function App() {
  const [cogStore, setCogStore] = useState(undefined);
  const [nafStore, setNafStore] = useState(undefined);
  const [idbStores, setIdbStores] = useState(undefined);

  useEffect(function () {
    async function init() {
      setCogStore(await createStore(COG_IDB_NAME, 1, COG_FIELDS));
      setNafStore(await createStore(NAF_IDB_NAME, 1, NAF_FIELDS));
    }

    init();
  }, []);

  useEffect(
    function () {
      if (cogStore && nafStore) {
        setIdbStores([
          {
            name: COG_IDB_NAME,
            fields: COG_FIELDS,
            fetch: fetchCommunes,
            store: cogStore,
          },
          {
            name: NAF_IDB_NAME,
            fields: NAF_FIELDS,
            fetch: fetchNaf,
            store: nafStore,
          },
        ]);
      }
    },
    [cogStore, nafStore]
  );

  return (
    <div className="application">
      <DataToolbar idbStores={idbStores} />
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
      <Suggester
        store={cogStore}
        optionComponent={CustomCOGOption}
        displayPath="libelle"
        onSelect={function (item) {
          console.log("onSelect", item);
        }}
      />
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
      <Suggester
        store={nafStore}
        displayPath="libelle"
        optionComponent={CustomNafOption}
        onSelect={function (item) {
          console.log("onSelect naf", item);
        }}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
