const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n\r?\n/));
console.log('output:', output)

function getOutput(sections) {
  const rules = sections[0].split(/\r?\n/).map((a) => a.split("|"));
  const updates = sections[1].split(/\r?\n/).map((a) => a.split(","));

  let correct = [];
  let sum = 0;

  for (let line = 0; line < updates.length; line++) {
    let violate = false;

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];

      const firstIndex = updates[line].findIndex((a) => a === rule[0]);
      const secondIndex = updates[line].findIndex((a) => a === rule[1]);

      if (firstIndex === -1 || secondIndex === -1) {
        continue;
      }

      if (firstIndex < secondIndex) {
        continue;
      }

      violate = true;
    }

    if (!violate) {
      sum += +updates[line][(updates[line].length - 1) / 2];
      correct.push(updates[line]);
    }
  }

  return sum;
}
