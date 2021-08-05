import React, { useState, useEffect } from "react";
import { allEngineers, allCompanies } from "./datasources/data";

const App = () => {
  const [id, setId] = useState(0);
  const [engineer, setEngineer] = useState({});
  const [exist, setExist] = useState(true);
  const [codingPercentile, setCodingPercentile] = useState(0);
  const [communicationPercentile, setCommunicationPercentile] = useState(0);

  const calculatePercentile = async (candidate_id) => {
    let lowerCodingScore = 0;
    let lowerCommunicationScore = 0;
    let similarEngineers = [];
    let currEngineer = allEngineers.filter(
      (obj) => obj.candidate_id === candidate_id
    )[0];

    console.log("current", currEngineer);

    // Check if 2 companies are similar
    const areSimilar = (id1, id2) => {
      const companyOne = allCompanies.filter((obj) => {
        return obj.company_id === id1;
      });
      const companyTwo = allCompanies.filter((obj) => {
        return obj.company_id === id2;
      });
      return (
        Math.abs(
          Number(companyOne[0]["fractal_index"]) -
            Number(companyTwo[0]["fractal_index"])
        ) < 0.15
      );
    };

    // Find other engineers with same title, at other similar companies
    for (let i = 1; i < allEngineers.length; i++) {
      if (
        currEngineer &&
        allEngineers[i].title === currEngineer.title &&
        allEngineers[i].company_id !== currEngineer.company_id &&
        areSimilar(allEngineers[i].company_id, currEngineer.company_id)
      ) {
        similarEngineers.push(allEngineers[i]);
      }
    }

    // Total scores that are lower
    for (let i = 0; i < similarEngineers.length; i++) {
      if (
        Number(similarEngineers[i].coding_score) <
        Number(currEngineer.coding_score)
      ) {
        lowerCodingScore += 1;
      }
      if (
        Number(similarEngineers[i].communication_score) <
        Number(currEngineer.communication_score)
      ) {
        lowerCommunicationScore += 1;
      }
    }

    // Percentile = number of values below "x" / total number of values * 100
    await setCodingPercentile(
      (lowerCodingScore / similarEngineers.length) * 100
    );
    await setCommunicationPercentile(
      (lowerCommunicationScore / similarEngineers.length) * 100
    );
  };

  // Recalculates percentiles every time engineer changes
  useEffect(() => {
    calculatePercentile(id);
  }, [id]);

  // As user starts typing, update ID on state
  const handleChange = async (evt) => {
    await setId(evt.target.value);
  };

  // When form is submitted, find engineer by ID
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    for (let i = 1; i < allEngineers.length; i++) {
      if (String(allEngineers[i].candidate_id) === id) {
        await setEngineer(allEngineers[i]);
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
          <p>
            Coding Skills: {Math.round(codingPercentile)}
            th percentile
            <br />
            Communication Skills: {Math.round(communicationPercentile)}th
            percentile
          </p>
        </div>
      ) : null}

      {exist === false ? <p>Please input a valid ID.</p> : null}
    </div>
  );
};

export default App;
