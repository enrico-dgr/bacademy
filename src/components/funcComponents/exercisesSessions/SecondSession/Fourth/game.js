// eslint-disable-next-line no-unused-vars
import * as types from "./types";

export default class Game {
  /**
   * @type { 'idle' | 'placement' | 'playing' | 'ended' }
   */
  phase = "idle";

  currentPlayer = "";

  /**
   * @constant
   * @type { number }
   * @description If each ship for player is of length ' 1 ',
   * then this would be the total number of ships.
   */
  totalShipsPartPerPlayer = 0;

  /**
   * @type { Player[] }
   */
  players = [];

  /**
   * @type {{
   *  playerName: string;
   *  ships: Ship[],
   *  pointsCounter: { x: number; y: number }[] ;
   *  compulsoryDirection: 'v' | 'h' | 'none' ;
   * }[]}
   */
  mappedShipsToPlace = [[]];
}
