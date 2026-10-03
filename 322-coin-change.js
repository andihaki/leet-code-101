/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let dp = Array.from({ length: amount + 1 }).fill(amount + 1);
  dp[0] = 0;

  for (let a = 1; a < amount + 1; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        // console.log(a, c, dp[a], 1 + dp[a - c]);
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }
  //   console.log(dp);
  if (dp[amount] !== amount + 1) return dp[amount];
  return -1;
};

const testCases = [
  {
    input: [[1, 3, 4, 5], 7],
    expect: 2,
  },
  {
    input: [[1, 2, 5], 11],
    expect: 3,
  },
  {
    input: [[1, 6, 7, 9, 11], 13],
    expect: 2,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = coinChange(...input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
