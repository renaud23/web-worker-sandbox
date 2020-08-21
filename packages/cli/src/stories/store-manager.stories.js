import React, { useState, useEffect, useCallback } from "react";
import stopWords from "../stop-words";
import { createStore } from "store-index";
import { BulkTaskProgress, StoreManager } from "../store-manager";

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

export function COG() {
  const [cogStore, setCogStore] = useState(undefined);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(function () {
    async function init() {
      setCogStore(await createStore(COG_IDB_NAME, 1, COG_FIELDS));
    }

    init();
  }, []);

  const handleLoad = useCallback(async function (e) {
    e.stopPropagation();
    const communes = await fetchCommunes();
    async function loadData() {
      setData(communes);
      setLoad(true);
    }
    loadData();
  }, []);

  //   const handleClear = useCallback(
  //     function (e) {
  //       e.stopPropagation();
  //       async function clear() {
  //         const { store: str } = store;
  //         await clearStore(str);
  //         setLoad(false);
  //         setData(undefined);
  //       }
  //       clear();
  //     },
  //     [store]
  //   );

  if (!cogStore) {
    return null;
  }
  return (
    <>
      <StoreManager
        name={COG_IDB_NAME}
        version={1}
        fields={COG_FIELDS}
        fetch={fetchCommunes}
      />
      {/* <button className="button" onClick={handleLoad} disabled={load}>
        Load
      </button>
      <button className="button" onClick={() => null}>
        Clear
      </button>
      {load && cogStore && data ? (
        <BulkTaskProgress
          idbName={COG_IDB_NAME}
          data={data}
          fields={COG_FIELDS}
          tokenize={false}
          finished={function () {
            console.log("Done !");
            setLoad(false);
          }}
        />
      ) : null} */}
    </>
  );
}

export default {
  title: "Store/create",
  component: () => null,
  argTypes: {},
};
