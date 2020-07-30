import React from "react";

function OptionContainer({ children, onSelect, item }) {
  return (
    <li
      className="renaud-suggestion-option"
      index="0"
      onClick={function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.button === 0) {
          onSelect(item);
        }
      }}
    >
      {children}
    </li>
  );
}

OptionContainer.defaultProps = {
  onSelect: () => null,
};

export default OptionContainer;
