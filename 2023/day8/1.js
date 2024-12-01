const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(input) {
  [instr, ...mp] = input.filter((o) => o);

  const map = Object.fromEntries(
    mp.map((v) => {
      const [_, a, b, c] = v.match(/(\w+)\s*=\s*\((.+), (.+)\)/);
      return [a, [b, c]];
    })
  );

  let step = 0;
  let next = "AAA";

  while (next !== "ZZZ") {
    const nextInstr = instr[step % instr.length];
    next = map[next][nextInstr === "L" ? 0 : 1];
    step++;
  }

  return step;
}
/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);

const output = getOutput(lines);
console.log("Answer:", output);
