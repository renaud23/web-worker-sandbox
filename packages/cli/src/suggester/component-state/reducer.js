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
    displayActiveIndex: true,
    activeIndex: Math.min(activeIndex + 1, suggestions.length - 1),
  };
}

function reduceOnKeyUpInput(state) {
  const { activeIndex } = state;
  return {
    ...state,
    displayActiveIndex: true,
    activeIndex: Math.max(activeIndex - 1, 0),
  };
}

function reduceOnBlurSuggester(state) {
  return {
    ...state,
    displayActiveIndex: false,
    displayPanel: false,
    focused: false,
  };
}

function reduceOnFocusedSuggester(state) {
  return {
    ...state,
    displayActiveIndex: false,
    displayPanel: true,
    focused: true,
  };
}

function reduceOnInputChange(state, action) {
  const { value } = getInPayload(action, "value");

  return {
    ...state,
    displayActiveIndex: false,
    inputValue: value,
    activeIndex: -1,
  };
}

function reduceOnRefreshSuggestions(state, action) {
  const { suggestions } = getInPayload(action, "suggestions");
  const displayPanel = suggestions.length > 0;

  return {
    ...state,
    displayActiveIndex: false,
    suggestions,
    displayPanel,
    activeIndex: -1,
  };
}

function reduceOnMouseEnterOption(state, action) {
  const { index } = getInPayload(action, "index");
  return { ...state, displayActiveIndex: true, activeIndex: index };
}

function reduceOnMouseEnterInputPanel(state) {
  return { ...state, displayActiveIndex: false, activeIndex: -1 };
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
    case ACTIONS.ON_MOUSE_ENTER_INPUT_LAYER:
      return reduceOnMouseEnterInputPanel(state);
    default:
      return state;
  }
}

export default reducer;
