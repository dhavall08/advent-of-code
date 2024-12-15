const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(/\r?\n\r?\n/));
console.log(output);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getOutput([strArr, dirs]) {
  const origA = strArr.split(/\r?\n/).map((v) => v.split(""));
  const a = modify(origA);
  pos = [];

  // Get initial position of robot `@`
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
    pos = movable(a, pos[0], pos[1], d);
    console.clear();
    // Uncomment below to see moving position
    // console.log(a.map((v) => v.join("")).join("\n"));
    // await sleep()
  }

  console.log(a.map((v) => v.join("")).join("\n"));
  return sumObjects(a);
}

function movable(a, i, j, d, allowShift = true) {
  if (!i || !j || i >= a.length || i < 0 || j >= a[0].length || j < 0) {
    return false;
  }

  if (a[i][j] === "#") {
    return false;
  }

  if (a[i][j] === ".") {
    return true;
  }

  const currChar = a[i][j];

  let isMovable;

  if (d === "^") {
    if (currChar === "[") {
      /* Prevent shifting for inner children until we know it's possible for all
      previous bug if we allow shifting when checking possibility
      direction: v
      .@.
      [].
      #[]
      []. 
      */
      isMovable =
        movable(a, i - 1, j, d, false) && movable(a, i - 1, j + 1, d, false);

      if (isMovable) {
        movable(a, i - 1, j, d, allowShift) &&
          movable(a, i - 1, j + 1, d, allowShift);

        if (allowShift) {
          shift(a, i, j, d);
          shift(a, i, j + 1, d);
        }
      }
    } else if (currChar === "]") {
      isMovable =
        movable(a, i - 1, j, d, false) && movable(a, i - 1, j - 1, d, false);

      if (isMovable) {
        movable(a, i - 1, j, d, allowShift) &&
          movable(a, i - 1, j - 1, d, allowShift);

        if (allowShift) {
          shift(a, i, j, d);
          shift(a, i, j - 1, d);
        }
      }
    } else {
      isMovable = movable(a, i - 1, j, d, false);
      if (isMovable) {
        movable(a, i - 1, j, d, allowShift);
        allowShift && shift(a, i, j, d);
      }
    }
  } else if (d === ">") {
    isMovable = movable(a, i, j + 1, d, false);
    if (isMovable) {
      movable(a, i, j + 1, d, allowShift);
      allowShift && shift(a, i, j, d);
    }
  } else if (d === "v") {
    if (currChar === "[") {
      isMovable =
        movable(a, i + 1, j, d, false) && movable(a, i + 1, j + 1, d, false);

      if (isMovable) {
        movable(a, i + 1, j, d, allowShift) &&
          movable(a, i + 1, j + 1, d, allowShift);

        if (allowShift) {
          shift(a, i, j, d);
          shift(a, i, j + 1, d);
        }
      }
    } else if (currChar === "]") {
      isMovable =
        movable(a, i + 1, j, d, false) && movable(a, i + 1, j - 1, d, false);

      if (isMovable) {
        movable(a, i + 1, j, d, allowShift) &&
          movable(a, i + 1, j - 1, d, allowShift);

        if (allowShift) {
          shift(a, i, j, d);
          shift(a, i, j - 1, d);
        }
      }
    } else {
      isMovable = movable(a, i + 1, j, d, false);

      if (isMovable) {
        movable(a, i + 1, j, d, allowShift);
        allowShift && shift(a, i, j, d);
      }
    }
  } else if (d === "<") {
    isMovable = movable(a, i, j - 1, d, false);
    if (isMovable) {
      movable(a, i, j - 1, d, allowShift);
      allowShift && shift(a, i, j, d);
    }
  }

  if (currChar === "@") {
    return isMovable
      ? d === "^"
        ? [i - 1, j]
        : d === ">"
        ? [i, j + 1]
        : d === "v"
        ? [i + 1, j]
        : [i, j - 1]
      : [i, j];
  } else {
    return isMovable;
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
      if (array[i][j] !== "[") {
        continue;
      }

      sum += i * 100 + j;
    }
  }

  return sum;
}

// for second part, we need doubled every element except @
function modify(array) {
  const newArr = [];
  for (let i = 0; i < array.length; i++) {
    newArr[i] = [];
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === "#") {
        newArr[i] = newArr[i].concat(["#", "#"]);
        continue;
      }

      if (array[i][j] === "O") {
        newArr[i] = newArr[i].concat(["[", "]"]);
        continue;
      }

      if (array[i][j] === ".") {
        newArr[i] = newArr[i].concat([".", "."]);
        continue;
      }

      if (array[i][j] === "@") {
        newArr[i] = newArr[i].concat(["@", "."]);
        continue;
      }
    }
  }

  return newArr;
}
