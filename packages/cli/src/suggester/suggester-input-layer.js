import React from "react";
import { useSuggesterState, onMouseEnterInputLayer } from "./component-state";

function getValue(state) {
  const { activeIndex, suggestions, displayPath } = state;
  const item = suggestions[activeIndex];
  if (displayPath in item) {
    return item[displayPath];
  }
  const { id } = item;
  return id;
}

function InputLayer() {
  const [state, dispatch] = useSuggesterState();
  const { displayActiveIndex } = state;
  if (displayActiveIndex) {
    return (
      <div
        className="renaud-suggester-input-layer"
        onMouseMove={function (e) {
          e.stopPropagation();
          dispatch(onMouseEnterInputLayer());
        }}
      >
        {getValue(state)}
      </div>
    );
  }
  return null;
}

export default InputLayer;
