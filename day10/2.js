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

function hasAdjacentEnd(A, idx, jdx) {
  const x = A[idx][jdx];

  if (
    A[idx + 1]?.[jdx] - x === 1 ||
    A[idx][jdx + 1] - x === 1 ||
    A[idx - 1]?.[jdx] - x === 1 ||
    A[idx][jdx - 1] - x === 1
  ) {
    return false;
  }

  return true;
}

function getOutput(A, point = "S") {
  let sI,
    sJ,
    currentStep = 0;

  const originalA = A.map((i) => i.map((j) => j));

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

  const visitedArray = A.map((i, idx) =>
    i.map((j, jdx) => {
      if (Number.isInteger(j)) {
        if (hasAdjacentEnd(A, idx, jdx) && j !== lastCount) {
          return ".";
        } else {
          return originalA[idx][jdx];
        }
      } else {
        return ".";
      }
    })
  );

  const newArray = structuredClone(visitedArray);

  let count = 0;
  for (let i = 0; i < newArray.length; i++) {
    let gate = false;
    for (let j = 0; j < newArray[i].length; j++) {
      const val = newArray[i][j];
      if (i === 3 && j === 4) {
        // debugger;
      }
      if (newArray[i][j] === "L") {
        j++;

        while (j < newArray[i].length && newArray[i][j] === "-") {
          j++;
        }

        if (newArray[i][j] === "7") {
          if (i === 4 && j === 6) {
            debugger;
          }
          gate = !gate;
          console.log(i, j, newArray[i][j], gate);
          gateCount = 0;
        } else if (newArray[i][j] === "J") {
          gateCount = 0;
        } else {
          j--;
        }

        continue;
      }

      if (newArray[i][j] === "F") {
        j++;

        while (j < newArray[i].length && newArray[i][j] === "-") {
          j++;
        }

        console.log(i, j, newArray[i][j]);
        if (newArray[i][j] === "J") {
          gate = !gate;
          gateCount = 0;
        } else if (newArray[i][j] === "7") {
          gateCount = 0;
        } else {
          j--;
        }

        continue;
      }

      if (["-", "L", "7", "F", "J", "S"].includes(newArray[i][j])) {
        gateCount = 0;
        gate = false;
        continue;
      } else if (newArray[i][j] === "|") {
        gate = !gate;
        gateCount = 0;
      } else if (gate && newArray[i][j] === ".") {
        count++;
        gateCount++;
        newArray[i][j] = "❌";
        console.log(i, j, newArray[i][j]);
      }

      if (j === newArray[i].length - 1 && gate) {
        count -= gateCount;
      }
    }
  }
  debugger;
  console.log(newArray);

  console.log("count:", count);
  return count;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./sample3.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);
const arr = lines.map((l) => l.split(""));
const result = getOutput(arr);

console.log("Answer:", result);
// sample 3 fails and so is input
