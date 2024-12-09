const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(
  input.split(/\r?\n/).map((a) => {
    const [total, numbers] = a.split(": ");
    return [+total, numbers.split(" ").map((a) => +a)];
  })
);
console.log("output:", output);

function getOutput(line) {
  let total = 0;

  for (let l of line) {
    let requiredSum = l[0];
    let inputs = l[1];

    let possibility = makeIteration(l[1].length);

    possibility.some((operatorSet) => {
      let tempResult = inputs[0];

      for (let i = 0; i < operatorSet.length; i++) {
        let operator = operatorSet[i];

        if (operator === "+") {
          tempResult = tempResult + inputs[i + 1];
        } else if (operator === "*") {
          tempResult = tempResult * inputs[i + 1];
        } else {
          tempResult = +`${tempResult}${inputs[i + 1]}`;
        }
      }

      if (tempResult === requiredSum) {
        total += requiredSum;
        return true;
      }
    });
  }

  return total;
}

function makeIteration(charLength) {
  if (charLength === 2) {
    return ["+", "*", "|"];
  }

  return [
    ...makeIteration(charLength - 1).map((a) => "+" + a),
    ...makeIteration(charLength - 1).map((a) => "*" + a),
    ...makeIteration(charLength - 1).map((a) => "|" + a),
  ];
}
