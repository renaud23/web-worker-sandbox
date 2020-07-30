import React from "react";
import { useSuggesterState, onInputChange } from "./component-state";

function Input() {
  const [state, dispatch] = useSuggesterState();
  const { value } = state;
  return (
    <div className="renaud-suggester-input-container">
      <input
        type="text"
        onChange={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onInputChange(e.target.value));
        }}
        value={value}
        className="renaud-suggester-input"
      />
    </div>
  );
}

export default Input;
