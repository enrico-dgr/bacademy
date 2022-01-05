import * as f from "../../../../utils/formatting";
import * as t from "../../../../utils/typeCheck";

const Fourth = () => {
  const fourth = {
    numArr: [4, 8, 10, 55, 60, 90, 100, 168, 221],
    /**
     *
     * @param {number[]} numArr
     */
    isAscending: (numArr) => {
      // array type check
      if (!t.isNumArr(numArr)) {
        console.log("Parameter must be an array of numbers (number[]).");
        return;
      }

      const ARR_LENGHT = numArr.length;
      let buffer = numArr[0];

      for (let index = 1; index < ARR_LENGHT; index++) {
        const num = numArr[index];

        if (buffer > num) {
          return console.log(false);
        }

        buffer = num;
      }

      return console.log(true);
    },
  };

  return (
    <section className="exercise">
      <h1>Fourth</h1>
      <p>
        <button onClick={() => fourth.isAscending(fourth.numArr)}>
          {f.arrayToStringList(fourth.numArr)}
        </button>{" "}
        is an ascending array?
      </p>
    </section>
  );
};

export default Fourth;
