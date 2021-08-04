const csvFile = `candidate_id,communication_score,coding_score,title,company_id
889,114028,180944,Engineer,2
890,62734,64000,Engineer,2
891,167656,231216,Engineer,2
892,163198,202131,Engineer,2
893,109561,137014,Engineer,2
894,167057,240189,Engineer,2
895,70856,80461,Engineer,2
896,138826,151598,Senior Engineer,2
897,196348,221857,Senior Engineer,2
898,142766,171692,Senior Engineer,2
899,103177,149613,Senior Engineer,3
900,61456,63922,Senior Engineer,3
901,143908,221594,Senior Engineer,3
902,122314,172996,Senior Engineer,3
903,172771,182431,Engineer,3
904,106172,144800,Engineer,3
905,52411,130449,Engineer,3
906,134927,158522,Engineer,3
907,103008,120101,Engineer,3
908,120063,155818,Engineer,3
909,117289,142570,Engineer,3
910,194472,229047,Engineer,3
911,92789,121591,Engineer,3
912,191154,192143,Engineer,3
913,106351,143867,Engineer,4
914,101478,123471,Engineer,4
915,189456,211567,Senior Engineer,4
916,86598,137150,Senior Engineer,4
917,153313,193111,Senior Engineer,4
918,76857,144194,Senior Engineer,4
919,138657,178472,Senior Engineer,4
920,68158,103852,Senior Engineer,4
921,155124,177076,Senior Engineer,4
922,129871,190076,Engineer,1
923,164465,177197,Engineer,1
924,127774,130350,Engineer,1
925,51498,70485,Engineer,1
926,167853,229371,Engineer,1
927,76414,112383,Engineer,1
928,58080,74931,Engineer,1
929,195243,218958,Engineer,1
930,140147,161120,Engineer,1
931,95456,115845,Engineer,1
932,192298,242685,Engineer,1
933,112159,145507,Engineer,1
934,113644,150766,Engineer,5
935,65389,82842,Engineer,5
936,154939,173657,Engineer,5
937,95392,127356,Engineer,5
938,67987,100751,Engineer,5
939,111975,149992,Engineer,5
940,199461,253532,Engineer,5
941,150667,170721,Engineer,5
942,89347,99940,Engineer,5
943,80593,155505,Engineer,5
944,95437,122643,Engineer,5
945,114747,148033,Engineer,5
946,74387,134410,Engineer,5
947,85180,133854,Engineer,5`;

// Split into separate lines
const lines = csvFile.split("\n");

const headers = lines[0].split(",");

let data = [];

// Get each row of data, ignoring the headers
for (let i = 1; i < lines.length; i++) {
  let row = lines[i].split(",");
  data[i] = {};
  // Match with headers with the same index, then send to data
  for (let j = 0; j < row.length; j++) {
    data[i][headers[j]] = row[j];
  }
}

export default data;
