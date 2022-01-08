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
