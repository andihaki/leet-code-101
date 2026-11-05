/**
 * 2540. Minimum Common Value (Easy)
 *
 * Two integer arrays, nums1 and nums2. Both are sorted, small to big.
 * Return the smallest number that is in both arrays. If they share no
 * number, return -1.
 *
 *   nums1 = [1,2,3,6], nums2 = [2,3,4,5]  ->  2
 *   nums1 = [2,4],     nums2 = [1,2]      ->  2
 *   nums1 = [1,2],     nums2 = [3,4]      ->  -1
 *
 * Sizes go up to 100000. Values go up to 1e9. Duplicates are allowed.
 *
 * Done check: `node 2540-minimum-common-value.js`
 * Expected: every line ends with a check mark.
 *
 * https://leetcode.com/problems/minimum-common-value/
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function (nums1, nums2) {
  // num1 and nums2 are sorted. Return the smallest shared number, or -1.
  // This is the two-pointer walk you just wrote, with one change:
  // the answer is the FIRST match, so you can return right away.
  let i = 0;
  let j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      return nums1[i];
    } else if (nums1[i] < nums2[j]) i++;
    else j++;
  }

  return -1;
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
const testCases = [
  { nums1: [1, 2, 3], nums2: [2, 4], expect: 2 },
  { nums1: [1, 2, 3, 6], nums2: [2, 3, 4, 5], expect: 2 },
  { nums1: [2, 4], nums2: [1, 2], expect: 2 },
  { nums1: [1, 2], nums2: [3, 4], expect: -1 },
  { nums1: [5], nums2: [5], expect: 5 },
  { nums1: [3, 5, 7, 9], nums2: [1, 2, 3, 4], expect: 3 },
  // Both lists can hold duplicates. 2 appears twice in each. Answer is 2.
  { nums1: [1, 2, 2, 2, 9], nums2: [2, 2, 8], expect: 2 },
  { nums1: [1000000000], nums2: [999999999, 1000000000], expect: 1000000000 },
];

let pass = 0;
for (const { nums1, nums2, expect } of testCases) {
  const got = getCommon(nums1, nums2);
  const ok = got === expect;
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} [${nums1}] [${nums2}]  expect ${expect} | got ${got}`,
  );
}

// Oracle: a slow, simple model with the same answer. Two nested loops, O(n*m).
// It does not use the sort order at all.
function oracleGetCommon(nums1, nums2) {
  let best = -1;
  for (const x of nums1) {
    for (const y of nums2) {
      if (x === y && (best === -1 || x < best)) best = x;
    }
  }
  return best;
}

// 300 random sorted arrays. Same seed, same data, every run.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240202);

function randomList() {
  const n = 1 + Math.floor(rand() * 8);
  const out = [];
  for (let k = 0; k < n; k++) out.push(1 + Math.floor(rand() * 20));
  return out.sort((x, y) => x - y);
}

let oracleFails = 0;
for (let round = 0; round < 300; round++) {
  const nums1 = randomList();
  const nums2 = randomList();
  const got = getCommon(nums1, nums2);
  const expect = oracleGetCommon(nums1, nums2);
  if (got !== expect) {
    oracleFails++;
    if (oracleFails <= 3) {
      console.log(
        `🥶 oracle [${nums1}] [${nums2}]  expect ${expect} | got ${got}`,
      );
    }
  }
}
console.log(
  `${oracleFails === 0 ? "✅" : "🥶"} oracle 300 random lists  fails ${oracleFails}`,
);
if (oracleFails === 0) pass++;

console.log(`\n${pass}/${testCases.length + 1} passed`);
