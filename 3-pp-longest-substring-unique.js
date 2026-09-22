/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // sliding window
  const set = new Set();
  let left = 0;
  let maxLength = 0;
  const results = {};

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    while (set.has(char)) {
      set.delete(s[left]);
      left++;
    }
    set.add(char);

    maxLength = Math.max(maxLength, right - left + 1);
    // console.log([...set.values()].join(""));
    results[[...set.values()].join("")] = "";
  }
  console.log(Object.keys(results));
  return Object.keys(results).filter((val) => val.length === maxLength);
};

const testCases = [
  {
    input: "zzy",
    expect: ["z", "zy"], //hmm
  },
  {
    input: "codesignal",
    expect: ["codesignal"],
  },
  {
    input: "abcabcbb",
    expect: ["abc", "bca", "cab"],
  },
  {
    input: "bbbbb",
    expect: ["b"],
  },
  {
    input: "pwwkew",
    expect: ["wke", "kew"],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = lengthOfLongestSubstring(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
