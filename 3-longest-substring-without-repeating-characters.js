/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // sliding window
  const set = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    while (set.has(char)) {
      set.delete(s[left]);
      left++;
    }
    set.add(char);

    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
};

const testCases = [
  {
    input: "abcabcbb",
    expect: 3,
  },
  {
    input: "bbbbb",
    expect: 1,
  },
  {
    input: "pwwkew",
    expect: 3,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = lengthOfLongestSubstring(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
