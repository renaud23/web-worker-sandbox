import React, { useCallback } from "react";
import classnames from "classnames";
import { useSuggesterState, onMouseEnterOption } from "./component-state";

function OptionContainer({ children, item, index }) {
  const [state, dispatch] = useSuggesterState();
  const { onSelect, activeIndex } = state;
  const active = index === activeIndex;

  const handleMouseEnter = useCallback(
    function (e) {
      e.stopPropagation();
      e.preventDefault();
      dispatch(onMouseEnterOption(index));
    },
    [index, dispatch]
  );

  return (
    <li
      className={classnames("renaud-suggestion-option", { active })}
      onClick={function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.button === 0) {
          onSelect(item);
        }
      }}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </li>
  );
}

OptionContainer.defaultProps = {
  onSelect: () => null,
};

export default OptionContainer;
