/**
 * Tree Constructor (Medium)  [Coderbyte]
 *
 * Input: an array of strings. Each string is one pair "(child,parent)".
 *
 *   ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]   ->  true
 *   ["(1,2)", "(3,2)", "(5,2)"]                      ->  false  (2 has 3 children)
 *   ["(2,4)", "(2,9)"]                               ->  false  (2 has 2 parents)
 *
 * A valid BINARY TREE here means all five rules hold:
 *   1. every node has at most one parent
 *   2. every node has at most two children
 *   3. exactly one node has no parent (that node is the root)
 *   4. every node is reachable from the root (no cycle, no second group)
 *   5. an empty array is not a tree -> false
 *
 * Rules 1 and 2 are enough for the Coderbyte tests. Rules 3 and 4 are what
 * make the answer a real tree. Build all four.
 *
 * Done check: `node tree-constructor.js`
 * Expected: every line ends with a check mark.
 */

// ===========================================================================
// THE CORE. You write this one function.
// ===========================================================================
var treeConstructor = function (strs) {
  // Parse is done for you: use parsePairs(strs) and allNodes(pairs).
  //   parsePairs(["(1,2)"])  ->  [[1, 2]]      one [child, parent] pair
  //   allNodes([[1, 2]])     ->  [1, 2]        every id in the input
  //
  // Two maps are enough:
  //   parentOf: child id  -> parent id        at most one parent
  //   childOf:  parent id -> count of children  at most two children
  //
  // Then from the root, walk down and count the nodes you can reach.

  // 1. karna binary tree maka, maksimal child = 2
  // 2. setiap child harus punya 1 parent

  const parents = {};
  const childs = {};

  for (const pair of strs) {
    const [child, parent] = pair.replace(/[()]/g, "").split(",");

    if (!parents[parent]) {
      parents[parent] = [child];
    } else {
      if (parents[parent].includes(child)) continue;
      parents[parent].push(child);
    }

    if (parents[parent].length > 2) return false;

    if (!childs[child]) {
      childs[child] = parent;
    } else if (
      childs[child] &&
      // child n parent combination appeared twice
      childs[child] !== parent
    ) {
      return false;
    }
  }

  // buat cek value muncul di parent + child bersamaan. atau ga ada root
  const roots = Object.keys(parents).filter((id) => !childs[id]);
  if (roots.length !== 1) return false;

  const total = new Set([...Object.keys(parents), ...Object.keys(childs)]);
  const queue = [roots[0]];
  const seen = new Set([roots[0]]);

  // buat cek cycle (loop parent <==> child)
  while (queue.length) {
    const node = queue.shift();
    const kids = parents[node] || [];

    for (const kid of kids) {
      if (!seen.has(kid)) {
        queue.push(kid);
        seen.add(kid);
      }
    }
  }

  return seen.size === total.size;
};

// ===========================================================================
// Scaffold. Already done.
// ===========================================================================

// ["(1,2)", "( 2 , 4 )"] -> [[1, 2], [2, 4]]
function parsePairs(strs) {
  const pairs = [];
  for (const s of strs) {
    const m = /^\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/.exec(String(s).trim());
    if (m) pairs.push([Number(m[1]), Number(m[2])]);
  }
  return pairs;
}

// [[1,2],[2,4]] -> [1, 2, 4]
function allNodes(pairs) {
  const ids = new Set();
  for (const [child, parent] of pairs) {
    ids.add(child);
    ids.add(parent);
  }
  return [...ids];
}

// ---------------------------------------------------------------------------
// Tests, in two groups. Level 1 needs the first group.
// ---------------------------------------------------------------------------
const localCases = [
  {
    label: "coderbyte example",
    in: ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"],
    expect: true,
  },
  { label: "three children", in: ["(1,2)", "(3,2)", "(5,2)"], expect: false },
  { label: "two children ok", in: ["(1,2)", "(3,2)"], expect: true },
  { label: "two parents", in: ["(2,4)", "(2,9)"], expect: false },
  { label: "one pair", in: ["(1,2)"], expect: true },
  // The same edge twice is one child, not two.
  { label: "same edge twice", in: ["(1,2)", "(1,2)"], expect: true },
  { label: "multi-digit ids", in: ["(10,20)", "(20,30)"], expect: true },
];

