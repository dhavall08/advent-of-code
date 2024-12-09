const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("output:", output);

function getOutput(initArray) {
  initArray;
  let start = null;

  for (let i = 0; i < initArray.length; i++) {
    for (let j = 0; j < initArray[i].length; j++) {
      if (initArray[i][j] === "^") {
        start = [i - 1, j];
        initArray[i][j] = ".";
      }
    }
  }

  start;
  let infiniteCounter = 0;
  initArray;
  let visitedObs = {};
  let infinite = {};
  let trace = structuredClone(initArray);

  function checkInfinite(receivedArray, start, d = "up", obstacle) {
    // console.log(obstacle, start)
    const array = structuredClone(receivedArray);

    if (obstacle) {
      // trace[obstacle[0]][obstacle[1]] = "o";
      array[obstacle[0]][obstacle[1]] = "#";
      visitedObs[`${obstacle[0]},${obstacle[1]}`] = true;
    }

    let row = start[0];
    let col = start[1];

    if (row === 6 && col === 6) {
      debugger;
    }

    const visited = {};

    while (
      row < array.length &&
      col < array[0].length &&
      row > -1 &&
      col > -1
    ) {
      // return if loop detected
      if (visited[`${row},${col}`] === d) {
        obstacle;
        visited;
        trace[obstacle[0]][obstacle[1]] = "o";
        infinite[`${obstacle[0]},${obstacle[1]}`] = true;
        infiniteCounter++;
        return true;
      }

      visited[`${row},${col}`] = d;

      // move to next item
      if (array[row][col] === "#") {
        if (d === "up") {
          d = "right";
          row++;
          col++;
          continue;
        }

        if (d === "right") {
          d = "down";
          row++;
          col--;
          continue;
        }

        if (d === "down") {
          d = "left";
          row--;
          col--;
          continue;
        }

        if (d === "left") {
          d = "up";
          col++;
          row--;
          continue;
        }
      } else {
        if (!obstacle) {
          // make current the obstacle
          const newStart =
            d === "up"
              ? [row + 1, col]
              : d === "right"
              ? [row, col - 1]
              : d === "down"
              ? [row - 1, col]
              : [row, col + 1];

          checkInfinite(array, newStart, d, [row, col]);
        }

        // if (obstacle && array[row][col] !== "^") {
        //   trace[row][col] = ".";
        // }

        if (d === "up") {
          row--;
          continue;
        }
        if (d === "right") {
          col++;
          continue;
        }
        if (d === "down") {
          row++;
          continue;
        }
        if (d === "left") {
          col--;
          continue;
        }
      }
    }

    return false;
  }

  checkInfinite(initArray, start);

  trace;
  infinite;

  return infiniteCounter;
}
