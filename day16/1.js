const fs = require("fs");
const path = require("path");

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const inputArray = inputFile.split(/(?:\r?\n){1}/).map((a) => a.split(""));
const originalArray = structuredClone(inputArray);
const visited = [];
getOutput(inputArray);
console.table(inputArray);

const resultCount = getCount(inputArray);
console.log("Answer:", resultCount);
// 6978

/* -------------------- getOutput - start ------------------------- */

function getDirectionPoint(d, i, j) {
  switch (d) {
    case "r":
      return [i, j + 1];
    case "d":
      return [i + 1, j];
    case "l":
      return [i, j - 1];
    case "u":
      return [i - 1, j];
    default:
      throw new Error("Wrong direction.");
  }
}

function getOutput(S, i = 0, j = 0, d = "r", beam = 1) {
  if (!S[i]?.[j]) {
    return;
  }

  if (visited.find(([a, b, d2]) => a === i && b === j && d2 === d)) {
    return;
  } else {
    visited.push([i, j, d]);
  }

  if (originalArray[i][j] === ".") {
    S[i][j] = beam;
    getOutput(S, ...getDirectionPoint(d, i, j), d, beam);
    return;
  } else if (originalArray[i][j] === "\\") {
    S[i][j] = beam;
    const d2 =
      d === "r"
        ? "d"
        : d === "l"
        ? "u"
        : d === "u"
        ? "l"
        : d === "d"
        ? "r"
        : "";

    getOutput(S, ...getDirectionPoint(d2, i, j), d2, beam);
  } else if (originalArray[i][j] === "/") {
    S[i][j] = beam;

    const d2 =
      d === "r"
        ? "u"
        : d === "d"
        ? "l"
        : d === "l"
        ? "d"
        : d === "u"
        ? "r"
        : "";

    getOutput(S, ...getDirectionPoint(d2, i, j), d2, beam);
  } else if (originalArray[i][j] === "|") {
    S[i][j] = beam;
    if (d === "r" || d === "l") {
      getOutput(S, ...getDirectionPoint("u", i, j), "u", beam + 1);
      getOutput(S, ...getDirectionPoint("d", i, j), "d", beam + 1);
    } else {
      getOutput(S, ...getDirectionPoint(d, i, j), d, beam);
    }
  } else if (originalArray[i][j] === "-") {
    S[i][j] = beam;
    if (d === "u" || d === "d") {
      getOutput(S, ...getDirectionPoint("l", i, j), "l", beam + 1);
      getOutput(S, ...getDirectionPoint("r", i, j), "r", beam + 1);
    } else {
      getOutput(S, ...getDirectionPoint(d, i, j), d, beam);
    }
  }
}

function getCount(arr) {
  return arr.reduce((a, line) => {
    return a + line.filter((c) => Number.isInteger(c)).length;
  }, 0);
}

/* -------------------- getOutput - end ------------------------- */
