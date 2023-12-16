const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */

function getOutput(array) {
  const obj = {};

  array.forEach((single) => {
    const [enc, length] = single.split(/=|-/g);
    const hash = getHash(enc);

    if (length === "") {
      obj[hash] = obj[hash]?.filter((v) => v[0] !== enc);
    } else {
      if (obj[hash]) {
        const findIndex = obj[hash].findIndex((v) => v[0] === enc);
        if (findIndex !== -1) {
          obj[hash][findIndex] = [enc, Number(length)];
        } else {
          obj[hash].push([enc, Number(length)]);
        }
      } else {
        obj[hash] = [[enc, Number(length)]];
      }
    }
  });

  const sum = Object.entries(obj)
    .filter((v) => v[1]?.length > 0)
    .reduce((acc, [key, arr]) => {
      return (
        acc +
        arr.reduce((acc, b, i) => {
          return acc + b[1] * (i + 1) * (Number(key) + 1);
        }, 0)
      );
    }, 0);

  return sum;
}
function getHash(str) {
  let currentValue = 0;

  Object.keys(str).forEach((s, i) => {
    currentValue += str.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  });

  return currentValue;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const result = getOutput(inputFile.split(","));

console.log("Answer:", result);
