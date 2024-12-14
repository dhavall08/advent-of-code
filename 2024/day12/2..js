const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(
  path.resolve(__dirname, "./sample2.txt"),
  "utf-8"
);

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

    const surroundingPlots = {
      [`${i}_${j + 1}`]: visited[`${i}_${j + 1}`] && input[i]?.[j + 1] === p,
      [`${i}_${j - 1}`]: visited[`${i}_${j - 1}`] && input[i]?.[j - 1] === p,
      [`${i + 1}_${j}`]: visited[`${i + 1}_${j}`] && input[i + 1]?.[j] === p,
      [`${i - 1}_${j}`]: visited[`${i - 1}_${j}`] && input[i - 1]?.[j] === p,
    };

    const diagonals = {
      [`${i - 1}_${j - 1}`]:
        visited[`${i - 1}_${j - 1}`] && input[i - 1]?.[j - 1] === p,
      [`${i - 1}_${j + 1}`]:
        visited[`${i - 1}_${j + 1}`] && input[i - 1]?.[j + 1] === p,
      [`${i + 1}_${j - 1}`]:
        visited[`${i + 1}_${j - 1}`] && input[i + 1]?.[j - 1] === p,
      [`${i + 1}_${j + 1}`]:
        visited[`${i + 1}_${j + 1}`] && input[i + 1]?.[j + 1] === p,
    };

    count += 1;

    switch (Object.values(surroundingPlots).filter(Boolean).length) {
      case 0: {
        perimeter += 4;
        break;
      }

      case 1: {
        if (!Object.values(diagonals).some(Boolean)) {
          break;
        }

        const match = Object.entries(surroundingPlots)
          .find(([key, val]) => val)[0]
          .split("_")
          .map(Number);

        if (i === match[0]) {
          if (
            diagonals[`${match[0] - 1}_${match[1]}`] &&
            diagonals[`${match[0] + 1}_${match[1]}`]
          ) {
            perimeter += 4;
            break;
          } else {
            perimeter += 2;
            break;
          }
        } else {
          if (
            diagonals[`${match[0]}_${match[1] - 1}`] &&
            diagonals[`${match[0]}_${match[1] + 1}`]
          ) {
            perimeter += 4;
            break;
          } else {
            perimeter += 2;
            break;
          }
        }
      }

      case 2: {
        if (!Object.values(diagonals).some(Boolean)) {
          perimeter -= 2;
          break;
        }

        const match = Object.entries(surroundingPlots)
          .filter(([key, val]) => val)
          .map(([key]) => key.split("_"));
          
          match

        if (
          (visited[`${i + 1}_${j}`] &&
            input[i + 1]?.[j] === p &&
            visited[`${i - 1}_${j}`] &&
            input[i - 1]?.[j] === p) ||
          (visited[`${i}_${j + 1}`] &&
            input[i]?.[j + 1] === p &&
            visited[`${i}_${j - 1}`] &&
            input[i]?.[j - 1] === p)
        ) {
          perimeter -= 4;
        } else {
          perimeter -= 2;
        }
        break;
      }

      case 3: {
        perimeter -= 4;
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
      if (price) {
        perimeter;
      }
      sum += price;
    }
  }

  return sum;
}
