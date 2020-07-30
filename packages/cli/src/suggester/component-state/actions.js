export const ON_INPUT_CHANGE = "renaud-suggester/onInputChange";
export const onInputChange = (value) => ({
  type: ON_INPUT_CHANGE,
  payload: { value },
});

export const ON_REFRESH_SUGGESTIONS = "renaud-suggester/onRefreshSuggestions";
export const onRefreshSuggestions = (suggestions) => ({
  type: ON_REFRESH_SUGGESTIONS,
  payload: { suggestions },
});

export const ON_BLUR_SUGGESTER = "renaud-suggester/onBlurSuggester";
export const onBlurSuggester = () => ({ type: ON_BLUR_SUGGESTER });
