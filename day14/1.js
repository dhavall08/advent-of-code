const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function transpose(a) {
  return Object.keys(a[0]).map(function (c) {
    return a
      .map(function (r) {
        return r[c];
      })
      .join("");
  });
}

function getOutput(S) {
  let sum = 0;

  S.forEach((s) => {
    let sArr = s.split("#");
    const newSArr = sArr.map((d) => {
      const oCount = d.match(/O/g);
      if (oCount && oCount.length > 0) {
        return "O".repeat(oCount.length) + ".".repeat(d.length - oCount.length);
      } else {
        return d;
      }
    });

    const newString = newSArr.join("#");

    for (let j = 0; j < s.length; j++) {
      if (newString[j] === "O") {
        sum += s.length - j;
      }
    }
  });

  return sum;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const array = inputFile.split(/(?:\r?\n){1}/);
const t = transpose(array);
const output = getOutput(t);

console.log("Answer:", output);
