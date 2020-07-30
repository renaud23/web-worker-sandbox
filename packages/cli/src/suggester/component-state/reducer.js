import * as ACTIONS from "./actions";

function reduceOnBlurSuggester(state) {
  return { ...state, displayPanel: false };
}

function reduceOnInputChange(state, action) {
  const { payload } = action;
  const { value } = payload;

  return { ...state, inputValue: value };
}

function reduceOnRefreshSuggestions(state, action) {
  const { payload } = action;
  const { suggestions } = payload;
  const displayPanel = suggestions.length > 0;

  return { ...state, suggestions, displayPanel };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_INPUT_CHANGE:
      return reduceOnInputChange(state, action);
    case ACTIONS.ON_REFRESH_SUGGESTIONS:
      return reduceOnRefreshSuggestions(state, action);
    case ACTIONS.ON_BLUR_SUGGESTER:
      return reduceOnBlurSuggester(state);
    default:
      return state;
  }
}

export default reducer;
