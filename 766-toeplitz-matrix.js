/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function (matrix) {
  for (let i = 0; i < matrix.length - 1; i++) {
    for (let j = 0; j < matrix[0].length - 1; j++) {
      // console.log({
      //     i, j, val: matrix[i][j], vel: matrix[i + 1][j + 1]
      // })
      if (matrix[i][j] !== matrix[i + 1][j + 1]) return false;
    }
  }
  return true;
};

const testCases = [
  {
    input: [
      [1, 2, 3, 4],
      [5, 1, 2, 3],
      [9, 5, 1, 2],
    ],
    expect: true,
  },
  {
    input: [
      [1, 2],
      [2, 2],
    ],
    expect: false,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = isToeplitzMatrix(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
