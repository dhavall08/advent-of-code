const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput([timeString, distanceString]) {
  const time = timeString
    .split(/:\s*/)[1]
    .split(/\s+/)
    .map((o) => Number(o));

  const distance = distanceString
    .split(/:\s*/)[1]
    .split(/\s+/)
    .map((o) => Number(o));

  let multiplyWinningWays = 1;

  for (let i = 0; i < time.length; i++) {
    let winningWays = 0;
    const coveredDistance = distance[i];

    for (let j = 1; j <= time[i]; j++) {
      if ((time[i] - j) * j > coveredDistance) {
        winningWays++;
      }
    }

    multiplyWinningWays *= winningWays;
  }

  return multiplyWinningWays;
}
/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const input = inputFile.split("\n");

const output = getOutput(input);
console.log("Answer:", output);
