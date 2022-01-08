/**
 * The cell of a field
 * @typedef { Object } Cell
 * @property { 'sea' | 'shipPart' } type
 * @property { boolean } hit
 * @property { string } shipColor - `'none'` if `type === 'sea'`
 */

/**
 * The player's field containing ships and sea
 * @typedef { Cell [][] } Field
 */

/**
 * Coordinates must be integers
 * @typedef {{ x: number; y: number; }} Point
 */
