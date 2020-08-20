const INITIAL_STATE = {
  placeHolder: "Search...",
  suggesterFocused: false,
  inputValue: "",
  suggestions: [],
  displayPanel: false,
  focused: false,
  activeIndex: -1,
  selectedItem: undefined,
  displayActiveIndex: false,
  onSelect: () => null,
  displayOnRefresh: true,
};

export default INITIAL_STATE;