const treeCases = [
  { label: "cycle 1->2->3->1", in: ["(1,2)", "(2,3)", "(3,1)"], expect: false },
  { label: "two groups", in: ["(1,2)", "(3,4)"], expect: false },
  {
    label: "chain of 5",
    in: ["(1,2)", "(2,3)", "(3,4)", "(4,5)"],
    expect: true,
  },
  { label: "self loop", in: ["(1,1)"], expect: false },
  { label: "empty", in: [], expect: false },
  {
    label: "full tree, 7 nodes",
    in: ["(2,1)", "(3,1)", "(4,2)", "(5,2)", "(6,3)", "(7,3)"],
    expect: true,
  },
  {
    label: "same",
    in: ["(1,2)", "(1,2)", "(1,2)"],
    expect: true,
  },
  // 1 and 2 are parents of 3, but 3 is also parent of 1: no root.
  {
    label: "cycle, 2 parents ok",
    in: ["(2,1)", "(3,1)", "(1,3)"],
    expect: false,
  },
  // One root (5), but 1 and 2 sit in a ring away from it. Only reach sees this.
  {
    label: "ring beside tree",
    in: ["(2,1)", "(1,2)", "(4,5)"],
    expect: false,
  },
];

function runGroup(name, cases) {
  let pass = 0;
  for (const { label, in: input, expect } of cases) {
    const got = treeConstructor(input);
    const ok = got === expect;
    if (ok) pass++;
    console.log(
      `${ok ? "✅" : "🥶"} ${name} ${label.padEnd(20)} expect ${expect} | got ${got}`,
    );
  }
  return { pass, total: cases.length };
}

const g1 = runGroup("L1", localCases);
// const g1 = { pass: 100 };
const g2 = runGroup("L2", treeCases);

// ---------------------------------------------------------------------------
// Oracle: builds real trees, then breaks them on purpose. No checking code,
// so it cannot repeat a mistake from your function.
// ---------------------------------------------------------------------------
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240303);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

// A valid tree with ids 1..n. Every new node takes a parent with room.
function validTree(n) {
  const pairs = [];
  let open = [1]; // parents that still have room for a child
  for (let c = 2; c <= n; c++) {
    const p = pick(open);
    pairs.push([c, p]);
    if (pairs.filter(([, par]) => par === p).length === 2) {
      open = open.filter((x) => x !== p);
    }
    open.push(c);
  }
  return pairs;
}

const toStrs = (pairs) => pairs.map(([c, p]) => `(${c},${p})`);

// Each break is a rule from the doc comment, so the answer is known.
function breakIt(pairs, kind) {
  const next = pairs.map((p) => [...p]);
  const ids = new Set();
  for (const [c, p] of next) {
    ids.add(c);
    ids.add(p);
  }
  const maxId = Math.max(...ids);

  if (kind === "third child") {
    // Make one parent have exactly 3 children, always a rule-2 break.
    const counts = new Map();
    for (const [, par] of next) counts.set(par, (counts.get(par) || 0) + 1);
    const par = pick([...counts.keys()]);
    const add = 3 - counts.get(par);
    for (let k = 1; k <= add; k++) next.push([maxId + k, par]);
  } else if (kind === "second parent") {
    const child = pick(next)[0];
    const other = maxId + 1;
    next.push([child, other]); // rule 1
  } else if (kind === "cycle") {
    const root = pick(
      allNodes(next).filter((x) => !next.some(([c]) => c === x)),
    );
    const p = next[0][0];
    next.push([root, p]); // rule 3 and 4
  } else if (kind === "orphan") {
    next.push([maxId + 1, maxId + 2]); // rule 3: a second, detached root
  } else if (kind === "ring") {
    // a 2-node ring with no root, away from the real tree: only rule 4 sees it
    next.push([maxId + 1, maxId + 2]);
    next.push([maxId + 2, maxId + 1]);
  }
  return next;
}

const kinds = ["third child", "second parent", "cycle", "orphan", "ring"];
let oracleFails = 0;
let rounds = 0;

for (let r = 0; r < 400; r++) {
  const n = 2 + Math.floor(rand() * 7);
  const good = validTree(n);

  rounds++;
  if (treeConstructor(toStrs(good)) !== true) {
    oracleFails++;
    if (oracleFails <= 3) {
      console.log(`🥶 oracle valid tree  n=${n}  ${toStrs(good).join(" ")}`);
    }
  }

  const kind = kinds[r % kinds.length];
  const bad = breakIt(good, kind);
  rounds++;
  if (treeConstructor(toStrs(bad)) !== false) {
    oracleFails++;
    if (oracleFails <= 6) {
      console.log(`🥶 oracle "${kind}"  ${toStrs(bad).join(" ")}`);
    }
  }
}

console.log(
  `${oracleFails === 0 ? "✅" : "🥶"} oracle ${rounds} generated trees  fails ${oracleFails}`,
);

const pass = g1.pass + g2.pass + (oracleFails === 0 ? 1 : 0);
const total = g1.total + g2.total + 1;
console.log(`\n${pass}/${total} passed   (L1 ${g1.pass}/${g1.total})`);
