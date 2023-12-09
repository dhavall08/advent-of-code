const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(line) {
  const arr = [];

  for (let i = 0; i < line.length - 1; i++) {
    arr.push(line[i + 1] - line[i]);
  }

  if (arr.every((o) => o === 0)) {
    return line[0];
  } else {
    return line[0] - getOutput(arr);
  }
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

let sum = 0;
const lines = inputFile.split(/(?:\r?\n){1}/);

lines.forEach((line) => {
  sum += getOutput(line.split(" ").map((o) => Number(o)));
});

console.log("Answer:", sum);
