/**
 * Find Intersection (Easy)
 *
 * Input: two strings. Each holds numbers separated by commas.
 * The numbers in each string are sorted, small to big.
 * Output: one string. It holds the numbers that are in BOTH strings,
 * sorted, separated by commas. No spaces.
 *
 *   ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]  ->  "1,4,13"
 *
 * The two lists are small here. In the real problem they can hold
 * 1000 numbers each. A solution that visits each list one time is best.
 *
 * Done check: `node find-intersection.js`
 * Expected: every line ends with a check mark.
 */

// ===========================================================================
// THE CORE. You write this one function. About 15 lines.
// ===========================================================================
var intersect = function (a, b) {
  // a and b are sorted arrays of numbers, for example [1, 3, 4] and [1, 2, 4].
  // Return a sorted array of the numbers found in both.
  const result = [];
  const set = new Set([...a]);

  for (const num of set) {
    if (b.includes(num)) result.push(num);
  }

  return result;
};

// ===========================================================================
// Scaffold. Already done. Do not edit unless you want to.
// ===========================================================================

// "1, 3, 4" -> [1, 3, 4]
function parse(s) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map(Number);
}

// [1, 3, 4] -> "1,3,4"
function format(nums) {
  return nums.join(",");
}

// The function the problem asks for. Uses your work from above.
var findIntersection = function (strs) {
  return format(intersect(parse(strs[0]), parse(strs[1])));
};

// Oracle: a slow, simple model with the same answer. A test compares the two.
// It uses a set, so it does not care that the lists are sorted.
function oracleIntersection(a, b) {
  const inB = new Set(b);
  return a.filter((x) => inB.has(x));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
const cases = [
  { in: ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"], expect: "1,4,13" },
  { in: ["1, 2, 3", "4, 5, 6"], expect: "" },
  { in: ["", "1, 2"], expect: "" },
  { in: ["-5, 0, 12", "0, 12, 99"], expect: "0,12" },
  { in: ["100, 200, 300", "200, 300, 400"], expect: "200,300" },
  { in: ["2", "2"], expect: "2" },
  { in: ["1, 5, 9", "5"], expect: "5" },
];

let pass = 0;
let total = 0;

for (const { in: input, expect } of cases) {
  const got = findIntersection(input);
  const ok = got === expect;
  total++;
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} [${input.join("] [")}]  expect "${expect}" | got "${got}"`,
  );
}

// Oracle test: 200 random sorted lists. Same seed, same data, every run.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240101);

function randomList() {
  const n = Math.floor(rand() * 12);
  const out = new Set();
  while (out.size < n) out.add(Math.floor(rand() * 60) - 30);
  return [...out].sort((x, y) => x - y);
}

let oracleFails = 0;
for (let round = 0; round < 200; round++) {
  const a = randomList();
  const b = randomList();
  const got = findIntersection([format(a), format(b)]);
  const expect = format(oracleIntersection(a, b));
  if (got !== expect) {
    oracleFails++;
    if (oracleFails <= 3) {
      console.log(`🥶 oracle a=${format(a)} b=${format(b)}`);
      console.log(`   expect "${expect}" | got "${got}"`);
    }
  }
}
total++;
if (oracleFails === 0) pass++;
console.log(
  `${oracleFails === 0 ? "✅" : "🥶"} oracle 200 random lists  fails ${oracleFails}`,
);

console.log(`\n${pass}/${total} passed`);
