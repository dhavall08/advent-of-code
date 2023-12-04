const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(data) {
  const cards = data.split("\n");

  // initial object { 0: 1, 1: 1, 2: 1, ...}
  const initialObject = Object.fromEntries(
    Array.from({ length: cards.length }, (_, i) => [i, 1])
  );

  const processedObject = cards.reduce((object, card, cardIndex, arr) => {
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

    let match = 0;
    for (let i = 0; i < winningNumbersArray.length; i++) {
      if (
        !Number.isNaN(currentNumbersArray[i]) &&
        currentNumbersArray.includes(winningNumbersArray[i])
      ) {
        if (cardIndex !== arr.length - 1) {
          object[cardIndex + match + 1] =
            object[cardIndex + match + 1] + object[cardIndex];
        }
        match++;
      }
    }

    return object;
  }, initialObject);

  return Object.values(processedObject).reduce((sum, value) => sum + value, 0);
}
/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf-8"
);

const output = getOutput(input);
console.log("Answer:", output);
