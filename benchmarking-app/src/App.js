import React, { useState, useEffect } from "react";
import { allShibas, allShelters } from "./datasources/data";
import Percentile from "./Percentile";

const App = () => {
  const [id, setId] = useState(0);
  const [shiba, setShiba] = useState({});
  const [exist, setExist] = useState(true);
  const [shelter, setShelter] = useState("");

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

  console.log(shiba);
  return (
    <div className="App">
      <img
        src="https://media3.giphy.com/media/1YeNJK6FptDdq1q59K/200.gif"
        alt="shiba gif"
      />
      {Object.keys(shiba).length === 0 ? (
        <div className="form">
          <form id="App-form" onSubmit={handleSubmit}>
            <label htmlFor="id">Enter Shiba's ID:</label>
            <p>(Pick a number between 889 and 947)</p>
            <input name="id" onChange={handleChange} />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}

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
          <br />
          <button>More about {shiba.name}</button>
          <button onClick={() => setShiba({})}>Search Another</button>
          <Percentile shiba={shiba} allShibas={allShibas} />
        </div>
      ) : null}
      {/* If shiba does not exist, display a helpful message */}
      {exist === false ? <p>Please input a valid ID.</p> : null}
    </div>
  );
};

export default App;
