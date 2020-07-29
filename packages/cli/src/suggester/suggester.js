import React, { useState, useCallback, useEffect } from "react";
import { searchByPrefix } from "store-index";

function Suggester({ store }) {
  const [value, setValue] = useState("");

  const handleOnchange = useCallback(function (e) {
    e.stopPropagation();
    setValue(e.target.value);
  }, []);
  //   searchByPrefix(store)

  const searching = useCallback(searchByPrefix(store), [store]);

  useEffect(
    function () {
      if (value.trim().length) {
        async function search() {
          const proposal = await searching(value, 10);
          console.log(proposal);
        }
        search();
      }
    },
    [value, searching]
  );

  return (
    <div className="renaud-suggester-container">
      <div className="renaud-suggester">
        <div className="renaud-suggester-input">
          <input type="text" onChange={handleOnchange} value={value} />
        </div>
      </div>
    </div>
  );
}

export default Suggester;
