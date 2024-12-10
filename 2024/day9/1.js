const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(""));
console.log("output:", output);

function getOutput(input) {
  const str = input.flatMap((digit, i) =>
    Array.from({ length: digit }, () => (i % 2 === 0 ? i / 2 : "."))
  );

  let leftPointer = 0;
  let rightPointer = str.length - 1;

  while (leftPointer < rightPointer) {
    if (str[leftPointer] !== ".") {
      leftPointer++;
      continue;
    }

    if (str[rightPointer] === ".") {
      rightPointer--;
      continue;
    }

    str[leftPointer] = str[rightPointer];
    str[rightPointer] = ".";

    leftPointer++;
    rightPointer--;
  }

  let i = 0;
  let sum = 0;
  while (str[i] !== ".") {
    sum += i * str[i];
    i++;
  }

  return sum;
}
