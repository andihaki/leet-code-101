/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  console.log(">>", nums);
  const stacks = [],
    n = nums.length;

  for (let i = 0; i < n; i++) {
    const a = nums[i];
    // skip duplicate num
    if (a === nums[i - 1]) continue;

    // karna udah urut, impossible bakal 0 ketika a > 0
    if (a > 0) continue;

    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      const b = nums[left];
      const c = nums[right];
      const current = a + b + c;
      //   console.log(current, a, nums[left], nums[right]);
      if (current === 0) {
        stacks.push([a, b, c]);
        left += 1;

        // console.log("> ", { left, right }, nums[left], nums[left - 1]);
        // skip duplicate num
        while (left < right && nums[left] === nums[left - 1]) {
          left += 1;
        }
      } else if (current < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return stacks;
};

const testCases = [
  {
    input: [-1, 0, 1, 2, -1, -4],
    expect: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    input: [0, 1, 1],
    expect: [],
  },
  {
    input: [0, 0, 0],
    expect: [[0, 0, 0]],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = threeSum(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
