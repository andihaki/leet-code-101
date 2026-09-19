/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  let left = 0,
    right = n - 1;

  while (left < right) {
    for (let i = 0; i < right - left; i++) {
      let top = left,
        bottom = right;

      const topLeft = matrix[top][left + i];
      matrix[top][left + i] = matrix[bottom - i][left];
      matrix[bottom - i][left] = matrix[bottom][right - i];
      matrix[bottom][right - i] = matrix[top + i][right];
      matrix[top + i][right] = topLeft;
    }
    left++;
    right--;
  }

  // for (let i=0; i<len; i++) {
  //     for (let j=0; j<len; j++) {
  //         console.log(i, j, `${i},${j}`, `${j},${len-i-1}`, matrix[i][j], matrix[j][len-i-1]);
  //         [matrix[i][j], matrix[j][len-i-1]] = [matrix[j][len-i-1], matrix[i][j]];
  //     }
  // }
  return matrix;
};

const testCases = [
  {
    input: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    expect: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ],
  },
  {
    input: [
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16],
    ],
    expect: [
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11],
    ],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = rotate(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
