const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
const specials = ["@", "#", "$", "%", "&", "*", "+", "=", "-", "/"];

// check adjacent characters
function checkAdjacent(lines, currentLine, s, l) {
  const end = currentLine !== lines.length - 1 ? currentLine + 1 : currentLine;

  // columns
  const initialStart = s !== 0 ? s - 1 : s;
  const last = l < lines[0].length - 1 ? l + 1 : l;

  console.log("i from ", currentLine ? currentLine - 1 : 0, end);
  console.log("j from ", initialStart, last);

  for (let i = currentLine ? currentLine - 1 : 0; i <= end; i++) {
    let start = initialStart;

    while (start <= last) {
      if (specials.includes(lines[i][start])) {
        console.log("✅ found " + lines[i][start], " at ", i + 1, start + 1);
        return true;
      } else {
        start++;
      }
    }
  }

  return false;
}

function getOutput(lines) {
  const linesLength = lines.length;
  let sum = 0;

  for (let i = 0; i < linesLength; i++) {
    const currentLine = lines[i];
    const unitArray = currentLine.split("");

    for (let start = 0; start < unitArray.length; start++) {
      if (unitArray[start] === "." || specials.includes(unitArray[start])) {
        continue;
      }

      let last = start + 1;
      let numValue = unitArray[start];
      while (Number.isInteger(+unitArray[last])) {
        numValue += unitArray[last];
        last++;
      }

      console.log("--------", numValue, "--------");
      const hasSymbol = checkAdjacent(lines, i, start, --last);

      if (hasSymbol) {
        sum += +numValue;
      }

      start = ++last;
    }
  }

  return sum;
}
/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const input = inputFile.split("\n");
const output = getOutput(input);
console.log("Answer:", output);
