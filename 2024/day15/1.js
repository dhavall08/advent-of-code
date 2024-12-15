const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n\r?\n/));
console.log("output:", output);

function getOutput([strArr, dirs]) {
  const a = strArr.split(/\r?\n/).map((v) => v.split(""));
  pos = [];
  outer: for (let i in a) {
    for (let j in a[i]) {
      if (a[i][j] === "@") {
        pos[0] = +i;
        pos[1] = +j;
        break outer;
      }
    }
  }

  for (let d of dirs) {
    pos = move(a, pos[0], pos[1], d);
  }

  console.log(a.map((v) => v.join("")).join("\n"));
  return sumObjects(a);
}

function move(a, i, j, d) {
  if (!i || !j || i >= a.length || i < 0 || j >= a[0].length || j < 0) {
    return false;
  }

  if (a[i][j] === "#") {
    return false;
  }

  if (a[i][j] === ".") {
    return true;
  }

  const initialChar = a[i][j];

  let av;

  if (d === "^") {
    av = move(a, i - 1, j, d);
  } else if (d === ">") {
    av = move(a, i, j + 1, d);
  } else if (d === "v") {
    av = move(a, i + 1, j, d);
  } else if (d === "<") {
    av = move(a, i, j - 1, d);
  }

  if (av) {
    shift(a, i, j, d);
  }

  if (initialChar === "@") {
    return av
      ? d === "^"
        ? [i - 1, j]
        : d === ">"
        ? [i, j + 1]
        : d === "v"
        ? [i + 1, j]
        : [i, j - 1]
      : [i, j];
  } else {
    return av;
  }
}

function shift(a, i, j, d) {
  let lastVal = ".";

  while (a[i][j] !== ".") {
    let temp = a[i][j];
    a[i][j] = lastVal;
    lastVal = temp;

    if (d === "^") {
      i--;
      continue;
    }

    if (d === ">") {
      j++;
      continue;
    }

    if (d === "v") {
      i++;
      continue;
    }

    if (d === "<") {
      j--;
      continue;
    }
  }

  a[i][j] = lastVal;
  return a;
}

function sumObjects(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] !== "O") {
        continue;
      }

      sum += i * 100 + j;
    }
  }

  return sum;
}
