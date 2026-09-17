var reverseString = function (s) {
  const len = s.length - 1;
  // console.log({len})
  for (let i = 0; i < Math.ceil(len / 2); i++) {
    // console.log(i,  s[i], s[len - i]);
    [s[i], s[len - i]] = [s[len - i], s[i]];
    // console.log(s)
  }
  return s;
};

const testCases = [
  {
    input: ["h", "e", "l", "l", "o"],
    expect: ["o", "l", "l", "e", "h"],
  },
  {
    input: ["H", "a", "n", "n", "a", "h"],
    expect: ["h", "a", "n", "n", "a", "H"],
  },
  {
    input: [
      "A",
      " ",
      "m",
      "a",
      "n",
      ",",
      " ",
      "a",
      " ",
      "p",
      "l",
      "a",
      "n",
      ",",
      " ",
      "a",
      " ",
      "c",
      "a",
      "n",
      "a",
      "l",
      ":",
      " ",
      "P",
      "a",
      "n",
      "a",
      "m",
      "a",
    ],
    expect: [
      "a",
      "m",
      "a",
      "n",
      "a",
      "P",
      " ",
      ":",
      "l",
      "a",
      "n",
      "a",
      "c",
      " ",
      "a",
      " ",
      ",",
      "n",
      "a",
      "l",
      "p",
      " ",
      "a",
      " ",
      ",",
      "n",
      "a",
      "m",
      " ",
      "A",
    ],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = reverseString(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
