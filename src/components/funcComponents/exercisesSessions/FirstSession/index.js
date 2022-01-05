import "../style.css";
import "./style.css";

import Fifth from "./Fifth";
import First from "./First";
import Fourth from "./Fourth";
import Second from "./Second";
import Sixth from "./Sixth";
import Third from "./Third";

function FirstSession() {
  return (
    <section className="exercises__first-session">
      <h1>First Session</h1>
      <First />
      <Second />
      <Third />
      <Fourth />
      <Fifth />
      <Sixth />
    </section>
  );
}

export default FirstSession;
