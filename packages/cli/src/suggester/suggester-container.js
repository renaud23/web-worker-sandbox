import React from "react";

function SuggesterContainer({ children }) {
  return (
    <div className="renaud-suggester-container">
      <div className="renaud-suggester">{children}</div>
    </div>
  );
}

export default SuggesterContainer;
