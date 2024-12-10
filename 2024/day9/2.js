const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./sample.txt"), "utf-8");

const output = getOutput(input.split(""));
console.log("output:", output);

// TODO: takes too long for input string
function getOutput(input) {
  input;

  const str = input.flatMap((digit, i) =>
    Array.from({ length: digit }, () => (i % 2 === 0 ? i / 2 : "."))
  );

  str;

  let leftPointer = 0;
  let rightPointer = str.length - 1;

  while (rightPointer > 0) {
    if (leftPointer >= rightPointer && rightPointer > 0) {
      leftPointer = 0;

      const rightCount = str.filter((a) => a === str[rightPointer]).length;
      rightPointer -= rightCount;
      continue;
    }

    if (str[leftPointer] !== ".") {
      leftPointer++;
      continue;
    }

    if (str[rightPointer] === ".") {
      rightPointer--;
      continue;
    }

    let leftCount = 0;

    while (str[leftPointer + leftCount] === ".") {
      leftCount++;
    }

    const rightCount = str.filter((a) => a === str[rightPointer]).length;

    if (leftCount < rightCount) {
      leftPointer += leftCount;
      continue;
    }

    str;

    let temp = 0;
    while (temp < rightCount) {
      str[leftPointer + temp] = str[rightPointer - temp];
      str[rightPointer - temp] = ".";
      temp++;
    }

    leftPointer += rightCount;
    rightPointer -= rightCount;
  }

  let i = 0;
  let sum = 0;
  while (i < str.length) {
    if (str[i] !== ".") {
      sum += i * str[i];
    }

    i++;
  }

  return sum;
}
