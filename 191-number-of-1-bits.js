/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let counter = 0;

  //   while (n > 0) {
  while (n) {
    if (n % 2 !== 0) counter += 1;
    // result += n % 2 === 0 ? 0 : 1;
    n = Math.floor(n / 2);
  }

  return counter;
  // return result.replaceAll('0', '').length;
};
const testCases = [
  {
    input: 11,
    expect: 3,
  },
  {
    input: 128,
    expect: 1,
  },
  {
    input: 2147483645,
    expect: 30,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = hammingWeight(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
