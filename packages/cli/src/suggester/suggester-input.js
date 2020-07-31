import React from "react";
import classnames from "classnames";
import {
  useSuggesterState,
  onInputChange,
  onFocusedSuggester,
  onArrowDownInput,
  onArrowUpInput,
  onBlurSuggester,
} from "./component-state";

const KEY_BIND = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  home: "Home",
  end: "End",
  enter: "Enter",
};

function Input() {
  const [state, dispatch] = useSuggesterState();
  const { value, focused } = state;

  function handleKeyPressed(e) {
    e.stopPropagation();
    const { key } = e;
    switch (key) {
      case KEY_BIND.arrowUp:
        dispatch(onArrowUpInput());
        break;
      case KEY_BIND.arrowDown:
        dispatch(onArrowDownInput());
        break;
      default:
    }
  }

  return (
    <div
      className={classnames("renaud-suggester-input-container", { focused })}
      tabIndex="-1"
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
        value={value}
        className="renaud-suggester-input"
        onFocus={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onFocusedSuggester());
        }}
        onBlur={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onBlurSuggester());
        }}
        onKeyDown={handleKeyPressed}
      />
    </div>
  );
}

export default Input;
