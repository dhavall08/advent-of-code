const fs = require("fs");
const path = require("path");

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a

/* -------------------- getOutput - start ------------------------- */
function checkAdjacent(A, i, j, currentStep) {
  let ways = [];
  let step = currentStep + 1;

  if (A[i - 1]?.[j] && ["|", "7", "F"].includes(A[i - 1][j])) {
    // north
    ways.push([i - 1, j]);
    A[i - 1][j] = step;
  }

  if (A[i][j - 1] && ["-", "L", "F"].includes(A[i][j - 1])) {
    // west
    ways.push([i, j - 1]);
    A[i][j - 1] = step;
  }

  if (
    // south
    A[i + 1]?.[j] &&
    ["|", "L", "J"].includes(A[i + 1][j])
  ) {
    ways.push([i + 1, j]);
    A[i + 1][j] = step;
  }

  if (
    // east
    A[i][j + 1] &&
    ["-", "7", "J"].includes(A[i][j + 1])
  ) {
    ways.push([i, j + 1]);
    A[i][j + 1] = step;
  }

  if (ways.length < 1) {
    step--;
  }

  return { ways, step };
}

function getOutput(A, point = "S") {
  let sI,
    sJ,
    currentStep = 0;

  loop: for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      if (A[i][j] === point) {
        sI = i;
        sJ = j;
        A[i][j] = 0;
        break loop;
      }
    }
  }

  let obj = [checkAdjacent(A, sI, sJ, currentStep)];
  let lastCount = 0;

  while (obj.length > 0) {
    const [first] = obj;
    lastCount = first.step;
    obj.shift();

    first.ways.forEach(([x, y]) => {
      obj.push(checkAdjacent(A, x, y, first.step));
    });
  }

  return lastCount;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);
const arr = lines.map((l) => l.split(""));
const result = getOutput(arr);

console.log("Answer:", result);
