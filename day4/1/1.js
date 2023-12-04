const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(data) {
  const allCards = data.split("\n");

  const total = allCards.reduce((sum, card) => {
    const allNumbers = card.split(": ")[1];
    const [winningNumbers, currentNumbers] = allNumbers.split(" | ");
    const winningNumbersArray = winningNumbers
      .split(" ")
      .filter((o) => o)
      .map((o) => o.trim());

    const currentNumbersArray = currentNumbers
      .split(" ")
      .filter((o) => o)
      .map((o) => o.trim());

    let total = 0;

    for (let i = 0; i < winningNumbersArray.length; i++) {
      if (
        !Number.isNaN(currentNumbersArray[i]) &&
        currentNumbersArray.includes(winningNumbersArray[i])
      ) {
        if (total == 0) {
          total = 1;
        } else {
          total *= 2;
        }
      }
    }
    debugger;

    return sum + total;
  }, 0);

  return total;
}
/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(
  path.resolve(__dirname, "./1_input.txt"),
  "utf-8"
);

const output = getOutput(input);
console.log("Answer:", output);
