import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataToolbar from "./data-toolbar";
import { createStore } from "store-index";

const IDB_NAME = "TEST/COG";

function App() {
  const [db, setDb] = useState(undefined);

  useEffect(function () {
    async function init() {
      const idb = await createStore(IDB_NAME);
      setDb(idb);
    }

    init();
  }, []);

  return (
    <div className="application">
      <DataToolbar db={db} idbName={IDB_NAME} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
