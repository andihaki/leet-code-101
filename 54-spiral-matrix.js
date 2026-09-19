/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let left = 0,
    right = matrix[0].length;
  let top = 0,
    bottom = matrix.length;
  const result = [];

  while (left < right && top < bottom) {
    for (let i = left; i < right; i++) {
      result.push(matrix[top][i]);
    }
    top++;
    for (let i = top; i < bottom; i++) {
      result.push(matrix[i][right - 1]);
    }
    right--;
    if (top < bottom) {
      for (let i = right - 1; i > left - 1; i--) {
        result.push(matrix[bottom - 1][i]);
      }
      bottom--;
    }
    if (left < right) {
      for (let i = bottom - 1; i > top - 1; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  return result;
};

const testCases = [
  {
    input: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    expect: [1, 2, 3, 6, 9, 8, 7, 4, 5],
  },
  {
    input: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ],
    expect: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = spiralOrder(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
