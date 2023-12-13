const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function transpose(a) {
  return Object.keys(a[0]).map(function (c) {
    return a
      .map(function (r) {
        return r[c];
      })
      .join("");
  });
}

function getOutput(S, horizontal = false) {
  debugger
  const newArr = S.map((a, i, arr) => {
    const indexes = [];
    arr.forEach((v, j) => {
      if (v == a && i !== j) {
        indexes.push(j);
      }
    });
    return [i, indexes];
  });

  let val = undefined;
  newArr.forEach((v) => {
    v[1].forEach((o) => {
      if (Math.abs(v[0] - o) === 1) {
        val = [v[0], o];
      }
    });
  });

  if (val !== undefined) {
    const min = Math.min(
      val[0],
      val[1],
      S.length - 1 - val[0],
      S.length - 1 - val[1]
    );

    const countArr = newArr.filter((v) => {
      return v[1].some((o) => {
        return v[0] + o === val[0] + val[1];
      });
    });

    const count = countArr.length;

    if (count === (min + 1) * 2) {
      return {
        t: horizontal ? "H" : "V",
        r: (Math.min(val[0], val[1]) + 1) * (horizontal ? 100 : 1),
      };
    } else if (horizontal === false) {
      return { r: 0, t: "" };
    } else {
      return getOutput(transpose(S));
    }
  } else if (horizontal === false) {
    return { r: 0, t: "" };
  } else {
    return getOutput(transpose(S));
  }
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

let result = 0;
const lines = inputFile.split(/(?:\r?\n){2}/);
const arr = lines.map((l) => l.split(/(?:\r?\n){1}/));
arr.forEach((a) => {
  let { t, r } = getOutput(a, true);
  console.log(r);

  if (t === "H") {
    const { r: r2 = 0 } = getOutput(transpose(a));
    console.log(r2)
    r += r2;
  }

  result += r;
});

console.log("Answer:", result);
// wrong - 18182
// correct answer: 28651
