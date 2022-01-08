const DEFAULT_CELL = {
  type: "sea",
  hit: false,
};

/**
 * @description
 * @param { number } sideLength
 * @return { { type: "sea" | "shipPart"; hit: boolean }[][] }
 */
const newField = (sideLength) => {
  let field = [];

  for (let i = 0; i < sideLength; i++) {
    field.push([{ ...DEFAULT_CELL }]);
    for (let j = 1; j < sideLength; j++) {
      field[i].push({ ...DEFAULT_CELL });
    }
  }

  return field;
};

const FIELD_LENGTH = 10;

/**
 * @type {{
 *   length: number;
 *   quantity: number;
 *   color: string;
 *  }[]}
 */
export const STARTING_SHIPS = [
  {
    length: 5,
    quantity: 1,
    color: "green",
  },
  {
    length: 4,
    quantity: 1,
    color: "gray",
  },
  {
    length: 3,
    quantity: 2,
    color: "brown",
  },
  {
    length: 2,
    quantity: 1,
    color: "yellow",
  },
];

/**
 *
 * @param { string } first
 * @param { string } second
 * @returns { {
 *  valid: false;
 *  message: string
 * } | {
 *  valid: true;
 *  players: {
 *   name: string;
 *   type: 'bot' | 'human';
 *   field: { type: "sea" | "shipPart"; hit: boolean }[][]
 *  }[]
 * } }
 */
export const newPlayers = (first, second) => {
  if (first === "") {
    return {
      valid: false,
      message: "First player must have a name",
    };
  }

  if (first === second) {
    return {
      valid: false,
      message: "Names must be different",
    };
  }

  return {
    valid: true,
    players: [
      {
        name: first,
        type: "human",
        field: newField(FIELD_LENGTH),
      },
      {
        name: second !== "" ? second : "bot",
        type: second !== "" ? "human" : "bot",
        field: newField(FIELD_LENGTH),
      },
    ],
  };
};

/**
 *
 * @param {{
 *   name: string;
 *   type: 'bot' | 'human';
 *   field: { type: "sea" | "shipPart"; hit: boolean }[][]
 *  }} previousPlayer
 * @param {{
 *   name: string;
 *   type: 'bot' | 'human';
 *   field: { type: "sea" | "shipPart"; hit: boolean }[][]
 *  }[]} players
 * @returns { {
 *  valid: false;
 *  message: string
 * } | {
 *  valid: true;
 *  player: {
 *   name: string;
 *   type: 'bot' | 'human';
 *   field: { type: "sea" | "shipPart"; hit: boolean }[][]
 *  }
 * } }
 */
export const nextPlayer = (previousPlayer, players) => {
  const playerPosition = players.findIndex(
    (p) => p.name === previousPlayer.name
  );

  if (playerPosition === -1) {
    return {
      valid: false,
      message: "Player does not exist",
    };
  }

  return {
    valid: true,
    player:
      playerPosition + 1 === players.length
        ? players[0]
        : players[playerPosition + 1],
  };
};
