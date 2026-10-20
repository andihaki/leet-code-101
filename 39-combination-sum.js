/**
 * Problem 39: Combination Sum
 *
 * Given an array candidates and a target, find every combination
 * (reuse allowed, order ignored) that sums to target.
 *
 * Done check: `node 39-combination-sum.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // TODO: write dfs here. You build the core.
  const result = [];
  const path = [];

  function dfs(x, rem) {
    if (rem === 0) {
      result.push([...path]);
      // console.log("returned", ...path);
      return;
    }
    if (rem < 0) {
      return;
    }
    for (let i = x; i < candidates.length; i++) {
      // console.log(path, candidates[i], rem);
      path.push(candidates[i]);
      dfs(i, rem - candidates[i]);
      path.pop();
    }
  }

  dfs(0, target);

  return result;
};

const testCases = [
  {
    candidates: [2, 3, 6, 7],
    target: 7,
    expect: [[2, 2, 3], [7]],
  },
  {
    candidates: [2, 3, 5],
    target: 8,
    expect: [
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ],
  },
  {
    candidates: [2],
    target: 1,
    expect: [],
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
for (const { candidates, target, expect } of testCases) {
  const got = combinationSum(candidates.slice(), target);
  const ok = sortCombos(got) === sortCombos(expect);
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} candidates=[${candidates}] target=${target}  expect ${sortCombos(expect)} | got ${sortCombos(got)}`,
  );
}
console.log(`\n${pass}/${testCases.length} passed`);
