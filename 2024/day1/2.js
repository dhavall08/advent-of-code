const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split(/ +/)));
console.log("Answer:", output);

function getOutput(data) {
  const occurrences = {};
  const first = [];

  data.forEach((a) => {
    first.push(+a[0]);
    occurrences[+a[1]] = occurrences[+a[1]] ? occurrences[+a[1]] + 1 : 1;
  });

  return Object.entries(occurrences).reduce((sum, [key, value]) => {
    const count = first.filter((a) => a === +key).length;
    return sum + count * key * value;
  }, 0);
}
