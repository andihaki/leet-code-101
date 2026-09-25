/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const ans = [0];
  for (let i = 1; i <= n; i++) {
    let counter = 0;

    let num = i;
    while (num) {
      counter = num % 2 === 0 ? counter : counter + 1;
      num = Math.floor(num / 2);
    }
    // console.log({ i, num, result }, result.replaceAll('0', ''))
    ans.push(counter);
  }
  return ans;
};
const testCases = [
  {
    input: 2,
    expect: [0, 1, 1],
  },
  {
    input: 5,
    expect: [0, 1, 1, 2, 1, 2],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = countBits(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
