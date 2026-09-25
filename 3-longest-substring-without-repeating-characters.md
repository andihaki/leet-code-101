# soal

Given a string s, find the length of the longest substring without duplicate characters.

# contoh

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

# solusi

Dah nyoba pake array tapi, kurang OK. ternyata pakai `Set` + sliding window lebih mudah dipahami.
Jadi pointer kiri dan kanan di geser 1x kekanan kalo value nya duplicate:

```
const set = new Set();
let left = 0;
let maxLength = 0;

for (let right=0; right<s.length; right++) {
    const char = s[right];

    while (set.has(char)) {
        set.delete(s[left])
        left++
    }
    set.add(char);

    maxLength = Math.max(maxLength, right - left + 1)
}
return maxLength

```

## solusi array

```javascript
const output = [];
let counter = 0;
for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  const index = output.indexOf(ch);
  // console.log('> ', { ch }, output, output.includes(ch))
  console.log({ i, ch }, output);

  if (index !== -1) {
    console.log(output.splice(0, index + 1));
    output.splice(0, index + 1);
  }
  output.push(ch);
  counter = Math.max(counter, output.length);
}
// console.log(output)
return counter;
```
