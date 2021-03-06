import shelterList from "./shelters.js";
import shibaList from "./shibas.js";

const csvToObject = (list) => {
  // Split into separate lines, get headers
  const lines = list.split("\n");
  const headers = lines[0].split(",");

  let data = [];

  // Get each row of data, starting at 1 to ignore the headers
  for (let i = 1; i < lines.length; i++) {
    let row = lines[i].split(",");
    data[i] = {};
    // Match fields with headers of the same index
    for (let j = 0; j < row.length; j++) {
      data[i][headers[j]] = row[j];
    }
  }
  return data;
};

export const allShibas = csvToObject(shibaList);
export const allShelters = csvToObject(shelterList);
