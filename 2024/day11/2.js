const fs = require("fs");
const path = require("path");

const cache = {};

const getStones = (input, level) => {
  if (cache[`${input}_${level}`]) return cache[`${input}_${level}`];

  if (level === 0) return 1;

  if (input === 0) {
    const ans = getStones(1, level - 1);
    cache[`${input}_${level}`] = ans;
    return ans;
  }

  if (String(input).length % 2 === 0) {
    const ans1 = getStones(
      Number(String(input).slice(0, String(input).length / 2)),
      level - 1
    );

    const ans2 = getStones(
      Number(String(input).slice(String(input).length / 2)),
      level - 1
    );

    return ans1 + ans2;
  }

  const ans3 = getStones(input * 2024, level - 1);
  cache[`${input}_${level}`] = ans3;
  return ans3;
};

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");
const charArr = input.split(" ").map((a) => +a);
const sum = charArr.reduce((sum, a) => {
  return sum + getStones(a, 75);
}, 0);

console.log("output:", sum);
