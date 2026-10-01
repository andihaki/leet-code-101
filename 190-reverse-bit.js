/**
 * @param {number} n
 * @return {number}
 */
var reverseBits = function (n) {
  let binary = "";
  while (n) {
    binary += n % 2;
    n = Math.floor(n / 2);
  }
  while (binary.length !== 32) {
    binary += "0";
  }
  // console.log(binary);
  let result = 0;
  for (let i = 0; i < binary.length; i++) {
    result += 2 ** (32 - i - 1) * binary[i];
  }

  return result;
};

var reverseBits2 = function (n) {
  let binary = n.toString(2).split("").reverse().join("");
  while (binary.length !== 32) {
    binary += "0";
  }
  //   console.log(binary);
  return parseInt(binary, 2);
};

var reverseBits3 = function (n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    // Shift result left to make space for the next bit
    result = result << 1;

    // Get the last bit of n
    const bit = n & 1;

    // Put that bit at the right end of result
    result = result | bit;

    // one liner alternative
    // result = (result << 1) | (n & 1);

    // Remove the last bit from n using unsigned shift
    n = n >>> 1;
  }

  // Convert to unsigned 32-bit integer
  return result >>> 0;
};

const testCases = [
  {
    input: 43261596,
    expect: 964176192,
  },
  {
    input: 2147483644,
    expect: 1073741822,
  },
  {
    input: 2,
    expect: 1073741824,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = reverseBits3(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
