import React, { useState, useCallback, useEffect } from "react";
import { searchByPrefix } from "store-index";

function Option({ suggestion }) {
  const { com, libelle } = suggestion;
  return (
    <li>
      <span>{com}</span>
      <span>{libelle}</span>
    </li>
  );
}

function Panel({ suggestions }) {
  const length = suggestions.length;
  if (!length) {
    return null;
  }
  return (
    <div className="renaud-suggester-panel">
      <ul>
        {suggestions.map(function (s, i) {
          return <Option suggestion={s} key={i} />;
        })}
      </ul>
    </div>
  );
}

function Input({ value, handleOnchange }) {
  return (
    <div className="renaud-suggester-input">
      <input type="text" onChange={handleOnchange} value={value} />
    </div>
  );
}

function Suggester({ store }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleOnchange = useCallback(function (e) {
    e.stopPropagation();
    setValue(e.target.value);
  }, []);

  const searching = useCallback(searchByPrefix(store), [store]);

  useEffect(
    function () {
      if (value.trim().length) {
        async function search() {
          setSuggestions(await searching(value, 15));
        }
        search();
      } else {
        setSuggestions([]);
      }
    },
    [value, searching]
  );

  return (
    <div className="renaud-suggester-container">
      <div className="renaud-suggester">
        <Input value={value} handleOnchange={handleOnchange} />
        <Panel suggestions={suggestions} />
      </div>
    </div>
  );
}

export default Suggester;
