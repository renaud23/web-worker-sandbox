import React from "react";
import classnames from "classnames";
import InputLayer from "./suggester-input-layer";
import {
  useSuggesterState,
  onInputChange,
  onFocusedSuggester,
  onArrowDownInput,
  onArrowUpInput,
  onEnterInput,
} from "./component-state";
import onSelect from "./on-select";

const KEY_BIND = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  home: "Home",
  end: "End",
  enter: "Enter",
};

function Input() {
  const [state, dispatch] = useSuggesterState();
  const { focused, inputValue } = state;

  function handleKeyPressed(e) {
    e.stopPropagation();
    const { key } = e;
    switch (key) {
      case KEY_BIND.arrowUp:
        e.preventDefault();
        dispatch(onArrowUpInput());
        break;
      case KEY_BIND.arrowDown:
        e.preventDefault();
        dispatch(onArrowDownInput());
        break;
      case KEY_BIND.enter:
        onSelect(state);
        dispatch(onEnterInput());
        break;
      default:
    }
  }

  return (
    <div
      className={classnames("renaud-suggester-input-container", { focused })}
    >
      <input
        type="text"
        autoComplete="list"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onInputChange(e.target.value));
        }}
        value={inputValue}
        className="renaud-suggester-input"
        onFocus={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onFocusedSuggester());
        }}
        onBlur={function (e) {
          e.preventDefault();
          e.stopPropagation();
          // dispatch(onBlurSuggester());
        }}
        onKeyDown={handleKeyPressed}
      />
      <InputLayer />
    </div>
  );
}

export default Input;
