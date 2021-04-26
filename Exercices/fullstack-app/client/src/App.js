import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/count");
        response.ok && setCount(await response.json());
      } catch (err) {
        console.log(err);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Count : {count} </h1>
      </header>
    </div>
  );
}

export default App;
