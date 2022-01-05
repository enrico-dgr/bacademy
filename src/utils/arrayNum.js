/**
 *
 * @example
 *
 * [4, 11, 4, 55, 4, 55, 70, 71, 55, 11] ->
 *  {
 *   maxRepeated: [4,55],
 *   maxRepetition: 3
 *  }
 * @param {number[]} numArr
 * @param {number[]} records Notes:
 * - default `[0]`
 * - given a number `x` repeated, `records[x]` is
 *   the number of repetitions
 * @param {number} maxRepetition
 * @param {number[]} maxRepeated All the numbers with most
 * repetitions
 * @returns {{
 *   maxRepeated: number[];
 *   maxRepetition: number;
 *  }}
 */
export const findMostRepeated = (
  numArr,
  records = [0],
  maxRepetition = 0,
  maxRepeated = []
) => {
  if (numArr.length < 1) {
    return {
      maxRepeated,
      maxRepetition,
    };
  }

  if (records[numArr[0]] !== undefined) {
    // increment
    records[numArr[0]]++;
  } else {
    // new record
    records[numArr[0]] = 1;
  }

  if (records[numArr[0]] > maxRepetition) {
    maxRepetition++;
    // new set
    maxRepeated = [numArr[0]];
  } else if (records[numArr[0]] === maxRepetition) {
    // add to current set
    maxRepeated.push(numArr[0]);
  }

  return findMostRepeated(numArr.slice(1), records, maxRepetition, maxRepeated);
};
