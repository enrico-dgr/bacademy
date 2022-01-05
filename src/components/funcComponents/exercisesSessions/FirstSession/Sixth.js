const Sixth = () => {
  const sixth = {
    /**
     *
     * @param {string} stringArr
     */
    filterOnlyVocals: (stringArr) => {
      // string type check
      if (typeof stringArr !== "string") {
        console.log("Parameter must be a string.");
        return;
      }

      const onlyTheVocals = stringArr.replace(/[bcdfghjklmnpqrstvwxysz]/gi, "");

      console.log(onlyTheVocals);
    },
  };

  return (
    <section className="exercise">
      <h1>Sixth</h1>
      <p>
        <input
          onChange={(e) => sixth.filterOnlyVocals(e.target.value)}
          type={"text"}
        />{" "}
        to only vocals.
      </p>
    </section>
  );
};

export default Sixth;
