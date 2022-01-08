import React from "react";

const Second = () => {
  const TAXES = [
    {
      above: 0,
      tax: 10,
    },
    {
      above: 10000,
      tax: 7,
    },
    {
      above: 20000,
      tax: 5,
    },
    {
      above: 30000,
      tax: 3,
    },
  ];

  // STATES
  const [error, setError] = React.useState("");
  const [inputNum, setInputNum] = React.useState(0);
  const [result, setResult] = React.useState(0);

  /**
   * @param {number} amount
   */
  const applyTaxes = (amount, taxIndex = 0) => {
    let tax = 0;

    // amount > of any tax
    if (taxIndex + 1 === TAXES.length) {
      tax = (TAXES[taxIndex].tax / 100) * (amount - TAXES[taxIndex].above);

      return tax;
    }

    // amount inside an interval
    if (amount - TAXES[taxIndex + 1].above < 0) {
      tax = (TAXES[taxIndex].tax / 100) * (amount - TAXES[taxIndex].above);

      return tax;
    }

    // continue
    tax =
      (TAXES[taxIndex].tax / 100) *
      (TAXES[taxIndex + 1].above - TAXES[taxIndex].above);

    return applyTaxes(amount, taxIndex + 1) + tax;
  };

  /**
   * @param {number} amount
   */
  const isValid = (amount) => {
    // positive
    if (amount <= 0) {
      setError("Number must be positive");
      return false;
    }

    return true;
  };

  const onClick = (amount) => {
    if (isValid(amount)) {
      setResult(applyTaxes(amount));
    }
  };

  return (
    <section className="exercises__second-session__second exercise">
      <h1>Annual income tax</h1>
      <input
        type="number"
        value={inputNum}
        onChange={(e) => setInputNum(Number(e.target.value))}
        onKeyDown={(e) => (e.key !== "Enter" ? undefined : onClick(inputNum))}
      />
      <button onClick={() => onClick(inputNum)}>Calculate</button>
      <p>{result === 0 ? "" : "Result: " + result}</p>
      {error === "" ? undefined : <p>{error}</p>}
    </section>
  );
};

export default Second;
