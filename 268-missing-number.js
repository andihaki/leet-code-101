/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  // simpler minus sum
  let result = nums.length;
  for (let i = 0; i < nums.length; i++) {
    result += i - nums[i];
  }

  return result;

  // // minus sum
  // return Array.from({ length: nums.length + 1 }, (_, index) => index).reduce((acc, curr) => acc + curr, 0) - nums.reduce((aa, curr) => aa + curr, 0)

  // manual sorting and manual edge case handling
  // let missing = Math.max(...nums);
  // nums.sort((a, b) => a - b);

  // for (let i = 0; i < nums.length - 1; i++) {
  //     const num = nums[i];
  //     const next = nums[i + 1];
  //     if (next - num > 1) return num + 1
  // }

  // return nums.includes(0) ? nums.length : 0;
};

const testCases = [
  {
    input: [3, 0, 1],
    expect: 2,
  },
  {
    input: [0, 1],
    expect: 2,
  },
  {
    input: [9, 6, 4, 2, 3, 5, 7, 0, 1],
    expect: 8,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = missingNumber(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
