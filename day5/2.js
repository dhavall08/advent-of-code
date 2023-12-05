const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(data) {
  const [seedLine, ...soils] = data.split("\r\n\r\n");
  const seeds = seedLine
    .split(": ")[1]
    .trim()
    .match(/\d+\s\d+/g);

  let min;

  for (let seedList of seeds) {
    const [startingSeed, totalSeed] = seedList.split(" ");

    for (let k = 0; k < +totalSeed; k++) {
      let processingSeed = +startingSeed + k;

      for (let i = 0; i < soils.length; i++) {
        const output = soils[i].split(":\r\n")[1].split("\r\n");

        for (let each of output) {
          const [dest, source, range] = each.split(" ");

          if (processingSeed >= +source && processingSeed <= +source + +range) {
            processingSeed = +dest + processingSeed - +source;
            break;
          }
        }
      }

      if (!min || processingSeed < min) {
        min = processingSeed;
      }
    }
  }

  return min;
}
/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(path.resolve(__dirname, "./sample.txt"), "utf-8");

const output = getOutput(input);
console.log("Answer:", output);
// Timeout for large input
