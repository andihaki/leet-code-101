/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  /**
    matrix = [[1,1,1],[1,0,1],[1,1,1]]
    output = [[1,0,1],[0,0,0],[1,0,1]]

    0,0 0,1 0,2
    1,0 1,1 1,2
    2,0 2,1 2,2
     */

  const zeroes = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) zeroes.push([i, j]);
    }
  }

  // console.log(zeroes);

  for (const val of zeroes) {
    const [row, column] = val;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (row === i || column === j) {
          matrix[i][j] = 0;
        }
      }
    }
  }
  /**
    zeroes = [ [ 1, 1 ] ]
    matrix = [          [0,1]
                [1,0]   [1,1]   [1,2]
                        [2,1]
    ]
     */
};

const testCases = [
  {
    input: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    expect: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ],
  },
  {
    input: [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ],
    expect: [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ],
  },
];

testCases.forEach(({ input, expect }) => {
  setZeroes(input);
  const isCorrect = JSON.stringify(input) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${input} ${icon}
        \x1b[0m`);
});
