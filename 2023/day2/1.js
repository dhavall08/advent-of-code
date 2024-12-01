const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function checkColorPossibility(str, regex, { max }) {
  return str.match(regex).every((num) => num <= max);
}

function getOutput(games) {
  let sumIDs = 0;

  games.forEach((game) => {
    const gameID = game.match(/\d+(?=\:)/g)[0];

    if (
      checkColorPossibility(game, /\d+(?=\sred)/g, { max: 12 }) &&
      checkColorPossibility(game, /\d+(?=\sgreen)/g, { max: 13 }) &&
      checkColorPossibility(game, /\d+(?=\sblue)/g, { max: 14 })
    ) {
      sumIDs += +gameID;
    }
  });

  return sumIDs;
}
/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const lines = input.split("\n");
const output = getOutput(lines);
console.log("Answer:", output);
