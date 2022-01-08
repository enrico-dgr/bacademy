import "./style.css";

import * as GameController from "./gameController";
import * as GameMode from "./gameMode";

import EnemyField from "./EnemyField";
import Field from "./Field";
import Game from "./game";
import Idle from "./Idle";
import React from "react";

const Fourth = () => {
  const [game, setGame] = React.useState(new Game());
  const [error, setError] = React.useState("...");
  const [playerName, setPlayerName] = React.useState("");

  /**
   *
   * @param {{
   *  firstPlayer: string;
   *  secondPlayer: string;
   * }} e
   */
  const onConfirmIdle = (e) => {
    const res = GameController.start(game, e.firstPlayer, e.secondPlayer);

    if (res.valid === false) {
      setError(res.message);
      return;
    }

    setError("...");
    setPlayerName(e.firstPlayer);
    setGame({ ...game, ...res.game });
  };

  /**
   *
   * @param {{
   *  x: number;
   *  y: number;
   * }} e
   */
  const onConfirmPlacement = (e) => {
    const res = GameController.placeShip(game, playerName, e, "h");
    if (res.valid === false) {
      setError(res.message);
      return;
    }

    setError("...");
    setGame({ ...game, ...res.game });
  };

  /**
   *
   * @param {{
   *  x: number;
   *  y: number;
   * }} e
   */
  const onConfirmPlaying = (e) => {
    const res = GameController.attack(game, e);
    if (res.valid === false) {
      setError(res.message);
      return;
    }

    setError("...");
    setGame({ ...game, ...res.game });
  };

  const Legend = () => {
    return (
      <div className="exercises__second-session__fourth__legend">
        <p>Legend:</p>
        <div className="exercises__second-session__fourth__legend__list">
          {GameMode.STARTING_SHIPS.map((s) => (
            <div key={s.length}>
              <p>Length ship: {s.length}</p>
              <p>Color ship: {s.color}</p>
            </div>
          ))}
        </div>{" "}
      </div>
    );
  };

  /**
   *
   * @param { { game: Game } } p
   * @returns
   */
  const InputMode = (p) => {
    switch (p.game.phase) {
      case "idle":
        return <Idle onConfirm={onConfirmIdle} />;

      case "placement":
        return (
          <div className="exercises__second-session__fourth__placement">
            <Legend />

            <Field
              field={p.game.players[0].field}
              onConfirm={onConfirmPlacement}
            />
          </div>
        );
      case "playing":
        return (
          <div className="exercises__second-session__fourth__playing">
            <Legend />
            <div className="exercises__second-session__fourth__playing__fields">
              <Field field={p.game.players[0].field} onConfirm={() => {}} />
              <EnemyField
                field={p.game.players[1].field}
                onConfirm={onConfirmPlaying}
              />
            </div>
          </div>
        );
      case "ended":
        return (
          <div className="exercises__second-session__fourth__ended">
            <p className="exercises__second-session__fourth__ended__winner-message">
              Player '
              {p.game.players.find((pl) => pl.availableShipParts > 0).name}''
              won{" "}
            </p>
            <div className="exercises__second-session__fourth__ended__fields">
              <Field field={p.game.players[0].field} onConfirm={() => {}} />
              <EnemyField
                field={p.game.players[1].field}
                onConfirm={() => {}}
              />
            </div>
          </div>
        );
      default:
        return <p>None</p>;
    }
  };

  return (
    <section className="exercises__second-session__fourth exercise">
      <h1>Battleship</h1>
      <p>{error}</p>

      <InputMode game={game} />
    </section>
  );
};

export default Fourth;
