/**
 * 2062. Count Vowel Substrings of a String (Easy)
 *
 * A substring is a contiguous, non-empty piece of the string.
 * A substring is a VOWEL SUBSTRING when:
 *   1. every character in it is a vowel: a, e, i, o, u
 *   2. it contains all five vowels at least once
 *
 * Return how many vowel substrings the word has.
 * The word can hold up to 100000 characters. Only lowercase a-z.
 *
 *   word = "aeiou"          ->  1
 *   word = "aeiouu"         ->  2
 *   word = "unicornarihan"  ->  0
 *   word = "cuaieuouac"     ->  7
 *
 * Done check: `node 2062-count-vowel-substrings.js`
 * Expected: every line ends with a check mark, then `18/18 passed`.
 *
 * https://leetcode.com/problems/count-vowel-substrings-of-a-string/
 *
 * @param {string} word
 * @return {number}
 */

// The five vowels. You can use this set in your code.
const VOWELS = new Set(["a", "e", "i", "o", "u"]);

function countVowelSubstrings(word) {
  // Write the count here. Return a number.
  let counter = 0;
  if (word.length < VOWELS.size) return 0;
  
  for (let i=0; i<word.length; i++) {
    const seen = new Set();
    for (let right=i; right < word.length; right++) {
      const c = word[right];
      if (!VOWELS.has(c)) break;
      seen.add(c);
      if (seen.size === VOWELS.size) counter++;
    }
  }
  
  
  return counter;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
const testCases = [
  { word: "aeiou", expect: 1 },
  { word: "aeiouu", expect: 2 },
  { word: "unicornarihan", expect: 0 },
  { word: "cuaieuouac", expect: 7 },
  { word: "aeiouaeiou", expect: 21 },
  { word: "uaeiou", expect: 3 },
  { word: "aaeiouu", expect: 4 },
  { word: "aeio", expect: 0 },
  { word: "aeioux", expect: 1 },
  { word: "aeioaeiou", expect: 5 },
  { word: "uoiea", expect: 1 },
  { word: "iiiouae", expect: 3 },
  { word: "xaeiou", expect: 1 },
  { word: "aeiouA", expect: 1 },
  { word: "aieuoaeiou", expect: 19 },
  { word: "eoaiu", expect: 1 },
];

let pass = 0;
for (const { word, expect } of testCases) {
  const got = countVowelSubstrings(word);
  const ok = got === expect;
  if (ok) pass++;
  console.log(`${ok ? "✅" : "🥶"} "${word}"  expect ${expect} | got ${got}`);
}

// Oracle: a slow, simple model with the same answer.
// It never looks at the whole string at once. It cuts the word into
// vowel-only runs, then tries every start and end inside one run.
function oracleCount(word) {
  let count = 0;
  let run = "";
  const runs = [];
  for (const c of word) {
    if (VOWELS.has(c)) run += c;
    else {
      if (run) runs.push(run);
      run = "";
    }
  }
  if (run) runs.push(run);

  for (const r of runs) {
    for (let i = 0; i < r.length; i++) {
      const seen = new Set();
      for (let j = i; j < r.length; j++) {
        seen.add(r[j]);
        if (seen.size === 5) count++;
      }
    }
  }
  return count;
}

// 400 random words. Same seed, same data, every run.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20622062);
const ALPHABET = "aeioubcdz";

function randomWord() {
  const n = 1 + Math.floor(rand() * 10);
  let out = "";
  for (let k = 0; k < n; k++) {
    out += ALPHABET[Math.floor(rand() * ALPHABET.length)];
  }
  return out;
}

let oracleFails = 0;
for (let round = 0; round < 400; round++) {
  const word = randomWord();
  const got = countVowelSubstrings(word);
  const expect = oracleCount(word);
  if (got !== expect) {
    oracleFails++;
    if (oracleFails <= 3) {
      console.log(`🥶 oracle "${word}"  expect ${expect} | got ${got}`);
    }
  }
}
console.log(
  `${oracleFails === 0 ? "✅" : "🥶"} oracle 400 random words  fails ${oracleFails}`,
);
if (oracleFails === 0) pass++;

// Big word: 2000 runs of 25 vowels, split by one 'b'. About 52000 characters.
let bigWord = "";
for (let k = 0; k < 2000; k++) bigWord += "aeiou".repeat(5) + "b";

const t0 = performance.now();
const bigGot = countVowelSubstrings(bigWord);
const bigMs = performance.now() - t0;
const bigExpect = oracleCount(bigWord);
const bigOk = bigGot === bigExpect;
if (bigOk) pass++;
console.log(
  `${bigOk ? "✅" : "🥶"} ${bigWord.length} characters  expect ${bigExpect} | got ${bigGot}  (${bigMs.toFixed(1)} ms)`,
);

console.log(`\n${pass}/${testCases.length + 2} passed`);
