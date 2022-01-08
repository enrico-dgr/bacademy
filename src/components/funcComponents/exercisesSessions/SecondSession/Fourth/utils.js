/**
 *
 * @param { number } max
 * @returns { number } random integer between zero and `max`
 */
export const randomCoordinate = (max) => Math.round(Math.random() * max);

/**
 *
 * @param { number } max
 * @returns {{
 *  x: number;
 *  y: number;
 * }} point with random integer coordinates between zero and `max`
 */
export const getRandomPoint = (max) => ({
  x: randomCoordinate(max),
  y: randomCoordinate(max),
});

/**
 *
 * @param { number } n 2 to 5
 * @returns { string } For example `'brown'`
 */
export const colorFromNumber = (n) => {
  switch (n) {
    case 5:
      return "green";
    case 4:
      return "gray";
    case 3:
      return "brown";
    case 2:
      return "yellow";

    default:
      return "black";
  }
};

/**
 *
 * @param { number } num
 * @returns { string } hexa color, for example `'#4fa'`
 */
export const randomColorFromNumber = (num) => {
  const getRandom = (n) => (Math.round(Math.random() * 2) + 1) * Math.abs(n);
  const first = getRandom(num);
  const second = getRandom(num);
  const third = getRandom(num);

  const toExaNum = (n) => (n > 16 ? Math.round(n / 16) : n);
  const toExaString = (n) => (n > 6 ? String.fromCharCode(90 + n) : n + "");
  const toExa = (n) => toExaString(toExaNum(n));
  const color = `#${toExa(first)}${toExa(second)}${toExa(third)}`;
  console.log(color);

  return color;
};
