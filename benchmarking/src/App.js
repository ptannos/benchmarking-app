// import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./data";

console.log(data);

const App = () => {
  const [id, setId] = useState(0);
  const [engineer, setEngineer] = useState({});
  const [exist, setExist] = useState(true);
  const [codingPercentile, setCodingPercentile] = useState(0);
  const [communicationPercentile, setCommunicationPercentile] = useState(0);

  const { candidate_id } = engineer;

  const calculatePercentile = async (engineer) => {
    let lowerCodingScore = 0;
    let lowerCommunicationScore = 0;
    let sameTitles = [];
    // Find other engineers with the same title
    for (let i = 1; i < data.length; i++) {
      if (data[i].title === engineer.title) {
        sameTitles.push(data[i]);
        // Find other engineers, same title, lower scores
        if (Number(data[i].coding_score) < Number(engineer.coding_score)) {
          lowerCodingScore += 1;
        }
        if (
          Number(data[i].communication_score) <
          Number(engineer.communication_score)
        ) {
          lowerCommunicationScore += 1;
        }
      }
      // Percentile = number of values below "x" / total number of values * 100
      await setCodingPercentile((lowerCodingScore / sameTitles.length) * 100);
      await setCommunicationPercentile(
        (lowerCommunicationScore / sameTitles.length) * 100
      );
    }
  };

  // Recalculates percentiles every time engineer changes
  useEffect(() => {
    calculatePercentile(engineer);
  }, [engineer]);

  // As user starts typing, update ID on state
  const handleChange = async (evt) => {
    await setId(evt.target.value);
  };

  // When form is submitted, find engineer by ID
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i].candidate_id) === id) {
        await setEngineer(data[i]);
        await setExist(true);
        return;
      }
    }
    // If no engineer is found, set exist to false
    await setExist(false);
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
      {exist === true && Object.keys(engineer).length !== 0 ? (
        <div className="result">
          Engineer ID#{candidate_id}
          <br />
          Coding Skills: {Math.round(codingPercentile)}
          th percentile
          <br />
          Communication Skills: {Math.round(communicationPercentile)}th
          percentile
        </div>
      ) : null}

      {exist === false ? <p>Please input a valid ID.</p> : null}
    </div>
  );
};

export default App;
