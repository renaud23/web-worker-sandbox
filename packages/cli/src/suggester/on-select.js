function onSelect(state) {
  const { onSelect, suggestions, activeIndex } = state;
  if (activeIndex) {
    onSelect(suggestions[activeIndex]);
  }
}

export default onSelect;
