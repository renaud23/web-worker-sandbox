import React, { useState } from "react";
import Worker from "../worker/test.worker.js";

const worker = new Worker();

worker.postMessage({ a: 1 });

worker.addEventListener("message", function (e) {
  console.log(e.data);
});

function Suggester({ value: valueFP }) {
  const [value, setValue] = useState("");

  return (
    <div>
      <label htmlFor="choix_bieres">Indiquez votre bière préférée :</label>
      <input list="bieres" type="text" id="choix_bieres" value={value} />
      <datalist id="bieres"></datalist>
    </div>
  );
}

Suggester.defaultProps = {
  value: "",
};

export default Suggester;
