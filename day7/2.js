const fs = require("fs");
const path = require("path");

/* -------------------- getOutput - start ------------------------- */
const commonRanks = {
  5: 1,
  4: 2,
  1: 7,
};

function getOutput(data) {
  const lines = data.split(/(?:\r?\n){1}/);

  const values = {};
  const same = {};
  const handLabels = {};

  lines.forEach((line, i) => {
    const [hand, bid] = line.split(" ");
    values[i] = bid;
    handLabels[i] = hand;

    const handArray = hand.split("");

    const set = new Set(handArray);
    let uniqueCount = set.size;
    const jCount = handArray.filter((v) => v === "J").length;

    console.log(uniqueCount);


    if (uniqueCount === 3) {
      if ([...set].some((j) => handArray.filter((v) => v === j).length === 3)) {
        if (jCount === 2) {
          // JJBBC,
          same[6] ? same[6].push(i) : (same[6] = [i]);
        } else if (jCount === 1) {
          // AABBJ
          same[5] ? same[5].push(i) : (same[5] = [i]);
        } else {
          // AABBC,
          same[4] ? same[4].push(i) : (same[4] = [i]);
        }
      } else {
        if (jCount > 0) {
          // AAABJ, JJJBC
          same[6] ? same[6].push(i) : (same[6] = [i]);
        } else {
          // AAABC,
          same[3] ? same[3].push(i) : (same[3] = [i]);
        }
      }
    } else if (uniqueCount === 2) {
      if ([...set].some((j) => j === "J")) {
        // JJJBB, JJJJB, AAAAJ
        same[7] ? same[7].push(i) : (same[7] = [i]);
      } else {
        if (
          [...set].some((j) => handArray.filter((v) => v === j).length === 4)
        ) {
          // AAAAB,
          same[6] ? same[6].push(i) : (same[6] = [i]);
        } else {
          // AAABB,
          same[5] ? same[5].push(i) : (same[5] = [i]);
        }
      }
    } else if (uniqueCount === 4 && jCount > 0) {
      // ABCJJ, ABJCC
      same[3] ? same[3].push(i) : (same[3] = [i]);
    } else if (uniqueCount === 5 && jCount > 0) {
      // ABCDJ
      same[2] ? same[2].push(i) : (same[2] = [i]);
    } else {
      same[commonRanks[uniqueCount]]
        ? same[commonRanks[uniqueCount]].push(i)
        : (same[commonRanks[uniqueCount]] = [i]);
    }
  });

  console.log(same);
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

  console.log(same);
  const result = Object.values(same).flat();
  console.log(result);

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
