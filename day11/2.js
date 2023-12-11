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
  }

  // expand Y, number them and store positions
  let count = 1;
  let positions = {};

  for (let i = 0; i < S.length; i++) {
    for (let j = 0; j < S[i].length; j++) {
      if (S[i][j] === "#") {
        positions[count] = {
          x: i,
          y: j,
        };

        S[i][j] = count++;
      }
    }
  }
  S;

  for (i = 0; i < S.length; i++) {
    if (emptyY[i] === false) {
      delete emptyY[i];
    } else {
      emptyY[i] = true;
    }
  }

  for (i = 0; i < S.length; i++) {
    if (emptyX[i] === false) {
      delete emptyX[i];
    } else {
      emptyX[i] = true;
    }
  }

  let shortest = {};
  let emptyVArr = Object.keys(emptyY).map((o) => Number(o));
  let emptyHArr = Object.keys(emptyX).map((o) => Number(o));

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

      const lessY = Math.min(y, y2);
      const moreY = Math.max(y, y2);

      let times = 1000000 - 1;

      // empty horizontal lines between x and x2
      const emptyHLines = emptyHArr.filter((a) => a > x && a < x2).length;

      const emptyVLines = emptyVArr.filter(
        (a) => a > lessY && a < moreY
      ).length;

      let dMin =
        Math.abs(x2 - x + times * emptyHLines) +
        Math.abs(moreY - lessY + times * emptyVLines);

      shortest[`${Math.min(i, idx)}-${Math.max(i, idx)}`] = dMin;
    }
  });

  // make sum of all those pairs
  return Object.values(shortest).reduce((acc, v) => acc + v, 0);
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./sample.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);
const arr = lines.map((l) => l.split(""));
const result = getOutput(arr);

console.log("Answer:", result);
// 411142919886
