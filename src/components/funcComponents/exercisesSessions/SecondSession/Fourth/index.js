import "./style.css";

import * as GameController from "./gameController";

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
          <Field
            field={p.game.players[0].field}
            onConfirm={onConfirmPlacement}
          />
        );
      case "playing":
        return (
          <div className="exercises__second-session__fourth__playing">
            <Field field={p.game.players[0].field} onConfirm={() => {}} />
            <EnemyField
              field={p.game.players[1].field}
              onConfirm={onConfirmPlaying}
            />
          </div>
        );
      case "ended":
        return (
          <>
            <p>
              Player{" "}
              {p.game.players.find((pl) => pl.availableShipParts > 0).name} won{" "}
            </p>
          </>
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
