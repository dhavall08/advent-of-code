const fs = require("fs");
const path = require("path");

var DIR;
(function (DIR) {
  DIR["up"] = "U";
  DIR["down"] = "D";
  DIR["left"] = "L";
  DIR["right"] = "R";
})(DIR || (DIR = {}));

function getDirectionPoint(d, i, j, count) {
  switch (d) {
    case DIR.right:
      return [i, j + count];
    case DIR.down:
      return [i + count, j];
    case DIR.left:
      return [i, j - count];
    case DIR.up:
      return [i - count, j];
    default:
      throw new Error("Wrong direction.");
  }
}

const Vec = function (x, y) {
  this.x = x;
  this.y = y;
};

function getOutput(S) {
  S;
  let A = {};

  let x = 0,
    y = 0;
  for (let line = 0; line < S.length; line++) {
    const direction = S[line][0];
    const count = Number(S[line][1]);

    // for (let j = 1; j <= count; j++) {

    [x, y] = getDirectionPoint(direction, x, y, count);

    if (!A[x]) {
      A[x] = [y];
    } else {
      A[x].push(y);
    }
    // }
  }

  A;
  const total = A.reduce((ac, row) => {
    const first = row.indexOf("#");
    const last = row.lastIndexOf("#");

    return ac + last - first + 1;
  }, 0);

  return total;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./sample.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);
const arr = lines.map((l) => l.split(" "));
const result = getOutput(arr);

console.log("Answer:", result);
// wrong: 2314
