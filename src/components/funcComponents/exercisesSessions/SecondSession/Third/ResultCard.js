import "./ResultCard.css";
/**
 * @param {{
 *   name: string;
 *   surname: string;
 *   resultPhrase: string;
 * }}
 */
const ResultCard = (
  { name, surname, resultPhrase } = {
    name: "none",
    surname: "none",
    resultPhrase: "none",
  }
) => {
  return (
    <div className="exercises__second-session__third__result-card exercise">
      <p>Name: {name !== "" ? name : "none"}</p>
      <p>Surname: {surname !== "" ? surname : "none"}</p>
      <p>Result: {resultPhrase !== "" ? resultPhrase : "none"}</p>
    </div>
  );
};

export default ResultCard;
