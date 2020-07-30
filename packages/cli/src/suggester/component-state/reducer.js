import * as ACTIONS from "./actions";

function reduceOnInputChange(state, action) {
  const { payload } = action;
  const { value } = payload;

  return { ...state, inputValue: value };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ACTION_CODES.ON_INPUT_CHANGE: {
      return reduceOnInputChange(state, action);
    }

    default:
      return state;
  }
}

export default reducer;
