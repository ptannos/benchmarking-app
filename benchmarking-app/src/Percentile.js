import React, { useEffect, useState } from "react";

const Percentile = (props) => {
  const { shiba, allShibas } = props || {};
  const [adaptabilityPercentile, setAdaptabilityPercentile] = useState(0);
  const [agilityPercentile, setAgilityPercentile] = useState(0);
  const [friendlinessPercentile, setFriendlinessPercentile] = useState(0);
  const [intelligencePercentile, setIntelligencePercentile] = useState(0);

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
  console.log(props);

  // Recalculates percentiles every time shiba changes
  useEffect(() => {
    calculatePercentile(shiba.shiba_id);
  }, [shiba]);

  return (
    <>
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
    </>
  );
};

export default Percentile;
