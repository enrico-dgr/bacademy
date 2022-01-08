import "./style.css";

import React from "react";
import ResultCard from "./ResultCard";

/*
    Scrivere un programma che calcoli il risultato dell’esame di uno studente.
    Il programma prenderà in ingresso:
    Il voto ottenuto nella prova scritta (variabile tra -8 e +8)
    Il voto ottenuto nella prova pratica (variabile tra 0 e 24)
    Memorizzati questi dati procederà al calcolo del risultato finale in trentesimi procedendo come segue:
    Il risultato finale è la somma dei risultati.
    se il voto di scritta è minore (o uguale) di zero e la somma dei voti di scritta e pratica è maggiore di 18 lo studente è bocciato.
    se il voto di scritta è minore (o uguale) di zero e il voto di pratica è minore di 18 il programmalo studente è bocciato.
    se il voto di scritta è maggiore di zero e la somma dei voti di scritta e pratica è minore di 18 lo studente è bocciato.
    se la somma di scritta e pratica vale 31 o 32 il programma stampa: “congratulazioni: 30 e lode”
    in tutti gli altri casi lo studente è promosso e viene riportato il voto calcolato.
    Fase 2
    Il Docente desidera avere un programma, per una data sessione d'esame, per ottenere il numero totale degli esami sostenuti,
    media dei voti, numero delle bocciature (<18) e numero delle eccellenze (30 o 30 e lode)
*/

const Third = () => {
  /**
   * @type {[[
   *  {
   *   id: number;
   *   name: string;
   *   surname: string;
   *   writtenTestVote: number;
   *   practiceTestVote: number;
   *  }
   * ],[function]]}
   */
  const [results, setResults] = React.useState([]);
  const [numExams, setNumExams] = React.useState(0);
  const [average, setAverage] = React.useState(0);
  const [numRejected, setNumRejected] = React.useState(0);
  const [numLaude, setNumLaude] = React.useState(0);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [writtenTestVote, setWrittenTestVote] = React.useState(0);
  const [practiceTestVote, setPracticeTestVote] = React.useState(0);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setNumExams(results.length);

    let numR = 0;
    let numL = 0;

    const votes = results.map((r) => {
      const evaluation = evaluateExam(r.writtenTestVote, r.practiceTestVote);
      if (evaluation === "l") numL++;
      if (evaluation === "r") numR++;

      return r.practiceTestVote + r.writtenTestVote;
    });
    let buffer = 0;

    votes.forEach((v) => (buffer += v));

    buffer /= votes.length !== 0 ? votes.length : 1;

    setAverage(buffer);
    setNumRejected(numR);
    setNumLaude(numL);
  }, [results]);

  /**
   *
   * @param {number} written
   * @param {number} practice
   * @returns {'r'|'p'|'l'} `'r'` for rejected, `'p'` for promoted and `'l'` for laude.
   */
  const evaluateExam = (written, practice) => {
    if (written <= 0) return "r";
    if (written + practice < 18) return "r";
    if (written + practice > 30) return "l";
    return "p";
  };

  /**
   *
   * @param {number} written
   * @param {number} practice
   * @returns {string}
   */
  const resultPhrase = (written, practice) => {
    switch (evaluateExam(written, practice)) {
      case "r":
        return "Bocciato";
      case "p":
        return "Promosso con " + (written + practice);
      case "l":
        return "Congratulazioni, 30 e lode";
      default:
        return "unknown";
    }
  };

  /**
   * @param {number} vote
   */
  const validateWrittenVote = (vote) => vote > -9 && vote < 9;
  /**
   * @param {number} vote
   */
  const validatePracticeVote = (vote) => vote > -1 && vote < 25;

  return (
    <section className="exercises__second-session__third exercise">
      <h1>Exams overview</h1>
      <section>
        <b>Statistics</b>
        <p>Number of exams: {numExams}</p>
        <p>Average vote: {average}</p>
        <p>Number of rejected: {numRejected}</p>
        <p>Number of '30 cum laude': {numLaude}</p>
      </section>
      <section>
        <b>Insert data</b>

        <input
          type="text"
          value={name}
          placeholder="Student name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={surname}
          placeholder="Student surname"
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="number"
          value={writtenTestVote}
          placeholder="Written test vote"
          onChange={(e) => setWrittenTestVote(Number(e.target.value))}
        />
        <input
          type="number"
          value={practiceTestVote}
          placeholder="Written test vote"
          onChange={(e) => setPracticeTestVote(Number(e.target.value))}
        />
      </section>
      <div>
        <button
          onClick={() => {
            if (!validatePracticeVote(practiceTestVote)) {
              setError("Practice vote can be between 0 and 24 (both included)");
              return;
            }
            if (!validateWrittenVote(writtenTestVote)) {
              setError("Written vote can be between -8 and 8 (both included)");
              return;
            }
            setResults((v) => [
              ...v,
              {
                id: v.length,
                name,
                surname,
                writtenTestVote,
                practiceTestVote,
              },
            ]);
            setError("");
          }}
        >
          Add
        </button>
        <button onClick={() => setResults([])}>Reset</button>
      </div>
      <p>{error === "" ? "" : error}</p>
      <div className="exercises__second-session__third__cards-list">
        {results.length < 1
          ? undefined
          : results.map((result, i) => (
              <div key={i + result.name}>
                <ResultCard
                  name={result.name}
                  surname={result.surname}
                  resultPhrase={resultPhrase(
                    result.writtenTestVote,
                    result.practiceTestVote
                  )}
                />
              </div>
            ))}
      </div>
    </section>
  );
};

export default Third;
