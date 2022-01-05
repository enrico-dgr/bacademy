import "../style.css";

import First from "./First";
import Second from "./Second";
import Third from "./Third";

function SecondSession() {
  return (
    <section className="exercises__first-session">
      <h1>Second Session</h1>
      <First />
      <Second />
      <Third />
    </section>
  );
}

export default SecondSession;
