import React, { useCallback, useEffect, useReducer, useRef } from "react";
import SuggesterContainer from "./suggester-container";
import Input from "./suggester-input";
import Panel from "./suggester-panel";
import OptionDefault from "./suggester-option-default";
import { searchByPrefix } from "store-index";
import {
  reducer,
  initialState,
  SuggesterStateContext,
  onRefreshSuggestions,
  onBlurSuggester,
} from "./component-state";
import "./renaud-suggester.scss";

async function refreshSuggestion(prefix, searching) {
  if (prefix.trim().length) {
    return await searching(prefix, 15);
  } else {
    return [];
  }
}

function Suggester({ store, optionComponent, displayPath }) {
  const containerEl = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputValue } = state;

  const searching = useCallback(searchByPrefix(store), [store]);

  useEffect(
    function () {
      async function refresh() {
        const suggestions = await refreshSuggestion(inputValue, searching);
        dispatch(onRefreshSuggestions(suggestions));
      }
      refresh();
    },
    [inputValue, searching]
  );

  useEffect(
    function () {
      function handleClickBody(e) {
        if (containerEl.current) {
          if (!containerEl.current.contains(e.target)) {
            dispatch(onBlurSuggester());
          }
        }
      }
      document.body.addEventListener("click", handleClickBody);
      return function () {
        document.body.removeEventListener("click", handleClickBody);
      };
    },
    [containerEl]
  );

  return (
    <SuggesterStateContext.Provider
      value={{ state: { ...state, displayPath }, dispatch }}
    >
      <SuggesterContainer ref={containerEl}>
        <Input />
        <Panel optionComponent={optionComponent} />
      </SuggesterContainer>
    </SuggesterStateContext.Provider>
  );
}

Suggester.defaultProps = {
  optionComponent: OptionDefault,
  displayPath: "id",
};

export default Suggester;
