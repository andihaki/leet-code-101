/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const BRACKETS = {
    "[": "]",
    "(": ")",
    "{": "}",
  };

  const stacks = [];
  for (const char of s) {
    // console.log("---", s, char, char in BRACKETS);
    if (char in BRACKETS) {
      stacks.push(BRACKETS[char]);
    } else {
      if (stacks.at(-1) === char) {
        stacks.pop();
      } else {
        // console.log("stacks", stacks);
        return false;
      }
    }
  }
  // console.log("stacks", stacks);
  return stacks.length === 0;
}

const testCases = [
  {
    input: "(]]",
    expect: false,
  },
  {
    input: "[)]",
    expect: false,
  },
  {
    input: "([{[)]}]])",
    expect: false,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = isValid(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
