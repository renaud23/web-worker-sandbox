import React, { useEffect, useReducer, useRef, useMemo } from "react";
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
}) {
  const containerEl = useRef();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    onSelect,
    displayPath,
  });
  const { inputValue } = state;

  const searching = useMemo(() => getSearch(searchType)(store, fields), [
    fields,
    store,
    searchType,
  ]);

  useEffect(
    function () {
      async function doRefresh() {
        const suggestions = await refreshSuggestion(inputValue, searching, how);
        dispatch(onRefreshSuggestions(suggestions));
      }

      doRefresh();
    },
    [inputValue, searching, how]
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
    <SuggesterStateContext.Provider value={{ state, dispatch }}>
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
};

export default Suggester;
