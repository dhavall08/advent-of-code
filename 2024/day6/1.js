const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("output:", output);

function getOutput(array) {
  let start = null;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === "^") {
        start = [i, j];
        array[i][j] = "X";
      }
    }
  }

  let count = 1;
  let direction = "up";

  let udMovingPoint = start[0];
  let lrMovingPoint = start[1];

  while (udMovingPoint < array.length && lrMovingPoint < array[0].length) {
    if (array[udMovingPoint][lrMovingPoint] === "#") {
      if (direction === "up") {
        direction = "right";
        udMovingPoint++;
        lrMovingPoint++;
        continue;
      }

      if (direction === "right") {
        direction = "down";
        udMovingPoint++;
        lrMovingPoint--;
        continue;
      }

      if (direction === "down") {
        direction = "left";
        udMovingPoint--;
        lrMovingPoint--;
        continue;
      }

      if (direction === "left") {
        direction = "up";
        lrMovingPoint++;
        udMovingPoint--;
        continue;
      }
    } else {
      if (array[udMovingPoint][lrMovingPoint] !== "X") {
        array[udMovingPoint][lrMovingPoint] = "X";
        count++;
      }

      if (direction === "up") {
        udMovingPoint--;
        continue;
      }
      if (direction === "right") {
        lrMovingPoint++;
        continue;
      }
      if (direction === "down") {
        udMovingPoint++;
        continue;
      }
      if (direction === "left") {
        lrMovingPoint--;
        continue;
      }
    }
  }

  return count;
}
