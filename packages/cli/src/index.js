import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataToolbar from "./data-toolbar";
import { createStore } from "store-index";
import { Suggester } from "./suggester";

const IDB_NAME = "TEST/COG";
const fields = [{ name: "libelle" }, { name: "com" }, { name: "nccenr" }];

function App() {
  const [store, setStore] = useState(undefined);

  useEffect(function () {
    async function init() {
      setStore(await createStore(IDB_NAME, 1, fields));
    }

    init();
  }, []);

  return (
    <div className="application">
      <DataToolbar store={store} idbName={IDB_NAME} fields={fields} />
      <Suggester store={store} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
