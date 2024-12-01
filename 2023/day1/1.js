const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(data) {
  const lines = data.split("\r\n");

  const digitsRegex = /[0-9]/g;

  const total = lines.reduce((sum, line) => {
    // get digits
    const digits = line.match(digitsRegex);

    let calibrationValue;

    if (digits.length === 1) {
      calibrationValue = String(digits[0]) + String(digits[0]);
    }

    calibrationValue = String(digits.at(0)) + String(digits.at(-1));

    return sum + +calibrationValue;
  }, 0);

  return total;
}
/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const output = getOutput(input);
console.log("Answer:", output);
