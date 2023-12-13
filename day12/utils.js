// https://www.geeksforgeeks.org/program-calculate-value-ncr/
function nCr(n, r) {
  let sum = 1;

  // Calculate the value of n choose r using the binomial coefficient formula
  for (let i = 1; i <= r; i++) {
    sum = (sum * (n - r + i)) / i;
  }

  return sum;
}

module.exports = { nCr };
