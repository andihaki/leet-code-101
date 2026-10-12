# soal

Given an integer array nums, return the length of the longest strictly increasing subsequence.

# contoh

Input: nums = [9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

# solusi dfs depth first search

dfs = rekursif. base / best case = 1. karna minimal item nya sendiri.
di-inner loop ganti base case kalo > 1 + dfs(j)

```
  index:   0   1   2   3   4   5    6   7
  nums:   10   9   2   5   3   7  101  18
  dfs:     2   2   4   3   3   2    1   1
```

How dfs(2) becomes 4:
nums[2]=2 → 5 → 7 → 101
dfs(2) = 1 + dfs(3) = 1 + 1 + dfs(5) = 1 + 1 + 1 + dfs(6) = 4

```
  dfs(2)  nums[2]=2, best=1
    j=3  5>2 → 1 + dfs(3)
                dfs(3) nums[3]=5
                  j=5  7>5 → 1 + dfs(5)
                             dfs(5) nums[5]=7
                               j=6 101>7 → 1+1 = 2
                               j=7  18>7 → 1+1 = 2
                             return 2
                return 1+2 = 3
    j=4  3>2 → 1 + dfs(4) = 1+3 = 4   ← best
    j=5  7>2 → 1 + dfs(5) = 3
    ...
    return 4
```

# solusi dynamic programming

Dynamic programming selalu mulai dari base case? jadi minimal length setiap `num of nums` = 1, jadi mulai looping mundur dari nums.length -1 ke-0.

- `let dp = Array(nums.length).fill(1)` data dengan default value = base case.
- `for (let i=nums.length-1; i>=0; i++)` looping descending excluding index terakhir, karna base case = 1
- `for (let j=i+1; j<nums.length; j++)` looping asc buat cek afakah data index ke nums.length-2 < nums.length-1
- `if (nums[i]<nums[j]) dp[i]=Math.max(dp[i], 1+dp[j])` ganti nilai `dp` kalo nums.length-2 < nums.length-1 = true
- `return Math.max(...dp)` ambil angka terbesar
