/**
 * Problem 90: Subsets II
 *
 * Given an array that MAY contain duplicates, return every unique subset.
 * No subset may appear twice.
 *
 * Done check: `node 90-subsets-ii.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  // TODO: write dfs here. You build the core.
  nums.sort();
  const result = [];
  function dfs(i, path) {
    result.push([...path]);
    for (let j = i; j < nums.length; j++) {
      if (j > i && nums[j] === nums[j - 1]) continue;
      path.push(nums[j]);
      dfs(j + 1, path);
      path.pop();
    }
  }

  dfs(0, []);

  return result;
};

const testCases = [
  {
    nums: [1, 2, 2],
    expect: [[], [1], [2], [1, 2], [2, 2], [1, 2, 2]],
  },
  {
    nums: [4, 4, 4, 1, 4],
    expect: [
      [],
      [1],
      [4],
      [1, 4],
      [4, 4],
      [1, 4, 4],
      [4, 4, 4],
      [1, 4, 4, 4],
      [4, 4, 4, 4],
      [1, 4, 4, 4, 4],
    ],
  },
  { nums: [0], expect: [[], [0]] },
];

// Order does not matter. Sort before comparing.
// Duplicates in `got` are NOT removed here, so a repeated subset fails.
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
  const got = subsetsWithDup(nums.slice());
  const ok = sortSubsets(got) === sortSubsets(expect);
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} nums=[${nums}]  expect ${sortSubsets(expect)} | got ${sortSubsets(got)}`,
  );
}
console.log(`\n${pass}/${testCases.length} passed`);
