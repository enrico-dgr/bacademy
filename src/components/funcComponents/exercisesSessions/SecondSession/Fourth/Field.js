import "./Field.css";

// eslint-disable-next-line no-unused-vars
import * as types from "./types";

// eslint-disable-next-line no-unused-vars
import Game from "./game";
import React from "react";

/**
 *
 * @param {{
 *  field: Field ;
 *  onConfirm: { ( e: { x: number ; y: number }) => void }
 * }} props
 * @returns { JSX.Element }
 */
const Field = ({ field, onConfirm }) => {
  return (
    <div className="exercises__second-session__fourth__field">
      {field
        .flatMap((cellsStack, x) =>
          cellsStack
            .map((_, y) => (
              <div
                key={`${x},${y}`}
                onClick={() => onConfirm({ x, y })}
                className={`exercises__second-session__fourth__field__cell 
                  exercises__second-session__fourth__field__cell${
                    field[x][y].hit === false
                      ? ""
                      : field[x][y].type === "shipPart"
                      ? "--hit-ship"
                      : "--hit"
                  }`}
              >
                <div
                  className="exercises__second-session__fourth__field__cell__ship"
                  style={{
                    backgroundColor:
                      field[x][y].type === "sea"
                        ? undefined
                        : field[x][y].shipColor,
                  }}
                ></div>
              </div>
            ))
            .reverse()
        )
        .reverse()}
    </div>
  );
};

export default Field;
