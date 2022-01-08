import "./First.css";

import React from "react";

/**
    :morra cinese:
    Scrivere un programma che chieda all'utente una stringa in ingresso, 
    la stringa vale: “carta”, “forbice” o “sasso”.
    
    Controllare che la stringa inserita sia corretta.
    il computer sceglierà in modo randomico un delle 3 casistiche.

    Il programma dovrà quindi effettuare i dovuti controlli e 
    dichiarare il vincitore (Player or CPU) secondo le note regole della “morra cinese” 
    (forbice vince su carta, carta vince su sasso, sasso vince su forbice).

    La partita termina con tre giocate e ci potrà essere un vincitore Player o CPU 
*/

const First = () => {
  /**
   * @description Changing the order or adding values
   * will break the `compare` function.
   */
  const VALUES = ["forbice", "sasso", "carta"];

  // STATES
  const [inputText, setInputText] = React.useState("");
  const [userValue, setUserValue] = React.useState("");
  const [cpuValue, setCpuValue] = React.useState("");
  const [cpuValueToPrint, setCpuValueToPrint] = React.useState("");
  const [wonMatches, setWonMatches] = React.useState(0);
  const [lostMatches, setLostMatches] = React.useState(0);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState("");

  /**
   *
   * @returns {string} Random value in `VALUES`
   */
  const random = () => VALUES[Math.round(Math.random() * 2)];

  React.useEffect(() => {
    if (userValue !== "") {
      if (result !== "") setResult("");

      setCpuValue(random());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userValue]);

  React.useEffect(() => {
    if (userValue !== "" && cpuValue !== "") {
      setCpuValueToPrint(cpuValue);

      // CPU scissors
      if (cpuValue === "forbice") {
        if (userValue === "sasso") {
          setWonMatches((v) => v + 1);
        } else if (userValue === "carta") {
          setLostMatches((v) => v + 1);
        }
      }
      // CPU rock
      else if (cpuValue === "sasso") {
        if (userValue === "carta") {
          setWonMatches((v) => v + 1);
        } else if (userValue === "forbice") {
          setLostMatches((v) => v + 1);
        }
      }
      // CPU paper
      else if (cpuValue === "carta") {
        if (userValue === "forbice") {
          setWonMatches((v) => v + 1);
        } else if (userValue === "sasso") {
          setLostMatches((v) => v + 1);
        }
      }

      // Restart
      setUserValue("");
      setCpuValue("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpuValue]);

  React.useEffect(() => {
    if (lostMatches > 1) {
      setResult(`CPU wins`);
      setWonMatches(0);
      setLostMatches(0);
      //   setCpuValue("");
      setUserValue("");
    } else if (wonMatches > 1) {
      setResult(`User wins`);
      setWonMatches(0);
      setLostMatches(0);
      //   setCpuValue("");
      setUserValue("");
    }
  }, [wonMatches, lostMatches]);

  /**
   *
   * @param {string} text
   * @returns {boolean}
   * @description Return `true` if input is
   * `carta`|`sasso`|`forbice` (values in `const VALUES` above),
   * `false` otherwise
   */
  const isValid = (text) => VALUES.includes(text);

  return (
    <section className="exercises__second-session__first exercise">
      <h1>Rock paper scissors</h1>
      <div className="exercises__second-session__first__scoreboard">
        <p>User points: {wonMatches}</p>
        <p>CPU points: {lostMatches}</p>
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        onClick={() => {
          if (isValid(inputText)) {
            setUserValue(inputText);
            setError("");
            return;
          }
          setError("Input is not valid");
        }}
      >
        Try
      </button>
      <p>{cpuValueToPrint === "" ? "" : "CPU's hand: " + cpuValueToPrint}</p>
      <p>{result}</p>
      {error === "" ? undefined : <p>{error}</p>}
    </section>
  );
};

export default First;
