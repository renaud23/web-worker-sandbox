import * as ACTIONS from "./actions";

function getInPayload(action, ...attrs) {
  const { payload } = action;
  return attrs.reduce(function (a, attr) {
    if (attr in payload) {
      return { ...a, [attr]: payload[attr] };
    }
    return a;
  }, {});
}

function reduceOnKeyDownInput(state) {
  const { suggestions, activeIndex } = state;

  return {
    ...state,
    activeIndex: Math.min(activeIndex + 1, suggestions.length - 1),
  };
}

function reduceOnKeyUpInput(state) {
  const { activeIndex } = state;
  return { ...state, activeIndex: Math.max(activeIndex - 1, 0) };
}

function reduceOnBlurSuggester(state) {
  return { ...state, displayPanel: false, focused: false };
}

function reduceOnFocusedSuggester(state) {
  return { ...state, displayPanel: true, focused: true };
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

  return { ...state, suggestions, displayPanel, activeIndex: -1 };
}

function reduceOnMouseEnterOption(state, action) {
  const { index } = getInPayload(action, "index");
  return { ...state, activeIndex: index };
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
    case ACTIONS.ON_FOCUSED_SUGGESTER:
      return reduceOnFocusedSuggester(state);
    case ACTIONS.ON_ARROW_UP_INPUT:
      return reduceOnKeyUpInput(state);
    case ACTIONS.ON_ARROW_DOWN_INPUT:
      return reduceOnKeyDownInput(state);
    case ACTIONS.ON_MOUSE_ENTER_OPTION:
      return reduceOnMouseEnterOption(state, action);
    default:
      return state;
  }
}

export default reducer;
