// eslint-disable-next-line no-unused-vars
import * as types from "./types";
import * as utils from "./utils";

/**
 * @description
 * @param { Point } point the coordinates must be positive integers
 * @param { Field } field both lengths must be equal
 * @return { boolean }
 */
export const isPointInField = (point, field) =>
  field.length > point.x && field.length > point.y;

/**
 *
 * @param { Point } point the coordinates must be positive integers
 * @param { Point[] } points the coordinates must be positive integers
 * @return { { result: boolean; how: 'v' | 'h' | 'none' } }
 * `'v'` for vertically adjacent, `'h'` for horizontally and `'none'` if `result === false`
 */
export const isAdjacentTo = (point, points) => {
  if (points.length < 1) return { result: false, how: "none" };

  // on same column
  if (Math.abs(points[0].x - point.x) === 1 && points[0].y - point.y === 0) {
    return {
      result: true,
      how: "v",
    };
  }
  // on same raw
  if (Math.abs(points[0].y - point.y) === 1 && points[0].x - point.x === 0) {
    return {
      result: true,
      how: "h",
    };
  }

  return isAdjacentTo(point, points.slice(1));
};

/**
 * @description
 * @param { number } lengthOfShip
 * @param { Point } newPoint the coordinates must be positive integers
 * @param { Field } placementField both lengths must be equal
 * @return { boolean }
 */
const areTotSideCellsAvailable = (lengthOfShip, newPoint, placementField) => {
  let emptyCells = {
    right: 0,
    left: 0,
    up: 0,
    down: 0,
  };

  const NEEDED_LENGTH = lengthOfShip - 1;

  // right
  while (
    newPoint.x + emptyCells.right < placementField.length &&
    placementField[newPoint.x + emptyCells.right][newPoint.y].type === "sea"
  ) {
    emptyCells.right++;

    if (emptyCells.right + emptyCells.left === NEEDED_LENGTH) return true;
  }

  // left
  while (
    newPoint.x - emptyCells.left > -1 &&
    placementField[newPoint.x - emptyCells.left][newPoint.y].type === "sea"
  ) {
    emptyCells.left++;

    if (emptyCells.right + emptyCells.left === NEEDED_LENGTH) return true;
  }

  // up
  while (
    newPoint.y + emptyCells.up < placementField.length &&
    placementField[newPoint.x][newPoint.y + emptyCells.up].type === "sea"
  ) {
    emptyCells.up++;

    if (emptyCells.up + emptyCells.down === NEEDED_LENGTH) return true;
  }

  // down
  while (
    newPoint.y - emptyCells.down > -1 &&
    placementField[newPoint.x][newPoint.y - emptyCells.down].type === "sea"
  ) {
    emptyCells.down++;

    if (emptyCells.up + emptyCells.down === NEEDED_LENGTH) return true;
  }

  return false;
};

/**
 * @description
 * @param { number } lengthOfShip
 * @param { Point } newPoint the coordinates must be positive integers
 * @param { Point[] } settedPoints the coordinates must be positive integers
 * @param { Field } placementField both lengths must be equal
 * @return { { result: boolean; message:string } }
 */
export const isValidNewShipPart = (
  lengthOfShip,
  newPoint,
  settedPoints,
  placementField
) => {
  if (!isPointInField(newPoint, placementField)) {
    return {
      result: false,
      message: "Point does not belong to the field",
    };
  }

  if (placementField[newPoint.x][newPoint.y].type === "shipPart") {
    return {
      result: false,
      message: "Point already has part of a ship",
    };
  }

  // this validation happens only if it is the first point of the ship
  if (settedPoints.length < 1) {
    if (areTotSideCellsAvailable(lengthOfShip, newPoint, placementField)) {
      return {
        result: true,
        message: "Point is valid as first part of ship",
      };
    } else {
      return {
        result: false,
        message: `Ship of length ${lengthOfShip} has not enough space here`,
      };
    }
  }

  const isAdiacent = isAdjacentTo(newPoint, settedPoints);

  if (!isAdiacent.result) {
    return {
      result: false,
      message: "Point is not adjacent to others",
    };
  }

  // points must be all on the same line (horizontal alignment OR vertical alignment)
  if (
    settedPoints.length > 1 &&
    isAdiacent.how !== isAdjacentTo(settedPoints[0], settedPoints.slice(1)).how
  ) {
    return {
      result: false,
      message: "Points must be positioned on the same line",
    };
  }

  return {
    result: true,
    message: "Point is valid",
  };
};

/**
 * @description
 * @param { Point } newPoint the coordinates must be positive integers
 * @param { Field } placementField both lengths must be equal
 * @param { string } shipColor
 * @return { Field } the new field with updated ship
 */
export const newShipPart = (newPoint, placementField, shipColor) => {
  let field = placementField;
  field[newPoint.x][newPoint.y].type = "shipPart";
  field[newPoint.x][newPoint.y].shipColor = shipColor;

  return field;
};

/**
 * @description
 * @param { number } lengthOfShip
 * @param { Field } placementField both lengths must be equal
 * @param { Point[] } bufferOfPoints ! MUST NOT BE SETTED, it is for recursive purpose only
 * @return { Field } the new field with updated ship
 */
export const botNewShipPart = (
  lengthOfShip,
  placementField,
  bufferOfPoints = []
) => {
  // ship fully added
  if (bufferOfPoints.length === lengthOfShip) return placementField;

  const randomPoint = utils.getRandomPoint(placementField.length - 1);

  if (
    isValidNewShipPart(
      lengthOfShip,
      randomPoint,
      bufferOfPoints,
      placementField
    ).result
  ) {
    return botNewShipPart(
      lengthOfShip,
      newShipPart(randomPoint, placementField),
      [...bufferOfPoints, randomPoint]
    );
  }

  return botNewShipPart(lengthOfShip, placementField, bufferOfPoints);
};

/**
 * @param { Point } attackedPoint the coordinates must be positive integers
 * @param { Field } enemyField both lengths must be equal
 * @return { { inField: false } | { inField: true; alreadyHit: boolean; cellType: "sea" | "shipPart" ; enemyField: Field } } the new field with updated ship
 */
export const attack = (attackedPoint, enemyField) => {
  let field = enemyField;

  if (isPointInField(attackedPoint, enemyField)) {
    const alreadyHit = field[attackedPoint.x][attackedPoint.y].hit;
    field[attackedPoint.x][attackedPoint.y].hit = true;

    return {
      alreadyHit,
      cellType: field[attackedPoint.x][attackedPoint.y].type,
      enemyField: field,
      inField: true,
    };
  }

  return { inField: false };
};

/**
 * @description
 * @param { Field } enemyField both lengths must be equal
 * @return { { shipPart: boolean; field: Field; } } the new field with updated ship
 */
export const botAttack = (enemyField) => {
  const randomPoint = utils.getRandomPoint(9);

  if (!isPointInField(randomPoint, enemyField)) {
    return botAttack(enemyField);
  }

  let field = enemyField;

  if (field[randomPoint.x][randomPoint.y].hit === true) {
    return botAttack(enemyField);
  }

  field[randomPoint.x][randomPoint.y].hit = true;

  return {
    shipPart:
      field[randomPoint.x][randomPoint.y].type === "shipPart" ? true : false,
    field,
  };
};
