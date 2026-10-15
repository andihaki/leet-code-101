/**
 * Problem 216: Combination Sum III
 *
 * Given k and n, find every combination of k DISTINCT numbers from 1..9
 * whose sum equals n. Same as 77-combinations, plus a target sum.
 *
 * Done check: `node 216-combination-sum-iii.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  // TODO: write dfs here. You build the core.
  const result = [];

  function dfs(x, path) {
    if (path.length === k) {
      const total = path.reduce((acc, curr) => acc + curr, 0);
      // console.log({ total }, path)
      if (total === n) {
        result.push([...path]);
      }
      return;
    }

    for (let i = x; i <= 9; i++) {
      path.push(i);
      dfs(i + 1, path);
      path.pop();
    }
  }

  dfs(1, []);

  return result;
};

const testCases = [
  { k: 3, n: 7, expect: [[1, 2, 4]] },
  {
    k: 3,
    n: 9,
    expect: [
      [1, 2, 6],
      [1, 3, 5],
      [2, 3, 4],
    ],
  },
  { k: 2, n: 18, expect: [] },
];

// Order does not matter. Sort before comparing.
function sortCombos(list) {
  return [...list]
    .map((s) =>
      s
        .slice()
        .sort((a, b) => a - b)
        .join(","),
    )
    .sort()
    .join(" | ");
}

let pass = 0;
for (const { k, n, expect } of testCases) {
  const got = combinationSum3(k, n);
  const ok = sortCombos(got) === sortCombos(expect);
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} k=${k} n=${n}  expect ${sortCombos(expect)} | got ${sortCombos(got)}`,
  );
}
console.log(`\n${pass}/${testCases.length} passed`);
