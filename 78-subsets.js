/**
 * Problem 78: Subsets
 *
 * Given an array of unique numbers, return every subset (the power set).
 * A subset keeps any of the numbers, in any order, each at most once.
 *
 * Done check: `node 78-subsets.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  // TODO: write dfs here. You build the core.
  const result = [];
  function dfs(i, path) {
    result.push([...path]);
    for (let j = i; j < nums.length; j++) {
      path.push(nums[j]);
      dfs(j + 1, path);
      path.pop();
    }
  }

  dfs(0, []);

  // const subset = []
  // function dfs(i) {
  //     if (i >= nums.length) {
  //         result.push([...subset])
  //         return;
  //     }

  //     // include i
  //     subset.push(nums[i]);
  //     dfs(i + 1);

  //     // exclude i
  //     subset.pop()
  //     dfs(i + 1);
  // }
  // dfs(0);
  return result;
};

const testCases = [
  {
    nums: [1, 2, 3],
    expect: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
  },
  {
    nums: [0],
    expect: [[], [0]],
  },
];

// Order of your subsets does not matter. This sorts them before comparing.
function sortSubsets(list) {
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
for (const { nums, expect } of testCases) {
  const got = subsets(nums.slice());
  const gotKey = sortSubsets(got);
  const expectKey = sortSubsets(expect);
  const ok = gotKey === expectKey;
  if (ok) pass++;
  console.log(`${ok ? "✅" : "🥶"} expect ${expectKey} | got ${gotKey}`);
}
console.log(`\n${pass}/${testCases.length} passed`);
