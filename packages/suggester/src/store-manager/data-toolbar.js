import React, { useEffect, useState, useCallback, useRef } from "react";
import { BULK_INSERT_MESSAGES, clearStore } from "store-index";
import createWorker from "../worker/bulk-insert";

async function loadTask(data, idbName, fields, tokenize, process = () => null) {
  if (idbName) {
    const bulkTask = createWorker(process);
    bulkTask(idbName, fields, data, tokenize);
  }
}

export function BulkTaskProgress({
  idbName,
  data = [],
  fields = [],
  finished = () => null,
  tokenize = false,
}) {
  const ref = useRef();
  const [statusWidth, setStatusWidth] = useState(0);
  const [nbToLoad] = useState(data.length);
  const [complete, setComplete] = useState(false);
  const [nbTreated, setNbTreated] = useState(0);

  useEffect(
    function () {
      if (ref.current) {
        setStatusWidth(ref.current.clientWidth);
      }
    },
    [ref]
  );

  useEffect(
    function () {
      function callback(args) {
        const { message } = args;
        switch (message) {
          case BULK_INSERT_MESSAGES.complete: {
            const { treated } = args;
            setNbTreated(treated);
            break;
          }
          case BULK_INSERT_MESSAGES.finished:
            setComplete(true);
            finished();
            break;
          case BULK_INSERT_MESSAGES.error:
          default:
        }
      }
      loadTask(data, idbName, fields, tokenize, callback);
    },
    [data, idbName, fields, finished, tokenize]
  );

  const percent = nbTreated / (nbToLoad + 1);
  const width = Math.trunc(statusWidth * percent) - 1;
  const status = complete ? "100 %" : `${Math.trunc(percent * 100)} %`;
  return (
    <div className="bulk-insert-progress" ref={ref}>
      <span className="progress" style={{ width }} />
      <span className="status">{status}</span>
    </div>
  );
}

function DataToolbar({ idbStores = [] }) {
  const [load, setLoad] = useState(false);
  const [store, setStore] = useState(undefined);
  const [data, setData] = useState(undefined);

  useEffect(
    function () {
      if (idbStores.length) {
        setStore(idbStores[0]);
      } else {
        setStore(undefined);
      }
    },
    [idbStores]
  );

  const handleChangeStore = useCallback(
    function (e) {
      e.stopPropagation();
      const index = e.target.value;
      setStore(idbStores[index]);
      setLoad(false);
    },
    [idbStores]
  );

  const handleLoad = useCallback(
    async function (e) {
      e.stopPropagation();
      const { fetch } = store;
      async function loadData() {
        setData(await fetch());
        setLoad(true);
      }
      loadData();
    },
    [store]
  );

  const handleClear = useCallback(
    function (e) {
      e.stopPropagation();
      async function clear() {
        const { store: str } = store;
        await clearStore(str);
        setLoad(false);
        setData(undefined);
      }
      clear();
    },
    [store]
  );
  if (!idbStores.length) {
    return null;
  }
  const options = idbStores.map(function (o, i) {
    const { name } = o;
    return (
      <option value={i} key={name}>
        {name}
      </option>
    );
  });
  return (
    <div className="data-toolbar">
      <select disabled={load} onChange={handleChangeStore}>
        {options}
      </select>
      <button className="button" onClick={handleLoad} disabled={load}>
        Load
      </button>
      <button className="button" onClick={handleClear}>
        Clear
      </button>
      {load && store && data ? (
        <BulkTaskProgress
          idbName={store.name}
          data={data}
          fields={store.fields}
          tokenize={store.tokenize}
          finished={function () {
            setLoad(false);
          }}
        />
      ) : null}
    </div>
  );
}

export default DataToolbar;
