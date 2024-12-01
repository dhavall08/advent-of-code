const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function findMismatchPosition(str1, str2) {
  const minLength = Math.min(str1.length, str2.length);
  const regex = new RegExp(`^[\\s\\S]{0,${minLength}}`);

  const match1 = str1.match(regex)[0];
  const match2 = str2.match(regex)[0];

  const mismatchPosition = match1.length + 1;

  return mismatchPosition <= minLength ? mismatchPosition : -1;
}

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
  // debugger;
  const newArr = S.map((a, i, arr) => {
    const indexes = [];
    arr.forEach((v, j) => {
      if (v == a && i !== j) {
        indexes.push(j);
      }
    });
    return [i, indexes];
  });

  let valArray = [],
    matches = [];
    newArr
  newArr.forEach((v) => {
    v[1].forEach((o) => {
      if (
        Math.abs(v[0] - o) === 1 &&
        (valArray.length < 1 ||
          !valArray.some((foo) => foo === o || foo === v[0]))
      ) {
        valArray.push([v[0], o]);
      }
    });
  });

  valArray
  if (valArray.length > 0) {
    for (let i = 0; i < valArray.length / 2; i++) {
      let val = valArray[i];
      val
      const min = Math.min(
        val[0],
        val[1],
        S.length - 1 - val[0],
        S.length - 1 - val[1]
      );

      min
      // let temp = 
      for(let j = 0; j < (min + 1) * 2 / 2; j++ ) {
        
      }

      newArr
      const countArr = newArr.filter((v) => {
        return v[1].some((o) => {
          return v[0] + o === val[0] + val[1];
        });
      });

      const count = countArr.length;

      if (count === (min + 1) * 2) {
        matches.push({
          t: horizontal ? "H" : "V",
          r: (Math.min(val[0], val[1]) + 1) * (horizontal ? 100 : 1),
        });
      }
    }

    if (matches.length > 0) {
      let max = 0;

      matches.forEach((each) => {
        if (each.r > (max?.r || 0)) {
          max = each;
        }
      });

      return max;
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
  path.resolve(__dirname, "./sample.txt"),
  "utf-8"
);

let result = 0;
const lines = inputFile.split(/(?:\r?\n){2}/);
const arr = lines.map((l) => l.split(/(?:\r?\n){1}/));
arr.forEach((a) => {
  let { r } = getOutput(a, true);

  result += r;
});

console.log("Answer:", result);
// wrong - 18182
// correct answer: 28651
