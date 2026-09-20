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
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroesEfficient = function (matrix) {
  const row = matrix.length,
    column = matrix[0].length;
  let rowZero = false;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        if (i > 0) {
          matrix[i][0] = 0;
        } else {
          rowZero = true;
        }
      }
    }
  }

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < column; j++) {
      if (matrix[0][j] === 0 || matrix[i][0] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  if (matrix[0][0] === 0) {
    for (let i = 0; i < row; i++) {
      matrix[i][0] = 0;
    }
  }

  if (rowZero) {
    for (let j = 0; j < column; j++) {
      matrix[0][j] = 0;
    }
  }
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
  setZeroesEfficient(input);
  const isCorrect = JSON.stringify(input) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${input} ${icon}
        \x1b[0m`);
});
