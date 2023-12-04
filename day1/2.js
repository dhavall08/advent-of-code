const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(data) {
  const lines = data.split("\r\n");

  const digitsRegex =
    /[0-9]|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g;

  const total = lines.reduce((sum, line) => {
    // get digits
    const digitsWithStrings = [];

    // get overlapping digits
    const regex = new RegExp(digitsRegex, "g");
    let match;
    while ((match = regex.exec(line))) {
      digitsWithStrings.push(match[0]);
      regex.lastIndex = match.index + 1;
    }

    const digits = digitsWithStrings.map((digit) => {
      switch (digit) {
        case "one":
          return 1;
        case "two":
          return 2;
        case "three":
          return 3;
        case "four":
          return 4;
        case "five":
          return 5;
        case "six":
          return 6;
        case "seven":
          return 7;
        case "eight":
          return 8;
        case "nine":
          return 9;
        default:
          return digit;
      }
    });

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
