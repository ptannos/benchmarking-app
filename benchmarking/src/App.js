// import "./App.css";
import React, { useState } from "react";

const dummyData = [
  {
    candidate_id: 889,
    communication_score: 114028,
    coding_score: 180944,
    title: "Engineer",
    company_id: 2,
  },
  {
    candidate_id: 890,
    communication_score: 62734,
    coding_score: 64000,
    title: "Engineer",
    company_id: 2,
  },
];

const App = () => {
  const [id, setId] = useState(0);
  const [engineer, setEngineer] = useState({});
  const [percentile, setPercentile] = useState(0);

  console.log(dummyData);

  // As user starts typing, update ID on state
  const handleChange = (evt) => {
    console.log(typeof evt.target.value);
    setId(evt.target.value);
  };

  // As user submits, look up engineer by ID and return their percentile
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Find engineer by ID
    for (let i = 0; i < dummyData.length; i++) {
      if (String(dummyData[i].candidate_id) === id) {
        setEngineer(dummyData[i]);
      }
    }
  };

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
    </div>
  );
};

export default App;
