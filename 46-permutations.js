/**
 * Problem 46: Permutations
 *
 * Given an array of distinct numbers, return every ordering.
 * Order matters, so [1,2] and [2,1] are different answers.
 *
 * Done check: `node 46-permutations.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
// Slow version: path.includes() scans the whole path on every choice.
var permuteIncludes = function (nums) {
  const result = [];

  function dfs(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) continue;

      path.push(nums[i]);
      dfs(path);
      path.pop();
    }
  }

  dfs([]);
  return result;
};

// Fast version: a used[] flag array makes the check O(1). Same answers.
var permute = function (nums) {
  const result = [];
  const used = Array(nums.length).fill(false);

  function dfs(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true; // choose: mark index i as taken
      path.push(nums[i]);
      dfs(path);
      path.pop();
      used[i] = false; // un-choose: free index i again
    }
  }

  dfs([]);
  return result;
};

const testCases = [
  {
    nums: [1, 2, 3],
    expect: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
  },
  {
    nums: [1, 2],
    expect: [
      [1, 2],
      [2, 1],
    ],
  },
  {
    nums: [1],
    expect: [[1]],
  },
];

// Order of the answer list does not matter. Sort before comparing.
function sortPerms(list) {
  return [...list]
    .map((s) => s.join(","))
    .sort()
    .join(" | ");
}

let pass = 0;
for (const { nums, expect } of testCases) {
  const got = permute(nums.slice());
  const ok = sortPerms(got) === sortPerms(expect);
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} nums=[${nums}]  expect ${sortPerms(expect)} | got ${sortPerms(got)}`,
  );
}
console.log(`\n${pass}/${testCases.length} passed`);
