/**
 * Min Window Substring (Medium)  [Coderbyte]
 *
 * Input: an array of two strings, [haystack, needle].
 *
 * Return the SMALLEST substring of haystack that contains every character
 * of needle, with the same counts. Character order does not matter.
 * If two answers have the same length, return the LEFT one.
 * If no answer exists, return "".
 *
 *   ["ahffaksfajeeubsne", "jefaa"]  ->  "aksfaje"
 *   ["aaabaaddae", "aed"]           ->  "dae"
 *   ["aabdccdbcacd", "aad"]         ->  "aabd"
 *   ["baab", "ab"]                  ->  "ba"      tie, left one
 *
 * Counts, not just presence: needle "aad" needs two a's and one d.
 * Letters are lowercase a-z.
 *
 * Done check: `node min-window-substring.js`
 * Expected: every line ends with a check mark.
 * Speed check: `node min-window-substring.js bench`
 *
 * https://coderbyte.com/information/Min%20Window%20Substring
 *
 * @param {string[]} strs  [haystack, needle]
 * @return {string}
 */
var minWindowSubstring = function (strs) {
  const [hay, needle] = strs;

  // Return the smallest window of `hay` that holds all of `needle`.
  const S = hay.length;
  const T = needle.length;

  if (S < T) return "";

  const tChars = {};
  for (const c of needle) {
    if (!Object.keys(tChars).includes(c)) {
      tChars[c] = 1;
    } else {
      tChars[c] += 1;
    }
  }

  let minW = Infinity;
  let startIndex = -1;
  let windowChars = {};
  let l = 0;

  // trrack chartacters matches
  let have = 0;
  let need = Object.keys(tChars).length;

  for (let r = 0; r < S; r++) {
    // Add s[r] into window
    const char = hay[r];
    if (!Object.keys(windowChars).includes(char)) {
      windowChars[char] = 1;
    } else {
      windowChars[char] += 1;
    }

    // if characters match, then increment have
    if (
      Object.keys(tChars).includes(char) &&
      windowChars[char] === tChars[char]
    ) {
      have += 1;
    }

    // when match, shorthen the window
    while (have === need) {
      const w = r - l + 1;
      // valid
      if (w < minW) {
        startIndex = l;
        minW = w;
      }

      // check if removing hay[l] break the required char
      const leftChar = hay[l];
      if (
        Object.keys(tChars).includes(leftChar) &&
        windowChars[leftChar] === tChars[leftChar]
      ) {
        have -= 1;
      }

      if (windowChars[leftChar] === 1) {
        delete windowChars[leftChar];
      } else {
        windowChars[leftChar] -= 1;
      }
      l += 1;
    }
  }

  if (minW === Infinity) return "";
  else return hay.slice(startIndex, startIndex + minW);
};

