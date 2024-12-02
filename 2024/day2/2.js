const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split(/ +/)));
console.log("Answer:", output);

function getOutput(data) {
  let safe = 0;

  outer: for (let i = 0; i < data.length; i++) {
    let state = null;
    let count = 0;

    inner: for (let j = 0; j < data[i].length - 1; j++) {
      let elemDiff;
      if (j === 0 && count) {
        elemDiff = Number(data[i][j - count]) - Number(data[i][j + 1]);
      } else {
        elemDiff = Number(data[i][j]) - Number(data[i][j + 1 + count]);
      }
      elemDiff;

      if (Math.abs(elemDiff) > 3 || elemDiff === 0) {
        if (!count) {
          count++;
          continue inner;
        } else {
          continue outer;
        }
      }

      if (elemDiff < 0) {
        if (state === "decrease") {
          if (!count) {
            count++;
            continue inner;
          } else {
            continue outer;
          }
        }

        state = "increase";
      } else {
        if (state === "increase") {
          if (!count) {
            count++;
            continue inner;
          } else {
            continue outer;
          }
        }

        state = "decrease";
      }
    }

    safe++;
  }

  return safe;
}
