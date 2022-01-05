import * as f from "../../../../utils/formatting";
import * as t from "../../../../utils/typeCheck";

import React from "react";

const Second = () => {
  const second = {
    numArr: [4, 78, 43, 3, 567, 22, 45, 68, 11],
    minMax: (numArr) => {
      // array type check
      if (!t.isNumArr(numArr)) {
        console.log("Parameter is not an array of numbers (number[]).");
        return;
      }

      let max = numArr[0];
      let min = max;

      const ARR_LENGHT = numArr.length;

      for (let i = 1; i < ARR_LENGHT; i++) {
        const num = numArr[i];

        if (max < num) {
          max = num;
        }
        if (min > num) {
          min = num;
        }
      }

      console.log({
        min,
        max,
      });
    },
  };

  return (
    <section className="exercise">
      <h1>Second</h1>
      <button onClick={() => second.minMax(second.numArr)}>
        Find min and max {f.arrayToStringList(second.numArr)}
      </button>
    </section>
  );
};

export default Second;
