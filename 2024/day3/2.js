const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const output = getOutput(input);
console.log("Answer:", output);

function getOutput(str) {
  let sum = 0;
  let skip = false;
  const matches = str.matchAll(/mul\(\d+,\d+\)|don't\(\)|do\(\)/g);

  for (const match of matches) {
    if (match[0] === "do()") {
      skip = false;
      continue;
    }

    if (skip) {
      continue;
    }

    if (match[0] === "don't()") {
      skip = true;
      continue;
    }

    const first = +match[0].split("(")[1].split(",")[0];
    first;
    const second = +match[0].split("(")[1].split(",")[1].slice(0, -1);
    second;

    sum += first * second;
  }

  return sum;
}
