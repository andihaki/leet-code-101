/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const results = {};
  for (let i = 0; i < strs.length; i++) {
    const val = strs[i].split("").sort().join("");
    if (!(val in results)) {
      results[val] = [i];
    } else {
      results[val].push(i);
    }
  }
  // const result = [];
  // console.log(results);
  return Object.values(results).map((val) => {
    // console.log('val', val, typeof val)
    return val.map((i) => strs[i]);
    // console.log('current', current)
    // result.push(current);
  });
  // console.log(result);
  // return result;
};

const testCases = [
  {
    input: ["eat", "tea", "tan", "ate", "nat", "bat"],
    expect: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
  },
  {
    input: [""],
    expect: [[""]],
  },
  {
    input: ["a"],
    expect: [["a"]],
  },
];

testCases.forEach(({ input, expect }) => {
  const result = groupAnagrams(input);
  const isCorrect = JSON.stringify(result) === JSON.stringify(expect);
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
