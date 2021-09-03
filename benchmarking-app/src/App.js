import React, { useState, useEffect } from "react";
import { allShibas, allShelters } from "./datasources/data";

const App = () => {
  const [id, setId] = useState(0);
  const [shiba, setShiba] = useState({});
  const [exist, setExist] = useState(true);
  const [adaptabilityPercentile, setAdaptabilityPercentile] = useState(0);
  const [agilityPercentile, setAgilityPercentile] = useState(0);
  const [friendlinessPercentile, setFriendlinessPercentile] = useState(0);
  const [intelligencePercentile, setIntelligencePercentile] = useState(0);
  const [shelter, setShelter] = useState("");

  const calculatePercentile = async (shiba_id) => {
    let currShiba = allShibas.filter((obj) => obj.shiba_id === shiba_id)[0];

    // Find other shibas in the same age group (puppy, adult, or senior)
    let similarShibas = allShibas.filter(
      (shiba) => currShiba && shiba.age_group === currShiba.age_group
    );

    // Total scores that are lower
    let lowerAdaptabilityScore = 0;
    let lowerAgilityScore = 0;
    let lowerFriendlinessScore = 0;
    let lowerIntelligenceScore = 0;

    for (let i = 0; i < similarShibas.length; i++) {
      if (
        Number(similarShibas[i].adaptability_score) <
        Number(currShiba.adaptability_score)
      ) {
        lowerAdaptabilityScore += 1;
      }
      if (
        Number(similarShibas[i].agility_score) < Number(currShiba.agility_score)
      ) {
        lowerAgilityScore += 1;
      }
      if (
        Number(similarShibas[i].friendliness_score) <
        Number(currShiba.friendliness_score)
      ) {
        lowerFriendlinessScore += 1;
      }
      if (
        Number(similarShibas[i].intelligence_score) <
        Number(currShiba.intelligence_score)
      ) {
        lowerIntelligenceScore += 1;
      }
    }

    // Percentile = number of values below "x" / total number of values * 100
    console.log("lower score", lowerAdaptabilityScore);
    await setAdaptabilityPercentile(
      (lowerAdaptabilityScore / similarShibas.length) * 100
    );
    await setAgilityPercentile(
      (lowerAgilityScore / similarShibas.length) * 100
    );
    await setFriendlinessPercentile(
      (lowerFriendlinessScore / similarShibas.length) * 100
    );
    await setIntelligencePercentile(
      (lowerIntelligenceScore / similarShibas.length) * 100
    );
  };

  // Recalculates percentiles every time shiba changes
  useEffect(() => {
    calculatePercentile(shiba.shiba_id);
  }, [shiba]);

  const getShelter = async (shiba) => {
    let currShelter = allShelters.filter(
      (obj) => obj.shelter_id === shiba.shelter_id
    )[0];
    console.log(currShelter);
    await setShelter(currShelter);
  };

  // As user starts typing, update ID on state
  const handleChange = async (evt) => {
    await setId(evt.target.value);
  };

  // When form is submitted, find shiba by ID
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    for (let i = 1; i < allShibas.length; i++) {
      if (String(allShibas[i].shiba_id) === id) {
        await setShiba(allShibas[i]);
        await getShelter(allShibas[i]);
        await setExist(true);
        return;
      }
    }
    // If no shiba is found, set exist to false
    await setExist(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Shiba Inu Benchmarking App</p>
      </header>
      <img
        src="https://media3.giphy.com/media/1YeNJK6FptDdq1q59K/200.gif"
        alt="shiba gif"
      />

      <div className="form">
        <form id="App-form" onSubmit={handleSubmit}>
          <label htmlFor="id">Enter Shiba's ID:</label>
          <p>(Pick a number between 889 and 947)</p>
          <input name="id" onChange={handleChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* If a shiba with the ID is found, return results */}
      {exist === true && Object.keys(shiba).length !== 0 ? (
        <div className="result">
          <p>
            Name: {shiba.name}
            <br />
            Age group: {shiba.age_group}
          </p>
          <br />
          {/* {console.log(shelter.shelter_name)} */}
          Available for adoption at:{" "}
          {Object.keys(shelter) !== 0 ? shelter.shelter_name : ""}
          <p>
            Adaptability: {Math.round(adaptabilityPercentile)}
            th percentile
            <br />
            Agility: {Math.round(agilityPercentile)}th percentile
            <br />
            Friendliness: {Math.round(friendlinessPercentile)}th percentile
            <br />
            Intelligence: {Math.round(intelligencePercentile)}th percentile
          </p>
        </div>
      ) : null}
      {/* If shiba does not exist, display a helpful message */}
      {exist === false ? <p>Please input a valid ID.</p> : null}
    </div>
  );
};

export default App;
