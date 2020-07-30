import React from "react";

export default React.forwardRef(function SuggesterContainer({ children }, ref) {
  return (
    <div className="renaud-suggester-container" ref={ref}>
      <div className="renaud-suggester">{children}</div>
    </div>
  );
});
