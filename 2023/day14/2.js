const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function transpose(a, reverse) {
  a;

  let output = Object.keys(a[0]).map(function (i) {
    return a
      .map(function (r) {
        return r[reverse ? a[0].length - i - 1 : i];
      })
      .join("");
  });

  output;
  return output;
}

function getOutput(S, calc) {
  let sum = 0;

  let newS = S.map((s) => {
    let sArr = s.split("#");
    const newSArr = sArr.map((d) => {
      const oCount = d.match(/O/g);
      if (oCount && oCount.length > 0) {
        let newString =
          "O".repeat(oCount.length) + ".".repeat(d.length - oCount.length);
        return newString;
      } else {
        return d;
      }
    });

    const newString = newSArr.join("#");
    if (!calc) {
      for (let j = 0; j < s.length; j++) {
        if (newString[j] === "O") {
          sum += s.length - j;
        }
      }
    }

    return newString;
  });

  return calc ? sum : newS;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./sample.txt"),
  "utf-8"
);

const a1 = inputFile.split(/(?:\r?\n){1}/);
const t0 = transpose(a1);
const t = getOutput(t0);

console.log(t);
t;

const t2 = getOutput(transpose(t, true));
t2

const t3 = getOutput(transpose(t2, true));
const output = getOutput(transpose(t3, true));
output

console.log("Answer:", output);


x
x = transpose(x, true)
x
