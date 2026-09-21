/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  /**
    0,0     0,1     0,2     0,3     0,4
    1,0     1,1     1,2     1,3     1,4
    2,0     2,1     2,2     2,3     2,4
    3,0     3,1     3,2     3,3     3,4

    1       1       1       1       0
    1       1       0       1       0
    1       1       0       0       0
    0       0       0       0       0
     */

  const row = grid.length,
    col = grid[0].length;
  let islands = 0;
  // console.log(grid)

  function dfs(i, j) {
    if (i < 0 || i >= row || j < 0 || j >= col || grid[i][j] !== "1") return;

    grid[i][j] = "0";
    // console.log('> ', {i,j})

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === "1") {
        console.log({ i, j });
        islands++;
        dfs(i, j);
      }
    }
  }

  // console.log(grid)

  return islands;

  // for (let i = 0; i < row; i++) {
  //     for (let j = 0; j < col; j++) {
  //         console.log({ row, col, i, j })
  //         const current = grid[i][j];
  //         const up = i > 0 ? grid[i - 1][j] === "1" : true;
  //         const left = j > 0 ? grid[i][j - 1] === "1" : true;
  //         // const right = j < col ? grid[i][j + 1] === "1" : true;
  //         const right = j < col - 1 ? grid[i][j + 1] === "1" : false;
  //         const bottom = i < row - 1 ? grid[i + 1][j] === "1" : true;
  //         console.log({ up, left, right, bottom })
  //         if (row === 1) {
  //             if (up && left && bottom) islands++
  //         } else if (!up && !left && !right && !bottom) islands++
  //     }
  // }
  // return islands
};

const testCases = [
  {
    input: [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    expect: 1,
  },
  {
    input: [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
    expect: 3,
  },
  {
    input: [["1"]],
    expect: 1,
  },
  {
    input: [["1", "0"]],
    expect: 1,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = numIslands(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
