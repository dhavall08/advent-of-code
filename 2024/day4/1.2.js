const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("Answer:", output);

function getOutput(array) {
  let count = 0;

  count += getCount(array);

  const rotated45 = rotate45(array);
  count += getCount(rotated45);

  const rotatedArray = transpose(array);
  count += getCount(rotatedArray);

  const rotated135 = getDiagonalsFromBottomLeft(array);
  count += getCount(rotated135);

  return count;
}

function getCount(array) {
  return array
    .map((a) => {
      const str = a.join("");
      const count =
        [...str.matchAll(/XMAS/g)].length + [...str.matchAll(/SAMX/g)].length;
      return count;
    })
    .reduce((sum, v) => sum + v, 0);
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function rotate45(matrix) {
  let summax = matrix.length + matrix[0].length - 1; // max index of diagonal matrix
  let rotated = []; // initialize to an empty matrix of the right size
  for (let i = 0; i < summax; ++i) rotated.push([]);
  // Fill it up by partitioning the original matrix.
  for (let j = 0; j < matrix[0].length; ++j)
    for (let i = 0; i < matrix.length; ++i) rotated[i + j].push(matrix[i][j]);

  return rotated;
}

function getDiagonalsFromBottomLeft(array) {
  const rows = array.length;
  const cols = array[0].length;
  const diagonals = [];

  for (let d = 0; d < rows + cols - 1; d++) {
    const diagonal = [];

    const startRow = Math.max(0, rows - 1 - d);
    const startCol = Math.max(0, d - (rows - 1));

    let row = startRow;
    let col = startCol;
    while (row < rows && col < cols) {
      diagonal.push(array[row][col]);
      row++;
      col++;
    }

    diagonals.push(diagonal);
  }

  return diagonals;
}
