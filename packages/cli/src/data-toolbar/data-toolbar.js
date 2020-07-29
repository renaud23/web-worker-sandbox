import React, { useEffect, useState, useCallback, useRef } from "react";
import { BULK_INSERT_MESSAGES, clearStore } from "store-index";
import createWorker from "../worker/bulk-insert";
import "./bulk-insert-progress.scss";

async function fetchData() {
  const communes = await fetch("/communes-2019.json").then((data) =>
    data.json()
  );
  return communes.map(function (commune, i) {
    const { com } = commune;
    return { ...commune, id: `COM-${i}-${com}` };
  });
}

async function loadTask(data, idbName, fields, process = () => null) {
  if (idbName) {
    const bulkTask = createWorker(process);
    bulkTask(idbName, fields, data);
  }
}

function BulkTaskProgress({ idbName, data = [], fields = [] }) {
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
            break;
          case BULK_INSERT_MESSAGES.error:
          default:
        }
      }
      loadTask(data, idbName, fields, callback);
    },
    [data, idbName, fields]
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

function DataToolbar({ store, idbName, fields }) {
  const [load, setLoad] = useState(false);
  const [communes, setCommunes] = useState([]);

  const handleLoad = useCallback(function (e) {
    e.stopPropagation();
    async function loadCommunes() {
      const communes = await fetchData();
      setCommunes(communes);
      setLoad(true);
    }
    loadCommunes();
  }, []);

  const handleClear = useCallback(
    function (e) {
      e.stopPropagation();
      async function clear() {
        await clearStore(store);
        setLoad(false);
        setCommunes([]);
      }
      clear();
    },
    [store]
  );
  return (
    <div className="data-toolbar">
      <button className="button" onClick={handleLoad} disabled={load}>
        Load
      </button>
      <button className="button" onClick={handleClear}>
        Clear
      </button>
      {load ? (
        <BulkTaskProgress idbName={idbName} data={communes} fields={fields} />
      ) : null}
    </div>
  );
}

export default DataToolbar;
