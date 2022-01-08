import "../style.css";

import First from "./First";
import Fourth from "./Fourth";
import React from "react";
import Second from "./Second";
import Third from "./Third";

const SecondSession = () => {
  const [index, setIndex] = React.useState(1);

  /**
   *
   * @param { { index: number } } props
   */
  const Exercises = ({ index }) => {
    switch (index) {
      case 1:
        return <First />;
      case 2:
        return <Second />;
      case 3:
        return <Third />;
      case 4:
        return <Fourth />;
      default:
        return <p>None</p>;
    }
  };

  return (
    <section className="exercises__second-session">
      <h1>Second Session</h1>
      <select
        name="exercise"
        id="exercises__second-session__exercise"
        // value={index + ""}
        onChange={(e) => setIndex(Number(e.target.value))}
      >
        <option value="1">First</option>
        <option value="2">Second</option>
        <option value="3">Third</option>
        <option value="4">Fourth</option>
      </select>
      <Exercises index={index} />
    </section>
  );
};

export default SecondSession;
