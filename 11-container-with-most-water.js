var maxArea = function (height) {
  let maxAmount = 0;
  const len = height.length;
  let maxIndex = len - 1;

  for (let i = 0; i < len; i++) {
    const start = height[i];
    let maxEnd = height[maxIndex];
    const effectiveHeight = Math.min(start, maxEnd);

    const width = maxIndex - i;
    maxAmount = Math.max(maxAmount, effectiveHeight * width);
    // console.log(i, { maxAmount, effectiveHeight, maxIndex, width, maxEnd })

    // move right cursor
    while (maxEnd < start && maxIndex !== i + 1) {
      // console.log({ maxEnd, start, i, maxIndex})
      maxIndex -= 1;
      maxEnd = height[maxIndex];
      maxAmount = Math.max(maxAmount, Math.min(start, maxEnd) * (maxIndex - i));
    }

    // console.log('x', { i, maxAmount, effectiveHeight, maxIndex, width, maxEnd })

    // if (maxIndex === i+1) {
    //     return Math.max(maxAmount, Math.min(start, height[maxIndex]) * (maxIndex - i))
    // }
  }
  return maxAmount;

  //   let maxAmount = 0;
  //   const len = height.length;
  //   let maxIndex = len-1;

  //   for (let i=0; i<len; i++) {
  //     const start = height[i];
  //     let maxEnd = height[maxIndex];
  //     const effectiveHeight = Math.min(start, maxEnd);
  //     console.log({ start, maxEnd, maxIndex})
  //     while (start > maxEnd) {
  //         maxIndex --
  //         maxEnd = height[maxIndex]
  //     }
  //     const width = maxIndex - i
  //     maxAmount = Math.max(maxAmount, effectiveHeight * width)
  //     console.log({ maxAmount, effectiveHeight, width, maxEnd })
  //   }
  //   return maxAmount
};

const testCases = [
  {
    input: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    expect: 49,
  },
  {
    input: [1, 1],
    expect: 1,
  },
  {
    input: [1, 2, 1],
    expect: 2,
  },
  {
    input: [8, 7, 2, 1],
    expect: 7,
  },
  {
    input: [1, 2, 4, 3],
    expect: 4,
  },
  {
    input: [1, 2, 3, 4, 5, 25, 24, 3, 4],
    expect: 24,
  },
  {
    input: [1, 8, 100, 2, 100, 4, 8, 3, 7],
    expect: 200,
  },
  {
    input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    expect: 25,
  },
];

testCases.forEach(({ input, expect }) => {
  const result = maxArea(input);
  const isCorrect = result === expect;
  const colorTag = !isCorrect ? "\x1b[31m" : "\x1b[0m";
  const icon = !isCorrect ? "🥶" : "✅";
  console.log(`${colorTag}
        Input: [${input}]
        Expect: ${expect} || Output: ${result} ${icon}
        \x1b[0m`);
});
