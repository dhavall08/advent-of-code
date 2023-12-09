const fs = require("fs");
const path = require("path");
const math = require("./math.min");

/* -------------------- getOutput - start ------------------------- */
function getOutput(lines) {
  lines = lines.map((o) => o.split(" ").map((o) => Number(o)));

  let sum = 0;
  lines.forEach((line) => {
    const orderObj = {
      0: [line[0], line[1]],
    };

    let order = 0;
    let diff = orderObj[order][1] - orderObj[order][0];
    let diff2 = orderObj[order][2] - orderObj[order][1];

    while (diff !== 0 || diff2 !== 0) {
      // add diff to next one if not same
      orderObj[order + 1]
        ? orderObj[order + 1].push(orderObj[order][1] - orderObj[order][0])
        : (orderObj[order + 1] = [orderObj[order][1] - orderObj[order][0]]);

      // add new to top and continue till end
      orderObj[0].push(line[orderObj[0].length]);

      for (let i = 1; i < Object.keys(orderObj).length; i++) {
        orderObj[i].push(orderObj[i - 1].at(-1) - orderObj[i - 1].at(-2));
      }

      diff = orderObj[order][1] - orderObj[order][0];
      diff2 = orderObj[order][2] - orderObj[order][1];

      if (diff !== 0 || diff2 !== 0) {
        order++;
      } else {
        break;
      }
    }

    order++;

    const A = getEquationMatrix(order);
    const B = line.slice(0, order);
    const X = math.multiply(math.inv(A), B);

    const term = Math.round(getTerm(X, line.length + 1));
    sum += term;
  });

  return sum;
}

function getTerm(X, n) {
  let sum = 0;

  X.forEach((val, i) => {
    sum += val * Math.pow(n, i);
  });

  return sum;
}

function getEquationMatrix(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Math.pow(i + 1, j))
  );
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);

const output = getOutput(lines);
console.log("Answer:", output);
// works for sample but fails for input
