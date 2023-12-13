const fs = require("fs");
const path = require("path");
// const { nCr } = require("./utils");

function nPr(n, r) {
  let mul = 1;

  // Calculate the value of n choose r using the binomial coefficient formula
  for (let i = n; i > n - r; i--) {
    mul *= i;
  }

  return mul;
}

function nCr(n, r) {
  let sum = 1;

  // Calculate the value of n choose r using the binomial coefficient formula
  for (let i = 1; i <= r; i++) {
    sum = (sum * (n - r + i)) / i;
  }

  return sum;
}

/* -------------------- getOutput - start ------------------------- */
function getOutput(Q) {
  let S = Q[0];
  let G = Q[1]
    .split(",")
    .map((v) => Array.from({ length: v }, () => "#").join(""))
    .join(".");

  // remove dots from S
  let SS = S.replace(/\.+/g, ".").replace(/^\.|\.$/g, "");

  // let SSS = G.split("").map((g, i) => (g === "." ? "." : SS[i]));
  console.log(SS, "|", G);

  let SSS = SS.split(".");
  let SSSS = SS.split("");
  let GG = G.split(".");

  console.log(SSS, "|", GG);

  let mul = 1;

  if (SSS.length < GG.length) {
    G;
    S;

    let totalGdots = G.match(/\./g)?.length || 0;
    let totalSdots = S.match(/\./g)?.length || 0;
    let extraDots = S.length - G.length;
    let dotToAdd = totalGdots - totalSdots + extraDots;

    let totalGHash = G.match(/\#/g)?.length || 0;
    let totalSHash = S.match(/\#/g)?.length || 0;
    let availableSpace = S.match(/\?/g)?.length || 0;
    let requiredHash = totalGHash - totalSHash;

    let QCount = S.match(/\?/g).length;

    QCount;
    SSSS;
    dotToAdd;
    console.log(SSS, "|", GG);
    const necessaryDots = GG.length - SSS.length;
    groupedDots = dotToAdd - necessaryDots;
    console.log(
      availableSpace,
      dotToAdd,
      "-",
      necessaryDots,
      "=",
      groupedDots,
      "#:",
      requiredHash
    );

    // -1 because of two shouldn't be adjacent
    const permutations = nPr(availableSpace - 1, requiredHash);
    console.log("permutations:", permutations);

  } else if (GG.length === SSS.length) {
    SSS.forEach((s, i) => {
      // sLength C gLength
      mul *= nCr(s.length, GG[i].length);
    });
  }

  mul;

  return 0;
}

/* -------------------- getOutput - end ------------------------- */

const inputFile = fs.readFileSync(
  path.resolve(__dirname, "./sample.txt"),
  "utf-8"
);

const lines = inputFile.split(/(?:\r?\n){1}/);
let sum = 0;

lines.forEach((l) => {
  sum += getOutput(l.split(" "));
});

console.log("Answer:", sum);
