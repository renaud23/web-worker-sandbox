import React, { useState, useEffect } from "react";
import stopWords from "../stop-words";
import { Suggester } from "../suggester";
import { StoreManager } from "../store-manager";
import { createStore, SEARCH_TYPES } from "store-index";
import classnames from "classnames";
import "../custom-option.scss";

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
const NAF_FIELDS = [
  { name: "libelle", rules: [/[\w]+/], language: "French", min: 3, stopWords },
  { name: "code" },
];

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
  const { code, libelle, poste } = suggestion;
  return (
    <div className="custom-naf-option">
      <span className={classnames("code", poste)} title={poste}>
        {code}
      </span>
      <span className="libelle">{libelle}</span>
    </div>
  );
}

export function COG() {
  const [store, setStore] = useState(undefined);
  useEffect(function () {
    async function init() {
      setStore(await createStore(COG_IDB_NAME, 1, COG_FIELDS));
    }

    init();
  }, []);
  if (!store) {
    return null;
  }
  return (
    <>
      <div style={{ width: "280px" }}>
        <Suggester
          store={store}
          placeHolder="Rechercher dans le COG."
          optionComponent={CustomCOGOption}
          displayPath="libelle"
          onSelect={function (item) {
            console.log("onSelect", item);
          }}
        />
      </div>
      <StoreManager
        name={COG_IDB_NAME}
        version={1}
        fields={COG_FIELDS}
        fetch={fetchCommunes}
      />
    </>
  );
}

export function NAF() {
  const [store, setStore] = useState(undefined);
  useEffect(function () {
    async function init() {
      setStore(await createStore(NAF_IDB_NAME, 1, NAF_FIELDS));
    }

    init();
  }, []);
  if (!store) {
    return null;
  }
  return (
    <>
      <div style={{ width: "380px" }}>
        <Suggester
          store={store}
          displayPath="libelle"
          placeHolder="Recherche dans la naf."
          optionComponent={CustomNafOption}
          onSelect={function (item) {
            console.log("onSelect naf", item);
          }}
          searchType={SEARCH_TYPES.tokens}
          fields={NAF_FIELDS}
        />
      </div>
      <StoreManager
        name={NAF_IDB_NAME}
        tokenize={true}
        version={1}
        fields={NAF_FIELDS}
        fetch={fetchNaf}
      />
    </>
  );
}

export default {
  title: "Store/create",
  component: StoreManager,
  argTypes: {},
};
