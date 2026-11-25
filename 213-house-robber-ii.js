/**
 * 213. House Robber II — the houses are in a circle.
 * You cannot rob two adjacent houses, and house 0 is adjacent to house n-1.
 *
 * @param {number[]} nums  money in each house, around the circle
 * @return {number}        most money you can take
 */
var robII = function (nums) {
  // robLine = House Robber I on a straight line of houses
  function robLine(arr) {
    let rob1 = 0;
    let rob2 = 0;

    for (const num of arr) {
      [rob1, rob2] = [rob2, 
       // ambil num+rob1. skip rob2
        Math.max(num + rob1, rob2)
      ];
    }

    return rob2;
  }
  
  if (nums.length === 1) return nums[0];
  
  // rob kecuali baris terakhir
  const rob0 = robLine(nums.slice(0, -1));
  // rob kecuali baris pertama
  const robLast = robLine(nums.slice(1));
  
  return Math.max(rob0, robLast);
};

const testCases = [
  { input: [2, 3, 2], expect: 3 },
  { input: [1, 2, 3, 1], expect: 4 },
  { input: [1, 2, 3], expect: 3 },
  { input: [5], expect: 5 },
  { input: [2, 2, 4, 3, 2], expect: 6 },
];

testCases.forEach(({ input, expect }) => {
  const result = robII(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});

// ---- oracle test: slow truth from all subsets, your code must match ----
function bruteForce(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  let best = 0;
  for (let mask = 0; mask < 1 << n; mask++) {
    let ok = true;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i))) continue;
      const next = (i + 1) % n; // circle: after n-1 comes 0
      if (mask & (1 << next)) ok = false;
      sum += nums[i];
    }
    if (ok && sum > best) best = sum;
  }
  return best;
}

let oracleFailures = 0;
for (let t = 0; t < 200; t++) {
  const n = 1 + Math.floor(Math.random() * 9);
  const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 20));
  const want = bruteForce(nums);
  const got = robII(nums);
  if (got !== want) {
    oracleFailures++;
    if (oracleFailures <= 3) {
      console.log(`\x1b[31m  oracle: [${nums}] want ${want}, got ${got}\x1b[0m`);
    }
  }
}
console.log(
  oracleFailures === 0
    ? "\x1b[32moracle: 200/200 random cases match brute force ✅\x1b[0m"
    : `\x1b[31moracle: ${oracleFailures}/200 random cases wrong 🥶\x1b[0m`,
);
