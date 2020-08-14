import React from "react";
import OptionContainer from "./suggester-option-container";
import { useSuggesterState } from "./component-state";

function PanelContent({ suggestions, optionComponent: Component, display }) {
  if (display) {
    return (
      <ul className="renaud-suggester-panel">
        {suggestions.map(function (s, i) {
          const { id } = s;
          return (
            <OptionContainer key={id} item={s} index={i}>
              <Component suggestion={s} />
            </OptionContainer>
          );
        })}
      </ul>
    );
  }
  return null;
}

function Panel({ optionComponent }) {
  const [state] = useSuggesterState();
  const { suggestions, displayPanel } = state;
  const length = suggestions.length;
  if (!length) {
    return null;
  }

  return (
    <div className="renaud-suggester-panel-container transition">
      <PanelContent
        suggestions={suggestions}
        optionComponent={optionComponent}
        display={displayPanel}
      />
    </div>
  );
}

export default Panel;
