/**
 *
 * @param {[]} arr
 */
export const arrayToStringList = (arr) => `[${arr.map((n) => " " + n)} ]`;

/**
 *
 * @param {[]} arr
 */
export const arrayToList = (arr) => list(`${arr.map((n) => n + ", ")}`);

/**
 *
 * @example `4, 2 ,, 0,3 ,` -> `4,2,0,3,`
 * @param {string} list
 * @returns {string}
 */
export const list = (list) => list.replace(/ +/g, "").replace(/,+/g, ",");
