const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

getOutput(input.split(/\r?\n/));

function getOutput(lines) {
  const WIDE = 101;
  const TALL = 103;

  let set = new Set();

  let array = Array.from({ length: TALL }, (_, i) =>
    Array.from({ length: WIDE }, (_, j) => ".")
  );

  function runRobots(line, seconds) {
    const [p, v] = getNumbers(line);
    const [x, y] = p;
    const [vX, vY] = v;

    array[y][x] = "#";

    const newXPos = (x + vX * seconds) % WIDE;
    const newXPosAbs = newXPos < 0 ? WIDE + newXPos : newXPos;

    const newYPos = (y + vY * seconds) % TALL;
    const newYPosAbs = newYPos < 0 ? TALL + newYPos : newYPos;

    array[newYPosAbs][newXPosAbs] = "#";
    set.add(`${newYPosAbs}_${newXPosAbs}`);
  }

  let isNotTree = true;
  let seconds = 1000;

  while (isNotTree && seconds < 10000) {
    set = new Set();
    array = Array.from({ length: TALL }, (_, i) =>
      Array.from({ length: WIDE }, (_, j) => ".")
    );

    lines.forEach((line) => {
      runRobots(line, seconds);
    });

    isNotTree = !hasTree(array);
    // isNotTree = set.size !== lines.length should also work

    if (isNotTree) {
      seconds++;
    } else {
      console.log(array.forEach((row) => console.log(row.join(""))));
      console.log("Found at", seconds);
    }
  }

  return seconds;
}

function getNumbers(text) {
  const allMatches = text.matchAll(/[p|v]=(-?\d+,-?\d+)/g);

  return Array.from(allMatches).map((m) => m[1].split(",").map(Number));
}

function hasTree(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (
        !(
          array[i][j] === "#" &&
          ((array[i - 1]?.[j] === "." && array[i + 1]?.[j] === ".") ||
            (array[i]?.[j - 1] === "." && array[i]?.[j + 1] === "."))
        )
      ) {
        continue;
      }

      let a, b, c, d;

      const hasThreeHash =
        (a =
          array[i + 1]?.[j] === "#" &&
          array[i + 1]?.[j - 1] === "#" &&
          array[i + 1]?.[j + 1] === "#" &&
          array[i + 1]?.[j + 2] === "." &&
          array[i + 1]?.[j + 3] === "." &&
          array[i + 1]?.[j - 3] === "." &&
          array[i + 1]?.[j - 2] === ".") ||
        (b =
          array[i - 1]?.[j] === "#" &&
          array[i - 1]?.[j - 1] === "#" &&
          array[i - 1]?.[j + 1] === "#" &&
          array[i - 1]?.[j + 3] === "." &&
          array[i - 1]?.[j - 3] === "." &&
          array[i - 1]?.[j + 2] === "." &&
          array[i - 1]?.[j - 2] === ".") ||
        (c =
          array[i]?.[j + 1] === "#" &&
          array[i - 1]?.[j + 1] === "#" &&
          array[i + 1]?.[j + 1] === "#" &&
          array[i - 3]?.[j + 1] === "." &&
          array[i + 3]?.[j + 1] === "." &&
          array[i + 2]?.[j + 1] === "." &&
          array[i - 2]?.[j + 1] === ".") ||
        (d =
          array[i]?.[j - 1] === "#" &&
          array[i - 1]?.[j - 1] === "#" &&
          array[i + 1]?.[j - 1] === "#" &&
          array[i + 2]?.[j - 1] === "." &&
          array[i + 3]?.[j - 1] === "." &&
          array[i - 3]?.[j - 1] === "." &&
          array[i - 2]?.[j - 1] === ".");

      if (!hasThreeHash) {
        continue;
      }

      if (
        (a &&
          array[i + 2]?.[j] === "#" &&
          array[i + 2]?.[j - 1] === "#" &&
          array[i + 2]?.[j + 1] === "#" &&
          array[i + 2]?.[j + 2] === "#" &&
          array[i + 2]?.[j - 2] === "#") ||
        (b &&
          array[i - 2]?.[j] === "#" &&
          array[i - 2]?.[j - 1] === "#" &&
          array[i - 2]?.[j + 1] === "#" &&
          array[i - 2]?.[j + 2] === "#" &&
          array[i - 2]?.[j - 2] === "#") ||
        (c &&
          array[i]?.[j + 2] === "#" &&
          array[i - 1]?.[j + 2] === "#" &&
          array[i + 1]?.[j + 2] === "#" &&
          array[i + 2]?.[j + 2] === "#" &&
          array[i - 2]?.[j + 2] === "#") ||
        (d &&
          array[i]?.[j - 2] === "#" &&
          array[i - 1]?.[j - 2] === "#" &&
          array[i + 1]?.[j - 2] === "#" &&
          array[i + 2]?.[j - 2] === "#" &&
          array[i - 2]?.[j - 2] === "#")
      ) {
        return true;
      }
    }
  }
}
