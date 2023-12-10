const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
function getOutput(data) {
  const lines = data.split(/(?:\r?\n){1}/);

  const values = {};
  const same = Object.fromEntries(
    Array.from({ length: 7 }, (line, i) => [i + 1, []])
  );
  const handLabels = {};

  lines.forEach((line, i) => {
    const [hand, bid] = line.split(" ");
    values[i] = bid;
    handLabels[i] = hand;

    const handArray = hand.split("");
    const uniqueSet = new Set(handArray);
    const uniqueSetArr = Array.from(uniqueSet);

    let max = 0;
    let secondMax = 0;

    for (let i = 0; i < uniqueSetArr.length; i++) {
      const char = uniqueSetArr[i];
      if (char === "J") {
        continue;
      }

      const count = handArray.filter((a) => a === char).length;

      if (count > max) {
        secondMax = max;
        max = count;
      } else if (count > secondMax) {
        secondMax = count;
      }
    }

    const jCount = handArray.filter((a) => a === "J").length;
    max += jCount;

    // AAAAA = 7
    // AAAAB = 6
    // AAABB = 5
    // AAABC = 4
    // AABBC = 3
    // AABCD = 2
    // ABCDE = 1

    if (max === 5) {
      same[7].push(i);
    } else if (max === 4) {
      same[6].push(i);
    } else if (max === 1) {
      same[1].push(i);
    }

    switch (`${max}${secondMax}`) {
      case "32":
        same[5].push(i);
        break;
      case "31":
        same[4].push(i);
        break;
      case "22":
        same[3].push(i);
        break;
      case "21":
        same[2].push(i);
        break;
    }
  });

  for (each in same) {
    if (same[each].length === 1) {
      same[each] = [{ i: same[each][0], original: handLabels[same[each][0]] }];
    } else {
      same[each] = same[each].map((val) => {
        const tempHandLabels = {};

        tempHandLabels[val] = handLabels[val]
          .replaceAll("A", "E")
          .replaceAll("K", "D")
          .replaceAll("Q", "C")
          .replaceAll("J", "1")
          .replaceAll("T", "A");

        return {
          i: val,
          based: parseInt(tempHandLabels[val], 15),
          original: handLabels[val],
        };
      });

      same[each].sort((a, b) => a.based - b.based);
    }
  }

  const result = Object.values(same).flat();

  let sum = 0;
  for (let i = 0; i < result.length; i++) {
    sum += values[result[i].i] * (i + 1);
  }

  return sum;
}

/* -------------------- getOutput - end ------------------------- */

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

const output = getOutput(input);
console.log("Answer:", output);