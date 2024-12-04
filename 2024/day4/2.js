const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("Answer:", output);

function getOutput(array) {
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    const row = array[i];

    for (let j = 0; j < row.length; j++) {
      if (row[j] !== "A") {
        continue;
      }

      const hasXmas = checkAdjacent(array, i, j);

      if (hasXmas) {
        count += 1;
      }
    }
  }

  return count;
}

function checkAdjacent(array, i, j) {
  if (
    i === 0 ||
    j === 0 ||
    i === array.length - 1 ||
    j === array[0].length - 1
  ) {
    return false;
  }

  const topLeft = array[i - 1][j - 1];
  const topRight = array[i - 1][j + 1];
  const bottomLeft = array[i + 1][j - 1];
  const bottomRight = array[i + 1][j + 1];

  const str = topLeft + topRight + bottomLeft + bottomRight;

  switch (str) {
    case "MSMS":
    case "SSMM":
    case "SMSM":
    case "MMSS":
      return true;
    default:
      return false;
  }
}
