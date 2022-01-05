import * as f from "../../../../utils/formatting";
import * as t from "../../../../utils/typeCheck";

import React from "react";

const Third = () => {
  const [isPresent, setIsPresent] = React.useState(false);

  const third = {
    numArr: [4, 78, 43, 3, 567, 22, 45, 68, 11],
    /**
     *
     * @param {number} numToFind
     * @param {number[]} numArr
     * @returns
     */
    isPresent: (numToFind, numArr) => {
      if (typeof numToFind !== "number") {
        console.log("First parameter must be an number .");
        return;
      }
      // array type check
      if (!t.isNumArr(numArr)) {
        console.log("Second parameter must be an array of numbers (number[]).");
        return;
      }

      const result = numArr.findIndex((num) => num === numToFind) > -1;

      setIsPresent(result);
    },
  };
  return (
    <section className="exercise">
      <h1>Third</h1>
      <p>
        <input
          onKeyDown={(e) =>
            e.key === "Enter"
              ? third.isPresent(Number(e.target.value), third.numArr)
              : undefined
          }
          type={"number"}
        />{" "}
        is present in {f.arrayToStringList(third.numArr)} ?
      </p>
      <p>{isPresent ? "Yes" : "No"}</p>
    </section>
  );
};

export default Third;
