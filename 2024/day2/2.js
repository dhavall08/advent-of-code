const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split(/ +/)));
console.log("Answer:", output);

function removeByIndex(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1)];
}

function getOutput(data) {
  let safe = 0;

  for (let i = 0; i < data.length; i++) {
    if (isSafe(data[i])) {
      safe++;
    } else {
      for (let j = 0; j < data[i].length; j++) {
        const newRow = removeByIndex(data[i], j);
        if (isSafe(newRow)) {
          safe++;
          break;
        }
      }
    }
  }

  return safe;
}

function isSafe(row) {
  let state = null;

  for (let j = 0; j < row.length - 1; j++) {
    let elemDiff = Number(row[j]) - Number(row[j + 1]);

    if (Math.abs(elemDiff) > 3 || elemDiff === 0) {
      return false;
    }

    if (elemDiff < 0) {
      if (state === "decrease") {
        return false;
      }

      state = "increase";
    } else {
      if (state === "increase") {
        return false;
      }

      state = "decrease";
    }
  }

  return true;
}
