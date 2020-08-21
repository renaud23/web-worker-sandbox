import React, { useState, useCallback } from "react";
import StoreManagerTitle from "./store-manager-title";
import { STORE_STATUS, clearStore, createStore } from "store-index";
import Button from "./store-button";
import { BulkTaskProgress } from "../store-manager";

function Separator() {
  return <span className="store-manager-separator" />;
}

function ActionLoad({ status, fetch, fields, onStartLoad, onEndLoad }) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(undefined);

  const handleLoad = useCallback(
    function (e) {
      e.stopPropagation();
      (async function () {
        setData(await fetch());
        onStartLoad();
        setLoad(true);
      })();
    },
    [fetch]
  );

  const { name, status: state, count } = status;
  if ((!load || !data) && state === STORE_STATUS.ready) {
    return (
      <Button onClick={handleLoad} disabled={count > 0}>
        Load
      </Button>
    );
  }
  return (
    <>
      <span style={{ position: "relative" }}>
        <BulkTaskProgress
          idbName={name}
          data={data}
          fields={fields}
          tokenize={false}
          finished={function () {
            setLoad(false);
            onEndLoad();
          }}
        />
      </span>
    </>
  );
}

function ActionClear({ name, version, disabled = false, refresh }) {
  const handleClear = useCallback(function (e) {
    e.stopPropagation();
    (async function () {
      await clearStore(await createStore(name, version));
      refresh();
    })();
  }, []);
  return (
    <Button onClick={handleClear} disabled={disabled}>
      Clear
    </Button>
  );
}

function StoreManagerActions({ store, status, fields, fetch, refresh }) {
  const [load, setLoad] = useState(false);
  const onStartLoad = function () {
    setLoad(true);
  };
  const onEndLoad = useCallback(
    function () {
      setLoad(false);
      refresh();
    },
    [refresh]
  );
  if (!status) {
    return null;
  }
  const { name, version } = status;
  return (
    <StoreManagerTitle title="ACTIONS">
      <div className="store-manager-actions-container">
        <ActionLoad
          className="store-manager-actions"
          status={status}
          fetch={fetch}
          fields={fields}
          onStartLoad={onStartLoad}
          onEndLoad={onEndLoad}
        />
        {load ? null : (
          <>
            <Separator />
            <ActionClear
              disabled={false}
              name={name}
              version={version}
              refresh={refresh}
            />
          </>
        )}
      </div>
    </StoreManagerTitle>
  );
}

export default StoreManagerActions;