var minWindowSubstringNasty = function (strs) {
  const [hay, needle] = strs;

  // Return the smallest window of `hay` that holds all of `needle`.
  const S = hay.length;
  const T = needle.length;

  if (S < T) return "";

  const tChars = {};
  for (const c of needle) {
    if (!Object.keys(tChars).includes(c)) {
      tChars[c] = 1;
    } else {
      tChars[c] += 1;
    }
  }

  let minW = Infinity;
  let startIndex = -1;
  let windowChars = {};
  let l = 0;

  function valid() {
    for (const key of Object.keys(tChars)) {
      if (!Object.keys(windowChars).includes(key)) {
        return false;
      } else if (windowChars[key] < tChars[key]) {
        return false;
      }
    }
    return true;
  }

  for (let r = 0; r < S; r++) {
    // Add s[r] into window
    if (!Object.keys(windowChars).includes(hay[r])) {
      windowChars[hay[r]] = 1;
    } else {
      windowChars[hay[r]] += 1;
    }

    while (valid()) {
      const w = r - l + 1;
      // valid
      if (w < minW) {
        startIndex = l;
        minW = w;
      }
      if (windowChars[hay[l]] === 1) {
        delete windowChars[hay[l]];
      } else {
        windowChars[hay[l]] -= 1;
      }
      l += 1;
    }
  }

  if (minW === Infinity) return "";
  else return hay.slice(startIndex, startIndex + minW);
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
const testCases = [
  {
    label: "coderbyte 1",
    in: ["ahffaksfajeeubsne", "jefaa"],
    expect: "aksfaje",
  },
  { label: "coderbyte 2", in: ["aaabaaddae", "aed"], expect: "dae" },
  { label: "coderbyte 3", in: ["aabdccdbcacd", "aad"], expect: "aabd" },
  { label: "needle is the hay", in: ["abc", "abc"], expect: "abc" },
  { label: "one letter", in: ["abc", "b"], expect: "b" },
  { label: "window at the end", in: ["xyza", "a"], expect: "a" },
  // Needs two a's: "aa" or "aa", not "a".
  { label: "counts matter", in: ["aaaa", "aa"], expect: "aa" },
  // Two windows of length 2: "ba" at 0 and "ab" at 2. The left one wins.
  { label: "tie, left wins", in: ["baab", "ab"], expect: "ba" },
  { label: "impossible", in: ["abc", "z"], expect: "" },
  { label: "needle longer", in: ["ab", "abc"], expect: "" },
];

let pass = 0;
for (const { label, in: input, expect } of testCases) {
  const got = minWindowSubstring(input);
  const ok = got === expect;
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "🥶"} ${label.padEnd(18)} expect "${expect}" | got "${got}"`,
  );
}

// ---------------------------------------------------------------------------
// Oracle: try every window, shortest first, left to right. Slow on purpose,
// and it shares no code with your function.
// ---------------------------------------------------------------------------
function oracleMinWindow([hay, needle]) {
  const need = {};
  for (const ch of needle) need[ch] = (need[ch] || 0) + 1;

  for (let len = needle.length; len <= hay.length; len++) {
    for (let start = 0; start + len <= hay.length; start++) {
      const have = {};
      for (let k = start; k < start + len; k++) {
        have[hay[k]] = (have[hay[k]] || 0) + 1;
      }
      let ok = true;
      for (const ch in need) {
        if ((have[ch] || 0) < need[ch]) {
          ok = false;
          break;
        }
      }
      if (ok) return hay.slice(start, start + len);
    }
  }
  return "";
}

// 400 random pairs. Same seed, same data, every run.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240505);
const LETTERS = "abcde";

function randomString(n) {
  let out = "";
  for (let k = 0; k < n; k++) {
    out += LETTERS[Math.floor(rand() * LETTERS.length)];
  }
  return out;
}

// Take a real window of the haystack, so an answer always exists.
function randomCase() {
  const hay = randomString(4 + Math.floor(rand() * 12));
  const len = 2 + Math.floor(rand() * 4);
  const start = Math.floor(rand() * (hay.length - len + 1));
  const needle = hay.slice(start, start + len);
  return [hay, needle];
}

let oracleFails = 0;
for (let round = 0; round < 400; round++) {
  const input = randomCase();
  const got = minWindowSubstring(input);
  const expect = oracleMinWindow(input);
  const ok = got === expect;
  if (!ok) {
    oracleFails++;
    if (oracleFails <= 3) {
      console.log(
        `🥶 oracle [${input[0]}] [${input[1]}]  expect "${expect}" | got "${got}"`,
      );
    }
  }
}
console.log(
  `${oracleFails === 0 ? "✅" : "🥶"} oracle 400 random pairs  fails ${oracleFails}`,
);
if (oracleFails === 0) pass++;

// ---------------------------------------------------------------------------
// Speed check. Run: node min-window-substring.js bench
// ---------------------------------------------------------------------------
if (process.argv[2] === "bench") {
  const hay = randomString(4000);
  const needle = hay.slice(1500, 1700);

  for (let w = 0; w < 2; w++) minWindowSubstring([hay, needle]);
  const t0 = process.hrtime.bigint();
  const R = 5;
  let got = "";
  for (let r = 0; r < R; r++) got = minWindowSubstring([hay, needle]);
  const ms = Number(process.hrtime.bigint() - t0) / 1e6 / R;

  console.log(`\nbench  haystack 4000, needle 200  ->  ${ms.toFixed(2)} ms`);
  console.log(`       expected length 200, got length ${got.length}`);
}

console.log(`\n${pass}/${testCases.length + 1} passed`);
