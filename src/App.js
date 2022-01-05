import "./App.css";

import Exercises from "./screens/Exercises";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Exercises />
    </div>
  );
}

export default App;
