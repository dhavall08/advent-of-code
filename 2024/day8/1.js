const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n/).map((a) => a.split("")));
console.log("output:", output);

function getOutput(array) {
  let obj = {};
  let set = new Set();

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const elem = array[i][j];

      if (elem === ".") {
        continue;
      }

      if (obj[elem]) {
        obj[elem].push([i, j]);
      } else {
        obj[elem] = [[i, j]];
      }
    }
  }

  Object.entries(obj).map(([name, positions]) => {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = 1; j < positions.length; j++) {
        if(i === j) {
          continue;
        }

        const first = positions[i];
        const second = positions[j];

        const third = [
          first[0] - (second[0] - first[0]),
          first[1] - (second[1] - first[1]),
        ];

        const fourth = [
          second[0] + (second[0] - first[0]),
          second[1] + (second[1] - first[1]),
        ];

        if (
          third[0] >= 0 &&
          third[0] < array.length &&
          third[1] >= 0 &&
          third[1] < array[0].length
        ) {
          set.add(third[0] + " " + third[1]);
        }

        if (
          fourth[0] >= 0 &&
          fourth[0] < array.length &&
          fourth[1] >= 0 &&
          fourth[1] < array[0].length
        ) {
          set.add(fourth[0] + " " + fourth[1]);
        }
      }
    }
  });

  return set.size;
}
