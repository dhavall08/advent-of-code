const fs = require("fs");
const path = require("path");

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const originalArray = inputFile.split(/(?:\r?\n){1}/).map((a) => a.split(""));

const dir = {
  "0-0": ["r", "d"],
  [`0-${originalArray[0].length - 1}`]: ["l", "d"],
  [`${originalArray.length - 1}-0`]: ["u", "r"],
  [`${originalArray.length - 1}-${originalArray[0].length - 1}`]: ["u", "l"],
};

const answer = getMax(originalArray);
console.log("Answer:", answer);
// incorrect ans: 7315

function getMax(S) {
  let max = -1;

  for (let i = 0; i < originalArray.length; i++) {
    for (let j = 0; j < originalArray[0].length; j++) {
      const topRow = i === 0;
      const bottomRow = i === originalArray.length - 1;
      const leftColumn = j === 0;
      const rightColumn = j === originalArray[0].length - 1;

      if (dir[`${i}-${j}`]) {
        dir[`${i}-${j}`].forEach((direction) => {
          const temp = loopOver(S, i, j, direction);

          if (temp > max) {
            max = temp;
          }

          console.log("temp:", temp, " (max: ", max, ")");
        });
      } else if (leftColumn || rightColumn || topRow || bottomRow) {
        const nextD = leftColumn
          ? "r"
          : rightColumn
          ? "l"
          : topRow
          ? "d"
          : bottomRow
          ? "u"
          : "";

        const temp = loopOver(S, i, j, nextD);
        if (temp > max) {
          max = temp;
        }
      } else {
        continue;
      }
    }
  }

  return max;
}

function loopOver(S, i, j, d) {
  const inputArray = structuredClone(S);
  const visited = [];

  getMutatedArray(inputArray, i, j, d);

  const resultCount = getCount(inputArray);
  return resultCount;

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

  function getMutatedArray(S, i = 0, j = 0, d = "r", beam = 1) {
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
      getMutatedArray(S, ...getDirectionPoint(d, i, j), d, beam);
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

      getMutatedArray(S, ...getDirectionPoint(d2, i, j), d2, beam);
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

      getMutatedArray(S, ...getDirectionPoint(d2, i, j), d2, beam);
    } else if (originalArray[i][j] === "|") {
      S[i][j] = beam;
      if (d === "r" || d === "l") {
        getMutatedArray(S, ...getDirectionPoint("u", i, j), "u", beam + 1);
        getMutatedArray(S, ...getDirectionPoint("d", i, j), "d", beam + 1);
      } else {
        getMutatedArray(S, ...getDirectionPoint(d, i, j), d, beam);
      }
    } else if (originalArray[i][j] === "-") {
      S[i][j] = beam;
      if (d === "u" || d === "d") {
        getMutatedArray(S, ...getDirectionPoint("l", i, j), "l", beam + 1);
        getMutatedArray(S, ...getDirectionPoint("r", i, j), "r", beam + 1);
      } else {
        getMutatedArray(S, ...getDirectionPoint(d, i, j), d, beam);
      }
    }
  }

  function getCount(arr) {
    return arr.reduce((a, line) => {
      return a + line.filter((c) => Number.isInteger(c)).length;
    }, 0);
  }
}
