import "./fifth.css";

import * as arrayNum from "../../../../utils/arrayNum";
import * as f from "../../../../utils/formatting";
import * as t from "../../../../utils/typeCheck";

import React from "react";

// `findMostRepeated` in arrayNum.js is inspired
// to the version of Antonio Consales.
const Fifth = () => {
  // const DEFAULT_ARR = [4, 11, 4, 55, 55, 70, 71, 55, 11];

  const [inputText, setInputText] = React.useState("");
  const [mostRepeated, setMostRepeated] = React.useState({
    maxRepeated: [],
    maxRepetition: 0,
  });

  /**
   *
   * @param {number[]} numArr
   * @returns
   */
  const findMostRepeated = (numArr) => {
    // array type check
    if (!t.isNumArr(numArr)) {
      console.error("Parameter must be an array of numbers (number[]).");
      return;
    }

    setMostRepeated(arrayNum.findMostRepeated(numArr));
  };

  return (
    <section className="exercise">
      <h1>Fifth</h1>
      <p>
        What is the most repeated number in{" "}
        <input
          type="text"
          value={inputText}
          placeholder="4,5,98,101"
          onChange={(e) => {
            const list = f.list(e.target.value).replace(/,0+[1-9]*/g, ",0");
            setInputText(list);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const numArr = inputText.replace(/,$/, "").split(",").map(Number);
              findMostRepeated(numArr);
            }
          }}
        />{" "}
        ?
      </p>
      <p>
        Most repeated numbers: {f.arrayToStringList(mostRepeated.maxRepeated)}
      </p>
      <p>Repetition: {mostRepeated.maxRepetition}</p>
    </section>
  );
};

// The original
// const Fifth = () => {
//   const fifth = {
//     // numArr: [4, 11, 4, 55, 55, 70, 71, 55, 11],
//     numArr: [4, 11, 4, 4, 55, 55, 70, 71, 55, 11, 11],
//     // numArr: [4, 11, 4, 4, 55, 55, 70, 71, 55, 11, 55],
//     /**
//      *
//      * @param {number[]} numArr
//      */
//     findMostRepeated: (numArr) => {
//       // array type check
//       if (!t.isNumArr(numArr)) {
//         console.log("Parameter must be an array of numbers (number[]).");
//         return;
//       }

//       const ARR_LENGHT = numArr.length;

//       let buffer = [
//         {
//           value: numArr[0],
//           repetitions: 1,
//         },
//       ];

//       // count repetitions
//       for (let index = 1; index < ARR_LENGHT; index++) {
//         const num = numArr[index];

//         const BUFFER_POSITION = buffer.findIndex((o) => o.value === num);

//         if (BUFFER_POSITION > -1) {
//           buffer[BUFFER_POSITION].repetitions += 1;
//         } else {
//           buffer.push({
//             value: num,
//             repetitions: 1,
//           });
//         }
//       }

//       // find most repeated
//       let mostRepeated = buffer[0];
//       const BUFFER_LENGHT = buffer.length;
//       for (let index = 0; index < BUFFER_LENGHT; index++) {
//         const element = buffer[index];

//         if (mostRepeated.repetitions < element.repetitions) {
//           mostRepeated = element;
//         }
//       }

//       console.log("most repeated", mostRepeated);

//       // find all most repeated
//       let allTheMostRepeated = [buffer[0]];
//       let lastFound = allTheMostRepeated[0];

//       for (let index = 0; index < BUFFER_LENGHT; index++) {
//         const element = buffer[index];

//         lastFound = allTheMostRepeated[allTheMostRepeated.length - 1];

//         // <
//         if (lastFound.repetitions < element.repetitions) {
//           allTheMostRepeated = [element];
//         }
//         // =
//         else if (
//           lastFound.repetitions === element.repetitions &&
//           allTheMostRepeated.findIndex((o) => o.value === element.value) === -1
//         ) {
//           allTheMostRepeated.push(element);
//         }
//       }

//       console.log("all the most repeated", allTheMostRepeated);
//     },
//   };

//   return (
//     <p>
//       What is the most repeated number in{" "}
//       <button onClick={() => fifth.findMostRepeated(fifth.numArr)}>
//         {f.arrayToStringList(fifth.numArr)}
//       </button>{" "}
//       ?
//     </p>
//   );
// };

export default Fifth;
