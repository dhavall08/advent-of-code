const fs = require("fs");
const path = require("path");
const { calculateLCM } = require("./calculateLCM");

/* -------------------- getOutput - start ------------------------- */
function getOutput(input) {
  [instr, ...mp] = input.filter((o) => o);

  const map = Object.fromEntries(
    mp.map((v) => {
      const [_, a, b, c] = v.match(/(\w+)\s*=\s*\((.+), (.+)\)/);
      return [a, [b, c]];
    })
  );

  let step = {};
  let next = {};

  const start = Object.keys(map).filter((k) => k.endsWith("A"));

  for (let i = 0; i < start.length; i++) {
    const curr = start[i];

    while (!next[curr]?.endsWith("Z")) {
      const nextInstr = instr[(step[curr] || 0) % instr.length];
      next[curr] = map[next[curr] || curr][nextInstr === "L" ? 0 : 1];
      step[curr] = step[curr] ? step[curr] + 1 : 1;
    }
  }

  return calculateLCM(...Object.values(step));
}
/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);

const output = getOutput(lines);
console.log("Answer:", output);
