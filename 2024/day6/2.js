const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("output:", output);

function getOutput(initArray) {
  let start = null;

  for (let i = 0; i < initArray.length; i++) {
    for (let j = 0; j < initArray[i].length; j++) {
      if (initArray[i][j] === "^") {
        start = [i - 1, j];
        initArray[i][j] = ".";
      }
    }
  }

  let infiniteCounter = 0;
  let trace = structuredClone(initArray);

  function checkInfinite(receivedArray, start, d = "up") {
    const array = structuredClone(receivedArray);

    let row = start[0];
    let col = start[1];
    const visited = {};

    while (
      row < array.length &&
      col < array[0].length &&
      row > -1 &&
      col > -1
    ) {
      // return if loop detected
      if (visited[`${row},${col}`] === d) {
        visited;
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

  for (let i = 0; i < initArray.length; i++) {
    for (let j = 0; j < initArray[i].length; j++) {
      if (initArray[i][j] !== ".") {
        continue;
      }

      initArray[i][j] = "#";
      checkInfinite(initArray, start);
      initArray[i][j] = ".";
    }
  }

  return infiniteCounter;
}
