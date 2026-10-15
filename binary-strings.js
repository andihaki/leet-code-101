/**
 * Practice: all binary strings of length n.
 *
 * Same PUSH → recurse → POP pattern, but simpler than subsets:
 * no index `i`, and one new thing: a base case that stops the recursion.
 *
 * Done check: `node binary-strings.js`
 * Expected: every line ends with a check mark.
 *
 * @param {number} n
 * @return {string[]}
 */
var binaryStrings = function (n) {
  // TODO: write dfs here. You build the core.
  const result = [];
  function dfs(path) {
    if (path.length === n) {
      result.push(path.join(""));
      return;
    }

    for (const char of ["0", "1"]) {
      path.push(char);
      dfs(path);
      path.pop();
    }
  }

  dfs([]);
  return result;
};

const testCases = [
  { n: 1, expect: ["0", "1"] },
  { n: 2, expect: ["00", "01", "10", "11"] },
  {
    n: 3,
    expect: ["000", "001", "010", "011", "100", "101", "110", "111"],
  },
];

// Order does not matter. Sort before comparing.
function sortStrings(list) {
  return [...list].sort().join(" | ");
}

let pass = 0;
for (const { n, expect } of testCases) {
  const got = binaryStrings(n);
  const ok = sortStrings(got) === sortStrings(expect);
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} n=${n}  expect ${sortStrings(expect)} | got ${sortStrings(got)}`,
  );
}
console.log(`\n${pass}/${testCases.length} passed`);
