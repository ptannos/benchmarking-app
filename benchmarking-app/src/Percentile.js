import React, { useEffect, useState } from "react";
import Chart from "./Chart";

const Percentile = (props) => {
  const { shiba, allShibas } = props;
  const [adaptabilityPercentile, setAdaptabilityPercentile] = useState(0);
  const [agilityPercentile, setAgilityPercentile] = useState(0);
  const [friendlinessPercentile, setFriendlinessPercentile] = useState(0);
  const [intelligencePercentile, setIntelligencePercentile] = useState(0);

  const calculatePercentile = async (shiba) => {
    // Find other shibas in the same age group (puppy, adult, or senior)
    let currShiba = shiba;

    let similarShibas = allShibas.filter(
      (shiba) => currShiba && shiba.age_group === currShiba.age_group
    );

    const getScore = (traitScore) => {
      let lowerScores = 0;

      for (let i = 0; i < similarShibas.length; i++) {
        if (
          Number(similarShibas[i][traitScore]) < Number(currShiba[traitScore])
        ) {
          lowerScores += 1;
        }
      }
      let score = (lowerScores / similarShibas.length) * 100;

      return score;
    };

    // Percentile = number of values below "x" / total number of values * 100
    await setAdaptabilityPercentile(getScore("adaptability_score"));
    await setAgilityPercentile(getScore("agility_score"));
    await setFriendlinessPercentile(getScore("friendliness_score"));
    await setIntelligencePercentile(getScore("intelligence_score"));
  };
  console.log(props);

  // Recalculates percentiles every time shiba changes
  useEffect(() => {
    calculatePercentile(shiba);
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
      <Chart />
    </>
  );
};

export default Percentile;
