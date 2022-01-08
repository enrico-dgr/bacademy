import * as gameMechanics from "./gameMechanics";
import * as gameMode from "./gameMode";
import * as utils from "./utils";

// eslint-disable-next-line no-unused-vars
import Game from "./game";

/**
 * @param { Game } game
 * @param { string } playerName
 * @returns { number } ID or `-1` is player is not found
 */
const getPlayerId = (game, playerName) => {
  return game.mappedShipsToPlace.findIndex(
    (sTP) => sTP.playerName === playerName
  );
};

/**
 *
 * @description Call if `this.phase === 'idle'`.
 * On `valid === false`, no change will occurre.
 * @param { Game } game
 * @param { string } firstPlayer
 * @param { string } secondPlayer
 * @returns { {
 *  valid: false;
 *  message: string
 * } | {
 *  valid: true;
 *  game: Game;
 * } }
 */
const start = (game, firstPlayer, secondPlayer) => {
  if (game.phase !== "idle") {
    return {
      valid: false,
      message: "Game is not in idle phase",
    };
  }

  const result = gameMode.newPlayers(firstPlayer, secondPlayer);

  if (result.valid === false) {
    return result;
  }

  // init max number of ships' parts
  game.totalShipsPartPerPlayer = ((
    partsForTypeArr = gameMode.STARTING_SHIPS.map((s) => s.length * s.quantity)
  ) => {
    let buffer = 0;

    partsForTypeArr.forEach((partsForType) => (buffer += partsForType));

    return buffer;
  })();

  // init players
  game.players = result.players.map((p) => ({
    ...p,
    availableShipParts: game.totalShipsPartPerPlayer,
  }));

  // init sets of ships to place
  for (let i = 0; i < 2; i++) {
    game.mappedShipsToPlace[i] = {
      playerName: game.players[i].name,
      ships: gameMode.STARTING_SHIPS.map((s) => Object.assign({}, s)),
      pointsCounter: [],
      compulsoryDirection: "none",
    };
  }

  game.phase = "placement";

  game = placeForBot(game);

  return { valid: true, game };
};

/**
 *
 * @param { Game } game
 * @param { string } playerName
 * @param { { x: number; y: number } } point
 * @param { 'v' | 'h' } direction
 * @returns { {
 *  valid: false;
 *  message: string
 * } | {
 *  valid: true;
 *  game: Game;
 * } }
 */
const placeShip = (game, playerName, point, direction) => {
  // phase validation
  if (game.phase !== "placement") {
    return {
      valid: false,
      message: "Game is not in placement phase",
    };
  }

  const playerId = getPlayerId(game, playerName);

  // player name validation
  if (playerId === -1) {
    return {
      valid: false,
      message: "Invalid player name",
    };
  }

  const shipsToPlace = game.mappedShipsToPlace[playerId];

  // available ships validation
  if (shipsToPlace.ships.length < 1) {
    return {
      valid: false,
      message: `Player already used all his ships`,
    };
  }

  // validate each point

  const coordinate = direction === "h" ? "x" : "y";

  for (let i = 0; i < shipsToPlace.ships[0].length; i++) {
    const res = gameMechanics.isValidNewShipPart(
      shipsToPlace.ships[0].length,
      { ...point, [coordinate]: point[coordinate] + i },
      [],
      game.players[playerId].field
    );

    if (res.result === false) {
      return {
        valid: false,
        message: res.message,
      };
    }
  }

  // insert them
  const shipColor = shipsToPlace.ships[0].color;

  for (let i = 0; i < shipsToPlace.ships[0].length; i++) {
    game.players[playerId].field = gameMechanics.newShipPart(
      { ...point, [coordinate]: point[coordinate] + i },
      game.players[playerId].field,
      shipColor
    );
  }

  // ship is fully placed
  game.mappedShipsToPlace[playerId].ships[0].quantity--;

  // check if all ships of this type are placed
  if (game.mappedShipsToPlace[playerId].ships[0].quantity === 0) {
    game.mappedShipsToPlace[playerId].ships.shift();
  }

  // check if all types of ships are placed
  if (game.mappedShipsToPlace[playerId].ships.length < 1) {
    const isNotZeros = game.mappedShipsToPlace
      .map((m) => m.ships.length > 0)
      .filter((isNotZero) => isNotZero);
    // check if all ships are used for all players
    if (isNotZeros.length < 1) {
      game.phase = "playing";
      game.currentPlayer = game.players[0].name;
    }
  }

  return { valid: true, game };
};

/**
 *
 * @param { Game } game
 * @returns { {
 *  valid: false;
 *  message: string
 * } | {
 *  valid: true;
 *  game: Game;
 * } }
 */
const placeForBot = (game) => {
  while (game.mappedShipsToPlace[1].ships.length > 0) {
    placeShip(
      game,
      game.mappedShipsToPlace[1].playerName,
      utils.getRandomPoint(9),
      utils.randomCoordinate(1) === 1 ? "h" : "v"
    );
  }

  return {
    valid: true,
    game,
  };
};

/**
 *
 *  @param { Game } game
 *  @param {{
 *  x: number;
 *  y: number;
 * }} attackedPoint the coordinates must be positive integers
 * @returns { {
 *  valid: false;
 *  message: string
 * } | {
 *  valid: true;
 *  game: Game;
 * } }
 */
const attack = (game, attackedPoint) => {
  // phase validation
  if (game.phase !== "playing") {
    return {
      valid: false,
      message: "Game is not in playing phase",
    };
  }

  const playerId = getPlayerId(game, game.currentPlayer);

  // suppose next player is the enemy for now
  const nextPlayerResult = gameMode.nextPlayer(
    game.players[playerId],
    game.players
  );

  if (nextPlayerResult.valid === false) {
    return nextPlayerResult;
  }

  const enemyPlayer = nextPlayerResult.player;

  const result = gameMechanics.attack(attackedPoint, enemyPlayer.field);

  // point in field validation
  if (!result.inField) {
    return {
      valid: false,
      message: "Point must be within the field",
    };
  }

  const enemyId = getPlayerId(game, enemyPlayer.name);
  game.players[enemyId].field = result.enemyField;

  if (result.cellType === "shipPart" && !result.alreadyHit) {
    game.players[enemyId].availableShipParts--;
  }

  // next player
  game.currentPlayer = nextPlayerResult.player.name;

  if (game.players[enemyId].availableShipParts === 0) {
    game.phase = "ended";
  }

  // if bot, auto attack
  if (game.players[enemyId].type === "bot") {
    // this code is ok because there are only two players
    game.players[playerId].field = gameMechanics.botAttack(
      game.players[playerId].field
    );
    // this code is ok because there are only two players
    game.currentPlayer = game.players[playerId].name;
  }

  return {
    valid: true,
    game,
  };
};

export { start, placeShip, placeForBot, attack };
