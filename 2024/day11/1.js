const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input.split(" ").map((a) => +a));
console.log("output:", output);

function getOutput(input) {
  input;

  let curr = input;
  for (let i = 0; i < 25; i++) {
    curr = getStones(curr);
  }

  return curr.length;
}

function getStones(array) {
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    let a = array[i];

    if (a === 0) {
      newArr.push(1);
      continue;
    }

    if (String(a).length % 2 === 0) {
      newArr.push(Number(String(a).slice(0, String(a).length / 2)));
      newArr.push(Number(String(a).slice(String(a).length / 2)));
      continue;
    }

    newArr.push(a * 2024);
  }

  return newArr;
}
