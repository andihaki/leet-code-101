/**
 * Problem 51: N-Queens
 *
 * Place n queens on an n x n board so that no two attack each other.
 * Queens attack along the same row, the same column, and both diagonals.
 * Return every valid board. "Q" = queen, "." = empty.
 *
 * Done check: `node 51-n-queens.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  // TODO: write dfs here. You build the core.
};

const testCases = [
  { n: 1, expect: [["Q"]] },
  {
    n: 4,
    expect: [
      [".Q..", "...Q", "Q...", "..Q."],
      ["..Q.", "Q...", "...Q", ".Q.."],
    ],
  },
  {
    n: 5,
    expect: [
      ["Q....", "..Q..", "....Q", ".Q...", "...Q."],
      ["Q....", "...Q.", ".Q...", "....Q", "..Q.."],
      [".Q...", "...Q.", "Q....", "..Q..", "....Q"],
      [".Q...", "....Q", "..Q..", "Q....", "...Q."],
      ["..Q..", "Q....", "...Q.", ".Q...", "....Q"],
      ["..Q..", "....Q", ".Q...", "...Q.", "Q...."],
      ["...Q.", "Q....", "..Q..", "....Q", ".Q..."],
      ["...Q.", ".Q...", "....Q", "..Q..", "Q...."],
      ["....Q", ".Q...", "...Q.", "Q....", "..Q.."],
      ["....Q", "..Q..", "Q....", "...Q.", ".Q..."],
    ],
  },
];

// Order of the answers does not matter. Sort before comparing.
function sortBoards(list) {
  return [...list].map((b) => b.join("/")).sort().join(" | ");
}

let pass = 0;
for (const { n, expect } of testCases) {
  const got = solveNQueens(n);
  const ok = sortBoards(got) === sortBoards(expect);
  if (ok) pass++;
  console.log(`${ok ? "✅" : "🥶"} n=${n}  expect ${expect.length} boards | got ${got.length}`);
  if (!ok) {
    console.log(`   expect ${sortBoards(expect)}`);
    console.log(`   got    ${sortBoards(got)}`);
  }
}
console.log(`\n${pass}/${testCases.length} passed`);
