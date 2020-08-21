import React from "react";
import StoreManagerTitle from "./store-manager-title";
import { STORE_STATUS } from "store-index";

function Status({ state }) {
  if (state === STORE_STATUS.ready) {
    return <span className="store-status-ready" />;
  }
  return <span className="store-status-failure" />;
}

function Info({ label, children }) {
  return (
    <div className="store-status-info">
      <span className="label">{label}</span>
      <span className="value">{children}</span>
    </div>
  );
}

function StoreStatus({ status }) {
  if (!status) {
    return null;
  }

  const { count, status: state } = status;
  return (
    <StoreManagerTitle title="STATUS">
      <div className="store-status">
        <Info label="COUNT">{count || "-"}</Info>
        <Status state={state} />
      </div>
    </StoreManagerTitle>
  );
}

export default StoreStatus;
