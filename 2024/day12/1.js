const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("output:", output);

function getOutput(input) {
  let sum = 0;
  let count = 0;
  let perimeter = 0;

  const visited = {};
  const processed = structuredClone(input);

  const checkAdjacent = (i, j) => {
    const p = input[i][j];

    if (visited[`${i}_${j}`]) return;

    const surroundingPlots = [
      visited[`${i + 1}_${j}`] && input[i + 1]?.[j] === p,
      visited[`${i - 1}_${j}`] && input[i - 1]?.[j] === p,
      visited[`${i}_${j + 1}`] && input[i]?.[j + 1] === p,
      visited[`${i}_${j - 1}`] && input[i]?.[j - 1] === p,
    ].filter((a) => a).length;

    count += 1;
    switch (surroundingPlots) {
      case 0: {
        perimeter += 4;
        break;
      }

      case 1: {
        perimeter += 2;
        break;
      }

      case 3: {
        perimeter -= 2;
        break;
      }

      case 4: {
        perimeter -= 4;
        break;
      }
    }

    visited[`${i}_${j}`] = true;
    processed[i][j] = "#";

    if (input[i + 1]?.[j] === p) {
      checkAdjacent(i + 1, j);
    }

    if (input[i - 1]?.[j] === p) {
      checkAdjacent(i - 1, j);
    }

    if (input[i]?.[j + 1] === p) {
      checkAdjacent(i, j + 1);
    }

    if (input[i]?.[j - 1] === p) {
      checkAdjacent(i, j - 1);
    }
  };

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      count = 0;
      perimeter = 0;

      checkAdjacent(i, j);
      const price = count * perimeter;
      sum += price;
    }
  }

  return sum;
}
