"`path` is the prefix I have built. Fill the rest with numbers not yet used."

`if (path.includes(nums[i])) continue;` :

```
  nums:   1   2   3
          _   _   _     path=[]        kosong
          X   _   _     path=[1]       1 is used
          X   X   _     path=[1,2]     1 and 2 are used
          X   X   X     path=[1,2,3]   full → record
```

visualisasi:

```
  dfs([])
  ├─ 1 → [1]
  │  ├─ skip 1
  │  ├─ 2 → [1,2]
  │  │  ├─ skip 1
  │  │  ├─ skip 2
  │  │  └─ 3 → [1,2,3] ✓
  │  └─ 3 → [1,3]
  │     ├─ skip 1
  │     ├─ 2 → [1,3,2] ✓
  │     └─ skip 3
  ├─ 2 → [2]
  │  ├─ 1 → [2,1]
  │  │  ├─ skip 1
  │  │  ├─ skip 2
  │  │  └─ 3 → [2,1,3] ✓
  │  └─ 3 → [2,3]
  │     ├─ 1 → [2,3,1] ✓
  │     ├─ skip 2
  │     └─ skip 3
  └─ 3 → [3]
     ├─ 1 → [3,1]
     │  ├─ skip 1
     │  ├─ 2 → [3,1,2] ✓
     │  └─ skip 3
     └─ 2 → [3,2]
        ├─ 1 → [3,2,1] ✓
        ├─ skip 2
        └─ skip 3
```
