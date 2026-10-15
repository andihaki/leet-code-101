/**
 * Problem 77: Combinations
 *
 * Given n and k, return every combination of k numbers from 1..n.
 * Order inside a combination does not matter: [1,2] equals [2,1].
 *
 * Done check: `node 77-combinations.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // TODO: write dfs here. You build the core.
  const result = [];
  function dfs(x, path) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = x; i <= n; i++) {
      path.push(i);
      dfs(i + 1, path);

      path.pop();
    }
  }
  dfs(1, []);
  return result;
};

const testCases = [
  {
    n: 4,
    k: 2,
    expect: [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ],
  },
  {
    n: 3,
    k: 2,
    expect: [
      [1, 2],
      [1, 3],
      [2, 3],
    ],
  },
  {
    n: 1,
    k: 1,
    expect: [[1]],
  },
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
for (const { n, k, expect } of testCases) {
  const got = combine(n, k);
  const ok = sortCombos(got) === sortCombos(expect);
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} n=${n} k=${k}  expect ${sortCombos(expect)} | got ${sortCombos(got)}`,
  );
}
console.log(`\n${pass}/${testCases.length} passed`);
