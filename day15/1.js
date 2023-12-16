const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */

function getOutput(str) {
  let currentValue = 0;

  Object.keys(str).forEach((s, i) => {
    currentValue += str.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  });

  return currentValue;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

let result = 0;
const array = inputFile.split(",");
array.forEach((single) => {
  result += getOutput(single);
});

console.log("Answer:", result);
// 506437
