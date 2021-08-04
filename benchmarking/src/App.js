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
  const calculatePercentile = (engineer) => {
    let lowerScoreSameTitle = 0;
    let sameTitles = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i].title === engineer.title) {
        sameTitles.push(data[i]);
        if (Number(data[i].coding_score) < Number(engineer.coding_score)) {
          lowerScoreSameTitle += 1;
        }
      }
      // Calculate percentile: number of values below "x" / total number of values * 100
      setPercentile((lowerScoreSameTitle / sameTitles.length) * 100);
    }
    console.log(lowerScoreSameTitle);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Find engineer by ID, set state
    for (let i = 1; i < data.length; i++) {
      if (String(data[i].candidate_id) === id) {
        await setEngineer(data[i]);
      }
    }
    calculatePercentile(engineer);
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
      {/* If an engineer with the ID is found, return results */}
      {Object.keys(engineer).length !== 0 ? (
        <div className="result">
          Engineer ID#{candidate_id}
          <br />
          Coding Skills: {Math.round(percentile)}
          th percentile!
          <br />
          Communication Skills:
        </div>
      ) : (
        <p>Please input a valid ID.</p>
      )}
    </div>
  );
};

export default App;
