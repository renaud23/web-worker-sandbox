import React, { useEffect, useReducer, useRef, useMemo, useState } from "react";
import SuggesterContainer from "./suggester-container";
import Input from "./suggester-input";
import Panel from "./suggester-panel";
import OptionDefault from "./suggester-option-default";
import { searchByPrefix, searchByTokens, SEARCH_TYPES } from "store-index";
import {
  reducer,
  initialState,
  SuggesterStateContext,
  onRefreshSuggestions,
  onBlurSuggester,
} from "./component-state";
import "./renaud-suggester.scss";

async function refreshSuggestion(prefix, searching, how) {
  if (prefix.trim().length) {
    return await searching(prefix, how);
  } else {
    return [];
  }
}

function getSearch(type) {
  return type === SEARCH_TYPES.tokens ? searchByTokens : searchByPrefix;
}

function Suggester({
  store,
  optionComponent,
  displayPath,
  onSelect,
  how,
  searchType,
  fields,
  placeHolder,
  language,
}) {
  const containerEl = useRef();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    onSelect,
    displayPath,
    placeHolder,
  });
  const [context, setContext] = useState({
    dispatch,
    state,
  });
  const { inputValue } = state;

  const searching = useMemo(
    () => getSearch(searchType)(store, fields, language),
    [fields, store, searchType, language]
  );

  useEffect(
    function () {
      async function doRefresh() {
        if (typeof searching === "function") {
          const suggestions = await refreshSuggestion(
            inputValue,
            searching,
            how
          );
          dispatch(onRefreshSuggestions(suggestions));
        }
      }

      doRefresh();
    },
    [inputValue, searching, how]
  );
  useEffect(
    function () {
      setContext({ dispatch, state });
    },
    [dispatch, state]
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
    <SuggesterStateContext.Provider value={context}>
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
  how: 15,
  searchType: SEARCH_TYPES.prefix,
  placeHolder: "Search...",
  language: "French",
};

export default Suggester;
