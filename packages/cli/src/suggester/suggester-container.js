import React from "react";
import { useSuggesterState } from "./component-state";

export default React.forwardRef(function SuggesterContainer({ children }, ref) {
  const [state] = useSuggesterState();
  const { cssZIndex } = state;
  return (
    <div
      className="renaud-suggester-container"
      ref={ref}
      style={{ zIndex: cssZIndex }}
    >
      <div className="renaud-suggester">{children}</div>
    </div>
  );
});
