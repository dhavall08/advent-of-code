const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/));
console.log("output:", output);

function getOutput(lines) {
  let q1 = 0,
    q2 = 0,
    q3 = 0,
    q4 = 0;

  function getQuadrant(line) {
    const [p, v] = getNumbers(line);
    const [x, y] = p;
    const [vX, vY] = v;

    // const wide = 11;
    const wide = 101;
    // const tall = 7;
    const tall = 103;

    const newXPos = (x + vX * 100) % wide;
    const newXPosAbs = newXPos < 0 ? wide + newXPos : newXPos;

    const newYPos = (y + vY * 100) % tall;
    const newYPosAbs = newYPos < 0 ? tall + newYPos : newYPos;

    if (newXPosAbs < (wide - 1) / 2 && newYPosAbs < (tall - 1) / 2) {
      q1++;
      return;
    }
    if (newXPosAbs > (wide - 1) / 2 && newYPosAbs < (tall - 1) / 2) {
      q2++;
      return;
    }
    if (newXPosAbs < (wide - 1) / 2 && newYPosAbs > (tall - 1) / 2) {
      q3++;
      return;
    }
    if (newXPosAbs > (wide - 1) / 2 && newYPosAbs > (tall - 1) / 2) {
      q4++;
      return;
    }
  }

  lines.forEach((line) => {
    getQuadrant(line);
  });

  return q1 * q2 * q3 * q4;
}

function getNumbers(text) {
  const allMatches = text.matchAll(/[p|v]=(-?\d+,-?\d+)/g);

  return Array.from(allMatches).map((m) => m[1].split(",").map(Number));
}
