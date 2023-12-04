const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getMax(str, regex) {
  return Math.max(...str.match(regex));
}

function getOutput(games) {
  let sumIDs = 0;

  games.forEach((game) => {
    const red = getMax(game, /\d+(?=\sred)/g);
    const green = getMax(game, /\d+(?=\sgreen)/g);
    const blue = getMax(game, /\d+(?=\sblue)/g);

    sumIDs += red * green * blue;
  });

  return sumIDs;
}
/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const lines = input.split("\n");
const output = getOutput(lines);
console.log("Answer:", output);
