/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let one = 1,
    two = 1;

  for (let i = 0; i < n - 1; i++) {
    [one, two] = [one + two, one];
  }
  return one;
};

const testCases = [
  {
    input: 2,
    expect: 2,
  },
  {
    input: 3,
    expect: 3,
  },
  {
    input: 5,
    expect: 8,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = climbStairs(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
