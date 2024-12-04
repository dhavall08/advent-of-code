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
      if (row[j] !== "X") {
        continue;
      }

      count += checkAdjacent(array, i, j);
    }
  }

  return count;
}

function checkAdjacent(array, i, j) {
  const adjacentWords = [
    [array[i + 1]?.[j], array[i + 2]?.[j], array[i + 3]?.[j]].join(""),
    [array[i - 1]?.[j], array[i - 2]?.[j], array[i - 3]?.[j]].join(""),
    [array[i]?.[j + 1], array[i]?.[j + 2], array[i]?.[j + 3]].join(""),
    [array[i]?.[j - 1], array[i]?.[j - 2], array[i]?.[j - 3]].join(""),
    [array[i + 1]?.[j + 1], array[i + 2]?.[j + 2], array[i + 3]?.[j + 3]].join(
      ""
    ),
    [array[i + 1]?.[j - 1], array[i + 2]?.[j - 2], array[i + 3]?.[j - 3]].join(
      ""
    ),
    [array[i - 1]?.[j - 1], array[i - 2]?.[j - 2], array[i - 3]?.[j - 3]].join(
      ""
    ),
    [array[i - 1]?.[j + 1], array[i - 2]?.[j + 2], array[i - 3]?.[j + 3]].join(
      ""
    ),
  ];

  return adjacentWords.filter((a) => a === "MAS").length;
}
