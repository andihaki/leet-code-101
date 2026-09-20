/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function (mat) {
  const right = mat[0].length,
    bottom = mat.length;
  const result = [];
  const temp = {};
  // console.log(mat.length)
  // console.log(mat[0])

  // if (bottom===1) return mat[0];
  // if (right===1) return [...mat];

  for (let i = 0; i < bottom; i++) {
    for (let j = 0; j < right; j++) {
      const sum = i + j;
      // console.log({ i, j, sum })
      if (temp[sum] === undefined) temp[sum] = [];
      // console.log(temp)
      temp[sum].push(mat[i][j]);
    }
  }
  // console.log(temp);
  for (const [key, values] of Object.entries(temp)) {
    (key % 2 === 0 ? values.reverse() : values).forEach((i) => result.push(i));
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
    expect: [1, 2, 4, 7, 5, 3, 6, 8, 9],
  },
  {
    input: [
      [1, 2],
      [3, 4],
    ],
    expect: [1, 2, 3, 4],
  },
  {
    input: [[2, 3]],
    expect: [2, 3],
  },
  {
    input: [[3], [2]],
    expect: [3, 2],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = findDiagonalOrder(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
