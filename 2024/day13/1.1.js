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
  const [x1, y1, x2, y2, x, y] = getXY(line);

  let ansB = (x / x1 - y / y1) / (x2 / x1 - y2 / y1);
  const hasMinorFraction =
    ansB - Math.floor(ansB) < 0.001 || ansB - Math.floor(ansB) > 0.99;

  if (!hasMinorFraction) {
    return 0;
  }

  ansB = Math.round(ansB);
  const ansA = (x - ansB * x2) / x1;

  return ansA > 0 &&
    Number.isInteger(ansA) &&
    ansA < 100 &&
    ansB < 100 &&
    ansB > 0
    ? ansA * 3 + ansB
    : 0;
}

function getXY(text) {
  const allMatches = text.matchAll(/[X|Y][\+|=](\d+)/g);

  return Array.from(allMatches).map((m) => Number(m[1]));
}
