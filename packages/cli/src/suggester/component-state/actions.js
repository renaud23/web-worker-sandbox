export const ON_INPUT_CHANGE = "renaud-suggester/onInputChange";
export const onInputChange = (value) => ({
  type: ON_INPUT_CHANGE,
  payload: { value },
});

export const ACTION_CODES = { ON_INPUT_CHANGE };
