/**
 *
 * @param {number[]} numArr
 * @returns
 * - Is `number[]` -> true
 * - Is not `number[]` -> false
 * @description Note that it returns false with empty array too.
 */
const isNumArr = (numArr) => {
  // array type check
  if (typeof numArr !== "object") {
    console.log("Parameter is not an array.");
    return false;
  }

  // array not empty check
  if (numArr.lenght > 0) {
    console.log("Array is empty");
    return false;
  }

  for (let index = 0; index < numArr.length; index++) {
    const num = numArr[index];

    // number type check
    if (typeof num !== "number") {
      console.log("Array should contain only numbers. Skipping...");
      return false;
    }
  }

  return true;
};

export { isNumArr };
