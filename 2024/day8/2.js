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
        if (i === j) {
          continue;
        }

        const first = positions[i];
        const second = positions[j];

        set.add(first[0] + " " + first[1]);
        set.add(second[0] + " " + second[1]);

        const diff = second[0] - first[0];
        const diff2 = second[1] - first[1];

        const next = [first[0] - diff, first[1] - diff2];

        while (
          next[0] >= 0 &&
          next[0] < array.length &&
          next[1] >= 0 &&
          next[1] < array[0].length
        ) {
          set.add(next[0] + " " + next[1]);
          next[0] -= diff;
          next[1] -= diff2;
        }

        const prev = [second[0] + diff, second[1] + diff2];

        while (
          prev[0] >= 0 &&
          prev[0] < array.length &&
          prev[1] >= 0 &&
          prev[1] < array[0].length
        ) {
          set.add(prev[0] + " " + prev[1]);
          prev[0] += diff;
          prev[1] += diff2;
        }
      }
    }
  });

  return set.size;
}
