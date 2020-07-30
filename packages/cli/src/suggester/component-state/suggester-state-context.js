import React from "react";

const SuggesterStateContext = React.createContext({
  state: {},
  dispatch: () => null,
});

export default SuggesterStateContext;
