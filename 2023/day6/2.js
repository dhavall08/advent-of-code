const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput([timeString, distanceString]) {
  const time = +timeString.split(/:\s*/)[1].replace(/\s+/g, "");
  const distance = +distanceString.split(/:\s*/)[1].replace(/\s+/g, "");

  let winningWays = 0;
  const coveredDistance = distance;

  for (let j = 1; j <= time; j++) {
    if ((time - j) * j > coveredDistance) {
      winningWays++;
    }
  }

  return winningWays;
}
/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const input = inputFile.split("\n");

const output = getOutput(input);
console.log("Answer:", output);
