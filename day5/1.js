const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(data) {
  const [seedLine, ...soils] = data.split("\r\n\r\n");
  const seeds = seedLine.split(": ")[1].trim().split(" ");

  let min;

  for (let k = 0; k < seeds.length; k++) {
    let processingSeed = +seeds[k];

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

  return min;
}
/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input);
console.log("Answer:", output);
