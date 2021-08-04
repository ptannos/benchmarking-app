// import "./App.css";
import React, { useState } from "react";
import data from "./data";

console.log(data);

const App = () => {
  const [id, setId] = useState(0);
  const [engineer, setEngineer] = useState({});
  const [percentile, setPercentile] = useState(0);

  const { candidate_id, communication_score, coding_score, title, company_id } =
    engineer;

  // As user starts typing, update ID on state
  const handleChange = (evt) => {
    setId(evt.target.value);
  };

  // As user submits, look up engineer by ID and return their percentile
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Find engineer by ID, set state
    for (let i = 1; i < data.length; i++) {
      if (String(data[i].candidate_id) === id) {
        setEngineer(data[i]);
      }
    }

    // Calculate percentile: number of values below "x" / total number of values * 100
    let totalLower = 0;
    for (let i = 1; i < data.length; i++) {
      if (Number(data[i].coding_score) < Number(engineer.coding_score)) {
        totalLower += 1;
      }
      setPercentile((totalLower / data.length) * 100);
    }
  };
  console.log("percentile", percentile);
  return (
    <div className="App">
      <header className="App-header">
        <p>Benchmarking App</p>
      </header>
      <div className="form">
        <form id="App-form" onSubmit={handleSubmit}>
          <label htmlFor="id">Enter Engineer's ID:</label>
          <br />
          <input name="id" onChange={handleChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="result">
        Engineer ID#{candidate_id} has a coding score of {coding_score}, a
        communication score of {communication_score}, and is in the{" "}
        {Math.round(percentile)}
        th percentile!
      </div>
    </div>
  );
};

export default App;
