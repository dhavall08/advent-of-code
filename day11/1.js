const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */

function getOutput(S) {
  let emptyX = {};
  let emptyY = {};

  // expand X
  for (let i = 0; i < S.length; i++) {
    for (let j = 0; j < S[i].length; j++) {
      if (S[i][j] === "#") {
        emptyX[i] = false;
        emptyY[j] = false;
      }
    }

    if (emptyX[i] !== false) {
      S.splice(i, 0, [...S[i]]);
      i++;
    }
  }

  // expand Y, number them and store positions
  let count = 1;
  let positions = {};

  for (let i = 0; i < S.length; i++) {
    let yTemp = 0;
    for (let j = 0; j < S[i].length; j++) {
      if (emptyY[j - yTemp] !== false) {
        S[i].splice(j, 0, S[i][j]);
        j++;
        yTemp++;
      }

      if (S[i][j] === "#") {
        positions[count] = {
          x: i,
          y: j,
        };

        S[i][j] = count++;
      }
    }
  }

  let shortest = {};

  // create pairs and for each pair, find distances between pairs
  Object.entries(positions).forEach(([_, { x, y }], idx, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (idx === i) {
        continue;
      }

      if (shortest[`${Math.min(i, idx)}-${Math.max(i, idx)}`]) {
        continue;
      }

      const [_, { x: x2, y: y2 }] = arr[i];
      let dMin = Math.abs(x - x2) + Math.abs(y - y2);
      shortest[`${Math.min(i, idx)}-${Math.max(i, idx)}`] = dMin;
    }
  });

  // make sum of all those pairs
  return Object.values(shortest).reduce((acc, v) => acc + v, 0);
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);
const arr = lines.map((l) => l.split(""));
const result = getOutput(arr);

console.log("Answer:", result);
// 9742154