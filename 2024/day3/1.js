const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input);
console.log("Answer:", output);

function getOutput(str) {
  let sum = 0;
  const matches = str.matchAll(/mul\(\d+,\d+\)/g);

  for (const match of matches) {
    const first = +match[0].split("(")[1].split(",")[0];
    const second = +match[0].split("(")[1].split(",")[1].slice(0, -1);

    sum += first * second;
  }

  return sum;
}
