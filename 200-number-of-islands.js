/**
 * Problem 200: Number of Islands
 *
 * Grid of "1" (land) and "0" (water).
 * Count the islands. Two lands are adjacent if they touch up, down, left, or right.
 * Diagonal does not count. An island is one group of adjacent lands.
 *
 * Done check: `node 200-number-of-islands.js`
 * Expected: every line ends with a check mark.
 *
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const row = grid.length;
  const col = grid[0].length;
  let island = 0;
  function dfs(i, j) {
    if (i < 0 || i >= row || j < 0 || j >= col || grid[i][j] !== "1") return;
    grid[i][j] = "0";

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === "1") {
        island++;
        dfs(i, j);
      }
    }
  }
  return island;
};

const testCases = [
  {
    grid: [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    expect: 1,
  },
  {
    grid: [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
    expect: 3,
  },
  {
    grid: [["1"]],
    expect: 1,
  },
  {
    grid: [["0"]],
    expect: 0,
  },
];

let pass = 0;
for (const { grid, expect } of testCases) {
  const got = numIslands(grid.map((row) => [...row]));
  const ok = got === expect;
  if (ok) pass++;
  console.log(`${ok ? "✅" : "🥶"} expect ${expect} | got ${got}`);
}
console.log(`\n${pass}/${testCases.length} passed`);
