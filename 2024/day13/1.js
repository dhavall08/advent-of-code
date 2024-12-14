const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n\r?\n/));
console.log("output:", output);

function getOutput(lines) {
  let sum = 0;

  lines.forEach((line) => {
    sum += getPress(line);
  });

  return sum;
}

function getPress(line) {
  const [ax, ay, bx, by, x, y] = getXY(line);

  let press = Infinity;

  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 100; j++) {
      if (i * ax + j * bx === x && i * ay + j * by === y) {
        const result = i * 3 + j;
        press = Math.min(press, result);
      }
    }
  }

  return press === Infinity ? 0 : press;
}

function getXY(text) {
  const allMatches = text.matchAll(/[X|Y][\+|=](\d+)/g);

  return Array.from(allMatches).map((m) => Number(m[1]));
}
