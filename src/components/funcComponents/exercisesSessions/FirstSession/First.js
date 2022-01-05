const First = () => {
  const ContinuaFinoRecur = (DIVIDEND = 3) => {
    let i = DIVIDEND + 1;

    i = Math.random() * 15;
    i = Math.round(i);
    console.log(i);

    if (i % DIVIDEND !== 0 || i === 0) ContinuaFinoRecur();
  };

  const first = {
    ContinuaFino: () => {
      // const DIVIDEND = 3;
      // let i = DIVIDEND + 1;

      console.log("---- START ----");

      ContinuaFinoRecur();

      // while (i % DIVIDEND !== 0 || i === 0) {
      //   i = Math.random() * 15;
      //   i = Math.round(i);
      //   console.log(i);
      // }

      console.log("---- END ----");
    },
  };

  return (
    <section className="exercise">
      <h1>First</h1>
      <button onClick={first.ContinuaFino}>
        Continue until a multiple of 3 is found. <br /> (See the console)
      </button>
    </section>
  );
};

export default First;
