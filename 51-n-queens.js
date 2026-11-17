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
  const columns = new Set();
  const positiveDiagonal = new Set();
  const negativeDiagonal = new Set();
  
  const result = [];
  let board = Array(n).fill('.')
  for (let i=0; i<n; i++) {
    board[i] =  Array(n).fill('.')
  }
  
  function backtrack(row) {
    if (row === n) {
      const copy = [];
      for (let i=0; i<board.length; i++) {
        copy.push(board[i].join(''))
      }
      result.push(copy)
      return
    }
    
    for (let c=0; c<n; c++) {
      if (columns.has(c)
        || (positiveDiagonal.has(row+c))
        || (negativeDiagonal.has(row-c))) {
          continue
        }
      
      columns.add(c);
      positiveDiagonal.add(row+c);
      negativeDiagonal.add(row-c);
      board[row][c] = "Q"
      
      backtrack(row + 1);
      
      columns.delete(c);
      positiveDiagonal.delete(row+c);
      negativeDiagonal.delete(row-c);
      board[row][c] = "."
    }
  }
  
  backtrack(0)
  return result
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
