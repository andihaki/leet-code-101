/**
 * @param {number[]} nums  money in each house, left to right
 * @return {number}        most money you can take, no two adjacent houses
 */
var houseRobber = function (nums) {
  // @todo: your code here
};

const testCases = [
  { input: [1, 2, 3, 1], expect: 4 },
  { input: [2, 7, 9, 3, 1], expect: 12 },
  { input: [5], expect: 5 },
  { input: [2, 1, 1, 2], expect: 4 },
];

testCases.forEach(({ input, expect }) => {
  const result = houseRobber(input);
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
  let best = 0;
  for (let mask = 0; mask < 1 << nums.length; mask++) {
    let ok = true;
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      if (!(mask & (1 << i))) continue;
      if (i > 0 && mask & (1 << (i - 1))) ok = false;
      sum += nums[i];
    }
    if (ok && sum > best) best = sum;
  }
  return best;
}

let oracleFailures = 0;
for (let t = 0; t < 200; t++) {
  const n = 1 + Math.floor(Math.random() * 10);
  const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 20));
  const want = bruteForce(nums);
  const got = houseRobber(nums);
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
