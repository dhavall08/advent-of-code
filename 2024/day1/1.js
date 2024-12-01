const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split(/ +/)));
console.log("Answer:", output);

function getOutput(data) {
  const first = [];
  const second = [];

  data.forEach((a) => {
    first.push(+a[0]);
    second.push(+a[1]);
  });

  first.sort((a, b) => a - b);
  second.sort((a, b) => a - b);

  let sum = 0;

  first.forEach((f, i) => {
    sum += Math.abs(f - second[i]);
  });

  return sum;
}
