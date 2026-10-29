/**
 * Problem 79: Word Search
 *
 * Board of letters. Return true if `word` can be built from touching cells.
 * Cells touch up, down, left, right. One cell may not be used twice in one word.
 *
 * Done check: `node 79-word-search.js`
 * Expected: every line ends with a check mark.
 *
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const row = board.length;
  const col = board[0].length;

  function dfs(i, j, k) {
    // out of bound
    if (i < 0 || i >= row || j < 0 || j >= col) return false;

    // 404
    if (board[i][j] !== word[k]) return false;

    // 200
    if (k === word.length - 1) return true;

    const tempLetter = board[i][j];
    board[i][j] = "#";

    // 5. try the four neighbours for the NEXT letter
    const found =
      dfs(i + 1, j, k + 1) ||
      dfs(i - 1, j, k + 1) ||
      dfs(i, j + 1, k + 1) ||
      dfs(i, j - 1, k + 1);

    board[i][j] = tempLetter;
    return found;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
};

const boards = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];

const testCases = [
  { board: boards, word: "ABCCED", expect: true },
  { board: boards, word: "SEE", expect: true },
  { board: boards, word: "ABCB", expect: false },
  // Fails if the visited mark is not undone: (1,2) gets used by a dead
  // attempt and is never released, so the real answer cannot start there.
  { board: boards, word: "CCB", expect: true },
  { board: boards, word: "A", expect: true },
  { board: boards, word: "Z", expect: false },
  { board: [["A"]], word: "A", expect: true },
];

let pass = 0;
for (const { board, word, expect } of testCases) {
  // Copy the board: the answer may change it in place.
  const copy = board.map((row) => [...row]);
  const got = exist(copy, word);
  const ok = got === expect;
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} word="${word}"  expect ${expect} | got ${got}`,
  );
}
console.log(`\n${pass}/${testCases.length} passed`);
