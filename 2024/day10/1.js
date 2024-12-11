const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("output:", output);

function getOutput(input) {
  let count = 0;
  
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === ".") {
        continue;
      }

      if (input[i][j] === "0") {
        const set = new Set();
        count += getEnds(input, i, j, 0, set);
      }
    }
  }

  return count;
}

function getEnds(input, i, j, value = 0, set) {
  if (i < 0 || j < 0 || i >= input.length || j >= input[0].length) {
    return 0;
  }

  if (+input[i][j] !== value) {
    return;
  }

  if (value === 9) {
    set.add(i + "," + j);
    return;
  }

  getEnds(input, i - 1, j, value + 1, set);
  getEnds(input, i + 1, j, value + 1, set);
  getEnds(input, i, j - 1, value + 1, set);
  getEnds(input, i, j + 1, value + 1, set);

  return set.size;
}