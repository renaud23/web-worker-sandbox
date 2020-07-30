import React from "react";
import OptionContainer from "./suggester-option-container";

function Panel({ suggestions, optionComponent: Component }) {
  const length = suggestions.length;
  if (!length) {
    return null;
  }
  return (
    <div className="renaud-suggester-panel-container transition">
      <ul className="renaud-suggester-panel">
        {suggestions.map(function (s) {
          const { id } = s;
          return (
            <OptionContainer key={id} item={s}>
              <Component suggestion={s} />
            </OptionContainer>
          );
        })}
      </ul>
    </div>
  );
}

export default Panel;
