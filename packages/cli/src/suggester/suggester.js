import React, { useState, useCallback, useEffect, useReducer } from "react";
import SuggesterContainer from "./suggester-container";
import Input from "./suggester-input";
import Panel from "./suggester-panel";
import OptionDefault from "./suggester-option-default";
import { searchByPrefix } from "store-index";
import {
  reducer,
  initialState,
  SuggesterStateContext,
} from "./component-state";
import "./renaud-suggester.scss";

async function refreshSuggestion(prefix, searching) {
  if (prefix.trim().length) {
    return await searching(prefix, 15);
  } else {
    return [];
  }
}

function Suggester({ store, optionComponent }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputValue } = state;
  const [suggestions, setSuggestions] = useState([]);

  const searching = useCallback(searchByPrefix(store), [store]);

  useEffect(
    function () {
      async function refresh() {
        const suggestions = await refreshSuggestion(inputValue, searching);
        setSuggestions(suggestions);
      }
      refresh();
    },
    [inputValue, searching]
  );

  useEffect(function () {
    function handleClickBody(e) {
      //   console.log("click", e.target);
    }
    document.addEventListener("click", handleClickBody);
    return function () {
      document.removeEventListener("click", handleClickBody);
    };
  }, []);

  return (
    <SuggesterStateContext.Provider value={{ state, dispatch }}>
      <SuggesterContainer>
        <Input />
        <Panel suggestions={suggestions} optionComponent={optionComponent} />
      </SuggesterContainer>
    </SuggesterStateContext.Provider>
  );
}

Suggester.defaultProps = {
  optionComponent: OptionDefault,
};

export default Suggester;
