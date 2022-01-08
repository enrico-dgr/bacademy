import React from "react";

/**
 *
 * @param {{
 *  onConfirm: { ( e: { firstPlayer: string; secondPlayer: string }) => void }
 * }} props
 * @returns { JSX.Element }
 */
const Idle = ({ onConfirm }) => {
  const [firstPlayer, setFirstPlayer] = React.useState("");
  const [secondPlayer, setSecondPlayer] = React.useState("");

  return (
    <div className="exercises__second-session__fourth__idle">
      <input
        type="text"
        placeholder="first player"
        value={firstPlayer}
        onChange={(e) => setFirstPlayer(e.target.value)}
      />
      <input
        type="text"
        placeholder="second player"
        value={secondPlayer}
        onChange={(e) => setSecondPlayer(e.target.value)}
      />
      <button
        onClick={() => {
          onConfirm({ firstPlayer, secondPlayer });
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Idle;
