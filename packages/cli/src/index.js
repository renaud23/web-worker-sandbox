import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataToolbar from "./data-toolbar";
import { createStore } from "store-index";
import { Suggester } from "./suggester";
import "./custom-cog-option.scss";

const IDB_NAME = "TEST/COG";
const fields = [{ name: "libelle" }, { name: "com" }, { name: "nccenr" }];

function CustomCOGOption({ suggestion }) {
  const { com, libelle } = suggestion;
  return (
    <div className="custom-cog-option">
      <span className="com">{com}</span>
      <span className="libelle">{libelle}</span>
    </div>
  );
}

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
      <Suggester store={store} optionComponent={CustomCOGOption} />
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
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
