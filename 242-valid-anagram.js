var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
  //   for (let i=0; i<s.length; i++) {
  //     const val = s[i];
  //     // console.log(t.indexOf(val), t)
  //     if (t.indexOf(val) > -1) {
  //         t = t.replace(val, '')
  //     }
  //   }
  //   //   console.log('t:', t)
  //   return t.length === 0;
};

const testCases = [
  {
    input: ["anagram", "nagaram"],
    expect: true,
  },
  {
    input: ["rat", "car"],
    expect: false,
  },
  {
    input: ["ab", "a"],
    expect: false,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = isAnagram(...input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
