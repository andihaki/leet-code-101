var getSum = function (a, b) {
  let temp = 0;
  while (b != 0) {
    temp = (a & b) << 1;
    a = a ^ b;
    b = temp;
    // console.log({ temp, a, b })
  }
  return a;
};

const testCases = [
  {
    input: [1, 2],
    expect: 3,
  },
  {
    input: [2, 3],
    expect: 5,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = getSum(...input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
